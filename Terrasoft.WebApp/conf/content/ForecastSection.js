Terrasoft.configuration.Structures["ForecastSection"] = {innerHierarchyStack: ["ForecastSection"]};
define('ForecastSectionStructure', ['ForecastSectionResources'], function(resources) {return {schemaUId:'6c3d9af8-dc7b-4ce9-af02-116d88a947a1',schemaCaption: "ForecastSection", parentSchemaName: "", schemaName:'ForecastSection',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ForecastSection", [
		"ForecastSectionResources",
		"RightUtilities",
		"AcademyUtilities",
		"ConfigurationEnums",
		"ServiceHelper",
		"ImageCustomGeneratorV2",
		"MiniPageUtilities"],
	function(resources, RightUtilities, AcademyUtilities, ConfigurationEnums, ServiceHelper) {
		return {
			attributes: {
				/**
				 * Forecasts collection.
				 */
				"Forecasts": {
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				
				/**
				 * Forecasts tabs collection.
				 */
				"TabsCollection": {
					dataValueType: Terrasoft.DataValueType.COLLECTION,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
				},
				
				/**
				 * Is TabsDataView visible flag.
				 */
				"IsTabsDataViewVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				},
				/**
				 * Is AnalyticsDataView visible flag.
				 */
				"IsAnalyticsDataViewVisible": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},
				/**
				 * Is forecast collection empty flag.
				 */
				"IsTabsEmpty": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: false
				},
				/**
				 * Analytics data view name.
				 */
				"AnalyticsDataViewName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: "AnalyticsDataView"
				},
				/**
				 * Forecasts tabs data view name.
				 */
				"TabsDataViewName": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: "TabsDataView"
				},
				
				/**
				 * Is forecast ui feature enabled.
				 */
				"ForecastUIV2FeatureEnabled": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				 * Is should show blank slate.
				 */
				"IsBlankSlateVisible": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				}
			},
			messages: {
				/**
				 * @message InitDataViews
				 * Sends header parameters on request.
				 */
				"InitDataViews": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message ChangeHeaderCaption
				 * Changes current page header.
				 */
				"ChangeHeaderCaption": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message NeedHeaderCaption
				 * Gets header parameters request.
				 */
				"NeedHeaderCaption": {
					"mode": Terrasoft.MessageMode.BROADCAST,
					"direction": Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				"ChangeDataView": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message GetActiveViewName
				 * Gets name of the active view
				 */
				"GetActiveViewName": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message ActiveViewChanged
				 * Message for active view changed.
				 */
				"ActiveViewChanged": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			mixins: {
				"MiniPageUtilities": "Terrasoft.MiniPageUtilities"
			},
			methods: {
				
				/**
				 * Loads sorted by name forecasts.
				 * @protected
				 * @virtual
				 * @param {Function} callback Callback function.
				 * @param {Terrasoft.BaseModel} scope Context of callback function.
				 * @return {Terrasoft.Collection} Collection of forecasts.
				 */
				requireForecasts: function(callback, scope) {
					const esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this._getForecastSchemaName()
					});
					esq.addColumn("Id");
					const nameColumn = esq.addColumn("Name");
					nameColumn.orderPosition = 1;
					nameColumn.orderDirection = this.Terrasoft.OrderDirection.ASC;
					esq.addColumn("ForecastEntity.Id", "ForecastEntityId");
					esq.addColumn("ForecastEntity.Name", "ForecastEntityName");
					esq.addColumn("Setting");
					esq.addColumn("ForecastEntityInCellUId");
					esq.getEntityCollection(function(response) {
						if (response && response.success) {
							let collection = response.collection;
							if (!this.$ForecastUIV2FeatureEnabled) {
								collection = collection.filterByFn(function(item) {
									return item.get("Setting") === '';
								}, this);
							}
							Ext.callback(callback, scope || this, [collection]);
						}
					}, this);
				},
				
				/**
				 * Initializes tabs from forecasts collection.
				 * @protected
				 * @virtual
				 */
				initTabs: function() {
					var defaultTabName = this.getDefaultTabName();
					if (!defaultTabName) {
						this.set("ActiveTabName", defaultTabName);
						this.loadRecordRights();
						var forecastModuleId = this.getForecastModuleId();
						this.sandbox.unloadModule(forecastModuleId);
						this.setIsTabsEmpty();
						return;
					}
					var forecasts = this.get("Forecasts");
					var activeTabName = this.get("ActiveTabName");
					var tabName = activeTabName && forecasts.find(activeTabName)
						? activeTabName
						: defaultTabName;
					this.setActiveTab(tabName);
					this.loadRecordRights();
					this.setIsTabsEmpty();
				},
				
				/**
				 * Returns default tab name..
				 * @protected
				 * @virtual
				 * @return {String} Default tab name.
				 */
				getDefaultTabName: function() {
					var tabsCollection = this.get("TabsCollection");
					if (tabsCollection.isEmpty()) {
						return "";
					}
					var defaultTab = tabsCollection.getByIndex(0);
					return defaultTab.get("Name");
				},
				
				/**
				 * Sets active tab by name.
				 * @protected
				 * @virtual
				 * @param {String} tabName Tab name.
				 */
				setActiveTab: function(tabName) {
					this.set("ActiveTabName", tabName);
				},
				
				/**
				 * Handles active tab change event.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.BaseViewModel} activeTab Active tab view model.
				 */
				onActiveTabChange: function(activeTab) {
					var currentForecastName = activeTab.get("Name");
					this.set("ActiveTabName", currentForecastName);
					this.saveActiveTabNameToProfile(currentForecastName);
					this.loadRecordRights();
					this.loadForecastModule();
				},
				
				/**
				 * Gets active tab name from profile.
				 * @private
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback scope.
				 */
				getActiveTabNameFromProfile: function(callback, scope) {
					var key = this.getProfileKey();
					Terrasoft.require(["profile!" + key], function(profile) {
						this.set("ActiveTabName", profile.activeTabName);
						if (callback) {
							callback.call(scope);
						}
					}, this);
				},
				
				/**
				 * Saves active tab name to profile.
				 * @private
				 * @param {String} activeTabName Tab name.
				 */
				saveActiveTabNameToProfile: function(activeTabName) {
					var key = this.getProfileKey();
					Terrasoft.utils.saveUserProfile(key, {
						activeTabName: activeTabName
					}, false);
				},
				
				/**
				 * Returns profile key.
				 * @protected
				 * @virtual
				 * @return {String} key Profile key.
				 */
				getProfileKey: function() {
					return "Forecasts_ModuleForecast";
				},
				
				/**
				 * Loads records rights for forecast.
				 */
				loadRecordRights: function() {
					var currentForecastName = this.get("ActiveTabName");
					this.set("CurrentRecordRightLevel", 0);
					if (currentForecastName) {
						RightUtilities.getSchemaRecordRightLevel(
							this._getForecastSchemaName(),
							currentForecastName,
							function(rightLevel) {
								this.set("CurrentRecordRightLevel", rightLevel);
							}, this);
					}
				},
				
				/**
				 * Deletes tab by name.
				 * @param {String} tabName Tab name.
				 */
				removeTab: function(tabName) {
					var tabsCollection = this.get("TabsCollection");
					tabsCollection.removeByKey(tabName);
				},
				
				/**
				 * Initializes context help.
				 * @protected
				 * @virtual
				 */
				initContextHelp: function() {
					var contextHelpId = 1022;
					var contextHelpConfig = {
						scope: this,
						contextHelpId: contextHelpId,
						contextHelpCode: this.name,
						callback: function(value) {
							this.set("LinkAcademy", value);
						}
					};
					this.sandbox.publish("InitContextHelp", contextHelpConfig);
					AcademyUtilities.getUrl(contextHelpConfig);
				},
				
				/**
				 * Loads forecast module to ForecastModuleContainer.
				 * @protected
				 * @virtual
				 */
				loadForecastModule: function() {
					if (this.get("IsTabsEmpty")) {
						return;
					}
					const forecastModuleId = this.getForecastModuleId();
					const forecastId = this.get("ActiveTabName");
					if (forecastId) {
						this.sandbox.loadModule("ForecastModule", {
							renderTo: "ForecastModuleContainer",
							id: forecastModuleId,
							forecastId: forecastId
						});
					}
				},
				
				/**
				 * Gets forecast module id.
				 * @protected
				 * @virtual
				 * @return {String} Forecast module id.
				 */
				getForecastModuleId: function() {
					return this.sandbox.id + "ForecastModule";
				},
				
				/**
				 * Inits forecasts tab collection from Forecasts collection.
				 * @protected
				 * @virtual
				 */
				initData: function() {
					const forecasts = this.get("Forecasts");
					const tabsValues = [];
					forecasts.each(function(forecast) {
						tabsValues.push({
							Caption: forecast.get("Name"),
							Name: forecast.get("Id")
						});
					}, this);
					const tabsCollection = this.Ext.create("Terrasoft.BaseViewModelCollection", {
						entitySchema: this.Ext.create("Terrasoft.BaseEntitySchema", {
							columns: {},
							primaryColumnName: "Name"
						})
					});
					tabsCollection.loadFromColumnValues(tabsValues);
					const prevTabsCollection = this.get("TabsCollection");
					if (prevTabsCollection) {
						prevTabsCollection.reloadAll(tabsCollection);
					} else {
						this.set("TabsCollection", tabsCollection);
					}
					this.setIsTabsEmpty();
					
				},
				
				/**
				 * Updates IsTabsEmpty flag according to TabsCollection values.
				 * @protected
				 * @virtual
				 */
				setIsTabsEmpty: function() {
					var isEmpty = this.isCollectionEmptyConverter(this.get("TabsCollection"));
					this.set("IsTabsEmpty", isEmpty);
				},
				
				/**
				 * Subscribes for forecasts page messages.
				 * @protected
				 * @virtual
				 */
				subscribeForecastMessage: function() {
					const forecastModuleId = this.getForecastModuleId();
					const addForecastModuleId = this.getAddForecastModuleId();
					const copyForecastModuleId = this.getCopyForecastModuleId();
					const editForecastModuleId = this.getEditForecastModuleId();
					const miniPageForecastModuleId = this.getForecastMiniPageModuleId();
					this.sandbox.subscribe("GetForecastInfo", this.onGetForecastInfo, this, [forecastModuleId]);
					this.sandbox.subscribe("SetForecastResult", this.onSetForecastResult, this,
						[forecastModuleId, addForecastModuleId, copyForecastModuleId, editForecastModuleId,
							miniPageForecastModuleId]);
				},
				
				/**
				 * Handles forecasts page saving event.
				 * @protected
				 * @virtual
				 * @param {Object} result Forecasts page result object.
				 */
				onSetForecastResult: function(result) {
					const forecastId = result.forecastId;
					if (!forecastId) {
						return;
					}
					const forecasts = this.get("Forecasts");
					let forecast = forecasts.find(forecastId);
					if (forecast) {
						forecast.set("Name", result.forecastName);
					} else {
						forecast = forecasts.createItem({
							"Id": result.forecastId,
							"Name": result.forecastName,
							"ForecastEntityId": result.forecastEntityId,
							"ForecastEntityName": result.forecastEntityName,
							"ForecastEntityInCellUId": result.forecastForecastEntityInCellUId,
							"Setting": result.forecastSetting
						});
						forecasts.add(result.forecastId, forecast);
					}
					this.set("Forecasts", forecasts);
					if (!this.$ForecastUIV2FeatureEnabled) {
						this.unloadNestedModules();
						this.set("ReloadNestedModules", true);
						this.saveActiveTabNameToProfile(forecastId);
					}
					this.initData();
					this.setActiveTab(forecastId);
					this.loadRecordRights();
				},
				
				/**
				 * Unloads forecast module.
				 * @protected
				 * @virtual
				 */
				unloadNestedModules: function() {
					var moduleId = this.getForecastModuleId();
					this.sandbox.unloadModule(moduleId);
				},
				
				/**
				 * Handles get forecast add info event.
				 * @protected
				 * @virtual
				 * @return {Object} Add forecast info config.
				 */
				onGetForecastAddInfo: function() {
					return {
						"createNew": true
					};
				},
				
				/**
				 * Handles get forecast copy info event.
				 * @protected
				 * @virtual
				 * @return {Object} Copy forecast info config.
				 */
				onGetForecastCopyInfo: function() {
					return this.Ext.apply(this.onGetForecastInfo(), {
						"copyItem": true
					});
				},
				
				/**
				 * Handles get forecast page info config.
				 * @protected
				 * @virtual
				 * @return {Object} Forecast page info config.
				 */
				onGetForecastInfo: function() {
					return this._getForecastInfo(this.$ActiveTabName);
				},
				
				/**
				 * Returns forecast add module identifier.
				 * @protected
				 * @virtual
				 * @return {String} Forecast add module identifier.
				 */
				getAddForecastModuleId: function() {
					return this.sandbox.id + "_Forecast_Add";
				},
				
				/**
				 * Returns forecast copy module identifier.
				 * @protected
				 * @virtual
				 * @return {String} Forecast copy module identifier.
				 */
				getCopyForecastModuleId: function() {
					return this.sandbox.id + "_Forecast_Copy";
				},
				
				/**
				 * Returns forecast edit module identifier.
				 * @protected
				 * @virtual
				 * @return {String} Forecast edit module identifier.
				 */
				getEditForecastModuleId: function() {
					return this.sandbox.id + "_Forecast_Edit";
				},
				
				/**
				 * Returns forecast mini page module identifier.
				 * @protected
				 * @virtual
				 * @return {String} Forecast mini page module identifier.
				 */
				getForecastMiniPageModuleId: function() {
					return this.sandbox.id + "_Forecast_MiniPage";
				},
				
				/**
				 * Returns default forecast page model value pairs.
				 * @protected
				 * @virtual
				 * @return {Array} Default value pairs.
				 */
				getForecastPageValuePairs: function() {
					return [
						{
							name: "EntitySchemaUId",
							value: "ae46fb87-c02c-4ae8-ad31-a923cdd994cf"
						},
						{
							name: "EntitySchemaName",
							value: "Opportunity"
						}
					];
				},
				
				/**
				 * Opens forecast edit page.
				 * @protected
				 * @virtual
				 * @param {string} moduleId Forecast module identifier.
				 * @param {string} operation Operation mode.
				 */
				openForecastPage: function(moduleId, operation) {
					const historyState = this.sandbox.publish("GetHistoryState");
					const forecastId = this.get("ActiveTabName");
					const valuePairs = this.getForecastPageValuePairs();
					if (operation === ConfigurationEnums.CardStateV2.COPY) {
						const forecastNameCopy = this.get("Forecasts").find(forecastId).get("Name") +
							" - " + this.get("Resources.Strings.CopySuffix");
						valuePairs.push({
							name: "Name",
							value: forecastNameCopy
						});
					}
					if (this.$ForecastUIV2FeatureEnabled) {
						this.openForecastMiniPage(operation, valuePairs);
						return;
					}
					this.showBodyMask();
					const config = {
						hash: historyState.hash.historyState,
						silent: true,
						stateObj: {
							isSeparateMode: true,
							schemaName: "ForecastPage",
							entitySchemaName: this._getForecastSchemaName(),
							operation: operation,
							primaryColumnValue: forecastId,
							valuePairs: valuePairs,
							isSilent: true
						}
					};
					this.sandbox.publish("PushHistoryState", config);
					this.sandbox.loadModule("CardModuleV2", {
						renderTo: this.renderTo,
						id: moduleId || this.getForecastModuleId(),
						keepAlive: true
					});
				},
				
				/**
				 * @private
				 */
				_getForecastInfo: function(forecastId) {
					if (!this.$Forecasts || this.$Forecasts.isEmpty()) {
						return {};
					}
					const forecastInfo = this.$Forecasts.get(forecastId);
					return {
						"forecastId": forecastId,
						"forecastEntityId": forecastInfo.$ForecastEntityId,
						"forecastEntityName": forecastInfo.$ForecastEntityName,
						"forecastForecastEntityInCellUId": forecastInfo.$ForecastEntityInCellUId,
						"forecastSetting": forecastInfo.$Setting
					};
				},
				
				/**
				 * Checks can current user edit active forecast.
				 * @protected
				 * @virtual
				 * @return {Boolean} Can current user edit active forecast flag.
				 */
				canEdit: function() {
					const rightLevel = this.get("CurrentRecordRightLevel");
					return Boolean(this.isSchemaRecordCanEditRightConverter(rightLevel) &&
						this.get("ActiveTabName"));
				},
				
				/**
				 * Checks can current user copy active forecast.
				 * @protected
				 * @virtual
				 * @return {Boolean} Can current user copy active forecast flag.
				 */
				canCopy: function() {
					const rightLevel = this.get("ForecastRightLevel");
					return Boolean(this.canAppendSchemaData(rightLevel) && this.get("ActiveTabName"));
				},
				
				/**
				 * Checks can current user delete active forecast.
				 * @protected
				 * @virtual
				 * @return {Boolean} Can current user delete active forecast flag.
				 */
				canDelete: function() {
					const rightLevel = this.get("CurrentRecordRightLevel");
					return Boolean(this.isSchemaRecordCanDeleteRightConverter(rightLevel) &&
						this.get("ActiveTabName"));
				},
				
				/**
				 * Returns if collection is empty flag.
				 * @protected
				 * @virtual
				 * @param {Terrasoft.Collection} value Collection.
				 * @return {Boolean} Collection is empty flag.
				 */
				isCollectionEmptyConverter: function(value) {
					return !value || value.isEmpty();
				},
				
				/**
				 * Checks user rights for operation.
				 * @protected
				 * @virtual
				 * @param {String} operation Operation name.
				 * @return {Boolean} Can user execute operation flag.
				 */
				checkRecordOperationRights: function(operation) {
					var rights = this.get("CurrentRecordRightLevel");
					let result;
					switch (operation) {
						case this.Terrasoft.RightsEnums.operationTypes.read:
							result = this.isSchemaRecordCanReadRightConverter(rights);
							break;
						case this.Terrasoft.RightsEnums.operationTypes.edit:
							result = this.isSchemaRecordCanEditRightConverter(rights);
							break;
						case this.Terrasoft.RightsEnums.operationTypes.delete:
							result = this.isSchemaRecordCanDeleteRightConverter(rights);
							break;
						default:
							result = false;
							break;
					}
					if (!result) {
						Terrasoft.utils.showInformation(this.get("Resources.Strings.NotEnoughRightsMessage"));
					}
					return result;
				},
				
				/**
				 * Check can current user administrate forecast items.
				 * @protected
				 * @virtual
				 * @return {Boolean} Can administrate forecast right flag.
				 */
				canManageRights: function() {
					var currentRecordRightLevel = this.get("CurrentRecordRightLevel");
					return this.isSchemaRecordCanChangeReadRightConverter(currentRecordRightLevel) ||
						this.isSchemaRecordCanChangeEditRightConverter(currentRecordRightLevel) ||
						this.isSchemaRecordCanChangeDeleteRightConverter(currentRecordRightLevel);
				},
				
				/**
				 * Checks current user rights for forecast delete operation.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Callback context.
				 * @protected
				 */
				canDeleteForecastItems: function(callback, scope) {
					var forecastId = this.get("ActiveTabName");
					var dataSend = {
						forecastId: forecastId
					};
					var config = {
						serviceName: "ForecastService",
						methodName: "GetCanDeleteForecastItems",
						data: dataSend,
						callback: callback,
						scope: scope
					};
					ServiceHelper.callService(config);
				},
				
				/**
				 * Opens forecast page with edit mode.
				 * @protected
				 * @virtual
				 */
				editCurrentForecast: function() {
					if (!this.checkRecordOperationRights(Terrasoft.RightsEnums.operationTypes.edit)) {
						return;
					}
					this.openForecastPage(this.getEditForecastModuleId(), ConfigurationEnums.CardStateV2.EDIT);
				},
				
				/**
				 * Opens forecast page with copy mode.
				 * @protected
				 * @virtual
				 */
				copyCurrentForecast: function() {
					this.openForecastPage(this.getCopyForecastModuleId(), ConfigurationEnums.CardStateV2.COPY);
				},
				
				/**
				 * Opens forecast page with add mode.
				 * @protected
				 * @virtual
				 */
				addForecast: function() {
					this.openForecastPage(this.getAddForecastModuleId(), ConfigurationEnums.CardStateV2.ADD);
				},
				
				/**
				 * Opens forecast mini page.
				 * @protected
				 * @param {String} operation Mini page operation.
				 * @param {Array} valuePairs Default values for view model.
				 */
				openForecastMiniPage: function(operation, valuePairs) {
					const miniPageConfig = {
						entitySchemaName: this._getForecastSchemaName(),
						miniPageSchemaName: "ForecastMiniPage",
						operation: operation,
						valuePairs: valuePairs,
						showDelay: 0,
						moduleId: this.getForecastMiniPageModuleId()
					};
					if (operation === ConfigurationEnums.CardStateV2.EDIT ||
						operation === ConfigurationEnums.CardStateV2.COPY) {
						this.Ext.apply(miniPageConfig, {
							recordId: this.$ActiveTabName,
							rowId: this.$ActiveTabName
						});
					}
					this.openMiniPage(miniPageConfig);
				},
				
				/**
				 * Deletes selected forecast.
				 * @protected
				 * @virtual
				 */
				deleteCurrentForecast: function() {
					if (!this.checkRecordOperationRights(Terrasoft.RightsEnums.operationTypes.delete)) {
						return;
					}
					this.canDeleteForecastItems(function(result) {
						const resultMessage = result.GetCanDeleteForecastItemsResult;
						if (resultMessage) {
							this.Terrasoft.utils.showConfirmation(resources.localizableStrings[resultMessage],
								this.Terrasoft.emptyFn,
								[Terrasoft.MessageBoxButtons.OK.returnCode],
								this,
								{
									style: this.Terrasoft.MessageBoxStyles.BLUE
								}
							);
						} else {
							this.Terrasoft.utils.showConfirmation(this.get("Resources.Strings.DeleteConfirmationMessage"),
								function(returnCode) {
									if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
										this.onDeleteAccept();
									}
								},
								[this.Terrasoft.MessageBoxButtons.NO.returnCode,
									this.Terrasoft.MessageBoxButtons.YES.returnCode],
								this
							);
						}
					}, this);
				},
				
				/**
				 * Handles delete current forecast event.
				 * @protected
				 * @virtual
				 */
				onDeleteAccept: function() {
					const forecastId = this.get("ActiveTabName");
					const batchQuery = this.Ext.create("Terrasoft.BatchQuery");
					const deleteForecastQuery = this.Ext.create("Terrasoft.DeleteQuery", {
						rootSchemaName: this._getForecastSchemaName()
					});
					deleteForecastQuery.enablePrimaryColumnFilter(forecastId);
					batchQuery.add(deleteForecastQuery);
					batchQuery.execute(function(response) {
						if (response.success) {
							this.removeTab(forecastId);
							this.set("ActiveTabName", null);
							const forecasts = this.get("Forecasts");
							const item = forecasts.find(forecastId);
							if (item) {
								forecasts.remove(item);
							}
							this.initTabs();
						}
					}, this);
				},
				
				/**
				 * Opens forecast rights settings page.
				 * @protected
				 * @virtual
				 */
				manageCurrentForecastRights: function() {
					this.openRightsModule();
				},
				
				/**
				 * Returns rights module identifier.
				 * @protected
				 * @virtual
				 * @return {String} Rights module identifier.
				 */
				getRightsModuleId: function() {
					return this.sandbox.id + "_Rights";
				},
				
				/**
				 * Loads rights module.
				 * @protected
				 * @virtual
				 */
				openRightsModule: function() {
					this.showBodyMask();
					this.sandbox.loadModule("Rights", {
						renderTo: "centerPanel",
						id: this.getRightsModuleId(),
						keepAlive: true
					});
				},
				
				/**
				 * Subscribes for sandbox messages.
				 * @protected
				 * @virtual
				 */
				subscribeSandboxMessages: function() {
					this.subscribeForecastMessage();
					var rightsModuleId = this.getRightsModuleId();
					this.sandbox.subscribe("GetRecordInfo", function() {
						var forecasts = this.get("Forecasts");
						var forecastId = this.get("ActiveTabName");
						var forecastName = forecasts.get(forecastId).get("Name");
						return {
							entitySchemaName: this._getForecastSchemaName(),
							entitySchemaCaption: this.get("Resources.Strings.Caption"),
							primaryColumnValue: forecastId,
							primaryDisplayColumnValue: forecastName
						};
					}, this, [rightsModuleId]);
					this.sandbox.subscribe("ChangeDataView", this.changeDataView, this,
						["ViewModule_MainHeaderModule_" + this.name]);
					this.sandbox.subscribe("GetActiveViewName", function() {
						return this.getActiveViewName();
					}, this);
				},
				
				/**
				 * @inheritdoc Terrasoft.BaseSchemaViewModel#init
				 * @override
				 */
				init: function(callback, scope) {
					this.$ForecastUIV2FeatureEnabled = this.Terrasoft.Features.getIsEnabled("ForecastUIV2");
					this.$IsBlankSlateVisible = this.Ext.isIEOrEdge && this.$ForecastUIV2FeatureEnabled;
					const afterParentInitFn = this._afterParentInit.bind(this, callback, scope);
					this.callParent([afterParentInitFn, this]);
				},
				
				/**
				 * @private
				 */
				_afterParentInit: function(callback, scope) {
					this.Terrasoft.chain(
						this.initActiveViewSettingsProfile,
						this.requireForecasts,
						function(next, tabsCollection) {
							this.set("Forecasts", tabsCollection);
							this.initDataViews();
							this.Ext.callback(next, this);
						},
						this.getActiveTabNameFromProfile,
						function() {
							this.initData();
							this.subscribeSandboxMessages();
							this.initContextHelp();
							this.initTabs();
							RightUtilities.getSchemaOperationRightLevel(this._getForecastSchemaName(),
								function(rightLevel) {
									this.set("ForecastRightLevel", rightLevel);
									this.Ext.callback(callback, scope);
								}, this);
						},
						this
					);
				},
				
				/**
				 * Initializes profile for current active view.
				 * @param {Function} callback Callback function.
				 * @param {Object} scope Context.
				 */
				initActiveViewSettingsProfile: function(callback, scope) {
					var profileKey = this.getActiveViewSettingsProfileKey();
					this.Terrasoft.require(["profile!" + profileKey], function(profile) {
						this.set("ActiveViewSettingsProfile", profile);
						callback.call(scope);
					}, this);
				},
				
				/**
				 * @inheritdoc BaseSchemaViewModel#onRender
				 * @override
				 */
				onRender: function() {
					this.hideBodyMask();
					if (this.get("Restored")) {
						this.initMainHeaderCaption();
					}
				},
				
				/**
				 * @private
				 */
				_getForecastSchemaName: function() {
					return "ForecastSheet";
				},
				
				/**
				 * Returns forecast section data views config.
				 * @return {Object} Data views config.
				 */
				getDefaultDataViews: function() {
					var gridDataView = {
						name: this.get("TabsDataViewName"),
						active: true,
						caption: this.get("Resources.Strings.Caption"),
						hint: this.get("Resources.Strings.TabsDataViewHint"),
						icon: this.get("Resources.Images.TabsDataViewIcon"),
						index: 0
					};
					var analyticsDataView = {
						name: this.get("AnalyticsDataViewName"),
						caption: this.get("Resources.Strings.Caption"),
						hint: this.get("Resources.Strings.DashboardsDataViewHint"),
						icon: this.get("Resources.Images.AnalyticsDataViewIcon"),
						index: 1
					};
					return {
						"TabsDataView": gridDataView,
						"AnalyticsDataView": analyticsDataView
					};
				},
				
				/**
				 * Returns active view name from DataViews collection.
				 * @protected
				 * @return {String} Active view name.
				 */
				getActiveViewName: function() {
					var activeViewName = this.get("TabsDataViewName");
					var dataViews = this.get("DataViews");
					if (dataViews) {
						dataViews.each(function(dataView) {
							if (dataView.active) {
								activeViewName = dataView.name;
							}
						}, this);
					}
					return activeViewName;
				},
				
				/**
				 * Initializes section data views.
				 * @protected
				 */
				initDataViews: function() {
					const defaultDataViews = this.getDefaultDataViews();
					const dataViews = this.Ext.create("Terrasoft.Collection");
					const savedActiveViewName = this.getActiveViewNameFromProfile();
					this.Terrasoft.each(defaultDataViews, function(dataView, dataViewName) {
						dataViews.add(dataViewName, dataView, dataView.index);
						if (savedActiveViewName !== "") {
							dataView.active = (dataViewName === savedActiveViewName);
						}
					}, this);
					this.set("DataViews", dataViews);
					this.sandbox.publish("InitDataViews", {
						caption: this.get("Resources.Strings.Caption"),
						dataViews: dataViews,
						moduleName: this.name,
						async: true
					});
					this.setActiveView(this.getActiveViewName());
				},
				
				/**
				 * Get active view caption.
				 * @private
				 * @return {String} Active view caption.
				 */
				getActiveViewCaption: function() {
					var dataViews = this.get("DataViews");
					var activeViewName = this.getActiveViewName();
					var activeView = dataViews.get(activeViewName);
					return activeView.caption;
				},
				
				/**
				 * Sets section header caption.
				 * @protected
				 */
				initMainHeaderCaption: function() {
					var caption = this.getActiveViewCaption();
					var dataViews = this.get("DataViews");
					var activeViewName = this.getActiveViewName();
					var activeView = dataViews.get(activeViewName);
					var markerValue = activeView.caption;
					this.sandbox.publish("ChangeHeaderCaption", {
						caption: caption,
						markerValue: markerValue,
						dataViews: this.get("DataViews"),
						moduleName: this.name
					});
				},
				
				/**
				 * Loads dashboard module.
				 * @private
				 */
				loadDashboardModule: function() {
					var moduleId = this.sandbox.id + "SectionDashboard";
					this.sandbox.loadModule("SectionDashboardsModule", {
						renderTo: "DashboardModule",
						id: moduleId,
						parameters: {
							viewModelConfig: {
								DashboardDataViewName: this.get("AnalyticsDataViewName")
							}
						}
					});
				},
				
				/**
				 * Handles change data view event.
				 * Sets current data view header caption.
				 * @protected
				 * @param {Object} viewConfig View config.
				 * @param {Object} viewConfig.tag Current view tag.
				 */
				changeDataView: function(viewConfig) {
					var viewName = viewConfig.tag;
					if (this.get("ActiveViewName") === viewName) {
						return;
					}
					this.setActiveView(viewName);
					this.initMainHeaderCaption();
				},
				
				/**
				 * Sets section active view.
				 * @param {String} activeViewName Active view name.
				 */
				setActiveView: function(activeViewName) {
					this.showBodyMask();
					var dataViews = this.get("DataViews");
					dataViews.each(function(dataView) {
						var isViewActive = (dataView.name === activeViewName);
						this.setViewVisible(dataView, isViewActive);
					}, this);
					this.saveActiveView(activeViewName);
					this.hideBodyMask();
				},
				
				/**
				 * Returns data view visible property name.
				 * @protected
				 */
				getDataViewVisiblePropertyName: function(dataViewName) {
					return this.Ext.String.format("Is{0}Visible", dataViewName);
				},
				
				/**
				 * Changes data view visibility.
				 * @protected
				 * @param {Object} dataView Section data view.
				 * @param {Boolean} value View visibility.
				 */
				setViewVisible: function(dataView, value) {
					var dataViewVisiblePropertyName = this.getDataViewVisiblePropertyName(dataView.name);
					this.set(dataViewVisiblePropertyName, value);
					dataView.active = value;
				},
				
				/**
				 * Returns active view profile key.
				 * @protected
				 * @return {String} Profile key.
				 */
				getActiveViewSettingsProfileKey: function() {
					var schemaName = this.name;
					return schemaName + "ActiveViewSettingsProfile";
				},
				
				/**
				 * Returns active view name from profile.
				 * @protected
				 * @return {String} Active view name.
				 */
				getActiveViewNameFromProfile: function() {
					var profile = this.get("ActiveViewSettingsProfile");
					if (profile && profile.hasOwnProperty("activeViewName")) {
						return profile.activeViewName;
					}
					return "";
				},
				
				/**
				 * Saves active view name in profile.
				 * @protected
				 * @param {String} activeViewName Active view name.
				 */
				saveActiveViewNameToProfile: function(activeViewName) {
					var profileKey = this.getActiveViewSettingsProfileKey();
					var profile = this.get("ActiveViewSettingsProfile") || {};
					if (profile.activeViewName && profile.activeViewName === activeViewName) {
						return;
					}
					profile.activeViewName = activeViewName;
					this.set("ActiveViewSettingsProfile", profile);
					this.Terrasoft.utils.saveUserProfile(profileKey, profile, false);
				},
				
				/**
				 * Saves active view value.
				 * @protected
				 * @param {String} dataViewName Section data view name.
				 */
				saveActiveView: function(dataViewName) {
					this.set("ActiveViewName", dataViewName);
					this.saveActiveViewNameToProfile(dataViewName);
				},

				/**
				 * Returns blank slate icon url.
				 * @protected
				 * @virtual
				 * @return {String} Blank slate icon url.
				 */
				getBlankSlateIcon: function() {
					return this.Terrasoft.ImageUrlBuilder.getUrl(this.get("Resources.Images.BlankSlateIcon"));
				}
			},
			diff: [
				{
					"operation": "insert",
					"name": "SectionWrapContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["section-wrap", "forecast-section-wrap"],
						"visible": {
							"bindTo": "IsBlankSlateVisible",
							"bindConfig": {
								"converter": "invertBooleanValue"
							}
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "BlankSlateContainer",
					"values": {
						"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
						"classes": {
							"wrapClassName": ["blank-slate-wrap"]
						},
						"visible": {"bindTo": "IsBlankSlateVisible"},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "BlankSlateIcon",
					"parentName": "BlankSlateContainer",
					"propertyName": "items",
					"values": {
						"getSrcMethod": "getBlankSlateIcon",
						"readonly": true,
						"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
						"classes": {
							"wrapClass": ["blank-slate-icon"]
						},
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24,
							"rowSpan": 5
						}
					}
				},
				{
					"operation": "insert",
					"name": "BlankSlateDescription",
					"parentName": "BlankSlateContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": {
							"bindTo": "Resources.Strings.BlankSlateDescription"
						},
						"labelClass": ["blank-slate-description"],
						"layout": {
							"column": 0,
							"row": 6,
							"colSpan": 24,
							"rowSpan": 5
						}
					}
				},
				{
					"operation": "insert",
					"name": "DataViewsContainer",
					"parentName": "SectionWrapContainer",
					"propertyName": "items",
					"values": {
						"id": "DataViewsContainer",
						"selectors": {"wrapEl": "#DataViewsContainer"},
						"itemType": Terrasoft.ViewItemType.SECTION_VIEWS,
						"wrapClass": ["data-views-container-wrapClass", "data-view-border-right",
							"right-inner-el"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "TabsDataView",
					"parentName": "DataViewsContainer",
					"propertyName": "items",
					"values": {
						"id": "TabsDataView",
						"itemType": Terrasoft.ViewItemType.SECTION_VIEW,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "AnalyticsDataView",
					"parentName": "DataViewsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.SECTION_VIEW,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "AnalyticsGridLayoutContainer",
					"parentName": "AnalyticsDataView",
					"propertyName": "items",
					"values": {
						"id": "AnalyticsGridLayoutContainer",
						"selectors": {"wrapEl": "#AnalyticsGridLayoutContainer"},
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["analytics-gridLayout-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"parentName": "AnalyticsGridLayoutContainer",
					"propertyName": "items",
					"name": "DashboardModule",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE,
						"moduleName": "DashboardsModule",
						"afterrender": {"bindTo": "loadDashboardModule"},
						"afterrerender": {"bindTo": "loadDashboardModule"}
					}
				},
				{
					"operation": "insert",
					"name": "TabsContainer",
					"parentName": "TabsDataView",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["grid-dataview-container-wrapClass", "grid-dataview-container-mask"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "Tabs",
					"parentName": "TabsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.TAB_PANEL,
						"activeTabChange": {"bindTo": "onActiveTabChange"},
						"activeTabName": {"bindTo": "ActiveTabName"},
						"classes": {"wrapClass": ["tab-panel-margin-bottom"]},
						"collection": {"bindTo": "TabsCollection"},
						"markerValue": "mainForecastPage",
						"defaultMarkerValueColumnName": "Caption",
						"tabs": [],
						"controlConfig": {
							"items": [
								{
									"className": "Terrasoft.Container",
									"classes": {"wrapClassName": ["tab-action-buttons"]},
									"visible": {
										"bindTo": "ForecastUIV2FeatureEnabled"
									},
									"items": [
										{
											"className": "Terrasoft.Button",
											"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
											"imageConfig": {"bindTo": "Resources.Images.AddTabIcon"},
											"markerValue": "AddForecastButton",
											"click": {"bindTo": "addForecast"},
											"enabled": {
												"bindTo": "ForecastRightLevel",
												"bindConfig": {"converter": "isSchemaCanAppendRightConverter"}
											}
										},
										{
											"className": "Terrasoft.Button",
											"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
											"imageConfig": {"bindTo": "Resources.Images.EditTabIcon"},
											"markerValue": "EditForecastButton",
											"click": {"bindTo": "editCurrentForecast"},
											"enabled": {"bindTo": "canEdit"},
											"visible": false
										},
										{
											"className": "Terrasoft.Button",
											"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
											"imageConfig": {"bindTo": "Resources.Images.DeleteTabIcon"},
											"markerValue": "DeleteForecastButton",
											"click": {"bindTo": "deleteCurrentForecast"},
											"enabled": {"bindTo": "canDelete"}
										}
									]
								},
								{
									"className": "Terrasoft.Button",
									"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
									"imageConfig": {"bindTo": "Resources.Images.Settings"},
									"hint": {"bindTo": "Resources.Strings.ConfigurationButtonHint"},
									"markerValue": "SettingsButton",
									"menu": {
										items: [
											{
												"caption": {"bindTo": "Resources.Strings.AddButtonCaption"},
												"click": {"bindTo": "addForecast"},
												"markerValue": {"bindTo": "Resources.Strings.AddButtonCaption"},
												"enabled": {
													"bindTo": "ForecastRightLevel",
													"bindConfig": {"converter": "isSchemaCanAppendRightConverter"}
												},
												"visible": {
													"bindTo": "ForecastUIV2FeatureEnabled",
													"bindConfig": {
														"converter": "invertBooleanValue"
													}
												}
											}, {
												"caption": {"bindTo": "Resources.Strings.EditButtonCaption"},
												"click": {"bindTo": "editCurrentForecast"},
												"markerValue": {"bindTo": "Resources.Strings.EditButtonCaption"},
												"enabled": {"bindTo": "canEdit"},
												"visible": {
													"bindTo": "ForecastUIV2FeatureEnabled",
													"bindConfig": {
														"converter": "invertBooleanValue"
													}
												}
											}, {
												"caption": {"bindTo": "Resources.Strings.CopyButtonCaption"},
												"click": {"bindTo": "copyCurrentForecast"},
												"markerValue": {"bindTo": "Resources.Strings.CopyButtonCaption"},
												"enabled": {"bindTo": "canCopy"},
												"visible": {
													"bindTo": "ForecastUIV2FeatureEnabled",
													"bindConfig": {
														"converter": "invertBooleanValue"
													}
												}
											}, {
												"caption": {"bindTo": "Resources.Strings.DeleteButtonCaption"},
												"click": {"bindTo": "deleteCurrentForecast"},
												"markerValue": {"bindTo": "Resources.Strings.DeleteButtonCaption"},
												"enabled": {"bindTo": "canDelete"},
												"visible": {
													"bindTo": "ForecastUIV2FeatureEnabled",
													"bindConfig": {
														"converter": "invertBooleanValue"
													}
												}
											}, {
												"caption": "",
												"className": "Terrasoft.MenuSeparator"
											}, {
												"caption": {"bindTo": "Resources.Strings.RightsButtonCaption"},
												"click": {"bindTo": "manageCurrentForecastRights"},
												"markerValue": {"bindTo": "Resources.Strings.RightsButtonCaption"},
												"enabled": {"bindTo": "canManageRights"}
											}
										]
									}
								}
							]
						}
					}
				},
				{
					"operation": "insert",
					"name": "ForecastModuleContainer",
					"parentName": "TabsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"items": [],
						"id": "ForecastModuleContainer",
						"visible": {
							"bindTo": "IsTabsEmpty",
							"bindConfig": {
								"converter": "invertBooleanValue"
							}
						}
					}
				},
				{
					"operation": "insert",
					"parentName": "ForecastModuleContainer",
					"propertyName": "items",
					"name": "ForecastModule",
					"values": {
						"itemType": Terrasoft.ViewItemType.MODULE,
						"moduleName": "ForecastModule",
						"afterrender": {"bindTo": "loadForecastModule"},
						"afterrerender": {"bindTo": "loadForecastModule"}
					}
				},
				{
					"operation": "insert",
					"name": "Message",
					"parentName": "TabsContainer",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"wrapClass": ["empty-grid-message"],
						"visible": {
							"bindTo": "IsTabsEmpty"
						},
						"items": [
							{
								"name": "Image",
								"classes": {
									wrapClass: ["image-container"]
								},
								"getSrcMethod": "getSrcMethod",
								"onPhotoChange": "onPhotoChange",
								"defaultImage": Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.EmptyInfoImage),
								"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage"
							},
							{
								"name": "Title",
								"itemType": Terrasoft.ViewItemType.CONTAINER,
								"wrapClass": ["title"],
								"items": [
									{
										"name": "Title",
										"itemType": Terrasoft.ViewItemType.LABEL,
										"caption": {"bindTo": "Resources.Strings.MessageTitle"}
									}
								]
							},
							{
								"name": "Description",
								"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
								"wrapClass": ["description"],
								"items": [
									{
										"name": "Action",
										"itemType": Terrasoft.ViewItemType.CONTAINER,
										"wrapClass": ["action"],
										"items": [
											{
												"name": "Action",
												"itemType": Terrasoft.ViewItemType.LABEL,
												"caption": {"bindTo": "Resources.Strings.MessageAction"}
											}
										]
									},
									{
										"name": "Reference",
										"itemType": Terrasoft.ViewItemType.CONTAINER,
										"wrapClass": ["reference"],
										"items": [
											{
												"name": "Link",
												"itemType": Terrasoft.ViewItemType.HYPERLINK,
												"caption": {"bindTo": "LinkAcademy"},
												"tpl": resources.localizableStrings.MessageReference,
												"href": {"bindTo": "LinkAcademy"}
											}
										]
									}
								]
							}
						]
					}
				}
			]
		};
	});


