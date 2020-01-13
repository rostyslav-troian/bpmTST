Terrasoft.configuration.Structures["ContentItemPanel"] = {innerHierarchyStack: ["ContentItemPanelContentBuilder", "ContentItemPanel"]};
define('ContentItemPanelContentBuilderStructure', ['ContentItemPanelContentBuilderResources'], function(resources) {return {schemaUId:'6afe96ba-21f6-4518-a354-c0a1aa7b1151',schemaCaption: "ContentItemPanel", parentSchemaName: "", schemaName:'ContentItemPanelContentBuilder',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContentItemPanelStructure', ['ContentItemPanelResources'], function(resources) {return {schemaUId:'b11414e4-6f75-4ad4-ae09-c54371fef3b9',schemaCaption: "ContentItemPanel", parentSchemaName: "ContentItemPanelContentBuilder", schemaName:'ContentItemPanel',parentSchemaUId:'6afe96ba-21f6-4518-a354-c0a1aa7b1151',extendParent:true,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:"ContentItemPanelContentBuilder",schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define('ContentItemPanelContentBuilderResources', ['terrasoft'], function(Terrasoft) {
var localizableStrings={

};
var localizableImages={

};
return {localizableStrings:localizableStrings,localizableImages:localizableImages};
});
define("ContentItemPanelContentBuilder", ["ContentItemPanelResources", "css!ContentItemStylesPageCSS",
		"BreadcrumbsItemViewModel"], function() {
	return {
		modules: {
			ContentItemStylesPageModule: {
				moduleId: "ContentItemStylesPageModule",
				moduleName: "ConfigurationModuleV2",
				config: {
					schemaName: "ContentItemStylesPage",
					isSchemaConfigInitialized: true,
					useHistoryState: false,
					parameters: {
						viewModelConfig: {
							Config: {
								attributeValue: "Config"
							}
						}
					}
				}
			},
			ContentBlockPropertiesPageModule: {
				moduleId: "ContentBlockPropertiesPageModule",
				moduleName: "ConfigurationModuleV2",
				config: {
					schemaName: "ContentBlockPropertiesPage",
					isSchemaConfigInitialized: true,
					useHistoryState: false,
					parameters: {
						viewModelConfig: {
							Config: {
								attributeValue: "Config"
							}
						}
					}
				}
			},
			ContentBlockStructurePageModule: {
				moduleId: "ContentBlockStructurePageModule",
				moduleName: "ConfigurationModuleV2",
				config: {
					schemaName: "ContentBlockStructurePage",
					isSchemaConfigInitialized: true,
					useHistoryState: false,
					parameters: {
						viewModelConfig: {
							Config: {
								attributeValue: "Config"
							}
						}
					}
				}
			}
		},
		attributes: {
			/**
			 * Name of active tab.
			 * @type {String}
			 */
			ActivePropertiesTabName: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},

			/**
			 * Content element caption.
			 * @type {String}
			 */
			ElementCaption: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},

			/**
			 * Content element icon.
			 * @type {String}
			 */
			ElementIcon: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},

			/**
			 * Context help text for tooltip.
			 * @type {String}
			 */
			ElementContextHelp: {
				dataValueType: Terrasoft.DataValueType.TEXT
			},

			/**
			 * Flag to indicate version of template config.
			 * @type {Boolean}
			 */
			IsMjmlConfig: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * Flag to indicate necessity to show styles panel.
			 */
			IsStylesVisible: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			},

			/**
			 * Collection of navigation items.
			 * @type {Terrasoft.BaseViewModelCollection}
			 */
			BreadcrumbsItems: {
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: Ext.create("Terrasoft.BaseViewModelCollection")
			}
		},
		messages: {
			/**
			 * @message ContentItemConfigChanged.
			 * Actualize current config.
			 */
			"ContentItemConfigChanged": {
				mode: Terrasoft.MessageMode.BROADCAST,
				direction: Terrasoft.MessageDirectionType.SUBSCRIBE
			},
			/**
			 * @message UpdateContentItemConfig
			 * Sets actual content item config.
			 */
			"UpdateContentItemConfig": {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.BIDIRECTIONAL
			},
			/**
			 * @message SetContentItemSelected
			 * Highlights item on sheet and reloads it's properties page by id.
			 */
			"SetContentItemSelected": {
				direction: Terrasoft.MessageDirectionType.PUBLISH,
				mode: Terrasoft.MessageMode.PTP
			}
		},
		methods: {

			/**
			 * Save initial config state.
			 * @param {Object} config Content item config.
			 * @private
			 */
			_onContentItemChanged: function(config) {
				this.$Config = config;
				this._reloadBreadcrumbsItems();
			},

			/**
			 * Updates styles of content item.
			 * @protected
			 * @param {Object} styles Updated content item styles.
			 * @param {Array} stylesFilter List of applicable content item styles.
			 * @param {String} propertyName Name of the changed property.
			 */
			_updateItemStyles: function(styles, stylesFilter, propertyName) {
				Terrasoft.each(stylesFilter, function(parameterName) {
					delete this.$Config[propertyName][parameterName];
					if (styles.hasOwnProperty(parameterName)) {
						this.$Config[propertyName][parameterName] = styles[parameterName];
					}
				}, this);
			},

			/**
			 * Updates config of content item.
			 * @protected
			 * @param {Object} itemConfig Updated content item config.
			 */
			_updateContentItemConfig: function(args) {
				var config = Terrasoft.deepClone(this.$Config);
				this.$Config = config;
				var itemConfig = args.config;
				var propertyName = args.propertyName || "Styles";
				var styles;
				if (itemConfig.hasOwnProperty(propertyName) && Ext.isObject(itemConfig[propertyName])) {
					this._updateItemStyles(itemConfig[propertyName], args.stylesFilter, propertyName);
					styles = this.$Config[propertyName];
				}
				Ext.apply(this.$Config, itemConfig);
				if (styles) {
					this.$Config[propertyName] = styles;
				}
				this.sandbox.publish("UpdateContentItemConfig", this.$Config, ["ItemPanel"]);
			},

			/**
			 * Generates configuration view of the breadcrumbs item.
			 * @protected
			 * @param {Object} itemConfig Link to configuration of element in ContainerList.
			 * @param {Terrasoft.BaseContentStructureItemViewModel} item Structure list item.
			 * @returns {Object} Configuration of structure item in ContainerList.
			 */
			_getBreadcrumbsItemViewConfig: function(itemConfig, item) {
				if (Ext.isFunction(item.getViewConfig)) {
					var isItemSelected = item.get("IsSelected");
					itemConfig.config = item.getViewConfig(isItemSelected);
				}
				return itemConfig;
			},

			/**
			 * Fills BreadcrumbsItems collection from Config.
			 * @private
			 */
			_reloadBreadcrumbsItems: function () {
				this.$BreadcrumbsItems.clear();
				Terrasoft.each(this.$Config.Breadcrumbs, function(item) {
					var itemViewModel = Ext.create("Terrasoft.BreadcrumbsItemViewModel");
					itemViewModel.set("Caption", item.Caption);
					itemViewModel.set("Id", item.Id);
					itemViewModel.set("IsSelected", item.IsSelected);
					itemViewModel.set("IsItemHasParent", item.IsItemHasParent);
					itemViewModel.sandbox = this.sandbox;
					this.$BreadcrumbsItems.addItem(itemViewModel);
				}, this);
			},

			/**
			 * Defines if navigation panel is visible.
			 * @private
			 */
			_isBreadcrumbsPanelVisible: function() {
				return this.$Config && this.$Config.Breadcrumbs && this.$Config.Breadcrumbs.length > 0;
			},

			applyMjmlContentBuilderConditionForTabs: function() {
				var styleTab = this.$PropertiesTabs.get("StyleTab");
				var blockStructureTab = this.$PropertiesTabs.get("BlockStructureTab");
				styleTab.set("Visible", !this.$IsMjmlConfig);
				blockStructureTab.set("Visible", this.$IsMjmlConfig);
			},

			/**
			 * @inheritdoc BaseSchemaViewModel#init
			 * @overridden
			 */
			init: function(callback, scope) {
				this.$IsMjmlConfig = this.$Config.ItemType === "mjblock";
				this.callParent([function() {
					this._reloadBreadcrumbsItems();
					this.applyMjmlContentBuilderConditionForTabs();
					this.initActiveTab();
					this.initPanelAttributes();
					this.sandbox.subscribe("ContentItemConfigChanged", this._onContentItemChanged, this,
						["ItemPanel", "PropertiesPage"]);
					this.sandbox.subscribe("UpdateContentItemConfig", this._updateContentItemConfig, this,
						["ContentItemPropertiesPage", "ContentNavbarPropertiesPage", "PropertyModule"]);
					Ext.callback(callback, scope);
				}, this]);
			},

			/**
			 * Initialize active tab.
			 */
			initActiveTab: function() {
				var activeTabName = this.getDefaultTabName();
				var cachedTabName = Terrasoft.ClientPageSessionCache.getItem("lastActiveContentTab");
				if (cachedTabName) {
					var cachedTab = this.$PropertiesTabs.find(cachedTabName);
					if (cachedTab && cachedTab.$Visible) {
						activeTabName = cachedTabName;
					}
				}
				this.$ActivePropertiesTabName = activeTabName;
				this.set(this.$ActivePropertiesTabName, true);
			},

			getDefaultTabName: function() {
				return this.$IsMjmlConfig ? "BlockStructureTab" : "StyleTab";
			},

			/**
			 * Initialize panel attributes.
			 */
			initPanelAttributes: function() {
				this.$ElementCaption = this.$IsMjmlConfig
					? this.get("Resources.Strings.ContentMjBlockElementCaption")
					: this.get("Resources.Strings.ContentElementCaption");
				this.$ElementContextHelp = this.get("Resources.Strings.ContentElementInfoText");
				this.$ElementIcon = this.$IsMjmlConfig
					? this.get("Resources.Images.ContentMjBlockPanelIcon")
					: this.get("Resources.Images.ContentItemButtonImage");
			},

			/**
			 * Properties tab change event.
			 * @protected
			 * @param {Terrasoft.model.BaseViewModel} activeTab Selected tab.
			 */
			onPropertiesTabChange: function(activeTab) {
				var activeTabName = activeTab.get("Name");
				var tabsCollection = this.get("PropertiesTabs");
				tabsCollection.eachKey(function(tabName, tab) {
					var tabContainerVisibleBinding = tab.get("Name");
					this.set(tabContainerVisibleBinding, false);
				}, this);
				this.set(activeTabName, true);
			},

			/**
			 * Sign for properties tabs can be scrolled.
			 * @protected
			 */
			IsTabPanelScrollable: function() {
				return false;
			},

			/**
			 * @inheritdoc Terrasoft.component#onDestroy
			 * @override
			 */
			onDestroy: function() {
				Terrasoft.ClientPageSessionCache.setItem("lastActiveContentTab", this.$ActivePropertiesTabName);
				this.callParent(arguments);
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "PropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [],
					"backgroundColor": "$Color",
					"wrapClass": ["content-properties-container"],
					"markerValue": {
						"bindTo": "PropertiesContainerMarkerValue"
					}
				}
			},
			{
				"operation": "insert",
				"name": "PropertiesHeader",
				"parentName": "PropertiesContainer",
				"propertyName": "items",
				"values": {
					"classes": {
						"wrapClassName": ["properties-header"]
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ContentItemNavigationContainer",
				"parentName": "PropertiesContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"visible": {"bindTo": "_isBreadcrumbsPanelVisible"},
					"items": [],
					"wrapClass": ["breadcrumbs-container-wrapper"]
				}
			},
			{
				"operation": "insert",
				"name": "BreadcrumbsContainer",
				"parentName": "ContentItemNavigationContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"className": "Terrasoft.ContainerList",
					"generator": "ConfigurationItemGenerator.generateContainerList",
					"idProperty": "Id",
					"collection": "BreadcrumbsItems",
					"onGetItemConfig": "_getBreadcrumbsItemViewConfig",
					"itemPrefix": "breadcrumbs-item",
					"dataItemIdPrefix": "breadcrumbs-item",
					"classes": {
						"wrapClassName": ["breadcrumbs-container"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "ContentElementButton",
				"parentName": "PropertiesHeader",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"imageConfig": "$ElementIcon",
					"classes": {
						"wrapperClass": ["item-title-button"],
						"imageClass": ["item-title-button-image"]
					},
					"enabled": false
				}
			},
			{
				"operation": "insert",
				"name": "ContentElementLabel",
				"parentName": "PropertiesHeader",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": "$ElementCaption",
					"classes": {
						"labelClass": ["t-label"]
					}
				}
			},
			{
				"operation": "insert",
				"name": "HeaderToolsContainer",
				"parentName": "PropertiesHeader",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["tools-container-wrapClass"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "InfoButton",
				"parentName": "HeaderToolsContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"controlConfig": {
						"imageConfig": "$Resources.Images.InfoButtonImage"
					},
					"content": "$ElementContextHelp",
					"behaviour": {
						"displayEvent": Terrasoft.controls.TipEnums.displayEvent.CLICK
					}
				}
			},
			{
				"operation": "insert",
				"name": "PropertiesContentWrap",
				"parentName": "PropertiesContainer",
				"propertyName": "items",
				"values": {
					"classes": {
						"wrapClassName": ["properties-content-wrap"]
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PropertiesTabPanel",
				"parentName": "PropertiesContentWrap",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.TAB_PANEL,
					"id": "propertiesTabPanel",
					"selectors": {
						"wrapEl": "#propertiesTabPanel"
					},
					"classes": {
						"wrapClassName": ["properties-tab-panel"]
					},
					"collection": { bindTo: "PropertiesTabs" },
					"activeTabName": "$ActivePropertiesTabName",
					"activeTabChange": "$onPropertiesTabChange",
					"defaultMarkerValueColumnName": "Name",
					"isScrollVisible":"$IsTabPanelScrollable",
					"tabs": []
				}
			},
			{
				"operation": "insert",
				"name": "StyleTab",
				"parentName": "PropertiesTabPanel",
				"propertyName": "tabs",
				"values": {
					"caption": "$Resources.Strings.StyleTabCaption",
					"markerValue": "StyleTab",
					"items": [],
					"wrapClass": ["content-item-style-tab", "content-properties-tab"]
				}
			},
			{
				"operation": "insert",
				"name": "StyleTabContainer",
				"parentName": "StyleTab",
				"propertyName": "items",
				"values": {
					"classes": {
						"wrapClassName": ["content-properties-tab-container", "scrollable-container"]
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "BlockStructureTab",
				"parentName": "PropertiesTabPanel",
				"propertyName": "tabs",
				"values": {
					"caption": "$Resources.Strings.StructureTabCaption",
					"markerValue": "BlockStructureTab",
					"items": [],
					"wrapClass": ["content-item-structure-tab", "content-properties-tab"]
				}
			},
			{
				"operation": "insert",
				"name": "BlockStructureTabContainer",
				"parentName": "BlockStructureTab",
				"propertyName": "items",
				"values": {
					"classes": {
						"wrapClassName": ["content-properties-tab-container", "scrollable-container"]
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ContentBlockStructurePageModule",
				"parentName": "BlockStructureTabContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				},
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ContentBlockPropertiesPageModule",
				"parentName": "StyleTabContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				},
				"index": 0
			},
			{
				"operation": "insert",
				"name": "ContentItemStylesPageModule",
				"parentName": "StyleTabContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				},
				"index": 1
			},
			{
				"operation": "insert",
				"name": "PropertiesContentContainer",
				"parentName": "PropertiesContentWrap",
				"propertyName": "items",
				"values": {
					"classes": {
						"wrapClassName": ["properties-content-container"]
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "PropertiesContent",
				"parentName": "PropertiesContentContainer",
				"propertyName": "items",
				"values": {
					"classes": {
						"wrapClassName": ["properties-content", "scrollable-container"]
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			}
		]
	};
});

define("ContentItemPanel", ["ContentItemPanelResources", "DynamicBlockPropertiesPage",
		"DynamicContentAttributesPropertiesPage"], function() {
	return {
		modules: {
			DynamicBlockPropertiesPageModule: {
				moduleId: "DynamicBlockPropertiesPageModule",
				moduleName: "ConfigurationModuleV2",
				config: {
					schemaName: "DynamicBlockPropertiesPage",
					isSchemaConfigInitialized: true,
					useHistoryState: false
				}
			},
			DynamicContentAttributesPropertiesPageModule: {
				moduleId: "DynamicContentAttributesPropertiesPageModule",
				moduleName: "ConfigurationModuleV2",
				config: {
					schemaName: "DynamicContentAttributesPropertiesPage",
					isSchemaConfigInitialized: true,
					useHistoryState: false
				}
			}
		},
		messages: {
			"GetDynamicContentEnabled": {
				direction: Terrasoft.MessageDirectionType.PUBLISH,
				mode: Terrasoft.MessageMode.PTP
			}
		},
		attributes: {},
		methods: {
			/**
			 * Initializes model values.
			 * @protected
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.initTabs();
			},

			/**
			 * Initializes properties tabs.
			 * @protected
			 * @overridden
			 */
			initTabs: function() {
				var dynamicBlockTab = this.$PropertiesTabs.get("DynamicBlockTab");
				var dcAttributesTab = this.$PropertiesTabs.get("DCAttributesTab");
				var isDynamicContentEnabled = this.isDynamicContentEnabled();
				dynamicBlockTab.set("Visible", isDynamicContentEnabled);
				dcAttributesTab.set("Visible", isDynamicContentEnabled);
			},

			/**
			 * Returns state of dynamic content functionality.
			 * @protected
			 * @virtual
			 */
			isDynamicContentEnabled: function() {
				return this.sandbox.publish("GetDynamicContentEnabled");
			},

			/**
			 * Sign for properties tabs can be scrolled.
			 * @override
			 */
			IsTabPanelScrollable: function() {
				return this.callParent() || this.isDynamicContentEnabled();
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "DynamicBlockTab",
				"parentName": "PropertiesTabPanel",
				"propertyName": "tabs",
				"values": {
					"wrapClass": ["content-properties-tab", "tabs", "editors-ct"],
					"caption": "$Resources.Strings.DynamicBlockTabCaption",
					"markerValue": "DynamicContentTab",
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DynamicBlockTabContainer",
				"parentName": "DynamicBlockTab",
				"propertyName": "items",
				"values": {
					"classes": {
						"wrapClassName": ["content-properties-tab-container", "scrollable-container"]
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DynamicBlockPropertiesPageModule",
				"parentName": "DynamicBlockTabContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				}
			},
			{
				"operation": "insert",
				"name": "DCAttributesTab",
				"parentName": "PropertiesTabPanel",
				"propertyName": "tabs",
				"values": {
					"wrapClass": ["content-properties-tab", "tabs", "editors-ct"],
					"caption": "$Resources.Strings.DynamicSegmentsTabCapion",
					"markerValue": "DCAttributesTab",
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DCAttributesTabContainer",
				"parentName": "DCAttributesTab",
				"propertyName": "items",
				"values": {
					"classes": {
						"wrapClassName": ["content-properties-tab-container", "scrollable-container"]
					},
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DynamicContentAttributesPropertiesPageModule",
				"parentName": "DCAttributesTabContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.MODULE
				}
			}
		]
	};
});


