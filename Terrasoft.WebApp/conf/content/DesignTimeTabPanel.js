Terrasoft.configuration.Structures["DesignTimeTabPanel"] = {innerHierarchyStack: ["DesignTimeTabPanel"]};
define("DesignTimeTabPanel", ["ext-base", "terrasoft", "TabLabelPanelContainer",
		"TabLabelPanelModel", "css!DesignTimeTabPanel"],
	function(Ext) {
		/**
		 * @class Terrasoft.DesignTimeTabPanel
		 * Tab control in design time.
		 */
		Ext.define("Terrasoft.controls.DesignTimeTabPanel", {
			alternateClassName: "Terrasoft.DesignTimeTabPanel",
			extend: "Terrasoft.TabPanel",

			/**
			 * TabLabelPanel.
			 * @protected
			 * @type {Terrasoft.TabLabelPanelModel}
			 */
			tabLabelPanel: null,

			/**
			 * TabLabelPanel reordable index.
			 * @protected
			 * @type {Terrasoft.TabLabelPanelModel}
			 */
			//tabLabelPanelIndex: null,

			/**
			 * Show original tabs.
			 * @type {Boolean}
			 */
			isTabVisible: false,

			/**
			 * @overridden
			 * @inheritdoc Terrasoft.controls.TabPanel#tabTagName
			 */
			tabTagName: "label",

			/**
			 * @inheritdoc Terrasoft.component#tpl
			 * @overridden
			 */
			tpl: [
				"<div id = \"{id}-wrap\" class = \"{wrapClass}\">",
				"<div id = \"{id}-items-wrap\" class = \"ts-tabpanel-wrap\">",
				"<tpl if=\"isScrollVisible\">",
				"<div id = \"{id}-scroll-left\" class = \"ts-tabpanel-scroll-left\"></div>",
				"</tpl>",
				"<div id = \"{id}-tab-label-container\" class = \"ts-designer-tab-label-container\"></div>",
				"<tpl if=\"isTabVisible\">",
				"<ul id = \"{id}-tabpanel-items\"  style=\"{ulCustomStyle}\" class=\"ts-tabpanel-items {ulCustomClass}\">",
				"{%this.renderTabs(out, values)%}",
				"</ul>",
				"</tpl>",
				"<tpl if=\"isScrollVisible\">",
				"<div id = \"{id}-scroll-right\" class = \"ts-tabpanel-scroll-right\"></div>",
				"</tpl>",
				"</div>",
				"<div id = \"{id}-tools\" class = \"ts-tabpanel-tools design-time\">",
				"{%this.renderItems(out, values)%}",
				"</div>",
				"<tpl if=\"isCollapseButtonVisible\">",
				"<div id=\"{id}-collapse-button\" class=\"ts-tabpanel-collapse-button\"></div>",
				"</tpl>",
				"</div>"
			],

			/**
			 * @inheritdoc Terrasoft.Component#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.initTabLabelPanel();
				this.addEvents(
					/**
					 * @event onorderchange
					 * Event change tabs order.
					 * Calls when the order of the tabs is changed.
					 * @param {String} tabName Tab name.
					 * @param {Number} tabIndex New tab position.
					 */
					"onorderchange"
				);
			},

			/**
			 * Init tab label panel
			 * @private
			 */
			initTabLabelPanel: function() {
				var tabsCollection = Ext.create("Terrasoft.BaseViewModelCollection");
				this.tabLabelPanel = Ext.create("Terrasoft.TabLabelPanelModel", {
					values: {
						viewModelItems: tabsCollection,
						tabPanel: this
					}
				});
			},

			/**
			 * @inheritdoc Terrasoft.Component#getTplData
			 * @overridden
			 */
			getTplData: function() {
				this.selectors.tabLabelWrapEl = "#" + this.id + "-tab-label-container";
				var tplData = this.callParent(arguments);
				return tplData;
			},

			/**
			 * @inheritdoc Terrasoft.Component#onAfterRender
			 * @protected
			 */
			onAfterRender: function() {
				this.callParent(arguments);
				this.renderTabLabelPanel();
				this.restoreTabPanelScroll(this.scrollIndex);
			},

			/**
			 * @inheritdoc Terrasoft.Component#onAfterReRender
			 * @protected
			 */
			onAfterReRender: function() {
				this.callParent(arguments);
				this.renderTabLabelPanel();
				this.restoreTabPanelScroll(this.scrollIndex);
			},

			/**
			 * @inheritdoc Terrasoft.Component#onActiveTabNameChange
			 * @protected
			 */
			onActiveTabNameChange: function(name) {
				this.callParent(arguments);
				this.scrollToTabByName(name);
			},

			/**
			 * Scrolls to tab by tab name.
			 * @param {Number} name of scroll tab.
			 * @protected
			 */
			scrollToTabByName: function(name) {
				var tabs = this.tabs;
				var indexKeys = tabs.getKeys();
				var index = indexKeys.indexOf(name);
				if (this.needScrollToTab(index)) {
					this.scrollToTab(index);
				}
			},

			/**
			 * Returns the sign of the need to scroll to tab.
			 * @param {Number} index of scroll tab.
			 * @return {Boolean} true if need to scroll to tab
			 * @protected
			 */
			needScrollToTab: function(index) {
				var isDisplayed = this.tabDisplayed(index);
				return index !== -1 && (isDisplayed === false || this.scrollIndex > index);
			},

			/**
			 * @inheritdoc Terrasoft.controls.TabPanel#scrollToTab
			 * @protected
			 */
			scrollToTab: function() {
				for (var i = 0; i < this.scrollIndex; i++) {
					this.setTabDisplayedByIndex(true, i);
				}
				this.setScrollIndex(0);
				this.callParent(arguments);
			},

			/**
			 * Render tab label panel.
			 * @protected
			 */
			renderTabLabelPanel: function() {
				var tabLabelPanel = this.tabLabelPanel;
				var tabLabelPanelContainerId = this.id + "-tab-label-panel-container";
				var tabLabelPanelContainer = this.getTabLabelPanelContainer(tabLabelPanelContainerId);
				tabLabelPanelContainer.bind(tabLabelPanel);
				tabLabelPanelContainer.render(this.tabLabelWrapEl);
				tabLabelPanel.fillTabsLabelCollection();
			},

			/**
			 * Returns Terrasoft.TabLabelPanelContainer
			 * @param {String} tabLabelPanelContainerId TabLabelPanelContainerId.
			 * @return {Terrasoft.TabLabelPanelContainer}
			 * @protected
			 */
			getTabLabelPanelContainer: function(tabLabelPanelContainerId) {
				return Ext.create("Terrasoft.TabLabelPanelContainer", {
					id: tabLabelPanelContainerId,
					className: "Terrasoft.TabLabelPanelContainer",
					viewModelItems: {bindTo: "viewModelItems"},
					reorderableIndex: {bindTo: "reorderableIndex"},
					getGroupName: function() {
						return tabLabelPanelContainerId;
					}
				});
			},

			/**
			 * @inheritdoc Terrasoft.controls.TabPanel#getTabDomElementByIndex
			 * @protected
			 */
			getTabDomElementByIndex: function(index) {
				var wrapEl = this.wrapEl;
				if (!wrapEl) {
					return null;
				}
				var collection = this.tabLabelPanel.getCollection();
				var keys = collection.getKeys();
				var name = keys[index] || "";
				var foundElements = wrapEl.query("label[id=\"" + name + "\"]");
				return foundElements[0];
			},

			/**
			 * @inheritdoc Terrasoft.controls.TabPanel#onTabsCollectionDataChange
			 * @protected
			 */
			onTabsCollectionDataChange: function() {
				this.tabLabelPanel.updateTabsLabelCollection();
			},

			/**
			 * @inheritdoc Terrasoft.controls.TabPanel#onTabChange
			 * @protected
			 */
			onTabChange: function(tab) {
				this.tabLabelPanel.updateTabsLabelCollection();
				var tabName = tab.get("Name");
				var tabsKeys = this.tabs.getKeys();
				var index = tabsKeys.indexOf(tabName);
				this.scrollToTab(index);
			},

			/**
			 * @inheritdoc Terrasoft.controls.TabPanel#onAddTab
			 * @protected
			 */
			onAddTab: function(newTab, index, name) {
				var tabLabelPanel = this.tabLabelPanel;
				var tabExist = tabLabelPanel.checkTabExist(name);
				tabLabelPanel.updateTabsLabelCollection();
				if (!tabExist) {
					this.scrollToTab(index);
				}
			},

			/**
			 * @inheritdoc Terrasoft.controls.TabPanel#onTabRemove
			 * @protected
			 */
			onTabRemove: function() {
				this.tabLabelPanel.updateTabsLabelCollection();
			},

			/**
			 * @inheritdoc Terrasoft.controls.TabPanel#getVisibleTabsWrap
			 * @overridden
			 */
			getVisibleTabsWrap: function() {
				return Ext.get(this.id + "-tab-label-panel-container");
			}
		});
	});


