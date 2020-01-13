Terrasoft.configuration.Structures["BaseActionsDashboard"] = {innerHierarchyStack: ["BaseActionsDashboard"]};
define('BaseActionsDashboardStructure', ['BaseActionsDashboardResources'], function(resources) {return {schemaUId:'cf375134-1ef1-4343-97f3-72c5197419a5',schemaCaption: "BaseActionsDashboard", parentSchemaName: "", schemaName:'BaseActionsDashboard',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("BaseActionsDashboard", ["BaseActionsDashboardResources", "BaseDashboardItemViewModel",
	"BaseDashboardItemViewConfig", "css!ActionsDashboardCSS", "HtmlControlGeneratorV2"
], function(resources) {
	return {
		messages: {
			/**
			 * @message ReloadDashboardItems
			 * Reloads dashboard items.
			 */
			"ReloadDashboardItems": {
				mode: this.Terrasoft.MessageMode.BROADCAST,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			},

			/**
			 * @message ChangeDashboardTab
			 * Changes dashboard tab to default.
			 */
			"ChangeDashboardTab": {
				mode: this.Terrasoft.MessageMode.BROADCAST,
				direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
		attributes: {
			/**
			 * The collection of the tabs.
			 */
			"TabsCollection": {
				columnPath: "TabsCollection",
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				isCollection: true,
				type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN
			},
			/**
			 * Name of the active tab.
			 */
			"ActiveTabName": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Collapsed state of tabpanel.
			 */
			"TabPanelCollapsed": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Name of the active tab by default.
			 */
			"DefaultTabName": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: "DashboardTab"
			},
			/**
			 * Name of the dashboard tab.
			 */
			"DashboardTabName": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: "DashboardTab"
			},
			/**
			 * Collection of dashboard items.
			 */
			"DashboardItems": {
				columnPath: "DashboardItems",
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				isCollection: true,
				type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN
			},
			/**
			 * Active action item.
			 */
			"ActiveAction": {
				columnPath: "ActiveAction",
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN
			},
			/**
			 * Collection of action items.
			 */
			"ActionsCollection": {
				columnPath: "ActionsCollection",
				dataValueType: Terrasoft.DataValueType.COLLECTION,
				type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN
			},
			/**
			 * Config for tabs.
			 */
			"TabsConfig": {
				columnPath: "TabsConfig",
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN
			},
			/**
			 * Config for dashboard.
			 */
			"DashboardConfig": {
				columnPath: "DashboardConfig",
				dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT,
				type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN
			},
			/**
			 * Usage state of dashboard.
			 */
			"UseDashboard": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": true
			},
			/**
			 * Indicates state of the Visible parameter of ContentContainer.
			 */
			"ContentVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": true
			},
			/**
			 * Indicates state of the Visible parameter of HeaderContainer.
			 */
			"HeaderVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": true
			},
			/**
			 * Transition width between the minimum and maximum number of visible items.
			 */
			"TransitionWidth": {
				dataValueType: this.Terrasoft.DataValueType.INTEGER,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: 1440
			},
			/**
			 * The minimum default value of visible items.
			 */
			"MinVisibleItemsCount": {
				dataValueType: this.Terrasoft.DataValueType.INTEGER,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: 4
			},
			/**
			 * The maximum default value of visible items.
			 */
			"MaxVisibleItemsCount": {
				dataValueType: this.Terrasoft.DataValueType.INTEGER,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: 6
			},
			/**
			 * Whether to show all records.
			 */
			"ShowAllItems": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			/**
			 * Visible of the show all items button.
			 */
			"ToggleItemListViewButtonVisible": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			/**
			 * Indicates state of loading dashboard items.
			 */
			"IsDashboardItemsLoading": {
				dataValueType: this.Terrasoft.DataValueType.BOOLEAN,
				type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			}
		},
		methods: {

			// region Methods: Private

			/**
			 * Initialize model.
			 * @private
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			init: function(callback, scope) {
				this.initActionsCollection();
				this.initProperties();
				this.subscribeEvents();
				this.subscribeSandboxEvents();
				this.Terrasoft.chain(
					this.initializeProfile,
					function() {
						this.initTabs();
						this.initDashboard();
						callback.call(scope || this);
					},
					this
				);
			},

			/**
			 * @private
			 */
			_initDashboardItemsCollection: function() {
				this.set("DashboardItems", new Terrasoft.BaseViewModelCollection());
				this.onDashboardItemsCollectionChanged();
			},

			/**
			 * Subscribe on events of model.
			 * @private
			 */
			subscribeEvents: function() {
				var dashboardItemsCollection = this.get("DashboardItems");
				dashboardItemsCollection.on("dataLoaded", this.onDashboardItemsLoaded, this);
				dashboardItemsCollection.on("add", this.onDashboardItemsAddItem, this);
				dashboardItemsCollection.on("remove", this.onDashboardItemsCollectionChanged, this);
				dashboardItemsCollection.on("clear", this.onDashboardItemsCollectionChanged, this);
			},

			/**
			 * Unsubscribes from events of model.
			 * @private
			 */
			unsubscribeEvents: function() {
				var dashboardItemsCollection = this.get("DashboardItems");
				dashboardItemsCollection.un("dataLoaded", this.onDashboardItemsLoaded, this);
				dashboardItemsCollection.un("add", this.onDashboardItemsAddItem, this);
				dashboardItemsCollection.un("remove", this.onDashboardItemsCollectionChanged, this);
				dashboardItemsCollection.un("clear", this.onDashboardItemsCollectionChanged, this);
			},

			/**
			 * Handler of "dataLoaded" event of DashboardItems collection.
			 * @private
			 * @param {Terrasoft.BaseViewModelCollection} items Current collection.
			 * @param {Terrasoft.BaseViewModelCollection} newItems Collection of newly added items.
			 */
			onDashboardItemsLoaded: function(items, newItems) {
				newItems.each(this.initDashboardItem, this);
				this.onDashboardItemsCollectionChanged();
			},

			/**
			 * Handler of "add" event of DashboardItems collection.
			 * @private
			 * @param {Terrasoft.BaseViewModel} item ViewModel of item of dashboard.
			 */
			onDashboardItemsAddItem: function(item) {
				this.initDashboardItem(item);
				this.onDashboardItemsCollectionChanged();
			},

			/**
			 * Handler of event of DashboardItems collection changed.
			 * @private
			 */
			onDashboardItemsCollectionChanged: function() {
				var dashboardItems = this.get("DashboardItems");
				this.updateDashboardTabCaption(dashboardItems.getCount());
				var showAllItemsBtnVisible = this.getToggleItemListViewButtonIsVisible();
				this.set("ToggleItemListViewButtonVisible", showAllItemsBtnVisible);
			},

			/**
			 * Initialize dashboard items.
			 * @private
			 */
			initDashboard: function() {
				if (!this.get("UseDashboard")) {
					Terrasoft.ActionsDashboardUtils.hideMask();
					this.set("IsDashboardItemsLoading", false);
					return;
				}
				this.initDashboardConfig();
				this.loadDashboardItems();
			},

			/**
			 * Initializes default tab: sets active, visible and collapsed states.
			 * @private
			 */
			initDefaultTab: function() {
				var defaultTabName = this.getDefaultTabName();
				if (defaultTabName) {
					this.setActiveTab(defaultTabName);
					var tabCollapsed = this.get("TabPanelCollapsed");
					if (!tabCollapsed) {
						this.setTabVisible(defaultTabName, true);
					}
				}
			},

			/**
			 * Initializes TabPanelCollapsed value.
			 * @private
			 */
			initTabPanelCollapsed: function() {
				var profile = this.getProfile();
				var tabCollapsed = Boolean(profile.tabCollapsed);
				this.set("TabPanelCollapsed", tabCollapsed);
			},

			/**
			 * Initialize collection of the tabs.
			 * @private
			 */
			initTabs: function() {
				this.initTabsConfig();
				this.initTabPanelCollapsed();
				if (!this.get("UseDashboard")) {
					var dashboardTabName = this.get("DashboardTabName");
					this.removeTab(dashboardTabName);
				}
				var tabsCollection = this.get("TabsCollection");
				tabsCollection.each(this.initTab, this);
				this.initDefaultTab();
			},

			/**
			 * Initialize tab.
			 * @private
			 * @param {Terrasoft.BaseViewModel} tab ViewModel of tab.
			 */
			initTab: function(tab) {
				var config = this.getTabConfig(tab);
				if (config) {
					Terrasoft.each(config, function(value, key) {
						tab.set(key, value);
					}, this);
				}
			},

			/**
			 * Returns config for tab.
			 * @private
			 * @param {Terrasoft.BaseViewModel} tab ViewModel of tab.
			 * @return {Object} Config for tab.
			 */
			getTabConfig: function(tab) {
				var tabName = tab.get("Name");
				var config = this.getTabsConfig();
				return config[tabName];
			},

			/**
			 * Returns config by default for tabs.
			 * @private
			 * @return {Object} Config.
			 */
			getTabsConfig: function() {
				return this.get("TabsConfig");
			},

			/**
			 * Returns ViewModel of the tab by name.
			 * @private
			 * @param {String} tabName Name of the tab.
			 * @return {Terrasoft.BaseViewModel} ViewModel of the tab.
			 */
			getTabByName: function(tabName) {
				var tabs = this.get("TabsCollection");
				return tabs.find(tabName);
			},

			/**
			 * Updates caption of the Dashboard tab.
			 * @private
			 * @param {Number} value Value for the template of caption.
			 */
			updateDashboardTabCaption: function(value) {
				var tabName = this.get("DashboardTabName");
				var tab = this.getTabByName(tabName);
				if (tab) {
					var caption = this.getDashboardTabCaption(value);
					tab.set("Caption", caption);
				}
			},

			/**
			 * Sets active tab by name.
			 * @private
			 * @param {String} tabName Name of the tab.
			 */
			setActiveTab: function(tabName) {
				if (tabName) {
					this.set("ActiveTabName", tabName);
				} else {
					this.set("ActiveTabName", this.getDefaultTabName());
				}
			},

			/**
			 * Sets visibility of tab by name.
			 * @private
			 * @param {String} tabName Name of the tab.
			 * @param {Boolean} visible Value of visibility.
			 */
			setTabVisible: function(tabName, visible) {
				this.set(tabName, visible);
			},

			/**
			 * Handles event of changing the active tab.
			 * @private
			 * @param {Terrasoft.BaseViewModel} activeTab ViewModel of the active tab.
			 */
			onActiveTabChange: function(activeTab) {
				var activeTabName = activeTab.get("Name");
				this.set("ActiveTabName", activeTabName);
				this.hideTabs();
				this.setTabVisible(activeTabName, true);
				var collapsed = this.get("TabPanelCollapsed");
				if (collapsed) {
					this.set("TabPanelCollapsed", false);
				}
			},

			/**
			 * Saves last tabpanel collapsed state.
			 * @private
			 * @param {Boolean} collapsed Collapsed state of tabpanel.
			 */
			saveTabCollapsedState: function(collapsed) {
				var profile = this.getProfile();
				var key = this.getProfileKey();
				profile.tabCollapsed = collapsed;
				this.Terrasoft.utils.saveUserProfile(key, profile, false);
			},

			/**
			 * Returns the name of the active tab by default.
			 * @private
			 * @return {String} The name of tab.
			 */
			getDefaultTabName: function() {
				return this.get("DefaultTabName");
			},

			/**
			 * @private
			 */
			_getBlankSlateImage: function() {
				return Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.BlankSlateImage);
			},

			/**
			 * @private
			 */
			_getBlankSlateDescription: function() {
				var description = this.get("Resources.Strings.BlankSlateDescription");
				var flagImageConfig = Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.FlagGreyImage);
				var result = Ext.String.format(description, flagImageConfig);
				return result;
			},

			// endregion

			// region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.model.BaseViewModel#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this._initDashboardItemsCollection();
			},

			/**
			 * Subscribe on events of sandbox.
			 * @protected
			 */
			subscribeSandboxEvents: function() {
				var sandbox = this.sandbox;
				sandbox.subscribe("ReloadDashboardItems", function() {
					this.onReloadDashboardItems();
				}, this);
				sandbox.subscribe("ChangeDashboardTab", function(tabName) {
					this.setActiveTab(tabName);
				}, this);
			},

			/**
			 * Handler for ReloadDashboardItems message.
			 * @protected
			 */
			onReloadDashboardItems: function() {
				this.loadDashboardItems();
			},

			/**
			 * @inheritdoc BaseSchemaViewModel#getProfileKey
			 * @overridden
			 * @return {String} Profile key.
			 */
			getProfileKey: function() {
				return "ActionsDashboard";
			},

			/**
			 * Initialize config for dashboard.
			 * @protected
			 * @virtual
			 */
			initDashboardConfig: function() {
				this.set("DashboardConfig", {});
			},

			/**
			 * Loads dashboard items.
			 * @protected
			 * @abstract
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			loadDashboardItems: Terrasoft.abstractFn,

			/**
			 * Initialize config by default for tabs.
			 * @protected
			 * @virtual
			 */
			initTabsConfig: function() {
				this.set("TabsConfig", {});
			},

			/**
			 * Returns caption of dashboard tab.
			 * @protected
			 * @param {Number} value Value for the template of caption.
			 * @return {String} Caption.
			 */
			getDashboardTabCaption: function(value) {
				var captionPattern = resources.localizableStrings.DashboardTabCaptionPattern;
				var caption = Ext.String.format(captionPattern, value || 0);
				return caption;
			},

			/**
			 * Initialize item of dahboard.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} item ViewModel of item of dashboard.
			 */
			initDashboardItem: Ext.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseSchemaViewModel#destroy
			 * @override
			 */
			destroy: function() {
				this.unsubscribeEvents();
				this.callParent(arguments);
			},

			/**
			 * Gets visible count elements.
			 * @protected
			 * @return {Number} Return maximum or minimum visible items count.
			 */
			getVisibleItemsCount: function() {
				var viewSize = this.Terrasoft.getViewSize();
				var transitionWidth = this.get("TransitionWidth");
				var minCount = this.get("MinVisibleItemsCount");
				var maxCount = this.get("MaxVisibleItemsCount");
				return viewSize.width >= transitionWidth ? maxCount : minCount;
			},

			/**
			 * Gets visible of the show all items button.
			 * @protected
			 * @return {Boolean} True if show all items button is visible.
			 */
			getToggleItemListViewButtonIsVisible: function() {
				var dashboardItems = this.get("DashboardItems");
				var count = dashboardItems.getCount();
				return count > this.getVisibleItemsCount();
			},

			/**
			 * Gets caption of the button to switch the number of visible items.
			 * @protected
			 * @return {String} Caption of the the show all items button.
			 */
			getToggleItemListViewButtonCaption: function() {
				var showAllItems = this.get("ShowAllItems");
				var hideCaption = this.get("Resources.Strings.HideItemsCaption");
				var showCaption = this.get("Resources.Strings.ShowAllItemsCaption");
				return showAllItems ? hideCaption : showCaption;
			},

			/**
			 * Gets image of the show all button.
			 * @protected
			 * @return {Object} Return image of the show all items button.
			 */
			getToggleItemListViewButtonImage: function() {
				var showAllItems = this.get("ShowAllItems");
				var loadLessImage = this.get("Resources.Images.LoadLessIcon");
				var loadMoreImage = this.get("Resources.Images.LoadMoreIcon");
				return showAllItems ? loadLessImage : loadMoreImage;
			},

			// endregion

			// region Methods: Public

			/**
			 * Initializes the actions collection.
			 */
			initActionsCollection: function() {
				var collection = this.Ext.create("Terrasoft.BaseViewModelCollection");
				this.set("ActionsCollection", collection);
			},

			/**
			 * Initializes properties.
			 */
			initProperties: function() {
				var propertiesTranslator = this.getPropertiesTranslator();
				var properties = this.values || {};
				Terrasoft.each(propertiesTranslator, function(configName, viewModelName) {
					if (properties.hasOwnProperty(configName)) {
						var value = properties[configName];
						this.set(viewModelName, value);
					}
				}, this);
			},

			/**
			 * Returns decoupling config for the parameter values for properties of the ViewModel.
			 * @return {Object} Config.
			 */
			getPropertiesTranslator: function() {
				return {
					"UseDashboard": "useDashboard",
					"ContentVisible": "contentVisible",
					"HeaderVisible": "headerVisible"
				};
			},

			/**
			 * Removes tab by name.
			 * @param {String} name The name of tab.
			 */
			removeTab: function(name) {
				var tabsCollection = this.get("TabsCollection");
				tabsCollection.removeByKey(name);
				var defaultTabName = this.getDefaultTabName();
				if (!tabsCollection.contains(defaultTabName) && tabsCollection.getCount()) {
					var alltabs = tabsCollection.getKeys();
					defaultTabName = alltabs[0];
					this.set("DefaultTabName", defaultTabName);
				}
			},

			/**
			 * Handles event of changing the collapsed state of tabpanel.
			 * @param {Boolean} collapsed New collapsed state of tabpanel.
			 */
			onTabCollapsedChanged: function(collapsed) {
				if (collapsed === false) {
					var activeTabName = this.get("ActiveTabName");
					activeTabName = activeTabName || this.getDefaultTabName();
					this.setTabVisible(activeTabName, true);
				} else {
					this.hideTabs();
				}
				this.saveTabCollapsedState(collapsed);
			},

			/**
			 * Sets visibility of each tab to false.
			 */
			hideTabs: function() {
				this.$TabsCollection.eachKey(function(tabName) {
					this.setTabVisible(tabName, false);
				}, this);
			},

			/**
			 * Handles "onGetItemConfig" event of the dashboard items collection.
			 * @param {Object} itemConfig Config of the item.
			 * @param {Terrasoft.BaseDashboardItemViewModel} item ViewModel.
			 */
			onGetDashboardItemConfig: function(itemConfig, item) {
				const itemViewConfigClassName = item.get("ViewConfigClassName");
				const viewConfig = this.Ext.create(itemViewConfigClassName, {Ext: this.Ext});
				itemConfig.config = viewConfig.generate();
			},

			/**
			 * Handler of switching the status display the number of records.
			 */
			onClickToggleItemListViewButton: function() {
				this.set("ShowAllItems", !this.get("ShowAllItems"));
			}

			// endregion
		},
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "MainContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {wrapClassName: ["actions-dashboard-container"]},
					"visible": {
						"bindTo": "IsDashboardItemsLoading",
						"bindConfig": {"converter": "invertBooleanValue"}
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "HeaderContainer",
				"parentName": "MainContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {wrapClassName: ["actions-dashboard-header"]},
					"visible": {"bindTo": "HeaderVisible"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "ContentContainer",
				"parentName": "MainContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["actions-dashboard-content"]},
					"visible": {"bindTo": "ContentVisible"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "TabsContainer",
				"parentName": "ContentContainer",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
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
					"collapsedchanged": {"bindTo": "onTabCollapsedChanged"},
					"activeTabName": {"bindTo": "ActiveTabName"},
					"collapsed": {"bindTo": "TabPanelCollapsed"},
					"collection": {"bindTo": "TabsCollection"},
					"activeTabClass": "ts-tabpanel-active-item-arrow",
					"isScrollVisible": false,
					"isCollapseButtonVisible": true,
					"tabs": []
				}
			},
			{
				"operation": "insert",
				"name": "DashboardTab",
				"parentName": "Tabs",
				"propertyName": "tabs",
				"values": {
					"caption": {"bindTo": "DashboardTabCaption"},
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "DashboardContainer",
				"parentName": "DashboardTab",
				"propertyName": "items",
				"values": {
					"idProperty": "Id",
					"collection": {"bindTo": "DashboardItems"},
					"generator": "ContainerListPaginationGenerator.generatePartial",
					"maxVisibleItems": {"bindTo": "getVisibleItemsCount"},
					"showAll": {"bindTo": "ShowAllItems"},
					"selectableRowCss": "dashboard-container-item",
					"itemType": Terrasoft.ViewItemType.GRID,
					"classes": {
						"wrapClassName": [
							"content-preview-block-container content-container-wrapClass dashboard-container"
						]
					},
					"onGetItemConfig": {"bindTo": "onGetDashboardItemConfig"},
					"itemPrefix": "View",
					"dataItemIdPrefix": "dashboard-item",
					"itemConfig": [
						{
							"name": "DashboardItem",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"classes": {"wrapClassName": ["ts-controlgroup control-group-margin-bottom"]}
						}
					]
				}
			},
			{
				"operation": "insert",
				"name": "ToggleItemListViewButton",
				"parentName": "DashboardTab",
				"propertyName": "items",
				"values": {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"classes": {"wrapperClass": ["toggle-item-list-view-btn"]},
					"imageConfig": {"bindTo": "getToggleItemListViewButtonImage"},
					"caption": {"bindTo": "getToggleItemListViewButtonCaption"},
					"click": {"bindTo": "onClickToggleItemListViewButton"},
					"visible": {"bindTo": "ToggleItemListViewButtonVisible"}
				}
			},
			{
				"operation": "insert",
				"parentName": "DashboardTab",
				"propertyName": "items",
				"name": "BlankSlateContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["actions-dashboard-blankslate"]},
					"visible": {
						"bindTo": "DashboardItems",
						"bindConfig": {"converter": "isEmptyValue"}
					},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "BlankSlateContainer",
				"propertyName": "items",
				"name": "BlankSlateInnerContainer",
				"values": {
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"classes": {"wrapClassName": ["actions-dashboard-blankslate-inner"]},
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "BlankSlateInnerContainer",
				"propertyName": "items",
				"name": "BlankSlateImageContainer",
				"values": {
					"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
					"onPhotoChange": Terrasoft.emptyFn,
					"getSrcMethod": "_getBlankSlateImage",
					"items": []
				}
			},
			{
				"operation": "insert",
				"parentName": "BlankSlateInnerContainer",
				"propertyName": "items",
				"name": "BlankSlateDescription",
				"values": {
					"generator": "HtmlControlGeneratorV2.generateHtmlControl",
					"htmlContent": {"bindTo": "_getBlankSlateDescription"},
					"classes": {"wrapClass": ["description-label"]}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


