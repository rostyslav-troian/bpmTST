Terrasoft.configuration.Structures["BaseSectionV2"] = {innerHierarchyStack: ["BaseSectionV2NUI", "BaseSectionV2GoogleTagManagerMeasurements", "BaseSectionV2Exchange", "BaseSectionV2CTIBase", "BaseSectionV2"], structureParent: "BaseDataView"};
define('BaseSectionV2NUIStructure', ['BaseSectionV2NUIResources'], function(resources) {return {schemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',schemaCaption: "Section base schema", parentSchemaName: "BaseDataView", schemaName:'BaseSectionV2NUI',parentSchemaUId:'22e2cf10-98b4-4c3c-bc28-346238e15c21',extendParent:false,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseSectionV2GoogleTagManagerMeasurementsStructure', ['BaseSectionV2GoogleTagManagerMeasurementsResources'], function(resources) {return {schemaUId:'2e70611b-169e-484f-8c1e-233c8ace3cb2',schemaCaption: "Section base schema", parentSchemaName: "BaseSectionV2NUI", schemaName:'BaseSectionV2GoogleTagManagerMeasurements',parentSchemaUId:'7912fb69-4fee-429f-8b23-93943c35d66d',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseSectionV2NUI",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseSectionV2ExchangeStructure', ['BaseSectionV2ExchangeResources'], function(resources) {return {schemaUId:'58e7f00d-f281-4044-a7cf-6033d76507db',schemaCaption: "Section base schema", parentSchemaName: "BaseSectionV2GoogleTagManagerMeasurements", schemaName:'BaseSectionV2Exchange',parentSchemaUId:'2e70611b-169e-484f-8c1e-233c8ace3cb2',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseSectionV2GoogleTagManagerMeasurements",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseSectionV2CTIBaseStructure', ['BaseSectionV2CTIBaseResources'], function(resources) {return {schemaUId:'d4eac713-ab8b-4fea-b1cd-68399bc5eee7',schemaCaption: "Section base schema", parentSchemaName: "BaseSectionV2Exchange", schemaName:'BaseSectionV2CTIBase',parentSchemaUId:'58e7f00d-f281-4044-a7cf-6033d76507db',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseSectionV2Exchange",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseSectionV2Structure', ['BaseSectionV2Resources'], function(resources) {return {schemaUId:'0a0ea9d3-ccd1-47d1-97ff-43005fe5b214',schemaCaption: "Section base schema", parentSchemaName: "BaseSectionV2CTIBase", schemaName:'BaseSectionV2',parentSchemaUId:'d4eac713-ab8b-4fea-b1cd-68399bc5eee7',extendParent:true,type:Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"BaseSectionV2CTIBase",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('BaseSectionV2NUIResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseSectionV2NUI", ["RightUtilities", "ConfigurationEnums"], function(RightUtilities, ConfigurationEnums) {
	return {
		messages: {
			/**
			 * @message RerenderModule
			 * Re-render dashboards module message.
			 */
			"RerenderModule": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		attributes: {
			/**
			 * Chart edit SchemaName.
			 */
			"ChartEditSchemaName": {
				dataValueType: Terrasoft.DataValueType.TEXT
			},
			/**
			 * Sign of  empty chart.
			 */
			"IsEmptyChart": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},
			/**
			 * Analytics chart active row.
			 */
			"AnalyticsChartActiveRow": {
				dataValueType: Terrasoft.DataValueType.GUID
			},
			/**
			 * Analytics view registry collection.
			 */
			"AnalyticsGridData": {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},
			/**
			 * Printing button visibility of analytic form.
			 */
			"IsAnalyticsPrintButtonVisible": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},
			/**
			 * Analytics data collection.
			 */
			"AnalyticsData": {
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},
			/**
			 * Sign of analytic action buttons visibility.
			 */
			"IsAnalyticsActionButtonsContainerVisible": {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},
			/**
			 * View name of analytics section.
			 */
			"AnalyticsDataViewName": {
				dataValueType: Terrasoft.DataValueType.TEXT,
				value: "AnalyticsDataView"
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * Loads dashboard module.
			 * @private
			 */
			loadDashboardModule: function() {
				if (this.get("Restored")) {
					return;
				}
				var moduleId = this.sandbox.id + "SectionDashboard";
				var rendered = this.sandbox.publish("RerenderModule", {
					renderTo: "DashboardModule"
				}, [moduleId]);
				if (!rendered) {
					this.sandbox.loadModule("SectionDashboardsModule", {
						renderTo: "DashboardModule",
						id: moduleId,
						parameters: {
							viewModelConfig: {
								DashboardDataViewName: this.get("AnalyticsDataViewName")
							}
						}
					});
				}
			},

			// endregion

			// region Methods: Protected

			/**
			 * Sets a class for a section container, depending on the active view.
			 * @override
			 * @param {String} viewName Active view.
			 */
			updateSectionContainerStyle: function(viewName) {
				var schema = this.Ext.get(this.name + "Container");
				if (!schema) {
					return;
				}
				if (viewName === "AnalyticsDataView") {
					schema.addCls("dashboard-container");
				} else {
					schema.removeCls("dashboard-container");
				}
			},

			/**
			 * Update section.
			 * @override
			 */
			updateSection: function() {
				var activeViewName = this.getActiveViewName();
				if (activeViewName === "AnalyticsDataView") {
					this.loadAnalyticsDataView();
				} else {
					this.reloadGridData();
					this.reloadSummaryModule();
				}
			},

			/**
			 * Returns default section views.
			 * Registry. Analytics.
			 * @override
			 */
			getDefaultDataViews: function() {
				var gridDataView = this.callParent(arguments);
				var analyticsDataView = {
					name: this.get("AnalyticsDataViewName"),
					caption: this.getDefaultAnalyticsDataViewCaption(),
					hint: this.get("Resources.Strings.DashboardsDataViewHint"),
					icon: this.getDefaultAnalyticsDataViewIcon()
				};
				return {
					"GridDataView": gridDataView && gridDataView.GridDataView,
					"AnalyticsDataView": analyticsDataView
				};
			},

			/**
			 * Initialize initial need load data property value.
			 * @override
			 */
			needLoadData: function() {
				if (!this.get("CanLoadMoreData")) {
					return;
				}
				this.callParent(arguments);
				if (!this.get("IsActionButtonsContainerVisible") && this.get("IsAnalyticsActionButtonsContainerVisible")) {
					this.loadAnalyticsDataView();
				}
			},

			/**
			 * Initializes visible container ActionButtons.
			 * @override
			 */
			initIsActionButtonsContainerVisible: function() {
				this.callParent(arguments);
				this.set("IsAnalyticsActionButtonsContainerVisible", false);
			},

			/**
			 * Loads a list view
			 * @override
			 */
			loadGridDataView: function() {
				this.set("IsAnalyticsActionButtonsContainerVisible", false);
				this.callParent(arguments);
			},

			/**
			 * Returns the default analytics view caption.
			 * @protected
			 * @return {String} Default analytics view caption.
			 */
			getDefaultAnalyticsDataViewCaption: function() {
				return this.getModuleCaption();
			},

			/**
			 * Returns the default analytics view icon.
			 * @protected
			 * @return {Object} Default analytics view icon.
			 */
			getDefaultAnalyticsDataViewIcon: function() {
				return this.get("Resources.Images.AnalyticsDataViewIcon");
			},

			/**
			 * Gets menu items on the "View" button.
			 * @override
			 */
			getViewOptions: function() {
				var viewOptions = this.callParent(arguments);
				this.addChangeDataViewOptions(viewOptions);
				return viewOptions;
			},

			// endregion

			// region Methods: Public

			/**
			 * Adds data views to "View" menu.
			 * @override
			 * @param {Terrasoft.BaseViewModelCollection} viewOptions Menu items of "View" menu.
			 */
			addChangeDataViewOptions: function(viewOptions) {
				var dataViews = this.get("DataViews");
				if (!dataViews.contains(this.get("AnalyticsDataViewName"))) {
					return;
				}
				viewOptions.addItem(this.getButtonMenuItem({
					"Caption": {"bindTo": "Resources.Strings.AnalyticsDataViewCaption"},
					"Click": {"bindTo": "changeDataView"},
					"Tag": this.get("AnalyticsDataViewName"),
					"ImageConfig": this.get("Resources.Images.AnalyticsDataIcon")
				}));
			},

			/**
			 * Check view visible.
			 * @override
			 */
			validationViewVisible: function() {
				var savedActiveViewName = this.getActiveViewNameFromProfile();
				var historyStateInfo = this.getHistoryStateInfo();
				if (historyStateInfo.workAreaMode === ConfigurationEnums.WorkAreaMode.COMBINED &&
					savedActiveViewName === this.get("AnalyticsDataViewName") ||
					savedActiveViewName === Terrasoft.emptyString) {
					return false;
				}
				return true;
			},

			/**
			 * Executes analytics view loading.
			 * @protected
			 */
			loadAnalyticsDataView: function() {
				this.set("IsActionButtonsContainerVisible", false);
				this.set("IsAnalyticsActionButtonsContainerVisible", true);
				this.scrollTop();
			},

			// endregion

			// region Methods: Public (Obsolete)

			/**
			 * Checks if the user has the right to add/change/delete a schedule
			 * according to the system settings "Analytics Setup" (CanManageAnalytics)
			 * @return {Boolean} Returns of user right to edit chart.
			 */
			checkCanManageAnalytics: function() {
				RightUtilities.checkCanExecuteOperation({
					operation: "CanManageAnalytics"
				}, this.onCanManageAnalytics, this);
			},

			/**
			 * Sets the attribute "CanManageAnalytics" depending on the value of the requested
			 * system settings "Show Demo Links" (ShowDemoLinks)
			 * and access to the "Configure Analytics" operation (CanManageAnalytics)
			 */
			onCanManageAnalytics: function(result) {
				Terrasoft.SysSettings.querySysSettingsItem("ShowDemoLinks", function(value) {
					var canManageAnalytics = !value && result;
					this.set("canManageAnalytics", canManageAnalytics);
				}, this);
			}

			// endregion

		},
		diff: [
			// region ANALYTICS MODE
			{
				"operation": "insert",
				"name": "AnalyticsModeActionButtonsRightContainer",
				"parentName": "FiltersContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["separate-action-buttons-right-container-wrapClass"],
					"visible": {"bindTo": "IsAnalyticsActionButtonsContainerVisible"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "AnalyticsModeReportsButton",
				"parentName": "AnalyticsModeActionButtonsRightContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.ReportsButtonCaption"},
					"classes": {"wrapperClass": ["actions-button-margin-right"]},
					"menu": {"items": {"bindTo": "ReportGridData"}},
					"visible": {"bindTo": "IsAnalyticsPrintButtonVisible"}
				}
			},
			{
				"operation": "insert",
				"name": "AnalyticsModeViewOptionsButton",
				"parentName": "AnalyticsModeActionButtonsRightContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"caption": {"bindTo": "Resources.Strings.ViewOptionsButtonCaption"},
					"menu": []
				}
			},
			{
				"operation": "insert",
				"index": 0,
				"name": "OpenAnalyticsViewAnalyticsModeOptionsMenuItem",
				"parentName": "AnalyticsModeViewOptionsButton",
				"propertyName": "menu",
				"values": {
					"itemType": Terrasoft.ViewItemType.MENU_ITEM,
					"caption": {"bindTo": "Resources.Strings.GridDataViewCaption"},
					"markerValue": {"bindTo": "Resources.Strings.GridDataViewCaption"},
					"click": {"bindTo": "changeDataView"},
					"tag": "GridDataView"
				}
			},
			// endregion
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
				"name": "AnalyticsGridLayout",
				"parentName": "AnalyticsGridLayoutContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
					"visible": false,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "AddChartActionButton",
				"parentName": "AnalyticsActionButtonsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.GREEN,
					"caption": {"bindTo": "Resources.Strings.AddChartButtonCaption"},
					"visible": false,
					"click": {"bindTo": "addChart"},
					"classes": {
						"textClass": ["actions-button-margin-right"],
						"wrapperClass": ["actions-button-margin-right"]
					}
				}
			}
		]
	};
});

define('BaseSectionV2GoogleTagManagerMeasurementsResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseSectionV2GoogleTagManagerMeasurements", ["GoogleTagManagerMeasurementsUtilities"], function() {
	return {

		mixins: {
			/**
			 * Mixin for conducting measurements for sending this data to Google tag manager.
			 */
			GoogleTagManagerMeasurementsUtilities: Terrasoft.GoogleTagManagerMeasurementsUtilities
		},

		methods: {

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#init
			 * @overridden
			 */
			init: function() {
				this.startGoogleTagManagerMeasurements();
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.GridUtilitiesV2#onGridDataLoaded
			 * @overridden
			 */
			onGridDataLoaded: function() {
				this.callParent(arguments);
				this.stopGoogleTagManagerMeasurements();
			},

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#sendGoogleTagManagerData
			 * @overridden
			 */
			sendGoogleTagManagerData: this.Terrasoft.emptyFn

			//endregion

		}
	};
});

define('BaseSectionV2ExchangeResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseSectionV2Exchange", ["EmailLinksMixin"], function() {
	return {
		mixins: {
			/**
			 * Provides methods for email sending.
			 */
			"EmailLinksMixin": "Terrasoft.EmailLinksMixin"
		},
		methods: {

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.callParent(arguments);
				this.initSyncMailboxCount();
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#linkClicked
			 * @overridden
			 */
			linkClicked: function(rowId, columnName) {
				var handled = false;
				var column = this.columns[columnName];
				if (column.name !== this.primaryDisplayColumnName && !column.isLookup) {
					var row = this.getGridDataRow(rowId);
					var emailConfig = this.getEmailConfig(rowId, row.get(columnName),
						row.get(this.primaryDisplayColumnName));
					handled = this.emailLinkClicked(emailConfig);
				}
 				return !handled && this.callParent(arguments);
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[ ]/**SCHEMA_DIFF*/
	};
});

define('BaseSectionV2CTIBaseResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("BaseSectionV2CTIBase", ["terrasoft", "ContextCallUtilities"], function(Terrasoft) {
	return {
		messages: {
			"CallCustomer": {
				"mode": Terrasoft.MessageMode.PTP,
				"direction": Terrasoft.MessageDirectionType.PUBLISH
			}
		},
		mixins: {
			/**
			 * ###### ############ ######.
			 */
			"ContextCallUtilities": "Terrasoft.ContextCallUtilities"
		},
		methods: {

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#linkClicked
			 * @overridden
			 */
			linkClicked: function(rowId, columnName) {
				var handled = this.phoneLinkClicked(rowId, columnName);
				return !(handled || !this.callParent(arguments));
			}

			//endregion

		}
	};
});

define("BaseSectionV2", ["PortalFolderManagerViewModel", "SchemaAccessControllerMixin"], function () {
	return {
		mixins: {
			"SchemaAccessControllerMixin": "Terrasoft.SchemaAccessControllerMixin"
		},
		methods: {
			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#init
			 * @override
			 */
			init: function () {
				if (this.Terrasoft.isCurrentUserSsp()) {
					const hash = this.Terrasoft.combinePath("SectionModuleV2", "sectionSchema");
					const isRedirected = this.redirectIfDenied("sectionSchema", hash);
					if (isRedirected) {
						return;
					}
				}
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.BaseSectionV2#getViewOptions
			 * @override
			 */
			getViewOptions: function () {
				if (!this.Terrasoft.isCurrentUserSsp()) {
					return this.callParent(arguments);
				}
				var viewOptions = this.Ext.create("Terrasoft.BaseViewModelCollection");
				viewOptions.addItem(this.getButtonMenuItem({
					"Caption": {"bindTo": "Resources.Strings.SortMenuCaption"},
					"Items": {"bindTo": "SortColumns"},
					"Visible": {"bindTo": "IsSortMenuVisible"}
				}));
				if (this.getIsFeatureEnabled("PortalColumnConfig")) {
					viewOptions.addItem(this.getButtonMenuItem({
						"Caption": {"bindTo": "Resources.Strings.OpenGridSettingsCaption"},
						"Click": {"bindTo": "openGridSettings"},
						"Visible": {"bindTo": "IsGridSettingsMenuVisible"}
					}));
				}
				return viewOptions;
			}

		}
	};
});


