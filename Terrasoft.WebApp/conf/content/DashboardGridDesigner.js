Terrasoft.configuration.Structures["DashboardGridDesigner"] = {innerHierarchyStack: ["DashboardGridDesigner"], structureParent: "BaseWidgetDesigner"};
define('DashboardGridDesignerStructure', ['DashboardGridDesignerResources'], function(resources) {return {schemaUId:'a49cce26-2ac5-4140-8e7f-dbb509989297',schemaCaption: "Dashboards list designer", parentSchemaName: "BaseWidgetDesigner", schemaName:'DashboardGridDesigner',parentSchemaUId:'8c9456fa-46da-4100-94f9-8653274ab717',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DashboardGridDesigner", ["DashboardGridDesignerResources", "css!DashboardGridDesignerCSS",
	"css!DashboardGridModule"], function(resources) {
	var localizableStrings = resources.localizableStrings;
	return {
		messages: {
			/**
			 * ######## ## ######### ### ######### ########## ############# ######.
			 */
			"GetDashboardGridConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * ########## ######### ### ######### ######.
			 */
			"GenerateDashboardGrid": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * ########## ######### ### ######### #########.
			 */
			"GetHistoryState": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * ######## ## ######### ### ######### ########## ###### ######### ####### ######.
			 */
			"SaveGridSettings": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * ########## ######### ######### #########.
			 */
			"PushHistoryState": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * ######## ## ######### ### ########## ########## ###### ######### ####### ######.
			 */
			"GetGridSettingsInfo": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * Returns grid config profile data.
			 */
			"GetProfileData": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			},

			/**
			 * Fires when profile was changed from dashboard designer.
			 */
			"ReloadGridSettings": {
				mode: this.Terrasoft.MessageMode.PTP,
				direction: this.Terrasoft.MessageDirectionType.PUBLISH
			}

		},
		attributes: {

			/**
			 * ######### ######.
			 */
			caption: {
				value: localizableStrings.NewWidget,
				dependencies: [
					{
						columns: ["caption"],
						methodName: "reloadGridSettingsPageConfig"
					}
				]
			},

			/**
			 * ##### ######.
			 */
			style: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: true,
				value: Terrasoft.DashboardEnums.WidgetColor["widget-green"],
				dependencies: [
					{
						columns: ["style"],
						methodName: "reloadGridSettingsPageConfig"
					}
				]
			},

			/**
			 * ########### ##########.
			 */
			orderDirection: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: {
					value: Terrasoft.OrderDirection.DESC,
					displayValue: localizableStrings.DescendingOrder
				}
			},

			/**
			 * #######  ##########.
			 */
			orderColumn: {
				dataValueType: Terrasoft.DataValueType.LOOKUP,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: {}
			},

			/**
			 * ########## ##### ### ###########.
			 */
			rowCount: {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: false,
				value: 5
			},

			/**
			 * ############ ######.
			 */
			gridConfig: {
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				isRequired: false,
				dependencies: [
					{
						columns: ["orderColumn", "orderDirection"],
						methodName: "setColumnGridConfig"
					}
				]
			}
		},
		methods: {

			/**
			 * @inheritdoc BaseSchemaViewModel#setValidationConfig
			 * @overridden
			 */
			setValidationConfig: function() {
				this.callParent(arguments);
				this.addColumnValidator("rowCount", function(value) {
					var invalidMessage = "";
					if (value <= 0) {
						invalidMessage = this.get("Resources.Strings.RowCountInvalidMsg");
					}
					return {
						fullInvalidMessage: invalidMessage,
						invalidMessage: invalidMessage
					};
				});
			},

			/**
			 * Gets and applies grid config.
			 * @private
			 * @param {Object} [profile] Grid config profile data.
			 */
			_applyGridConfig: function(profile) {
				if (Ext.isEmpty(profile)) {
					profile = this.sandbox.publish("GetProfileData");
				}
				if (Ext.isEmpty(profile)) {
					return;
				}
				var newGridConfig = Terrasoft.decode(profile.listedConfig);
				this.set("gridConfig", newGridConfig, {silent: true});
				this.initOrderLookupValues();
				this.sandbox.publish("GenerateDashboardGrid", null, [this.getWidgetPreviewModuleId()]);
			},

			/**
			 * Initializes current entity schema.
			 * @private
			 * @param {Function} callback Callback-function.
			 * @param {Object} scope Context of the callback.
			 */
			_initEntitySchema: function(callback, scope) {
				var entitySchemaNameConfig = this.get("entitySchemaName");
				if (!entitySchemaNameConfig) {
					Ext.callback(callback, scope);
					return;
				}
				this.getEntitySchemaByName(entitySchemaNameConfig.Name, function(entitySchema) {
					this.set("EntitySchema", entitySchema);
					Ext.callback(callback, scope);
				}, this);
			},

			/**
			 * Returns grid settings page sandbox id.
			 * @private
			 * @return {String} Grid settings page sandbox id.
			 */
			_getGridSettingsSandboxId: function() {
				var gridSettingsSandboxId = this.sandbox.id + "_CardModuleV2_GridSettingsPage";
				return gridSettingsSandboxId;
			},

			/**
			 * ########## ######## ######### ######### ######## ###### #######.
			 * @protected
			 * @virtual
			 * @return {String} ########## ######## ######### ######### ######## ###### #######.
			 */
			getWidgetConfigMessage: function() {
				return "GetDashboardGridConfig";
			},

			/**
			 * ########## ######## ######### ########## #######.
			 * @protected
			 * @virtual
			 * @return {String} ########## ######## ######### ########## #######.
			 */
			getWidgetRefreshMessage: function() {
				return "GenerateDashboardGrid";
			},

			/**
			 * ########## ###### ########### ####### ###### ####### # ###### ######### #######.
			 * @protected
			 * @virtual
			 * @return {Object} ########## ###### ########### ####### ###### ####### # ###### ######### #######.
			 */
			getWidgetModulePropertiesTranslator: function() {
				var widgetModulePropertiesTranslator = {
					rowCount: "rowCount",
					style: "style",
					gridConfig: "gridConfig",
					orderDirection: "orderDirection",
					orderColumn: "orderColumn"
				};
				return Ext.apply(this.callParent(arguments), widgetModulePropertiesTranslator);
			},

			/**
			 * ########## ###### ########## ######## ####### # ###### #######.
			 * @protected
			 * @virtual
			 * @return {Object} ########## ###### ########## ######## #######.
			 */
			getDesignWidgetConfig: function() {
				var config = this.callParent(arguments);
				Ext.apply(config, {
					isDesigned: true
				});
				return config;
			},

			/**
			 * ########## ######## ###### #######.
			 * @protected
			 * @virtual
			 * @return {String} ########## ######## ###### #######.
			 */
			getWidgetModuleName: function() {
				return "DashboardGridModule";
			},

			/**
			 * ##### ######### ####### ######### ######## #####.
			 * @protected
			 * @virtual
			 */
			onEntitySchemaNameChange: function() {
				if (this.get("moduleLoaded")) {
					this.clearColumn();
				}
				this.callParent(arguments);
			},

			/**
			 * ########## ###### ######.
			 * @protected
			 * @virtual
			 * @return {Object} ########## ###### ######.
			 */
			getStyleDefaultConfig: function() {
				return Terrasoft.DashboardEnums.WidgetColor;
			},

			/**
			 * ########## ###### ########### ##########.
			 * @protected
			 * @virtual
			 * @return {Object} ########## ###### ########### ##########.
			 */
			getOrderDirectionDefaultConfig: function() {
				return {
					"1": {
						value: Terrasoft.OrderDirection.ASC,
						displayValue: this.get("Resources.Strings.AscendingOrder")
					},
					"2": {
						value: Terrasoft.OrderDirection.DESC,
						displayValue: this.get("Resources.Strings.DescendingOrder")
					}
				};
			},

			/**
			 * ########## ###### ####### ### ##########.
			 * @protected
			 * @virtual
			 * @return {Object} ########## ###### ####### ### ##########.
			 */
			getOrderColumnConfig: function() {
				var gridConfig = this.get("gridConfig");
				var gridItems = gridConfig && gridConfig.items;
				if (!gridItems) {
					return null;
				}
				var orderColumnConfig = {};
				Terrasoft.each(gridItems, function(column) {
					var columnName = column.bindTo;
					var columnCaption = column.caption;
					orderColumnConfig[columnName] = {
						value: columnName,
						displayValue: columnCaption
					};
				}, this);
				return orderColumnConfig;
			},

			/**
			 * ######### ######### ######.
			 * @protected
			 * @virtual
			 * @param {String} filter ###### ##########.
			 * @param {Terrasoft.Collection} list ######.
			 */
			prepareStyleList: function(filter, list) {
				if (list === null) {
					return;
				}
				list.clear();
				list.loadAll(this.getStyleDefaultConfig());
			},

			/**
			 * ######### ######### ########## ##########.
			 * @protected
			 * @virtual
			 * @param {String} filter ###### ##########.
			 * @param {Terrasoft.Collection} list ######.
			 */
			prepareOrderDirectionList: function(filter, list) {
				if (list === null) {
					return;
				}
				list.clear();
				list.loadAll(this.getOrderDirectionDefaultConfig());
			},

			/**
			 * ######### ######### ####### ### ##########.
			 * @protected
			 * @virtual
			 * @param {String} filter ###### ##########.
			 * @param {Terrasoft.Collection} list ######.
			 */
			prepareOrderColumnList: function(filter, list) {
				if (list === null) {
					return;
				}
				list.clear();
				list.loadAll(this.getOrderColumnConfig());
			},

			/**
			 * Returns current profile.
			 * @protected
			 * @return {Object} Grid profile object.
			 */
			getProfile: function() {
				var gridConfig = Terrasoft.encode(this.get("gridConfig"));
				var profile = {
					isTiled: false,
					listedConfig: gridConfig,
					tiledConfig: "{\"grid\":{\"rows\":3,\"columns\":24},\"items\":[]}",
					type: this.Terrasoft.GridType.LISTED
				};
				return profile;
			},

			/**
			 * Subscribes on grid sattings page messages.
			 * @protected
			 */
			subscribeGridSettingsSandboxEvents: function() {
				var gridSettingsSandboxId = this._getGridSettingsSandboxId();
				this.sandbox.subscribe("GetGridSettingsInfo", function() {
					var widgetDesignerConfig = this.getDesignWidgetConfig();
					var customGridCaptionConfig = {
						caption: widgetDesignerConfig.caption,
						style: widgetDesignerConfig.style
					};
					var gridSettingsInfo = {};
					var entitySchemaName = this.get("entitySchemaName");
					gridSettingsInfo.isSingleTypeMode = true;
					gridSettingsInfo.entitySchemaName = entitySchemaName && entitySchemaName.Name;
					gridSettingsInfo.entitySchema = this.get("EntitySchema");
					gridSettingsInfo.baseGridType = this.Terrasoft.GridType.LISTED;
					gridSettingsInfo.profile = this.getProfile();
					gridSettingsInfo.hideButtons = false;
					gridSettingsInfo.hideGridType = true;
					gridSettingsInfo.isTiled = false;
					gridSettingsInfo.isNested = false;
					gridSettingsInfo.hideAllUsersSaveButton = true;
					gridSettingsInfo.useProfileField = true;
					gridSettingsInfo.columnSettingModuleConfig = {
						isNestedColumnSettingModule: true,
						columnSettingsContainerName: "CustomColumnSettingsContainer"
					};
					gridSettingsInfo.customGridCaptionConfig = customGridCaptionConfig;
					gridSettingsInfo.dashboardSettings = true;
					return gridSettingsInfo;
				}, this, [gridSettingsSandboxId]);
				this.sandbox.subscribe("SaveGridSettings", function(profile) {
					this._applyGridConfig(profile);
					return {
						saveProfile: false
					};
				}, this, [gridSettingsSandboxId]);
			},

			/**
			 * Loads grid settings module.
			 * @protected
			 */
			loadGridSettingsModule: function() {
				if (this.get("ColumnsSettingsTab") === true && !this.get("ColumnSettingsModuleLoaded")) {
					var gridSettingsSandboxId = this._getGridSettingsSandboxId();
					this.subscribeGridSettingsSandboxEvents();
					this.sandbox.loadModule("CardModuleV2", {
						renderTo: "ColumnsSettingsWrapper",
						id: gridSettingsSandboxId,
						keepAlive: false,
						instanceConfig: {
							schemaName: "GridSettingsPage",
							isSchemaConfigInitialized: true,
							useHistoryState: false
						}
					});
					this.set("ColumnSettingsModuleLoaded", true);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseWidgetDesigner#save.
			 * @overridden
			 */
			save: function() {
				this.hideBodyMask();
				var gridConfig = this.get("gridConfig");
				if (gridConfig && gridConfig.items && gridConfig.items.length === 0) {
					this.showConfirmationDialog(this.get("Resources.Strings.EmptyGridSettingsMsg"));
					return;
				}
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#onRender
			 * @overridden
			 */
			onRender: function() {
				this.callParent(arguments);
				this.set("ModuleRendered", true);
				this.setTabDataContainerVisible("ViewSettingsTab", false);
				this.reloadGridSettingsPageConfig();
				this.refreshWidget();
			},

			/**
			 * @inheritdoc Terrasoft.BaseWidgetDesigner#refreshWidget.
			 * @overridden
			 */
			refreshWidget: function() {
				this.callParent(arguments);
				var canRefresh = this.canRefreshWidget();
				if (canRefresh) {
					this.loadGridSettingsModule();
				}
			},

			/**
			 * ######### ############# #########.
			 * @protected
			 * @virtual
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ####### ######### ######.
			 */
			initWidgetDesigner: function(callback, scope) {
				this.callParent([function() {
					this.initTabs();
					this.initOrderLookupValues();
					this._initEntitySchema(callback, scope);
				}, this]);
			},

			/**
			 * @inheritdoc Terrasoft.BaseWidgetDesigner#setAttributeDisplayValue
			 * ############ ######## ### ####### #####.
			 * @protected
			 * @overridden
			 */
			setAttributeDisplayValue: function(propertyName, propertyValue) {
				switch (propertyName) {
					case "style":
						propertyValue = this.getStyleLookupValue(propertyValue);
						break;
					default:
						this.callParent(arguments);
						return;
				}
				this.set(propertyName, propertyValue);
			},

			/**
			 * Sets order and order direction attributes.
			 * @protected
			 * @virtual
			 */
			initOrderLookupValues: function() {
				var orderColumns = this._findOrderColumns();
				this._setOrderColumnAttributes(orderColumns);
				if (Ext.isEmpty(orderColumns)) {
					this.setDefaultOrderColumn();
				}
			},

			/**
			 * Finds order columns is grid config.
			 * @private
			 * @return {Array} Array of order columns.
			 */
			_findOrderColumns: function() {
				var gridConfig = this.get("gridConfig");
				var columns = gridConfig && gridConfig.items;
				return Terrasoft.filter(columns, function(column) {
					return column.orderPosition && column.orderDirection;
				});
			},

			/**
			 * Sets order and order direction attributes by collection.
			 * @private
			 * @param {Array} orderColumns Order columns collection.
			 */
			_setOrderColumnAttributes: function(orderColumns) {
				Terrasoft.each(orderColumns, function(column) {
					var orderDirectionLookupValue = this.getOrderDirectionLookupValue(column.orderDirection);
					this.set("orderDirection", orderDirectionLookupValue);
					var columnName = column.bindTo;
					var columnCaption = column.caption;
					var orderColumnLookupValue = this.getLookupValue(columnName, columnCaption);
					this.set("orderColumn", orderColumnLookupValue);
				}, this);
			},

			/**
			 * Unsets order columns in collection.
			 * @private
			 * @param {Array} orderColumns Order columns.
			 */
			_unsetOrderColumns: function(orderColumns) {
				Terrasoft.each(orderColumns, function(column) {
					delete column.orderDirection;
					delete column.orderPosition;
				});
			},

			/**
			 * Sets order columns to collection.
			 * @param {Array} columns Column collection.
			 * @private
			 */
			_setOrderColumns: function(columns) {
				var orderColumn = this.get("orderColumn");
				orderColumn = (orderColumn && orderColumn.value) || orderColumn;
				var orderDirection = this.get("orderDirection");
				orderDirection = (orderDirection && orderDirection.value) || orderDirection;
				Terrasoft.each(columns, function(column) {
					if (column.bindTo === orderColumn) {
						column.orderDirection = orderDirection;
						column.orderPosition = 1;
					}
				}, this);
			},

			/**
			 * Sets order column to grid config.
			 * @protected
			 * @virtual
			 */
			setColumnGridConfig: function() {
				var orderColumns = this._findOrderColumns();
				this._unsetOrderColumns(orderColumns);
				var gridConfig = this.get("gridConfig");
				var columns = gridConfig && gridConfig.items;
				this._setOrderColumns(columns);
				this.reloadGridSettingsPageConfig(true);
			},

			/**
			 * Clears columns.
			 * @protected
			 * @virtual
			 */
			clearColumn: function() {
				this.set("orderColumn", null, {silent: true});
				this.setDefaultGridConfig();
			},

			/**
			 * Sets default grid config.
			 * @protected
			 * @virtual
			 */
			setDefaultGridConfig: function() {
				var entitySchemaName = this.get("entitySchemaName");
				if (!entitySchemaName) {
					return;
				}
				var entitySchemaNameValue = this.get("entitySchemaName").Name;
				this.getEntitySchemaByName(entitySchemaNameValue, this.setDefaultGridConfigToProperty, this);
			},

			/**
			 * Returns default grid config.
			 * @private
			 * @param {Object} displayColumn Column to display.
			 * @param {String} displayColumn.name Name of the column to display.
			 * @param {String} displayColumn.caption Caption of the column to display.
			 * @return {Object} Default grid config.
			 */
			_getDefaultGridConfig: function(displayColumn) {
				var defaultGridConfig = {};
				defaultGridConfig.items = [{
					"bindTo": displayColumn.name,
					"caption": displayColumn.caption,
					"position": {
						"column": 0,
						"colSpan": 12,
						"row": 1
					},
					"metaPath": displayColumn.name,
					"orderDirection": 2,
					"orderPosition": 1
				}];
				return defaultGridConfig;
			},

			/**
			 * Sets default grid config property.
			 * @protected
			 * @virtual
			 * @param {Terrasoft.BaseEntitySchema} entitySchema Entity schema.
			 */
			setDefaultGridConfigToProperty: function(entitySchema) {
				this.set("EntitySchema", entitySchema);
				var displayColumn = entitySchema.primaryDisplayColumn || entitySchema.primaryColumn;
				var defaultGridConfig = this._getDefaultGridConfig(displayColumn);
				this.set("gridConfig", defaultGridConfig);
				this.setDefaultOrderColumn();
			},

			/**
			 * Sets default sort column value.
			 * @protected
			 */
			setDefaultOrderColumn: function() {
				if (!Ext.isEmpty(this.get("orderColumn"))) {
					return;
				}
				var gridConfig = this.get("gridConfig");
				var gridItems = gridConfig && gridConfig.items;
				if (Ext.isEmpty(gridItems)) {
					return;
				}
				var column = gridItems[0];
				var orderColumnLookupValue = this.getLookupValue(column.bindTo, column.caption);
				this.set("orderColumn", orderColumnLookupValue);
				var orderDirection = this.get("orderDirection");
				if (Ext.isEmpty(orderDirection)) {
					this.set("orderDirection", this.getOrderDirectionLookupValue(2));
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseWidgetDesigner#canRefreshWidget.
			 * @overridden
			 */
			canRefreshWidget: function() {
				var canRefresh = this.get("moduleLoaded") && this.get("ModuleRendered")
					&& this.isNotEmpty(this.get("entitySchemaName")) && this.validate();
				return Boolean(canRefresh);
			},

			/**
			 * ########## ###### ######## #####.
			 * @protected
			 * @virtual
			 * @param {String} styleValue ######## #####.
			 * @return {Object} ########## ###### ######## #####.
			 */
			getStyleLookupValue: function(styleValue) {
				var styleDefaultConfig = this.getStyleDefaultConfig();
				return styleDefaultConfig[styleValue];
			},

			/**
			 * ########## ###### ######## ########### ##########.
			 * @protected
			 * @virtual
			 * @param {String} orderDirectionValue ########### ##########.
			 * @return {Object} ########## ###### ######## ########### ##########.
			 */
			getOrderDirectionLookupValue: function(orderDirectionValue) {
				var orderDirectionDefaultConfig = this.getOrderDirectionDefaultConfig();
				return orderDirectionDefaultConfig[orderDirectionValue];
			},

			/**
			 * ########## ########### ###### ########### ######.
			 * @protected
			 * @virtual
			 * @param {String} value ########.
			 * @param {String} displayValue ######## ### ###########.
			 * @return {Object} ########## ###### ########### ######.
			 */
			getLookupValue: function(value, displayValue) {
				return {
					value: value,
					displayValue: displayValue
				};
			},

			/**
			 * Initialize schema tabs.
			 * @protected
			 */
			initTabs: function() {
				this.set("ViewSettingsTab", true);
				this.set("ColumnsSettingsTab", true);
				this.setTabDataContainerVisible("ViewSettingsTab", false);
				this.set("ActiveTabName", "ColumnsSettingsTab");
			},

			/**
			 * Sets tab data container visibility.
			 * @protected
			 * @param {String} tabDataContainerId Tab data container dom identifier.
			 * @param {Boolean} isVisible Visible tag.
			 */
			setTabDataContainerVisible: function(tabDataContainerId, isVisible) {
				var tabDataContainer = Ext.get(tabDataContainerId);
				if (tabDataContainer) {
					tabDataContainer.applyStyles({"display": isVisible ? "block" : "none"});
				}
			},

			/**
			 * On active tab changed event handler.
			 * @param {Terrasoft.BaseViewModel} activeTab Active tab view model.
			 */
			activeSettingsTabChange: function(activeTab) {
				var activeTabName = activeTab.get("Name");
				this.set("ActiveTabName", activeTabName);
				var tabsCollection = this.get("SittingsTabsCollection");
				tabsCollection.eachKey(function(tabName, tab) {
					this.setTabDataContainerVisible(tab.get("Name"), false);
				}, this);
				this.setTabDataContainerVisible(activeTabName, true);
				this.reloadGridSettingsPageConfig(true);
				this.loadFilterModule();
			},

			/**
			 * Reload grid settings page config.
			 * @protected
			 * @param {Boolean} [reloadPreviewData] Need reload grid settings preview data tag.
			 */
			reloadGridSettingsPageConfig: function(reloadPreviewData) {
				if (!this.canRefreshWidget() || this.get("ActiveTabName") !== "ColumnsSettingsTab") {
					return;
				}
				this.sandbox.publish("ReloadGridSettings", reloadPreviewData);
			},

			/**
			 * @inheritdoc Terrasoft.BaseWidgetDesigner#loadFilterModule.
			 * @overridden
			 */
			loadFilterModule: function() {
				if (this.get("ViewSettingsTab") === false) {
					return;
				}
				this.callParent(arguments);
			}
		},
		diff: [
			{
				"operation": "merge",
				"name": "WidgetDesignerContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"textClass": "center-panel",
						"wrapClassName": ["widget-designer-container grid-designer-container"]
					}
				}
			},
			{
				"operation": "merge",
				"name": "HeaderContainer",
				"values": {
					"classes": {
						"wrapClassName": ["grid-designer-header-container"]
					}
				}
			},
			{
				"operation": "merge",
				"name": "WidgetProperties",
				"values": {
					"classes": {
						"wrapClassName": ["widget-properties"]
					}
				}
			},
			{
				"operation": "merge",
				"name": "FooterContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["card-content-container"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "CenterMainContainer",
				"parentName": "FooterContainer",
				"propertyName": "items",
				"values": {
					"classes": {
						"wrapClassName": ["center-main-container"]
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "Style",
				"parentName": "FormatProperties",
				"propertyName": "items",
				"values": {
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"bindTo": "style",
					"labelConfig": {
						"visible": true,
						"caption": {
							"bindTo": "Resources.Strings.StyleLabel"
						}
					},
					"controlConfig": {
						"className": "Terrasoft.ComboBoxEdit",
						"prepareList": {
							"bindTo": "prepareStyleList"
						},
						"list": {
							"bindTo": "styleList"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "OrderColumn",
				"parentName": "QueryProperties",
				"propertyName": "items",
				"values": {
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"bindTo": "orderColumn",
					"labelConfig": {
						"visible": true,
						"caption": {
							"bindTo": "Resources.Strings.ColumnToOrderLabel"
						}
					},
					"controlConfig": {
						"className": "Terrasoft.ComboBoxEdit",
						"prepareList": {
							"bindTo": "prepareOrderColumnList"
						},
						"list": {
							"bindTo": "orderColumnList"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "OrderDirection",
				"parentName": "QueryProperties",
				"propertyName": "items",
				"values": {
					"dataValueType": Terrasoft.DataValueType.ENUM,
					"bindTo": "orderDirection",
					"labelConfig": {
						"visible": true,
						"caption": {
							"bindTo": "Resources.Strings.OrderDirectionLabel"
						}
					},
					"controlConfig": {
						"className": "Terrasoft.ComboBoxEdit",
						"prepareList": {
							"bindTo": "prepareOrderDirectionList"
						},
						"list": {
							"bindTo": "orderDirectionList"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "RowCount",
				"parentName": "QueryProperties",
				"propertyName": "items",
				"values": {
					"dataValueType": Terrasoft.DataValueType.INTEGER,
					"bindTo": "rowCount",
					"labelConfig": {
						"visible": true,
						"caption": {
							"bindTo": "Resources.Strings.RowsQuantityLabel"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "CenterHeaderContainer",
				"parentName": "CenterMainContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "move",
				"name": "Caption",
				"parentName": "CenterHeaderContainer",
				"propertyName": "items"
			},
			{
				"operation": "move",
				"name": "EntitySchemaName",
				"parentName": "CenterHeaderContainer",
				"propertyName": "items"
			},
			{
				"operation": "insert",
				"name": "TabsContainer",
				"parentName": "CenterMainContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "SittingsTabs",
				"parentName": "TabsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.TAB_PANEL,
					"collection": {"bindTo": "SittingsTabsCollection"},
					"activeTabChange": {"bindTo": "activeSettingsTabChange"},
					"activeTabName": {"bindTo": "ActiveTabName"},
					"tabs": []
				}
			},
			{
				"operation": "insert",
				"name": "ColumnsSettingsTab",
				"parentName": "SittingsTabs",
				"propertyName": "tabs",
				"values": {
					caption: {
						"bindTo": "Resources.Strings.ColumnSettingsTabCaption"
					},
					items: []
				}
			},
			{
				"operation": "insert",
				"name": "CustomColumnSettingsContainer",
				"index": 0,
				"values": {
					"id": "CustomColumnSettingsContainer",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["custom-column-settings-container"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ColumnsSettingsWrapper",
				"parentName": "ColumnsSettingsTab",
				"propertyName": "items",
				"values": {
					"id": "ColumnsSettingsWrapper",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["grid-column-settings-container"]
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ViewSettingsTab",
				"parentName": "SittingsTabs",
				"propertyName": "tabs",
				"values": {
					caption: {
						"bindTo": "Resources.Strings.ViewSettingsTabCaption"
					},
					items: []
				}
			},
			{
				"operation": "insert",
				"name": "ViewSettingsWrapper",
				"parentName": "ViewSettingsTab",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {
						"wrapClassName": ["grid-view-settings-container"]
					},
					"items": []
				}
			},
			{
				"operation": "move",
				"name": "WidgetProperties",
				"parentName": "ViewSettingsWrapper",
				"propertyName": "items"
			},
			{
				"operation": "move",
				"name": "WidgetModule",
				"parentName": "ColumnsSettingsWrapper",
				"propertyName": "items"
			},
			{
				"operation": "merge",
				"name": "WidgetModule",
				"parentName": "ColumnsSettingsWrapper",
				"propertyName": "items",
				"values": {
					"visible": false
				}
			}
		]
	};
});



