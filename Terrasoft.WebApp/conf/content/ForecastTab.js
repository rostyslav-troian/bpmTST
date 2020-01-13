Terrasoft.configuration.Structures["ForecastTab"] = {innerHierarchyStack: ["ForecastTab"]};
define('ForecastTabStructure', ['ForecastTabResources'], function(resources) {return {schemaUId:'ae9df0ba-dfc8-47cb-aed2-eebaa9fe07fd',schemaCaption: "ForecastTab", parentSchemaName: "", schemaName:'ForecastTab',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ForecastTab", ["ForecastItem", "ForecastTabResources", "ForecastConstants", "RightUtilities", "PivotGrid",
	"ConfigurationGrid", "ConfigurationGridGenerator", "ConfigurationGridUtilities", "EntityResponseValidationMixin"],
	function(ForecastItem, resources, ForecastConstants, RightUtilities) {
		return {
			messages: {
				/**
				 * @message GetRecordInfo
				 * ######## ################ ###### ## ##########  ##### ######## # ######## ######### ####.
				 * @param {String} ################ ###### ## ##########  ##### ######## # ######## ######### ####.
				 */
				"GetRecordInfo": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * ########## ######### ### ######### #########.
				 */
				"GetHistoryState": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message PushHistoryState
				 * ######### ######### # ####### #########.
				 */
				"PushHistoryState": {
					mode: this.Terrasoft.MessageMode.BROADCAST,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},

				/**
				 * @message GetForecastConfig
				 * Returns forecast config.
				 */
				"GetForecastConfig": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},

				/**
				 * @message RefreshForecast
				 * Refresh forecast.
				 */
				"RefreshForecast": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				},				
				
				/**
				 * @message RefreshForecastColumns
				 * Refresh forecast columns.
				 */
				"RefreshForecastColumns": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.PUBLISH
				}

			},
			mixins: {
				ConfigurationGridUtilites: "Terrasoft.ConfigurationGridUtilities",
				EntityResponseValidationMixin: "Terrasoft.EntityResponseValidationMixin"
			},
			attributes: {
				/**
				 * ####### ############## #######.
				 * @type {Boolean}
				 */
				IsEditable: {
					dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					value: true
				},

				/**
				 * ############# ####### ####### ############.
				 * @type {GUID}
				 */
				ForecastId: { dataValueType: this.Terrasoft.DataValueType.GUID },

				/**
				 * ############# ##### ######## ###########.
				 * @type {GUID}
				 */
				EntitySchemaUId: { dataValueType: this.Terrasoft.DataValueType.GUID },

				/**
				 * ############# ######## ###########.
				 * @type {GUID}
				 */
				ForecastDimensionId: { dataValueType: this.Terrasoft.DataValueType.GUID },

				/**
				 * ######## ########### ######## ###########.
				 * @type {TEXT}
				 */
				ForecastDimensionSchemaName: { dataValueType: this.Terrasoft.DataValueType.TEXT },

				/**
				 * ######### ##### #######.
				 * @type {Terrasoft.Collection}
				 */
				Collection: { dataValueType: this.Terrasoft.DataValueType.COLLECTION },

				/**
				 * ######## #### ####### ######## ############.
				 * @type {CUSTOM_OBJECT}
				 */
				ForecastPeriodType: { dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT },

				/**
				 * ##### ##### ####### ############.
				 * @type {CUSTOM_OBJECT}
				 */
				ForecastGridRows: { dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT },

				/**
				 * Caption of filter by period.
				 * @type {String}
				 */
				FilterCaption: { dataValueType: this.Terrasoft.DataValueType.STRING },

				/**
				 * Selected periods.
				 * @type {CUSTOM_OBJECT}
				 */
				FilterPeriods: { dataValueType: this.Terrasoft.DataValueType.CUSTOM_OBJECT },

				/**
				 * Is dimension data loaded.
				 * @type {Boolean}
				 */
				"IsDimensionDataLoaded": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": "false"
				},

				/**
				 * Is forecast ui feature enabled.
				 */
				"ForecastUIV2FeatureEnabled": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				},

				/**
				 * Is can show columns list.
				 */
				"CanShowColumnsList": {
					"dataValueType": Terrasoft.DataValueType.BOOLEAN,
					"value": false
				}
			},
			properties: {
				maxPeriodsCount: 24	
			},
			methods: {

				/**
				 * ########## #### #######.
				 * @protected
				 * @override
				 * @return {String} ####.
				 */
				getProfileKey: function() {
					return "ForecastProfile";
				},

				selectPeriod: function() {
					const schemaName = this._getForecastSchemaName();
					const path = Ext.String.format("[{0}:PeriodType:PeriodType].Id", schemaName);
					const forecastId = this.get("ForecastId");
					const filters = this.Terrasoft.createColumnFilterWithParameter(this.Terrasoft.ComparisonType.EQUAL,
						path, forecastId);
					const selectedRows = [];
					const periods = this.get("FilterPeriods");
					this.Terrasoft.each(periods, function(period) {
						selectedRows.push(period.value);
					}, this);
					const config = {
						entitySchemaName: "Period",
						multiSelect: true,
						columnName: "Name",
						hideActions: true,
						selectedRows: selectedRows,
						filters: filters,
						sortedColumns: [{
							name: "StartDate",
							orderPosition: 2,
							orderDirection: this.Terrasoft.core.enums.OrderDirection.ASC
						}]
					};
					this.openLookup(config, this.setFilterPeriod, this);
				},

				setFilterPeriod: function(result) {
					let items = null;
					let caption = "";
					if (result && result.selectedRows) {
						items = [];
						result.selectedRows.each(function(item) {
							items.push(item);
							caption += item.displayValue + ", ";
						}, this);
					}
					caption = caption.slice(0, -2);
					this.set("FilterCaption", caption);
					this.set("FilterPeriods", items);
					this.saveForecastProfile();
					this._publishRefreshForecastColumns();
					this.loadData();
				},

				getFilterVisible: function() {
					return !this.Ext.isEmpty(this.get("FilterPeriods"));
				},

				resetFilter: function() {
					this.set("FilterPeriods", null);
					this.saveForecastProfile();
				},

				saveForecastProfile: function() {
					let profile = this.getProfile();
					const profileKey = this.getProfileKey();
					if (this.Terrasoft.isEmptyObject(profile)) {
						profile = { key: profileKey };
					}
					const filterPeriods = this.get("FilterPeriods");
					const filterCaption = this.get("FilterCaption");
					const filters = {
						filterPeriods: filterPeriods,
						filterCaption: filterCaption
					};
					const forecastId = this.get("ForecastId");
					profile[forecastId] = { filters: filters };
					this.Terrasoft.utils.saveUserProfile(profileKey, profile, false);
					this.set("Profile", profile);
				},

				/**
				 * ##### ######### ###### # ####, ####### ########## ############# ##### ######## ###########
				 * # ########## ### # ####### #####.
				 * @private
				 * @param {Function} callback ####### ######### ######, ####### ########## ##### ####,
				 * ### ######### ######.
				 * @deprecated
				 */
				getSchemaDimension: function(callback) {
					var forecastId = this.get("ForecastId");
					var select = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "Dimension"
					});
					select.addColumn("EntitySchemaUId", "EntitySchemaUId");
					var levelColumn = select.addColumn("[ForecastDimension:Dimension:Id].Level");
					levelColumn.orderPosition = 1;
					levelColumn.orderDirection = this.Terrasoft.OrderDirection.ASC;
					select.addColumn("[ForecastDimension:Dimension:Id].Id", "ForecastDimensionId");
					select.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "[ForecastDimension:Dimension:Id].Forecast", forecastId));
					select.rowCount = 1;
					select.getEntityCollection(function(response) {
						if (response.success) {
							var collection = response.collection;
							if (collection && collection.getCount() > 0) {
								var item = collection.getItems()[0];
								if (item) {
									this.set("EntitySchemaUId", item.get("EntitySchemaUId"));
									this.set("ForecastDimensionId", item.get("ForecastDimensionId"));
								}
								if (callback) {
									callback.call(this);
								}
							}
						}
					}, this);
				},

				/**
				 * ##### ######### ###### # ####, ####### ########## ############ ########### ######## ###########
				 * # ########## ### # ####### #####.
				 * @private
				 * @param {Function} callback ####### ######### ######, ####### ########## ##### ####,
				 * ### ######### ######.
				 * @deprecated
				 */
				getLookupSchema: function(callback) {
					var select = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "SysSchema"
					});
					select.addColumn("Name");
					select.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "UId", this.get("EntitySchemaUId")));
					select.rowCount = 1;
					select.getEntityCollection(function(response) {
						if (response.success) {
							var collection = response.collection;
							if (collection) {
								var item = collection.getItems()[0];
								if (item) {
									this.set("ForecastDimensionSchemaName", item.get("Name"));
								}
								if (callback) {
									callback.call(this);
								}
							}
						}
					}, this);
				},

				/**
				 * ##### ######### ## ########## ###### # ########### ###### ### ##########.
				 * @private
				 * @param {Object} result ######### ###### ## ###########.
				 */
				onChooseDimension: function(result) {
					var listDimension = this.getExistListDimension();
					var listToAddDimension = [];
					if (result && result.selectedRows) {
						var collection = result.selectedRows.getItems();
						Terrasoft.each(collection, function(item) {
							var id = item.Id;
							if (listDimension.indexOf(id) === -1) {
								listToAddDimension.push(item);
							}
						}, this);
					}
					if (this.getIsFeatureEnabled("ForecastV2")) {
						this.addNewForecastItems(listToAddDimension);
					} else {
						this.insertNewForecastItems(listToAddDimension);
					}
				},

				/**
				 * Inserts selected items to current forecast entity table.
				 * @protected
				 * @param {Array} listToAddDimension List of selected items.
				 */
				addNewForecastItems: function(listToAddDimension) {
					const batchQuery = this.Ext.create("Terrasoft.BatchQuery");
					const newRows = [];
					const referencedColumnName = this._getReferencedColumnName(this.$ForecastDimensionSchemaName);
					for (let i = 0; i < listToAddDimension.length; i++) {
						const forecastRowId = Terrasoft.generateGUID();
						const forecastRowInsert = this.Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: "ForecastRow"
						});
						forecastRowInsert.setParameterValue("Id", forecastRowId, this.Terrasoft.DataValueType.GUID);
						batchQuery.add(forecastRowInsert);
						const item = listToAddDimension[i];
						const insertQuery = Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: this.$ForecastEntityInCellName
						});
						const newGuid = this.Terrasoft.generateGUID();
						newRows.push(newGuid);
						insertQuery.setParameterValue("Id", newGuid, this.Terrasoft.DataValueType.GUID);
						insertQuery.setParameterValue(referencedColumnName, item.Id, this.Terrasoft.DataValueType.GUID);
						insertQuery.setParameterValue("Sheet", this.$ForecastId, this.Terrasoft.DataValueType.GUID);
						insertQuery.setParameterValue("Row", forecastRowId, this.Terrasoft.DataValueType.GUID);
						batchQuery.add(insertQuery);
					}
					batchQuery.execute(function() {
						if (this.$ForecastUIV2FeatureEnabled) {
							this._publishRefreshForecast();
							return;
						}
						this.requestNewForecastRows(newRows, this.getForecastResponse);
					}, this);
				},

				/**
				 * @private
				 */
				_publishRefreshForecast: function(overdueData) {
					this.sandbox.publish("RefreshForecast", overdueData, [this._getForecastAngModuleId()]);
				},

				/**
				 * @private
				 */
				_publishRefreshForecastColumns: function() {
					if (!this.getIsFeatureEnabled("ForecastSaveHierarchy")) {
						this.sandbox.publish("RefreshForecast", null, [this._getForecastAngModuleId()]);
						return;
					}
					this.sandbox.publish("RefreshForecastColumns", null, [this._getForecastAngModuleId()]);
				},

				/**
				 * @private
				 */
				_getReferencedColumnName: function(referencedSchemaName) {
					const columns = this.Terrasoft.filter(this.entitySchema.columns, function (column) {
						return (column.referenceSchemaName === referencedSchemaName) && (column.usageType === 0);
					});
					return columns[0].name;
				},

				/**
				 * ##### ######### # ####### ####### ############ ##### ###### ## ########### #######.
				 * @private
				 * @param {Array} listToAddDimension ###### ######## ### ##########.
				 * @deprecated
				 */
				insertNewForecastItems: function(listToAddDimension) {
					var batchQuery = this.Ext.create("Terrasoft.BatchQuery");
					var newRows = [];
					for (var i = 0; i < listToAddDimension.length; i++) {
						var item = listToAddDimension[i];
						var insertQuery = Ext.create("Terrasoft.InsertQuery", {
							rootSchemaName: "ForecastItem"
						});
						var newGuid = this.Terrasoft.generateGUID();
						newRows.push(newGuid);
						insertQuery.setParameterValue("Id", newGuid, this.Terrasoft.DataValueType.GUID);
						insertQuery.setParameterValue("DimensionValueId", item.Id, this.Terrasoft.DataValueType.GUID);
						insertQuery.setParameterValue("Name", item.Name, this.Terrasoft.DataValueType.TEXT);
						insertQuery.setParameterValue("Forecast", this.get("ForecastId"),
							this.Terrasoft.DataValueType.GUID);
						insertQuery.setParameterValue("ForecastDimension", this.get("ForecastDimensionId"),
							this.Terrasoft.DataValueType.GUID);
						batchQuery.add(insertQuery);
					}
					batchQuery.execute(function() {
						this.requestNewForecastRows(newRows, this.getNewRowsResponse);
					}, this);
				},

				/**
				 * ##### ######### # #### ##### ######.
				 * @param {Object} rows ######### ########### #########.
				 * @private
				 */
				addGridRows: function(rows) {
					var collection = this.getGridData();
					if (collection && collection.getCount() === 0) {
						collection.loadAll(rows);
					} else {
						for (var propertyName in rows) {
							if (!rows.hasOwnProperty(propertyName)) {
								continue;
							}
							var newRow = rows[propertyName];
							if (!collection.contains(propertyName)) {
								collection.add(propertyName, newRow);
							}
						}
					}
				},

				/*
				 * ####### ########## ###### ############ ######### # ############.
				 * @private
				 */
				getExistListDimension: function() {
					var listDimension = [];
					var forecastGridRows = this.model.get("ForecastGridRows");
					this.Terrasoft.each(forecastGridRows, function(item) {
						listDimension.push(item.get("DimensionValueId"));
					}, this);
					return listDimension;
				},

				/**
				 * ########## ####### ## ###### ######## ## ######## ############.
				 * @protected
				 */
				onAddButtonClick: function() {
					const config = {
						entitySchemaName: this.get("ForecastDimensionSchemaName"),
						multiSelect: true,
						columnName: "Name",
						hideActions: true
					};
					const filterGroup = this.Terrasoft.createFilterGroup();
					if (this.getIsFeatureEnabled("ForecastV2")) {
						const referenceColumnName = this._getReferenceColumnName(config.entitySchemaName);
						const notExistFilter = this.Terrasoft.createNotExistsFilter(Ext.String.format("[{0}:{1}].Id",
							this.$ForecastEntityInCellName, referenceColumnName));
						const subFilter = this.Terrasoft.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL,
							"Sheet",
							this.$ForecastId);
						notExistFilter.subFilters.addItem(subFilter);
						filterGroup.add("NotExists", notExistFilter);
					}
					if (config.entitySchemaName === "Contact") {
						const sysAdminUnitFilter = this.Terrasoft.createColumnIsNotNullFilter("[SysAdminUnit:Contact].Id");
						filterGroup.addItem(sysAdminUnitFilter);
					}
					config.filters = filterGroup;
					this.openLookup(config, this.onChooseDimension, this);
				},

				/**
				 * @private
				 */
				_getReferenceColumnName: function(referenceSchemaName) {
					const entitySchema = this.Terrasoft[this.$ForecastEntityInCellName];
					if (this.isEmpty(entitySchema)) {
						return;
					}
					const column = this.Terrasoft.findWhere(entitySchema.columns, {
						referenceSchemaName: referenceSchemaName,
						isInherited: false
					});
					return column.name;
				},

				/**
				 * ############ ####### "########" ######## ######.
				 * @param {String} buttonTag ### "########".
				 * @param {GUID} primaryColumnValue id ######## ######.
				 */
				onActiveRowAction: function(buttonTag, primaryColumnValue) {
					if (buttonTag === "editRight") {
						this.editRights(primaryColumnValue);
					}
				},

				/**
				 * ######### ######## ######### ####.
				 * @param {String} primaryColumnValue ############# ######## ######.
				 */
				editRights: function(primaryColumnValue) {
					var gridRows = this.get("ForecastGridRows");
					var currentRecord = gridRows[primaryColumnValue];
					var displayName = currentRecord ? currentRecord.get("Name") : "";
					var id = this.sandbox.id + "_Rights";
					this.sandbox.subscribe("GetRecordInfo", function() {
						return this._getRecordInfo(currentRecord);
					}, this, [id]);
					var params = this.sandbox.publish("GetHistoryState");
					params.state.foldersManagerOpened = true;
					this.sandbox.publish("PushHistoryState", {
						stateObj: params.state,
						hash: params.hash.historyState,
						silent: true
					});
					this.sandbox.loadModule("Rights", {
						renderTo: "centerPanel",
						id: id,
						keepAlive: true
					});
				},

				/**
				 * Returns record information.
				 * @param {Object} The current record.
				 * @return {Object} The record information.
				 * @private
				 */
				_getRecordInfo: function(currentRecord) {
					var recordInfo;
					var displayName = currentRecord ? currentRecord.get("Name") : "";
					if (this.getIsFeatureEnabled("ForecastV2")) {
						recordInfo = {
							entitySchemaName: "ForecastRow",
							primaryColumnValue: currentRecord.get("RowId"),
							primaryDisplayColumnValue: displayName
						};
					} else {
						recordInfo = {
							entitySchemaName: this.entitySchema.name,
							entitySchemaCaption: this.entitySchema.caption,
							primaryColumnValue: currentRecord.get("Id"),
							primaryDisplayColumnValue: displayName
						};
					}
					return recordInfo;
				},

				/**
				 * Calculate forecast columns button click handler.
				 */
				onCalculateFactClick: function() {
					let dataSend;
					let methodName = "RunRecalculateFact";
					let serviceName = "ForecastService";
					if (this.getIsFeatureEnabled("ForecastV2")) {
						methodName = "RecalculateFact";
						let periods = this.getFilterPeriodsArray();
						if (this.isEmpty(periods)) {
							periods = this._getCurrentPeriods();
						}
						if (periods.length > this.maxPeriodsCount) {
							this.showInformationDialog(this.get("Resources.Strings.PeriodsExceededErrorCaption"));
							return;
						}
						dataSend = {
							forecastId: this.get("ForecastId"),
							periods: periods
						};
						if (this.getIsFeatureEnabled("ForecastUIV2") && this.isNotEmpty(this.$Setting)) {
							serviceName = "forecast.api";
							methodName = "forecast/calc";
						}
					} else {
						dataSend = {
							recordId: this.get("ForecastId")
						};
					}
					var config = {
						serviceName: serviceName,
						methodName: methodName,
						data: dataSend
					};
					this.callService(config, this.calculateFactCallback, this);
				},

				/**
				 * @private
				 */
				_getCurrentPeriods: function() {
					const columnCaptions = this.get("ColumnCaptionsCollection");
					const periodGroups = this.Terrasoft.groupBy(columnCaptions, function(item) {
						return item.PeriodId;
					});
					return this.Terrasoft.map(periodGroups, function(item, periodId) {
						return periodId;
					});
				},

				/**
				 * Show message after start calculation.
				 * @param {Object} Server response.
				 * @protected
				 */
				calculateFactCallback: function(response) {
					const resourcePrefix = "Resources.Strings.";
					let message = this.get(resourcePrefix + "CalculateFactPotentialCompleteMessage");
					const result = response && response.RecalculateFactResult;
					if (result && result.success) {
						if (this.getIsFeatureEnabled("ForecastUIV2")) {
							message = this.get(resourcePrefix + "CalculateFactPotentialCompleteMessageUIV2");
						}
					} else {
						message = result.errorInfo.message;
					}
					this.showInformationDialog(message);
				},

				_getForecastAngModuleId: function() {
					return this.sandbox.id + "_ForecastAngularModule";
				},

				/**
				 * Handles web-socket message receiving.
				 * @param {Object} event
				 * @param {Object} message
				 */
				onMessageReceived: function(event, message) {
					const sender = message && message.Header.Sender;
					if (sender !== "UpdateForecasts") {
						return;
					}
					const json = message.Body || "{}";
					const config = this.Terrasoft.decode(json);
					if (this.get("ForecastId") === config.forecastId) {
						this._publishRefreshForecast(true);
					}
				},

				/**
				 * @inheritDoc Terrasoft.BaseSchemaViewModel#init
				 * @override
				 */
				init: function(callback, scope) {
					const calcCaption = "CalculateFactPotentialCaption";
					const resourcePrefix = "Resources.Strings.";
					this.set(calcCaption,
						this.get(resourcePrefix + "CalculateFactPotentialCaption"));
					if (this.getIsFeatureEnabled("ForecastUIV2")) {
						this.set(calcCaption,
							this.get(resourcePrefix + "CalculateFactPotentialCaptionUIV2"));
					}
					this.callParent([function() {
						this.Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this.onMessageReceived,
							this);
						this.set("Collection", this.Ext.create("Terrasoft.Collection"));
						const forecastObject = this.sandbox.publish("GetForecastInfo", null, [this.sandbox.id]);
						this.sandbox.subscribe("GetForecastConfig",
							this.getForecastConfig, this, [this._getForecastAngModuleId()]);
						const forecastId = forecastObject.forecastId;
						if (this.Ext.isEmpty(forecastId)) {
							return;
						}
						this.set("ForecastId", forecastId);
						this.set("NeedReload", false);
						const profile = this.getProfile();
						if (profile && forecastId) {
							const forecastProfile = profile[forecastId];
							if (forecastProfile && forecastProfile.filters) {
								this.set("FilterCaption", forecastProfile.filters.filterCaption);
								this.set("FilterPeriods", forecastProfile.filters.filterPeriods);
							}
						}
						const checkRightsFunc = this.checkForecastCanEditRights.bind(this, callback, scope);
						if (this.getIsFeatureEnabled("ForecastV2")) {
							this.set("EntitySchemaUId", forecastObject.forecastEntityId);
							this.set("Setting", forecastObject.forecastSetting);
							this.set("ForecastDimensionSchemaName", forecastObject.forecastEntityName);
							this._initForecastEntityInCell(
								forecastObject.forecastForecastEntityInCellUId,
								checkRightsFunc);
						} else {
							this.entitySchema = ForecastItem;
							this.Ext.callback(checkRightsFunc, scope);
						}
						this.$ForecastUIV2FeatureEnabled = this._getFeatureState();
					}, this]);
				},

				/**
				 * @private
				 */
				_getFeatureState: function() {
					const settingExists = this.isNotEmpty(this.get("Setting"))
					return	this.Terrasoft.Features.getIsEnabled("ForecastUIV2") && settingExists;
				},

				/**
				 * Returns forecast config.
				 * @return {Object} Forecast config.
				 */
				getForecastConfig: function() {
					return {
						forecastId: this.get("ForecastId"),
						periodsId: this.getFilterPeriodsArray(),
						forecastSourceItemName: this.$ForecastDimensionSchemaName,
						maxDisplayedRecords: 500
					}
				},

				/**
				 * @private
				 */
				_getForecastSchemaName: function() {
					if (this.Terrasoft.Features.getIsEnabled("ForecastV2")) {
						return "ForecastSheet";
					} else {
						return "Forecast";
					}
				},

				/**
				 * @private
				 */
				_initForecastEntityInCell: function(uId, callback) {
					this.Terrasoft.EntitySchemaManager.findItemByUId(uId.toLowerCase(), function(schema) {
						this.set("ForecastEntityInCellName", schema.name);
						this.Terrasoft.require([schema.name], function(schema) {
							this.entitySchema = schema;
							this.Ext.callback(callback, this);
						}, this);
					}, this);
				},

				/**
				 * @inheritdoc BaseSchemaViewModel#onRender
				 * @overridden
				 */
				onRender: function() {
					this.Terrasoft.chain(
						function(next) {
							if (this.getIsFeatureEnabled("ForecastV2")) {
								if (this.$ForecastUIV2FeatureEnabled && !this.get("ForecastAngModuleLoaded")) {
									this.Terrasoft.require(["ForecastAngularModule"], function() {
										this._loadForecastAngModule();
									}, this);
									this.set("ForecastAngModuleLoaded", true);
								}
								this.Ext.callback(next, this);
							} else {
								this.getSchemaDimension(function() {
									this.getLookupSchema(next);
								});
							}
						},
						function() {
							this.set("IsDimensionDataLoaded", true);
							this.selectForecastPeriodType(this.loadGridDataView);
						},
						this
					);
					this.callParent(arguments);
				},

				_loadForecastAngModule: function() {
					this.sandbox.loadModule("ForecastAngularModule", {
						renderTo: "ForecastApp"
					});
				},

				/**
				 * ##### ######### ###### # ####, ####### ########## ### ######## ############ # ########## ###
				 * # ####### #####.
				 * @protected
				 * @param {Function} callback ####### ######### ######, ####### ########## ##### ####,
				 * ### ######### ######.
				 */
				selectForecastPeriodType: function(callback) {
					var forecastId = this.get("ForecastId");
					var select = Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: this._getForecastSchemaName()
					});
					select.addColumn("Id");
					select.addColumn("Name");
					select.addColumn("PeriodType");
					select.filters.addItem(this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Id", forecastId));
					select.getEntityCollection(function(response) {
						if (response.success) {
							var responseItems = response.collection.getItems();
							this.set("ForecastPeriodType", responseItems[0].get("PeriodType"));
							if (callback) {
								callback.call(this);
							}
						}
					}, this);
				},

				/**
				 * ######## ######### ###### #######.
				 * @protected
				 */
				getGridData: function() {
					return this.get("Collection");
				},

				/**
				 * ########## ###### ############.
				 * @protected
				 * @return {*|Component}
				 */
				getCurrentGrid: function() {
					return this.Ext.getCmp("ForecastGridId");
				},

				/**
				 * ####### ######### ######## ###### ####### ############.
				 * @protected
				 */
				deactivateGridActiveCell: function() {
					var grid = this.getCurrentGrid();
					if (grid) {
						grid.deactivateActiveCell();
					}
				},

				/**
				 * ####### ######### ####### ###### # ######### ## ######.
				 * @protected
				 */
				saveAndUnfocusActiveCell: function() {
					var activeRow = this.getActiveRow();
					this.unfocusRowControls(activeRow);
					this.saveForecastCellChanges();
					this.deactivateGridActiveCell();
				},

				/**
				 * ########## ####### ####### ###### Tab.
				 * @private
				 */
				onTabKeyPressed: function() {
					this.saveAndUnfocusActiveCell();
				},

				/**
				 * @inheritdoc ConfigurationGridUtilities#onEnterKeyPressed
				 * @overridden
				 */
				onEnterKeyPressed: function() {
					this.saveAndUnfocusActiveCell();
				},

				/**
				 * @inheritdoc ConfigurationGridUtilities#onCtrlEnterKeyPressed
				 * @overridden
				 */
				onCtrlEnterKeyPressed: this.Ext.emptyFn,

				/**
				 * ##### ######### ######## #### ####### ## ############## #####.
				 * @protected
				 * @param {Function} callback #######, ####### ########## ##### ######### ########### #######.
				 * @param {Object} scope ######## ##########.
				 */
				checkForecastCanEditRights: function(callback, scope) {
					RightUtilities.checkCanEdit({
						schemaName: this._getForecastSchemaName(),
						primaryColumnValue: this.get("ForecastId")
					}, function(result) {
						const isEnabled = Ext.isEmpty(result);
						this.set("AddButtonEnabled", isEnabled);
						this.set("CalculateFactEnabled", isEnabled);
						this.set("CanShowColumnsList", isEnabled);
						callback.call(scope);
					}, this);
				},

				/**
				 * ######### ######## ############# #######.
				 * @protected
				 */
				loadGridDataView: function() {
					this.initGridColumnsConfig();
					this.loadData();
				},

				/**
				 * ############## ############ ####### # ########## #######.
				 * @protected
				 */
				initGridColumnsConfig: function() {
					var grid = this.getCurrentGrid();
					if (!grid) {
						return;
					}
					var columnsConfig = [{
						"cols": 20,
						"key": [{ "name": { "bindTo": "Name" } }],
						"readOnly": true
					}];
					var rowsCaptionsColumnsConfig = [{
						"cols": 0,
						"key": [{ "name": { "bindTo": "Name" } }]
					}];
					grid.captionsConfig = [];
					grid.columnsConfig = columnsConfig;
					grid.rowsCaptionsColumnsConfig = rowsCaptionsColumnsConfig;
				},

				/**
				 * ######## ############# ####### # ############ # ##### ############# #######.
				 * @protected
				 */
				initGridBindings: function() {
					var grid = this.getCurrentGrid();
					if (!grid) {
						return;
					}
					var gridListedConfig = {
						columnsConfig: grid.columnsConfig,
						captionsConfig: grid.captionsConfig
					};
					grid.listedConfig = gridListedConfig;
					grid.initBindings(gridListedConfig);
				},

				/**
				 * ########## ###### ############### ########, ######### # ###### ##########.
				 * @private
				 * @return {Array} ############## ######.
				 */
				getFilterPeriodsArray: function() {
					var filterPeriods = this.get("FilterPeriods");
					var filters = [];
					this.Terrasoft.each(filterPeriods, function(periodItem) {
						filters.push(periodItem.Id);
					}, this);
					return filters;
				},

				/**
				 * Loads data.
				 */
				loadData: function() {
					if (!this.$ForecastUIV2FeatureEnabled) {
						this.requestForecastValues(this.getForecastResponse);
					}
				},

				/**
				 * ######## ## web-####### ##### ######### ###### ## ######## ############.
				 * @protected
				 * @param {Function} callback #######, ####### ########## ##### ######### ########## #######.
				 */
				requestForecastValues: function(callback) {
					this.showBodyMask();
					var filters = this.getFilterPeriodsArray();
					var dataSend = {
						forecastId: this.get("ForecastId"),
						periods: filters
					};
					var config = {
						serviceName: "ForecastService",
						methodName: "GetForecastData",
						data: dataSend
					};
					this.callService(config, callback, this);
				},

				/**
				 * ######## ## web-####### ##### ######### ########### #####.
				 * @protected
				 * @param {Array} rows ###### ############### ##### ##### ####### ############.
				 * @param {Function} callback #######, ####### ########## ##### ######### ########## #######.
				 */
				requestNewForecastRows: function(rows, callback) {
					this.showBodyMask();
					const filters = this.getFilterPeriodsArray();
					const dataSend = {
						forecastId: this.get("ForecastId"),
						periods: filters,
						rows: rows
					};
					const config = {
						serviceName: "ForecastService",
						data: dataSend
					};
					if (Terrasoft.Features.getIsEnabled("ForecastV2")) {
						config.methodName = "GetForecastData";
					} else {
						config.methodName = "GetForecastNewRows";
					}
					this.callService(config, callback, this);
				},

				/**
				 * ######## ######### ####### ## ###### # ####### ######## ############.
				 * @protected
				 * @param {Object} response ######, ########## ##### #######.
				 */
				getForecastResponse: function(response) {
					this.set("NeedReload", false);
					if (response && response.GetForecastDataResult.Success) {
						var rows = this.getGridRowsByResponse(response.GetForecastDataResult.Collection);
						this.initColumnsConfigsByResponse(response.GetForecastDataResult.ColumnCaptions);
						this.initGridBindings();
						var collection = this.getGridData();
						collection.clear();
						collection.loadAll(rows);
					}
					this.hideBodyMask();
				},

				/**
				 * ######## ######### ####### ## ###### # ####### ## ########### #######. ######### ###### # ######.
				 * @protected
				 * @param {Object} response ######, ########## ##### #######.
				 */
				getNewRowsResponse: function(response) {
					if (response && response.GetForecastNewRowsResult.Success) {
						var rows = this.getGridRowsByResponse(response.GetForecastNewRowsResult.Collection);
						this.addGridRows(rows);
					}
					this.hideBodyMask();
				},

				/**
				 * ##### ############## ##### ####### ######### ##### ## ######## ############, ###########
				 * ## ###### #######, # ######### ### # #########. ########## ############## ####### #########.
				 * @private
				 * @param {Terrasoft.BaseViewModelCollection} rowsCollection ######### #####.
				 * @param {Object} responseItem ####### ############, ########## # ########## #######.
				 * @return {Terrasoft.BaseViewModel} ####### #########.
				 */
				addNewCollectionItem: function(rowsCollection, responseItem, additionalProperties) {
					var values = {
						"Id": responseItem.Id,
						"DimensionValueId": responseItem.DimensionValueId,
						"Name": responseItem.Name,
						"Forecast": this.get("ForecastId"),
						"Parent": responseItem.ParentId,
						"Enabled": responseItem.CanEdit
					};
					if (additionalProperties && !this.Ext.isEmpty(additionalProperties.values)) {
						this.Ext.merge(values, additionalProperties.values);
					}
					var newItem = rowsCollection.createItem(values);
					newItem.columns = {
						"Id": {
							columnPath: "Id",
							dataValueType: this.Terrasoft.DataValueType.GUID,
							type: 0
						},
						"Name": {
							columnPath: "Name",
							dataValueType: this.Terrasoft.DataValueType.TEXT,
							type: 0
						}
					};
					if (additionalProperties && !this.Ext.isEmpty(additionalProperties.columns)) {
						this.Ext.merge(newItem.columns, additionalProperties.columns);
					}
					rowsCollection.add(responseItem.Id, newItem);
					return newItem;
				},

				/**
				 * @inheritdoc ConfigurationGridUtilities#initActiveRowKeyMap
				 * @overridden
				 */
				initActiveRowKeyMap: function(keyMap) {
					this.mixins.ConfigurationGridUtilites.initActiveRowKeyMap.call(this, keyMap);
					keyMap.push({
						key: Ext.EventObject.ENTER,
						ctrl: false,
						defaultEventAction: "preventDefault",
						fn: this.onEnterKeyPressed,
						scope: this
					});
				},

				/**
				 * ##### ######### ############ ##### ####### ## ########### ####### ## ###### # #########
				 * ####### ############ #######. ########## ##### ######.
				 * @protected
				 * @param {Object} responseCollection ######### ######### ############, ########## # ########## #######.
				 * @return {Object} ############ ##### #######.
				 */
				getGridRowsByResponse: function(responseCollection) {
					var rows = {};
					var rowsCollection = this.Ext.create("Terrasoft.BaseViewModelCollection");
					this.Terrasoft.each(responseCollection, function(item) {
						var forecastValues = item.ForecastItemValues;
						var summary = {
							"Plan": 0,
							"Fact": 0,
							"Potential": 0
						};
						var newItemProperties = {
							"values": {},
							"columns": {}
						};
						this.Terrasoft.each(forecastValues, function(valueItem) {
							var currentPeriodId = valueItem.PeriodId;
							var currentIndicatorCode = valueItem.ForecastIndicatorCode;
							summary[currentIndicatorCode] += valueItem.Value;
							var columnName = currentIndicatorCode + currentPeriodId;
							let value = valueItem.Value;
							if (this.getIsFeatureEnabled("ForecastV2") && currentIndicatorCode === "FactPercent") {
								const plan = this._getCellValueByIndicatorAndPeriod(
									forecastValues, "Plan", currentPeriodId);
								const fact = this._getCellValueByIndicatorAndPeriod(
									forecastValues, "Fact", currentPeriodId);
								value = plan > 0 ? fact * 100 / plan : 0;
							}
							newItemProperties.values[columnName] = value;
							newItemProperties.columns[columnName] = {
								"columnPath": columnName,
								"name": columnName,
								"dataValueType": this.Terrasoft.DataValueType.INTEGER,
								"type": this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
								"caption": valueItem.ForecastIndicatorCode + valueItem.PeriodName
							};
							newItemProperties.columns[columnName].forecastItemValueId = valueItem.Id;
							newItemProperties.columns[columnName].itemPreviousValue = valueItem.Value;
						}, this);
						var newItem = this.addNewCollectionItem(rowsCollection, item, newItemProperties);
						this.Ext.merge(this.entitySchema.columns, newItem.columns);
						newItem.set("RowId", item.RowId);
						this.setSummary(newItem, { silent: true });
						rows[item.Id] = newItem;
					}, this);
					this.Ext.merge(this.columns, this.entitySchema.columns);
					var allRows = this.get("ForecastGridRows") || {};
					this.Ext.merge(allRows, rows);
					this.set("ForecastGridRows", allRows);
					return rows;
				},

				/**
				 * @private
				 */
				_getCellValueByIndicatorAndPeriod: function(cells, indicatorCode, periodId) {
					const cell = this.Terrasoft.findWhere(cells,
						{ ForecastIndicatorCode: indicatorCode, PeriodId: periodId });
					return this.Ext.isEmpty(cell) ? 0 : cell.Value;
				},

				/**
				 * ##### ######### ######### ############ ########## ### ##### ######.
				 * @protected
				 * @param {Object} captionConfig ############ #######.
				 * @param {Array} summaryColumnCaptions ############## ###### ######## ####### ######.
				 */
				fillSummaryColumnCaptions: function(captionConfig, summaryColumnCaptions) {
					switch (captionConfig.tag) {
						case "Plan":
							summaryColumnCaptions.push({
								"cols": 96,
								"key": [{ "name": { "bindTo": "SummaryPlan" } }],
								"readOnly": true
							});
							break;
						case "Potential":
							summaryColumnCaptions.push({
								"cols": 96,
								"key": [{ "name": { "bindTo": "SummaryPotential" } }],
								"readOnly": true
							});
							break;
						case "Fact":
							summaryColumnCaptions.push({
								"cols": 96,
								"key": [{ "name": { "bindTo": "SummaryFact" } }],
								"readOnly": true
							});
							break;
						case "FactPercent":
							summaryColumnCaptions.push({
								"cols": 96,
								"key": [{ "name": { "bindTo": "SummaryFactPercent" } }],
								"readOnly": true
							});
							break;
					}
				},

				/**
				 * ##### ####### ############ ####### # ########## ## ########### #######. ########### ##############
				 * ################ ######.
				 * @protected
				 * @param {Object} columnCaptionsResponse ###### ###### ####### # ####### ## ########.
				 */
				initColumnsConfigsByResponse: function(columnCaptionsResponse) {
					this.set("ColumnCaptionsCollection", columnCaptionsResponse);
					var grid = this.getCurrentGrid();
					var captionsConfig = [];
					var columnsConfig = [{
						"cols": 20,
						"key": [{ "name": { "bindTo": "Name" } }],
						"readOnly": true
					}];
					if (this.Ext.isEmpty(columnCaptionsResponse) ||
						(columnCaptionsResponse && columnCaptionsResponse.length === 0)) {
						grid.captionsConfig = captionsConfig;
						grid.columnsConfig = columnsConfig;
						return;
					}
					var currentPeriodId = null;
					var currentCaptionsGroup = null;
					this.Terrasoft.each(columnCaptionsResponse, function(columnCaption) {
						columnsConfig.push({
							"cols": 96,
							"key": [{ "name": { "bindTo": columnCaption.ColumnName } }],
							"readOnly": columnCaption.IndicatorCode !== "Plan"
						});
						if (currentPeriodId !== columnCaption.PeriodId) {
							if (currentCaptionsGroup) {
								captionsConfig.push(currentCaptionsGroup);
							}
							currentCaptionsGroup = {
								"name": columnCaption.PeriodName,
								"children": []
							};
						}
						currentCaptionsGroup.children.push({
							"cols": 96,
							"name": columnCaption.IndicatorName,
							"tag": columnCaption.IndicatorCode
						});
						currentPeriodId = columnCaption.PeriodId;
					}, this);
					captionsConfig.push(currentCaptionsGroup);
					var summaryConfig = {
						name: resources.localizableStrings.Summary,
						children: this.Terrasoft.deepClone(captionsConfig[0].children)
					};
					var summaryColumnCaptions = [];
					var childrenItems = summaryConfig.children;
					this.Terrasoft.each(childrenItems, function(item) {
						this.fillSummaryColumnCaptions(item, summaryColumnCaptions);
					}, this);
					columnsConfig = columnsConfig.concat(summaryColumnCaptions);
					captionsConfig.push(summaryConfig);
					grid.captionsConfig = captionsConfig;
					grid.columnsConfig = columnsConfig;
				},

				/**
				 * @inheritDoc Terrasoft.BaseSectionV2#getActiveRow
				 * @overridden
				 * @return {object}
				 */
				getActiveRow: function() {
					var activeRow = null;
					var primaryColumnValue = this.get("ActiveRow");
					if (primaryColumnValue) {
						var gridData = this.getGridData();
						activeRow = gridData.find(primaryColumnValue) ? gridData.get(primaryColumnValue) : null;
					}
					return activeRow;
				},

				setSummary: function(item, config) {
					var silent = config ? config.silent : false;
					var code = "Summary";
					var summaryColumns = ["Plan", "Fact", "FactPercent", "Potential"];
					var summaryValues = {
						"Plan": 0,
						"Fact": 0,
						"Potential": 0
					};
					var changed = false;
					this.Terrasoft.each(summaryColumns, function(property) {
						if (!item.columns[code + property]) {
							item.columns[code + property] = {
								columnPath: code + property,
								dataValueType: this.Terrasoft.DataValueType.INTEGER,
								type: this.Terrasoft.ViewModelColumnType.ENTITY_COLUMN
							};
						}
					}, this);
					for (var column in item.columns) {
						for (var indicator in summaryValues) {
							if (column.indexOf(indicator) === 0) {
								if (indicator === "Fact" && column.indexOf("FactPercent") === 0) {
									continue;
								}
								summaryValues[indicator] += item.get(column);
							}
						}
					}
					for (var summary in summaryValues) {
						var summaryCode = code + summary;
						if (!changed && item.get(summaryCode) !== summaryValues[summary]) {
							changed = true;
						}
						item.set(code + summary, summaryValues[summary]);
					}
					var summaryFactPercent = Math.round(summaryValues.Fact * 100 * 100 / summaryValues.Plan) / 100;
					item.set("SummaryFactPercent", summaryFactPercent);
					if (!silent && changed) {
						this.set("NeedReload", true);
					}
				},

				/**
				 * ######### ######### ######## ####### ###### ####### ############.
				 * @protected
				 */
				saveForecastCellChanges: function() {
					var item = this.getActiveRow();
					if (!item) {
						return;
					}
					if (item.get("IsSaving")) {
						return;
					}
					this.Terrasoft.each(item.changedValues, function(value, columnId) {
						if (columnId.indexOf("Plan") !== 0) {
							return;
						}
						if (!value) {
							value = 0;
							item.set(columnId, 0);
						}
						var currentColumn = item.columns[columnId];
						if (!currentColumn) {
							return;
						}
						this.showBodyMask();
						this.setSummary(item);
						var forecastItemValueId = currentColumn.forecastItemValueId;
						currentColumn.itemPreviousValue = value;
						var valuesConfig = this.getForecastItemValuesConfig(item, value, columnId);
						var data = {
							forecastId: item.get("Forecast"),
							recordId: item.get("Id"),
							periodId: valuesConfig.periodId,
							indicatorId: valuesConfig.forecastIndicatorId,
							value: value
						};
						if (forecastItemValueId && (forecastItemValueId !== this.Terrasoft.GUID_EMPTY)) {
							item.set("IsSaving", true);
							if (this.getIsFeatureEnabled("ForecastV2")) {
								this._saveForecastCell(data, function() {
									item.set("IsSaving", false);
									this.hideBodyMask();
								});
							} else {
								this.updateForecastValue(forecastItemValueId, value, function() {
									item.set("IsSaving", false);
									this.hideBodyMask();
								});
							}
						} else {
							if (!value) {
								this.hideBodyMask();
								return;
							}
							item.set("IsSaving", true);
							if (this.getIsFeatureEnabled("ForecastV2")) {
								this._saveForecastCell(data, function() {
									item.set("IsSaving", false);
									this.hideBodyMask();
								});
							} else {
								this.insertForecastValue(valuesConfig, function(response) {
									this.hideBodyMask();
									if (response && response.InsertForecastValueResult.Success) {
										currentColumn.forecastItemValueId =
											response.InsertForecastValueResult.ForecastItemValueId;
									}
									item.set("IsSaving", false);
								});
							}
						}
					}, this);
				},

				_saveForecastCell: function(data, callback) {
					var config = {
						serviceName: "ForecastService",
						methodName: "SaveForecastCell",
						data: data
					};
					this.callService(config, callback, this);
				},

				/**
				 * Get values config for new forecast item value.
				 * @protected
				 */
				getForecastItemValuesConfig: function(item, value, columnId) {
					var planIndicatorId = ForecastConstants.Indicator.PlanIndicatorId;
					return {
						forecastIndicatorId: planIndicatorId,
						forecastItemId: item.get("Id"),
						periodId: columnId.substring(4),
						value: value
					};
				},

				/**
				 * ######## ## web-####### ##### ######### ############# ######## # ###### ############.
				 * @protected
				 * @param {GUID} forecastItemValueId ############# ######## ######## ############.
				 * @param {Float} value ##### ######## ######## ############.
				 * @param {Function} callback #######, ####### ########## ##### ######### ########## #######.
				 */
				updateForecastValue: function(forecastItemValueId, value, callback) {
					var dataSend = {
						forecastItemValueId: forecastItemValueId,
						value: value
					};
					var config = {
						serviceName: "ForecastService",
						methodName: "UpdateForecastValue",
						data: dataSend
					};
					this.callService(config, callback, this);
				},

				/**
				 * ######## ## web-####### ##### ########## ###### ######## # ####### ############.
				 * @protected
				 * @param {Object} valuesConfig ######, ########## ############## ########## ############,
				 * ######## ############, #######, # ##### ######## ######## ############.
				 * @param {Function} callback #######, ####### ########## ##### ######### ########## #######.
				 */
				insertForecastValue: function(valuesConfig, callback) {
					var dataSend = valuesConfig;
					var config = {
						serviceName: "ForecastService",
						methodName: "InsertForecastValue",
						data: dataSend
					};
					this.callService(config, callback, this);
				},

				/**
				 * ######## ######### ######## ######.
				 * @protected
				 * @param {String} id ############# ######.
				 */
				discardChanges: function(id) {
					if (!id) {
						return;
					}
					var activeRow = this.getActiveRow();
					var activeCellColumnName = this.get("ActiveCellColumnName");
					if (activeCellColumnName) {
						var oldCellValue = activeRow.columns[activeCellColumnName].itemPreviousValue;
						activeRow.set(activeCellColumnName, oldCellValue || 0);
					}
					this.deactivateGridActiveCell();
				},

				/**
				 * @private
				 */
				_loadColumns: function(callback, scope) {
					const columnsEsq = this.Ext.create("Terrasoft.EntitySchemaQuery", {
						rootSchemaName: "ForecastColumn"
					});
					columnsEsq.addColumn("Id");
					columnsEsq.addColumn("IsHide");
					columnsEsq.filters.addItem(this._getColumnsFilterGroup());
					columnsEsq.filters.add("IsHide", this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "IsHide", false));
					columnsEsq.getEntityCollection(function(response) {
						if (this.validateResponse(response)) {
							const collection = response.collection;
							this.Ext.callback(callback, scope, [collection.getKeys()]);
						}
					}, this);
				},

				/**
				 * Opens columns list lookup.
				 */
				showColumnsList: function() {
					this._loadColumns(function(selectedColumns) {
						const lookupConfig = {
							entitySchemaName: "ForecastColumn",
							columns: ["Title", "IsHide"],
							multiSelect: true,
							selectedValues: selectedColumns || [],
							hideActions: true,
							filters: this._getColumnsFilterGroup()
						};
						this.openLookup(lookupConfig, this._updateSelectedColumns, this);
					}, this);
				},

				/**
				 * @private
				 */
				_updateSelectedColumns: function(result) {
					const columns = result && result.selectedRows;
					const ids = columns.getKeys();
					const hideQuery = this._getHideColumnsQuery();
					const batchQuery = this.Ext.create("Terrasoft.BatchQuery");
					batchQuery.add(hideQuery);
					if (ids && ids.length > 0) {
						const query = this._getUpdateToShowColumnsQuery(ids);
						batchQuery.add(query);
					}
					batchQuery.execute(function() {
						this._publishRefreshForecastColumns();
					}, this);
				},

				/**
				 * @private
				 */
				_getHideColumnsQuery: function() {
					return this._getUpdateColumnQuery(true);
				},

				/**
				 * @private
				 */
				_getUpdateToShowColumnsQuery: function(ids) {
					const updateQuery = this._getUpdateColumnQuery(false);
					updateQuery.filters.add("ByIds", this.Terrasoft.createColumnInFilterWithParameters("Id", ids));
					return updateQuery;
				},

				/**
				 * @private
				 */
				_getUpdateColumnQuery: function(isHideColumn) {
					const columnsUpdateQuery = this.Ext.create("Terrasoft.UpdateQuery", {
						rootSchemaName: "ForecastColumn"
					});
					columnsUpdateQuery.setParameterValue("IsHide", isHideColumn, this.Terrasoft.DataValueType.BOOLEAN);
					columnsUpdateQuery.filters.addItem(this._getColumnsFilterGroup());
					return columnsUpdateQuery;
				},

				/**
				 * @private
				 */
				_getColumnsFilterGroup: function() {
					const filtersGroup = this.Ext.create("Terrasoft.FilterGroup");
					filtersGroup.add("ByForecastSheet", this._getForecastIdFilter());
					filtersGroup.add("ExceptEditable", this._getNotEditableColumnsFilter());
					return filtersGroup;
				},

				/**
				 * @private
				 */
				_getForecastIdFilter: function() {
					return this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.EQUAL, "Sheet", this.$ForecastId);
				},

				/**
				 * @private
				 */
				_getNotEditableColumnsFilter: function() {
					return this.Terrasoft.createColumnFilterWithParameter(
						this.Terrasoft.ComparisonType.NOT_EQUAL, "Type", ForecastConstants.ColumnType.Editable);
				},

				/**
				 * @inheritdoc Terrasoft.BaseSchemaModule#destroy
				 * @override
				 */
				destroy: function() {
					this.Terrasoft.ServerChannel.un(this.Terrasoft.EventName.ON_MESSAGE, this.onMessageReceived, this);
					this.callParent(arguments);
				}
			},
			diff: [
				{
					"operation": "insert",
					"name": "ForecastModuleContainerMain",
					"values": {
						"id": "ForecastModuleContainerMain",
						"selectors": { "wrapEl": "#ForecastModuleContainerMain" },
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["forecast-content-container"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "buttonContainer",
					"parentName": "ForecastModuleContainer",
					"propertyName": "items",
					"values": {
						"id": "buttonContainer",
						"selectors": { "wrapEl": "#buttonContainer" },
						"wrapClass": ["forecast-button-container"],
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"visible": {
							"bindTo": "IsDimensionDataLoaded"
						},
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "addButton",
					"parentName": "buttonContainer",
					"propertyName": "items",
					"values": {
						"caption": resources.localizableStrings.Add,
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"click": { "bindTo": "onAddButtonClick" },
						"enabled": { "bindTo": "AddButtonEnabled" },
						"markerValue": "addButton",
						"style": this.Terrasoft.controls.ButtonEnums.style.GREEN,
						"classes": { "textClass": ["actions-button-margin-right"] }
					}
				},
				{
					"operation": "insert",
					"name": "reloadButton",
					"parentName": "buttonContainer",
					"propertyName": "items",
					"values": {
						"caption": resources.localizableStrings.Reload,
						"visible": { "bindTo": "NeedReload" },
						"click": { "bindTo": "loadData" },
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"markerValue": "reloadButton",
						"style": this.Terrasoft.controls.ButtonEnums.style.BLUE,
						"classes": { "textClass": ["actions-button-margin-right"] }
					}
				},
				{
					"operation": "insert",
					"name": "actionsButton",
					"parentName": "buttonContainer",
					"propertyName": "items",
					"values": {
						"caption": resources.localizableStrings.Actions,
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"markerValue": "actionsButton",
						"selectors": { "wrapEl": "#actionsButton" },
						"style": this.Terrasoft.controls.ButtonEnums.style.DEFAULT,
						"classes": { "textClass": ["actions-button-margin-right"] },
						"tag": "actionsButton",
						"menu": []
					}
				},
				{
					"operation": "insert",
					"name": "factMenuItem",
					"parentName": "actionsButton",
					"propertyName": "menu",
					"values": {
						"caption": {"bindTo": "CalculateFactPotentialCaption"},
						"itemType": this.Terrasoft.ViewItemType.MENU_ITEM,
						"click": { "bindTo": "onCalculateFactClick" },
						"enabled": { "bindTo": "CalculateFactEnabled" },
						"markerValue": "factMenuItem",
						"selectors": { "wrapEl": "#factMenuItem" },
						"tag": "factMenuItem"
					}
				},
				{
					"operation": "insert",
					"name": "rightToolsContainer",
					"parentName": "buttonContainer",
					"propertyName": "items",
					"values": {
						"id": "rightToolsContainer",
						"wrapClass": ["right-tools-buttons-container-wrapClass"],
						"selectors": { "wrapEl": "#rightToolsContainer" },
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "viewButton",
					"parentName": "rightToolsContainer",
					"propertyName": "items",
					"values": {
						"caption": resources.localizableStrings.ViewOptions,
						"itemType": this.Terrasoft.ViewItemType.BUTTON,
						"markerValue": "viewButton",
						"selectors": { "wrapEl": "#actionsButton" },
						"style": this.Terrasoft.controls.ButtonEnums.style.DEFAULT,
						"menu": []
					}
				},
				{
					"operation": "insert",
					"name": "periodMenuItem",
					"parentName": "viewButton",
					"propertyName": "menu",
					"values": {
						"caption": resources.localizableStrings.SetPeriod,
						"itemType": this.Terrasoft.ViewItemType.MENU_ITEM,
						"click": { "bindTo": "selectPeriod" },
						"markerValue": "periodMenuItem"
					}
				},
				{
					"operation": "insert",
					"name": "columnsListMenuItem",
					"parentName": "viewButton",
					"propertyName": "menu",
					"values": {
						"caption": resources.localizableStrings.ColumnsListMenuItem,
						"itemType": this.Terrasoft.ViewItemType.MENU_ITEM,
						"click": { "bindTo": "showColumnsList" },
						"markerValue": "columnsListMenuItem",
						"enabled": {"bindTo": "CanShowColumnsList"},
						"visible": {
							"bindTo": "ForecastUIV2FeatureEnabled"
						}
					}
				},
				{
					"operation": "insert",
					"name": "gridControlGroup",
					"parentName": "ForecastModuleContainer",
					"propertyName": "items",
					"values": {
						"id": "gridControlGroup",
						"selectors": { "wrapEl": "#gridControlGroup" },
						"itemType": this.Terrasoft.ViewItemType.CONTROL_GROUP,
						"wrapClass": ["gridControlGroup"],
						"items": [],
						"visible": {
							"bindTo": "ForecastUIV2FeatureEnabled",
							"bindConfig": {
								"converter": "invertBooleanValue"
							}
						},
					}
				},
				{
					"operation": "insert",
					"name": "ForecastApp",
					"parentName": "ForecastModuleContainer",
					"propertyName": "items",
					"values": {
						"id": "ForecastApp",
						"itemType": this.Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["ng-bpm-forecast"],
						"visible": { "bindTo": "ForecastUIV2FeatureEnabled" },
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "DataGrid",
					"parentName": "gridControlGroup",
					"propertyName": "items",
					"values": {
						"id": "ForecastGridId",
						"itemType": this.Terrasoft.ViewItemType.GRID,
						"className": "Terrasoft.PivotGrid",
						"generator": "ConfigurationGridGenerator.generatePartial",
						"selectors": { "wrapEl": "#ForecastGridId" },
						"collection": { "bindTo": "Collection" },
						"activeRow": { "bindTo": "ActiveRow" },
						"generateControlsConfig": { "bindTo": "generateActiveRowControlsConfig" },
						"changeRow": { "bindTo": "changeRow" },
						"unSelectRow": { "bindTo": "unSelectRow" },
						"onGridClick": { "bindTo": "onGridClick" },
						"listedZebra": true,
						"initActiveRowKeyMap": { "bindTo": "initActiveRowKeyMap" },
						"activeRowAction": { "bindTo": "onActiveRowAction" },
						"activeRowCaptionActions": [{
							"style": this.Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
							"className": "Terrasoft.Button",
							"imageConfig": resources.localizableImages.SettingsImage,
							"hint": resources.localizableStrings.ConfigurationButtonHint,
							"markerValue": "activeRowSettingsButton",
							"menu": {
								"items": [{
									"className": "Terrasoft.MenuItem",
									"tag": "editRight",
									"markerValue": resources.localizableStrings.EditRightsMenuItemCaption,
									"caption": resources.localizableStrings.EditRightsMenuItemCaption
								}]
							}
						}],
						"activeCellColumnName": { "bindTo": "ActiveCellColumnName" },
						"cellValueChanged": { "bindTo": "saveForecastCellChanges" },
						"container": "gridControlGroup",
						"multiSelect": false,
						"hierarchical": true,
						"hierarchicalColumnName": "Parent",
						"rowDataItemMarkerColumnName": "Name",
						"expandHierarchyLevels": { "bindTo": "expandHierarchy" },
						"enabled": true,
						"type": "listed",
						"columnsConfig": [],
						"captionsConfig": [],
						"rowsCaptionsColumnsConfig": [],
						"listedConfig": {
							"columnsConfig": [],
							"captionsConfig": []
						}
					}
				}
			]
		};
	});


