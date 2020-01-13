Terrasoft.configuration.Structures["QueueProcessUtilities"] = {innerHierarchyStack: ["QueueProcessUtilities"]};
define("QueueProcessUtilities", ["terrasoft", "ProcessModuleUtilities", "OperatorSingleWindowConstants",
		"ServiceHelper", "MaskHelper", "ConfigurationConstants", "QueueProcessUtilitiesResources"],
	function(Terrasoft, ProcessModuleUtilities, OperatorSingleWindowConstants, ServiceHelper, MaskHelper,
		ConfigurationConstants, resources) {

	/**
	 * @class Terrasoft.configuration.mixins.QueueProcessUtilities
	 * Mixin for queue process utilities.
	 */
	Ext.define("Terrasoft.configuration.mixins.QueueProcessUtilities", {
		alternateClassName: "Terrasoft.QueueProcessUtilities",
		extend: "Terrasoft.core.BaseObject",

		//region Methods: Private

		/**
		 * ######### #######, ######### # ########## ####### ######## #######.
		 * @private
		 * @param {Object} parameters ######### ####### ########.
		 * @param {String} parameters.processName ### ##### ########.
		 * @param {String} parameters.queueItemId ########## ############# ###### ######## #######.
		 * @param {String} parameters.entityRecordId ############# ###### ########## #######.
		 * @param {String} parameters.sysProcessDataId (optional) ############# ###### ########### ########.
		 */
		runQueueItemProcess: function(parameters) {
			var processId = parameters.sysProcessDataId;
			var queueItemId = parameters.queueItemId;
			if (!Ext.isEmpty(processId)) {
				this.continueQueueItemProcess(queueItemId, processId);
				return;
			}
			var processParameters = {
				queueItemId: queueItemId,
				entityRecordId: parameters.entityRecordId
			};
			var runProcessCallback = function(options, success, response) {
				MaskHelper.HideBodyMask();
				var responseText = Ext.decode(response.responseText);
				var responseObject = Ext.decode(responseText);
				var processStatus = responseObject.processStatus;
				var isErrorProcessStatus = processStatus === ConfigurationConstants.SysProcessStatus.Error;
				if (!success || !responseObject.success || isErrorProcessStatus) {
					this.showInformationDialog(resources.localizableStrings.QueueItemNotStartedSuccessfullyMessage);
					return;
				}
				var returnValues = Ext.decode(Ext.decode(response.responseText));
				var processId = returnValues.processId;
				var update = Ext.create("Terrasoft.UpdateQuery", {
					rootSchemaName: "QueueItem"
				});
				update.enablePrimaryColumnFilter(queueItemId);
				update.setParameterValue("SysProcessDataId", processId, Terrasoft.DataValueType.GUID);
				update.execute();
			}.bind(this);
			ProcessModuleUtilities.runProcess(parameters.processName, processParameters, runProcessCallback);
		},

		/**
		 * ######## ### # ######### ### ####### ########, ########## # ########## #######.
		 * @private
		 * @param {String} queueItemId ########## ############# ###### ######## #######.
		 * @param {Boolean} runBySupervisor ####### ####, ### ####### ########### ## #### ###########.
		 * @param {Function} callback ####### ######### ######.
		 * @param {Object} callback.parameters ######### ######## ### ######.
		 * @throws {Terrasoft.ItemNotFoundException} ####### ##########, #### ### ####### ## #######
		 * ### ##### ########.
		 */
		getQueueItemProcess: function(queueItemId, runBySupervisor, callback) {
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "QueueItem"
			});
			esq.isDistinct = true;
			esq.addColumn("Queue.[SysSchema:UId:BusinessProcessSchema].Name", "ProcessSchemaName");
			esq.addColumn("EntityRecordId", "EntityRecordId");
			esq.addColumn("SysProcessDataId", "SysProcessDataId");
			esq.addColumn("Operator", "Operator");
			esq.addColumn("Status.IsFinal", "IsFinal");
			esq.filters.add("queueItemId", Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL, "Id", queueItemId));
			esq.getEntityCollection(function(result) {
				if (result.success === false) {
					return;
				}
				var item;
				var isFinished;
				var resultCollection = result.collection;
				if (resultCollection.isEmpty()) {
					isFinished = true;
				} else {
					item = resultCollection.getByIndex(0);
					isFinished = item.get("IsFinal");
				}
				var warningMessage;
				if (isFinished === true) {
					warningMessage = resources.localizableStrings.QueueItemInFinishedStatusMessage;
				} else {
					if (!runBySupervisor) {
						var operatorItem = item.get("Operator");
						if (!Ext.isEmpty(operatorItem) &&
								(operatorItem.value !== Terrasoft.SysValue.CURRENT_USER_CONTACT.value)) {
							warningMessage = Ext.String.format(
								resources.localizableStrings.OtherOperatorWorkingOnElementMessage,
								operatorItem.displayValue);
						}
					}
				}
				if (!Ext.isEmpty(warningMessage)) {
					this.showInformationDialog(warningMessage, function() {
						callback(null);
					});
					return;
				}
				var processName = item.get("ProcessSchemaName");
				var sysProcessDataId = item.get("SysProcessDataId");
				if (Ext.isEmpty(processName)) {
					this.showInformationDialog(resources.localizableStrings.ProcessSchemaNotFoundOperatorMessage);
					var errorMessage = Ext.String.format(
						resources.localizableStrings.ProcessSchemaNotFoundExceptionMessage, queueItemId);
					throw new Terrasoft.ItemNotFoundException({message: errorMessage});
				}
				var entityRecordId = item.get("EntityRecordId");
				var processParameters = {
					processName: processName,
					queueItemId: queueItemId,
					entityRecordId: entityRecordId,
					sysProcessDataId: sysProcessDataId
				};
				callback(processParameters);
			}.bind(this));
		},

		/**
		 * Continues queue item process execution.
		 * @private
		 * @param {String} queueItemId Queue item identifier.
		 * @param {String} processId Queue item process identifier.
		 */
		continueQueueItemProcess: function(queueItemId, processId) {
			var update = Ext.create("Terrasoft.UpdateQuery", {
				rootSchemaName: "QueueItem"
			});
			update.enablePrimaryColumnFilter(queueItemId);
			update.setParameterValue("Operator", Terrasoft.SysValue.CURRENT_USER_CONTACT.value,
				Terrasoft.DataValueType.GUID);
			update.execute(function() {
				ProcessModuleUtilities.continueExecuting(processId);
			});
		},

		//endregion

		//region Methods: Protected

		/**
		 * Returns queue item process parameters and executes this process.
		 * @protected
		 * @param {String} primaryColumnValue Queue item entity record identifier.
		 * @param {Boolean} runBySupervisor Sign that process is executed in Agent desktop window.
		 * @param {Function} callback Callback function.
		 * @param {Boolean} callback.canRunQueueItemProcess Sign that current operator can run queue item process
		 * element.
		 */
		executeQueueItemProcess: function(primaryColumnValue, runBySupervisor, callback) {
			this.updateQueueItemStatus(primaryColumnValue, function() {
				this.getQueueItemProcess(primaryColumnValue, runBySupervisor, function(processParameters) {
					var canRunQueueItemProcess = !Ext.isEmpty(processParameters);
					if (canRunQueueItemProcess) {
						this.runQueueItemProcess(processParameters);
					}
					callback(canRunQueueItemProcess);
				}.bind(this));
			}.bind(this));
		},

		/**
		 * Updates queue item status and operator.
		 * @protected
		 * @param {String} primaryColumnValue Queue item entity record identifier.
		 * @param {Function} callback Callback function.
		 */
		updateQueueItemStatus: function(primaryColumnValue, callback) {
			var update = Ext.create("Terrasoft.UpdateQuery", {
				rootSchemaName: "QueueItem"
			});
			update.enablePrimaryColumnFilter(primaryColumnValue);
			update.filters.addItem(Terrasoft.createColumnIsNullFilter("Operator"));
			update.setParameterValue("Operator", Terrasoft.SysValue.CURRENT_USER_CONTACT.value,
				Terrasoft.DataValueType.GUID);
			update.setParameterValue("Status", OperatorSingleWindowConstants.QueueItemStatuses.IN_PROGRESS,
				Terrasoft.DataValueType.GUID);
			update.execute(callback);
		}

		//endregion

	});
	return Ext.create("Terrasoft.configuration.mixins.QueueProcessUtilities");
});


