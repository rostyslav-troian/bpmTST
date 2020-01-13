Terrasoft.configuration.Structures["TabLabelPanelModel"] = {innerHierarchyStack: ["TabLabelPanelModel"]};
define("TabLabelPanelModel", ["ext-base", "terrasoft", "TabLabelPanelItemModel"],
	function(Ext, Terrasoft) {

		/**
		 * @class Terrasoft.TabLabelPanelModel
		 * Tabs container model class.
		 */
		Ext.define("Terrasoft.TabLabelPanelModel", {
			extend: "Terrasoft.BaseViewModel",

			/**
			 * @inheritDoc Terrasoft.BaseModel#columns
			 * @protected
			 */
			columns: {
				ReorderableIndex: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: "ReorderableIndex",
					dataValueType: Terrasoft.core.enums.DataValueType.INTEGER
				},
				ViewModelItems: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: "ViewModelItems",
					dataValueType: Terrasoft.core.enums.DataValueType.COLLECTION
				},
				TabPanel: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: "TabPanel",
					dataValueType: Terrasoft.core.enums.DataValueType.CUSTOM_OBJECT
				}
			},

			/**
			 * Get tabs collection
			 * @protected
			 * @return {Terrasoft.BaseViewModelCollection}
			 */
			getCollection: function() {
				return this.get("viewModelItems");
			},

			/**
			 * Activate tab
			 * @protected
			 * @param {String} activeTabCode Tab code.
			 */
			setActiveTab: function(activeTabCode) {
				var tabPanel = this.get("tabPanel");
				tabPanel.setActiveTab(activeTabCode);
			},

			/**
			 * Activate current tab
			 * @protected
			 */
			restoreActiveTab: function() {
				var tabPanel = this.get("tabPanel");
				this.setActiveTabByTabCode(tabPanel.activeTabName);
			},

			/**
			 * Reorder tab collection in TabPanel
			 * @protected
			 * @param {String} reorderTabCode Reorder tab code.
			 * @param {Number} position New tab position.
			 */
			reorderTab: function(reorderTabCode, position) {
				var tabPanel = this.get("tabPanel");
				var tabs = tabPanel.tabs;
				var reorderTab = tabs.get(reorderTabCode);
				tabs.removeByKey(reorderTabCode);
				tabs.insert(position, reorderTabCode, reorderTab);
				tabPanel.fireEvent("onorderchange", reorderTabCode, position);
				this.restoreActiveTab();
			},

			/**
			 * Generate and load tab collection from TabPanel tabs
			 * @protected
			 */
			fillTabsLabelCollection: function() {
				var tabPanel = this.get("tabPanel");
				if (!tabPanel.tabs) {
					return;
				}
				var collection = this.getCollection();
				tabPanel.tabs.each(function(tab) {
					this.addTabToCollection(collection, tab);
				}, this);
				this.restoreActiveTab();
			},

			/**
			 * Add tab to collection.
			 * @param {Object} collection Collection of tabs.
			 * @param {Object} tab Tab.
			 */
			addTabToCollection: function(collection, tab) {
				var code = tab.get("Name");
				var itemId = this.getTabLabelId(code);
				var item = Ext.create("Terrasoft.TabLabelPanelItemModel", {
					values: {
						TabModel: this,
						Caption:  tab.get("Caption"),
						PanelIndexName: "reorderableIndex",
						Code: code,
						Id: itemId
					}
				});
				collection.add(itemId, item);
			},

			/**
			 * Get Tab item id by tab name
			 * @protected
			 * @param {String} tabCode Tab code.
			 */
			getTabLabelId: function(tabCode) {
				return tabCode + "LabelTab";
			},

			/**
			 * Activate tab by tab code
			 * @protected
			 * @param {String} tabCode Tab code.
			 */
			setActiveTabByTabCode: function(tabCode) {
				var tabPanel = this.get("tabPanel");
				var tabs = tabPanel.tabs;
				if (tabs) {
					var tabKeys = tabs.getKeys();
					Terrasoft.each(tabKeys, function(key, index) {
						var firstTabDom = tabPanel.getTabDomElementByIndex(parseInt(index, 10));
						if (firstTabDom) {
							tabPanel.toggleCssClasses(firstTabDom, null, key === tabCode);
						}
					}, this);
				}
			},

			/**
			 * Update tab collection from TabPanel tabs
			 * @protected
			 */
			updateTabsLabelCollection: function() {
				var tabPanel = this.get("tabPanel");
				var tabs = tabPanel.tabs;
				if (!tabPanel.tabs) {
					return;
				}
				var collection = this.getCollection();
				tabs.each(function(tab) {
					var code = tab.get("Name");
					var itemId = this.getTabLabelId(code);
					var tabExist = collection.contains(itemId);
					if (tabExist) {
						var tabLabel = collection.get(itemId);
						tabLabel.set("Caption", tab.get("Caption"));
					} else {
						this.addTabToCollection(collection, tab);
					}
				}, this);
				this.restoreActiveTab();
			},

			/**
			 * Check if tab exist into tabs collection by name.
			 * @param {String} name Tab name.
			 * @returns {Boolean}
			 */
			checkTabExist: function(name) {
				var collection = this.getCollection();
				var itemId = this.getTabLabelId(name);
				var tabExist = collection.contains(itemId);
				return tabExist;
			}
		});
	});


