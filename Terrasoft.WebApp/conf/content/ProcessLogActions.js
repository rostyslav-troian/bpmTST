Terrasoft.configuration.Structures["ProcessLogActions"] = {innerHierarchyStack: ["ProcessLogActions"]};
define("ProcessLogActions", ["RightUtilities", "ProcessModuleUtilities", "ConfigurationConstants", "ProcessModule",
		"ProcessLogActionsResources"],
	function(RightUtilities, ProcessModuleUtilities, ConfigurationConstants, ProcessModule, resources) {
		/**
		 * Terrasoft.configuration.mixins.ProcessLogActions
		 */
		Ext.define("Terrasoft.configuration.mixins.ProcessLogActions", {
			alternateClassName: "Terrasoft.ProcessLogActions",

			/**
			 * @private
			 */
			_canUserCancelProcess: false,

			// region Methods: Private

			/**
			 * @private
			 */
			_cancelExecutionByIds: function(items) {
				const maskId = Terrasoft.Mask.show();
				const responseCallback = this._cancelResponseCallback.bind(this, items, maskId);
				const processDataIds = items.join(";");
				ProcessModule.services.cancelExecution(this, {processDataIds: processDataIds}, responseCallback);
			},

			/**
			 * @private
			 */
			_cancelResponseCallback: function(items, maskId) {
				items.forEach(function(item) {
					if (Terrasoft.Features.getIsEnabled("UseBackgroundProcessMode")) {
						this._setCanceledProcessStatus(item);
					} else {
						this.reloadCanceledProcessGridData(item);
					}
				}, this);
				var hasCanceledItems = this.get("MultiSelect") && !Ext.isEmpty(items);
				this.set("HasCanceledItems", hasCanceledItems);
				Terrasoft.Mask.hide(maskId);
			},

			/**
			 * @private
			 */
			_cancelAllSelected: function() {
				const entitySchema = this.getGridEntitySchema();
				var esq = new Terrasoft.EntitySchemaQuery(entitySchema.name);
				esq.addColumn(entitySchema.primaryColumnName);
				this.initQueryFilters(esq);
				const unselectedItems = this.getUnselectedItems();
				if (unselectedItems.length) {
					const unselectedFilter = Terrasoft.createColumnInFilterWithParameters("Id", unselectedItems);
					unselectedFilter.comparisonType = Terrasoft.ComparisonType.NOT_EQUAL;
					esq.filters.add("UnselectedItems", unselectedFilter);
				}
				esq.filters.add("NotParent", Terrasoft.createColumnIsNullFilter("Parent"));
				var statusEnum = ConfigurationConstants.SysProcess.Status;
				var allowStatuses = [statusEnum.Running, statusEnum.Error];
				esq.filters.add("Status", Terrasoft.createColumnInFilterWithParameters(
					"Status", allowStatuses, Terrasoft.DataValueType.GUID));
				esq.execute(function(response) {
					const items = response.collection.getItems().map(function(item) {
						return item.get("Id");
					}, this);
					this._cancelExecutionByIds(items);
				}, this);
			},

			/**
			 * @private
			 */
			_cancelSelected: function() {
				const selectedItems = this.getSelectedItems();
				const runningItems = this._getRunningItems(selectedItems);
				if (runningItems.length  === 0) {
					Terrasoft.showMessage(resources.localizableStrings.ProcessesCancelDeclineMessage);
					return;
				}
				const items = this._getRootItems(runningItems);
				if (items.length === 0) {
					const message = selectedItems.length === 1
						? resources.localizableStrings.SubProcessCancelDeclineMessage
						: resources.localizableStrings.SubProcessesCancelDeclineMessage;
					Terrasoft.showMessage(message);
				} else {
					this._cancelExecutionByIds(items);
				}
			},

			/**
			 * @private
			 */
			_getRunningItems: function(items) {
				const statusEnum = ConfigurationConstants.SysProcess.Status;
				const allowStatuses = [statusEnum.Running, statusEnum.Error];
				const gridData = this.getGridData();
				return _.filter(items, function(id) {
					const row = gridData.get(id);
					const status = row.get("Status");
					return row && Terrasoft.contains(allowStatuses, status && status.value);
				}, this);
			},

			/**
			 * @private
			 */
			_getRootItems: function(items) {
				const gridData = this.getGridData();
				return _.filter(items, function(id) {
					const row = gridData.get(id);
					const parent = row.get("Parent");
					return row && !parent;
				}, this);
			},

			/**
			 * @private
			 */
			_canCancelProcessExecution: function(item) {
				var canCancelProcessExecution = false;
				if (this._canUserCancelProcess) {
					var status = item.get("Status").value;
					var cancelExecutionStatuses = [
						ConfigurationConstants.SysProcess.Status.Running,
						ConfigurationConstants.SysProcess.Status.Error
					];
					canCancelProcessExecution = Terrasoft.contains(cancelExecutionStatuses, status);
				}
				return canCancelProcessExecution;
			},

			/**
			 * @private
			 */
			_getSubProcessGridData: function(id) {
				var gridData = this.getGridData();
				return gridData.filterByFn(function(item) {
					var parent = item.values.Parent;
					return parent && parent.value === id;
				}, this);
			},

			/**
			 * @private
			 */
			_setCanceledProcessStatus: function(recordId) {
				var gridData = this.getGridData();
				if (gridData.contains(recordId)) {
					var canceledStatus = {
						displayValue: resources.localizableStrings.CanceledProcessStatusCaption,
						value: ConfigurationConstants.SysProcess.Status.Canceled
					};
					var row = gridData.get(recordId);
					row.set("Status", canceledStatus);
				}
				var subProcessGridData = this._getSubProcessGridData(recordId);
				subProcessGridData.each(function(item) {
					this._setCanceledProcessStatus(item.values.Id);
				}, this);
			},

			/**
			 * @private
			 */
			_registerCancelExecutionMessages: function() {
				this.sandbox.registerMessages({
					"ExecutionCanceled": {
						mode: Terrasoft.MessageMode.PTP,
						direction: Terrasoft.MessageDirectionType.SUBSCRIBE
					}
				});
				this.sandbox.subscribe("ExecutionCanceled", this.reloadCanceledProcessGridData, this);
			},

			/**
			 * Initialize user can cancel process property.
			 * @private
			 */
			_initCanCancelProcess: function(callback, scope) {
				RightUtilities.checkCanExecuteOperation({operation: "CanCancelProcess"},
					function(result) {
						this._canUserCancelProcess = result;
						Ext.callback(callback, scope);
					}, this);
			},

			// endregion

			/**
			 * Returns can user cancel process.
			 */
			canUserCancelProcess: function() {
				return this._canUserCancelProcess;
			},

			/**
			 * CancelExecution confirmation handler.
			 */
			cancelExecutionConfirmation: function() {
				if (this.isAnySelected()) {
					var message = resources.localizableStrings.CancelExecutionConfirmation;
					this.showConfirmationDialog(message, this.cancelExecution, ["yes", "no"]);
				}
			},

			/**
			 * Reloads cancel process grid data.
			 * @param {String} recordId Record Id.
			 */
			reloadCanceledProcessGridData: function(recordId) {
				this.loadGridDataRecord(recordId, function() {
					var subProcessGridData = this._getSubProcessGridData(recordId);
					subProcessGridData.each(function(item) {
						this.reloadCanceledProcessGridData(item.values.Id);
					}, this);
					this.trigger("change:ActiveRow", recordId);
				}, this);
			},

			/**
			 * Shows process diagram.
			 * @param {String} primaryColumnValue Primary column value for record.
			 */
			showProcessDiagram: function(primaryColumnValue) {
				var recordId = primaryColumnValue;
				if (!recordId && this.isSingleSelected()) {
					var activeRow = this.getActiveRow();
					recordId = activeRow.get("Id");
				}
				ProcessModuleUtilities.showProcessDiagram(recordId);
			},

			/**
			 * Cancel process execution.
			 */
			cancelExecution: function(result) {
				if (result === "yes") {
					if (this.get("SelectAllMode")) {
						this._cancelAllSelected();
					} else {
						this._cancelSelected();
					}
				}
			},

			/**
			 * Returns whether the menu is displayed to Cancel the execution.
			 * @return {Boolean}
			 */
			getShowCancelExecutionMenuVisible: function() {
				if (!this.canUserCancelProcess()) {
					return false;
				}
				if (this.get("SelectAllMode")) {
					return true;
				}
				var selectedItems = this.getSelectedItems();
				if (!selectedItems) {
					return false;
				}
				if (selectedItems.length > 1) {
					return true;
				}
				var gridData = this.getGridData();
				var id = selectedItems[0];
				var row = gridData.find(id);
				if (!row) {
					return false;
				}
				var statusEnum = ConfigurationConstants.SysProcess.Status;
				var status = row.get("Status").value;
				return status === statusEnum.Running || status === statusEnum.Error;
			},

			/**
			 * Initialize cancel execution methods.
			 * @param {Terrasoft.Collection} collection Rows.
			 */
			initCancelExecution: function(collection) {
				collection.each(function(item) {
					var canCancelProcessExecution = this._canCancelProcessExecution.bind(this, item);
					item.getCancelExecutionVisible = canCancelProcessExecution;
					item.canCancelProcessExecution = canCancelProcessExecution;
				}, this);
			},

			/**
			 * Initializes mixin properties and messages.
			 */
			init: function(callback, scope) {
				this._registerCancelExecutionMessages();
				this._initCanCancelProcess(callback, scope);
			}
		});
		return Terrasoft.ProcessLogUtilities;
	});


