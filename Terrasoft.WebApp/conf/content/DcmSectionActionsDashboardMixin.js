Terrasoft.configuration.Structures["DcmSectionActionsDashboardMixin"] = {innerHierarchyStack: ["DcmSectionActionsDashboardMixin"]};
define("DcmSectionActionsDashboardMixin", [
	"DcmSectionActionsDashboardMixinResources",
	"ProcessModuleV2",
	"SectionActionsDashboard",
	"DcmSchemaManager",
	"DcmElementSchemaManager"
], function(resources, ProcessModule) {

	/**
	 * Provides the ability to work with dcm schema.
	 */
	Ext.define("Terrasoft.configuration.mixins.DcmSectionActionsDashboardMixin", {
		alternateClassName: "Terrasoft.DcmSectionActionsDashboardMixin",

		/**
		 * Collection of allowed actions.
		 * @type {Terrasoft.Collection}
		 */
		permissionsStages: null,

		//region Methods: Private

		/**
		 * Returns dcm schema config.
		 * @private
		 * @return {Object}
		 */
		getDcmConfig: function() {
			return this.getMasterEntityParameterValue("DcmConfig") || {};
		},

		/**
		 * Init DcmSchema instance.
		 * @private
		 * @param {String} dcmSchemaUId Dcm schema ID.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		initDcmSchema: function(dcmSchemaUId, callback, scope) {
			Terrasoft.chain(
				function(next) {
					Terrasoft.DcmElementSchemaManager.initialize(next, this);
				},
				function() {
					Terrasoft.DcmSchemaManager.getSchemaInstance(dcmSchemaUId, callback, scope);
				}, this
			);
		},

		/**
		 * Init ActionsColumnName property.
		 * @private
		 */
		initActionsColumnName: function() {
			const dcmSchema = this.get("DcmSchema");
			const entitySchema = this.get("EntitySchema");
			const actionsColumn = Terrasoft.findWhere(entitySchema.columns, {uId: dcmSchema.stageColumnUId});
			this.set("ActionsColumnName", actionsColumn && actionsColumn.name);
		},

		/**
		 * Creates item for actions collection.
		 * @private
		 * @param {Terrasoft.Designers.DcmSchemaStage} stage Dcm schema stage.
		 * @return {Terrasoft.BaseViewModel}
		 */
		createDcmActionsItem: function(stage) {
			const item = Ext.create("Terrasoft.BaseViewModel");
			item.set("Id", stage.stageRecordId);
			item.set("Caption", this._getStageCaption(stage));
			item.set("Color", stage.color);
			item.set("StageUId", stage.uId);
			item.set("ParentStageUId", stage.parentStageUId || "");
			if (this.getIsFeatureEnabled("DcmStagesPermissions")) {
				item.set("Permissions", stage.permissions || "");
				item.set("UsePermissions", stage.usePermissions || false);
			}
			return item;
		},

		/**
		 * Sets availableStages property for action object.
		 * @private
		 * @param {Terrasoft.model.BaseViewModel} actionsItem Actions collection item.
		 */
		setDcmAvailableStages: function(actionsItem) {
			const dcmSchema = this.get("DcmSchema");
			const sourceStageUId = actionsItem.get("StageUId");
			const outgoingConnections = dcmSchema.stageConnections.getOutgoingConnections(sourceStageUId);
			const availableStages = outgoingConnections.map(function(connection) {
				const referenceStage = dcmSchema.stages.get(connection.target);
				return referenceStage.stageRecordId;
			});
			actionsItem.set("AvailableStages", availableStages);
		},

		/**
		 * Creates collection of actions.
		 * @private
		 * @return {Terrasoft.BaseViewModelCollection}
		 */
		createDcmActionsCollection: function() {
			const dcmSchema = this.get("DcmSchema");
			const stages = dcmSchema.stages;
			const collection = Ext.create("Terrasoft.BaseViewModelCollection");
			stages.each(function(stage) {
				const actionsItem = this.createDcmActionsItem(stage);
				this.setDcmAvailableStages(actionsItem);
				collection.add(stage.stageRecordId, actionsItem);
			}, this);
			return collection;
		},

		/**
		 * Init ActionsCollection property.
		 * @private
		 */
		initDcmActionsCollection: function() {
			let collection = this.createDcmActionsCollection();
			collection = this.createActionsMenu(collection);
			this.handleActiveActionChange(collection);
		},

		/**
		 * Set attribute IsActualDcmSchema by module DcmConfig.
		 * @private
		 * @param {Object} dcmConfig Dcm config object.
		 */
		setIsActualDcmSchema: function(dcmConfig) {
			const dcmSchemaUId = dcmConfig.dcmSchemaUId;
			const actualDcmSchemaUId = dcmConfig.actualDcmSchemaUId;
			this.set("IsActualDcmSchema", actualDcmSchemaUId && dcmSchemaUId !== actualDcmSchemaUId);
		},

		/**
		 * Asks user to confirm cancel current dcmSchema.
		 * @private
		 * @param {Function} callback The callback function.
		 * @param {Boolean} callback.result Flag that indicates whether user confirm to cancel case or not.
		 * @param {Object} scope The scope of callback function.
		 */
		confirmCancelCurrentDcmSchema: function(callback, scope) {
			const confirmMessage = resources.localizableStrings.ConfirmCancelCurrentCaseMessage;
			const yesButtonCaption = resources.localizableStrings.ContinueButtonCaption;
			const yes = Terrasoft.MessageBoxButtons.YES.returnCode;
			const cancel = Terrasoft.MessageBoxButtons.CANCEL.returnCode;
			const yesButton = {
				className: "Terrasoft.Button",
				returnCode: yes,
				caption: yesButtonCaption
			};
			this.showConfirmationDialog(confirmMessage, function(returnCode) {
				callback.call(scope, returnCode === yes);
			}, [yesButton, cancel], {defaultButton: 1});
		},

		/**
		 * Returns entity schema query for select process data ID for running dcmSchema process.
		 * @private
		 * @return {Terrasoft.EntitySchemaQuery}
		 */
		getRunningProcessDataIdEsq: function() {
			const esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: "SysProcessData"
			});
			esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, "Id");
			const recordId = this.getEntitySchemaPrimaryColumnValue();
			const filter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
				"[SysProcessElementData:SysProcess:Id].[SysEntityCommonPrcEl:ProcessElement:Id].RecordId",
				recordId);
			esq.filters.addItem(filter);
			return esq;
		},

		/**
		 * Returns process data ID for running dcmSchema process.
		 * @private
		 * @param {Function} callback The callback function.
		 * @param {String} callback.processDataId Process data ID.
		 * @param {Object} scope The scope of callback function.
		 */
		getRunningProcessDataId: function(callback, scope) {
			const esq = this.getRunningProcessDataIdEsq();
			esq.getEntityCollection(function(response) {
				const result = response.collection.first();
				const processDataId = result && result.get("Id");
				callback.call(scope, processDataId);
			}, scope);
		},

		/**
		 * Cancel running dcmSchema by process data ID.
		 * @private
		 * @param {String} processDataId Process data record ID.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		cancelDcmSchema: function(processDataId, callback, scope) {
			ProcessModule.services.cancelExecution(scope, {processDataIds: processDataId}, callback);
		},

		/**
		 * Run actual dcmSchema process by saving record.
		 * @private
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		runActualDcmSchema: function(callback, scope) {
			Terrasoft.chain(
				function(next) {
					const dcmConfig = this.getDcmConfig();
					this.initDcmSchema(dcmConfig.actualDcmSchemaUId, next, this);
				},
				function(next, dcmSchemaInstance) {
					const firstStage = dcmSchemaInstance.stages.first();
					const stageCaption = this._getStageCaption(firstStage);
					const stageId = firstStage.stageRecordId;
					this.set("ActiveActionId", stageId);
					const columnName = this.get("ActionsColumnName");
					this.setMasterEntityParameterValue(columnName, {value: stageId, displayValue: stageCaption});
					this.sandbox.publish("SaveRecord", {isSilent: true, callback: next}, [this.sandbox.id]);
				},
				function() {
					callback.call(scope);
				}, this
			);
		},

		/**
		 * Reload ActionDashboard control for new running dcmSchema.
		 * @private
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		reloadActionsDashboard: function(callback, scope) {
			Terrasoft.chain(
				function(next) {
					const sandbox = this.sandbox;
					sandbox.publish("UpdateDcmActionsDashboardConfig", {callback: next, scope: this}, [sandbox.id]);
				},
				function(next) {
					const dcmConfig = this.getDcmConfig();
					this.setIsActualDcmSchema(dcmConfig);
					this.initDcmSchema(dcmConfig.dcmSchemaUId, next, this);
				},
				function(next, dcmSchemaInstance) {
					this.set("DcmSchema", dcmSchemaInstance);
					this._initStageLookupData(next, this);
				},
				function() {
					this.initDcmActions();
					this.onReloadDashboardItems();
					callback.call(scope);
				}, this
			);
		},

		/**
		 * Change dcmSchema to actual.
		 * @private
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		changeDcmSchema: function(callback, scope) {
			Terrasoft.chain(
				function(next) {
					this.sandbox.publish("SaveRecord", {isSilent: true, callback: next}, [this.sandbox.id]);
				},
				this.getRunningProcessDataId,
				function(next, processDataId) {
					processDataId ? this.cancelDcmSchema(processDataId, next, this) : next();
				},
				this.runActualDcmSchema,
				this.reloadActionsDashboard,
				function() {
					callback.call(scope);
				}, this
			);
		},

		/**
		 * Change dcmSchema to actual with user confirmation.
		 * @private
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		tryChangeDcmSchema: function(callback, scope) {
			this.confirmCancelCurrentDcmSchema(function(result) {
				if (result) {
					this.changeDcmSchema(callback, scope);
				} else {
					callback.call(scope);
				}
			}, this);
		},

		/**
		 * Reset stage column depends on starting dcm schema.
		 * @private
		 */
		resetStageColumn: function() {
			if (this._canResetStageColumn()) {
				const firstStage = this.get("ActionsCollection").first();
				const id = firstStage.get("Id");
				const caption = firstStage.get("Caption");
				this.set("ActiveActionId", id);
				const columnName = this.get("ActionsColumnName");
				this.setMasterEntityParameterValue(columnName, {
					value: id,
					displayValue: caption
				});
			}
		},

		/**
		 * @private
		 */
		_canResetStageColumn: function() {
			const dcmConfig = this.getDcmConfig();
			return !dcmConfig.runningSchemaUId && dcmConfig.actualDcmSchemaUId &&
				this._getIsDcmFilteredColumnsChanged();
		},

		/**
		 * @private
		 */
		_getStageCaption: function(stage) {
			const stageLookupData = this.get("StageLookupData");
			const lookupItem = stageLookupData[stage.stageRecordId];
			return lookupItem || (stage.caption || "").toString();
		},

		/**
		 * @private
		 */
		_initStageLookupData: function(callback, scope) {
			this.set("StageLookupData", null);
			const dcmSchema = this.get("DcmSchema");
			if (!dcmSchema) {
				return Ext.callback(callback, scope);
			}
			const entitySchema = this.get("EntitySchema");
			const actionsColumn = _.find(entitySchema.columns, {uId: dcmSchema.stageColumnUId});
			const actionsSchemaName = actionsColumn.referenceSchemaName;
			let primaryColumnName, primaryDisplayColumnName;
			Terrasoft.chain(
				function(next) {
					this.set("ActionsSchemaName", actionsSchemaName);
					this.setActionsPrimaryColumnNames(next, this);
				},
				function(next) {
					primaryColumnName = this.get("ActionsPrimaryColumnName");
					primaryDisplayColumnName = this.get("ActionsPrimaryDisplayColumnName");
					const selectConfig = {
						entitySchemaName: actionsSchemaName,
						addToStore: true,
						columnsInfo: [
							{columnName: primaryColumnName},
							{columnName: primaryDisplayColumnName}
						]
					};
					Terrasoft.DataManager.select(selectConfig, next, this);
				},
				function(next, dataCollection) {
					const stageLookupData = {};
					dataCollection.collection.each(function(item) {
						const viewModel = item.viewModel;
						const id = viewModel.get(primaryColumnName);
						const caption = viewModel.get(primaryDisplayColumnName);
						stageLookupData[id] = caption;
					}, this);
					this.set("StageLookupData", stageLookupData);
					Ext.callback(callback, scope);
				}, this
			);
		},

		/**
		 * @private
		 */
		_getIsDcmFilteredColumnsChanged: function() {
			return this.sandbox.publish("IsDcmFilterColumnChanged", null, [this.sandbox.id]);
		},

		//endregion

		//region Methods: Public

		/**
		 * Init DcmConfig initial values.
		 */
		initDcmConfig: function() {
			const dcmConfig = this.getDcmConfig();
			this.values = this.values || {};
			Ext.mergeIf(this.values, dcmConfig);
		},

		/**
		 * Init Dcm ActionsDashboard, init DcmSchema if needed.
		 * @param {Function} callback The callback function.
		 * @param {Object} scope The scope of callback function.
		 */
		initDcmActionsDashboard: function(callback, scope) {
			const dcmConfig = this.getDcmConfig();
			this.setIsActualDcmSchema(dcmConfig);
			const dcmSchema = this.get("DcmSchema");
			const dcmSchemaUId = dcmConfig.dcmSchemaUId;
			if (dcmSchema || !dcmSchemaUId) {
				return callback.call(scope);
			}
			Terrasoft.chain(
				function(next) {
					this.initDcmSchema(dcmSchemaUId, next, this);
				},
				function(next, dcmSchemaInstance) {
					this.set("DcmSchema", dcmSchemaInstance);
					this._initStageLookupData(next, this);
				},
				function(next) {
					this.initPermissionsStages(dcmSchemaUId, next, this);
				},
				function() {
					Ext.callback(callback, scope);
				}, this
			);
		},

		/**
		 * Initialize permissionsStages collection.
		 * @param {Guid} dcmSchemaUId Dcm schema unique identifier.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		initPermissionsStages: function(dcmSchemaUId, callback, scope) {
			if (this.getIsFeatureDisabled("DcmStagesPermissions")) {
				return Ext.callback(callback, scope);
			}
			this.callService({
				serviceName: "DcmService",
				methodName: "GetAllowedStagesForCurrentUser",
				data: {
					dcmSchemaUId: dcmSchemaUId
				}
			}, function(response) {
				const result = response.GetAllowedStagesForCurrentUserResult;
				const permissionsStages = Ext.create("Terrasoft.Collection");
				if (result) {
					result.forEach(function (item) {
						permissionsStages.add(item, item);
					}, this);
				}
				this.set("permissionsStages", permissionsStages);
				Ext.callback(callback, scope);
			}, this);
		},

		/**
		 * Get can use action, exist action StageUId in allowed stages.
		 * @param {Terrasoft.BaseViewModel} action Stage control items.
		 * @return {boolean} True, if permissions is available for current user, otherwise false.
		 */
		getCanUseAction: function(action) {
			const permitionStages = this.get("permissionsStages");
			if (this.getIsFeatureDisabled("DcmStagesPermissions") || this.isEmpty(permitionStages)) {
				return true;
			}
			return permitionStages.contains(action.$StageUId);
		},

		/**
		 * Reinitialize section actions dashboard.
		 */
		reInitializeActionsDashboard: function() {
			const dcmConfig = this.getDcmConfig();
			this.setIsActualDcmSchema(dcmConfig);
			const dcmSchemaUId = dcmConfig.dcmSchemaUId;
			if (dcmSchemaUId) {
				Terrasoft.chain(
					function(next) {
						this.initDcmSchema(dcmSchemaUId, next, this);
					},
					function(next, dcmSchemaInstance) {
						this.set("DcmSchema", dcmSchemaInstance);
						this._initStageLookupData(next, this);
					},
					function(next) {
						this.initPermissionsStages(dcmSchemaUId, next, this)
					},
					function() {
						this.initDcmActions();
						this.resetStageColumn();
						this.set("HeaderVisible", true);
					}, this
				);
			} else {
				const hasAnyDcm = this.getMasterEntityParameterValue("HasAnyDcm");
				if (hasAnyDcm) {
					this.set("HeaderVisible", false);
				}
				this.set("DcmSchema", null);
			}
		},

		/**
		 * Determines whether the item is the menu item to the previous item.
		 * @param {Terrasoft.model.BaseViewModel} item Target menu item.
		 * @param {Terrasoft.model.BaseViewModel} previousItem Previous menu item.
		 * @return {Boolean}
		 */
		isDcmMenuItem: function(item, previousItem) {
			const itemUId = previousItem && previousItem.get("StageUId");
			const parentStageUId = item.get("ParentStageUId");
			return parentStageUId === itemUId;
		},

		/**
		 * Handler for click on ActualDcmSchemaInformation button link.
		 */
		onActualDcmSchemaInformationButtonLinkClick: function() {
			const maskId = Terrasoft.Mask.show("#centerPanelContainer");
			this.tryChangeDcmSchema(function() {
				Terrasoft.Mask.hide(maskId);
			}, this);
			return false;
		},

		/**
		 * Init ActionsCollection property.
		 */
		initDcmActions: function() {
			this.initActionsColumnName();
			this.setActiveActionId();
			this.initDcmActionsCollection();
		},

		/**
		 * Returns value of the ViewModel parameter.
		 * @param {String} parameterName Name of the ViewModel parameter.
		 * @return {Object} Value.
		 */
		getMasterEntityParameterValue: function(parameterName) {
			const sandbox = this.sandbox;
			const result = sandbox.publish("GetColumnsValues", [parameterName], [sandbox.id]);
			return result[parameterName];
		},

		/**
		 * @deprecated Will be removed in the future releases.
		 */
		getIsMasterEntityChanged: function() {
			return this.sandbox.publish("IsEntityChanged", null, [this.sandbox.id]);
		}

		//endregion

	});

	return Ext.create("Terrasoft.DcmSectionActionsDashboardMixin");
});


