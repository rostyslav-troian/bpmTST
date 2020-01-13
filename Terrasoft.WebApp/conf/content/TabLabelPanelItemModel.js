Terrasoft.configuration.Structures["TabLabelPanelItemModel"] = {innerHierarchyStack: ["TabLabelPanelItemModel"]};
define("TabLabelPanelItemModel", ["ext-base", "terrasoft"],
	function(Ext, Terrasoft) {

		/**
		 * @class Terrasoft.TabLabelPanelItemModel
		 * Tab container item model class.
		 */
		Ext.define("Terrasoft.TabLabelPanelItemModel", {
			extend: "Terrasoft.BaseViewModel",
			/**
			 * @inheritDoc Terrasoft.BaseModel#columns
			 * @protected
			 */
			columns: {
				TabModel: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: "TabModel",
					dataValueType: Terrasoft.core.enums.DataValueType.CUSTOM_OBJECT
				},
				PanelIndexName: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: "PanelIndexName",
					dataValueType: Terrasoft.core.enums.DataValueType.CUSTOM_OBJECT
				},
				Caption: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: "Caption",
					dataValueType: Terrasoft.core.enums.DataValueType.TEXT
				},
				Code: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: "Code",
					dataValueType: Terrasoft.core.enums.DataValueType.TEXT
				},
				Id: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: "Id",
					dataValueType: Terrasoft.core.enums.DataValueType.TEXT
				},
				isVisible: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					caption: "isVisible",
					dataValueType: Terrasoft.core.enums.DataValueType.BOOLEAN,
					value: true
				}
			},
			/**
			 * Update reorder index after DragEnter event fire
			 * @protected
			 * @param {String} crossedItemId element Id.
			 */
			onDragEnter: function(crossedItemId) {
				this.setPanelIndex(null);
				var parentCollection = this.parentCollection;
				var parentCollectionKeys = parentCollection.getKeys();
				var indexOf = parentCollectionKeys.indexOf(crossedItemId);
				if (indexOf === -1) {
					indexOf = crossedItemId ? -1 : null;
				}
				this.setPanelIndex(indexOf);
			},

			/**
			 * Return reorder index value
			 * @protected
			 */
			getPanelIndex: function() {
				var tabModel = this.get("TabModel");
				var panelIndexName = this.get("PanelIndexName");
				return tabModel.get(panelIndexName);
			},

			/**
			 * Set reorder index value
			 * @protected
			 * @param {Number} value Reorder index value
			 */
			setPanelIndex: function(value) {
				var tabModel = this.get("TabModel");
				var panelIndexName = this.get("PanelIndexName");
				tabModel.set(panelIndexName, value);
			},

			/**
			 * Clear reorder index value
			 * @protected
			 */
			onDragOut: function() {
				var tabModel = this.get("TabModel");
				var panelIndexName = this.get("PanelIndexName");
				tabModel.set(panelIndexName, null);
			},

			/**
			 * Reordering tab collection
			 * @protected
			 */
			onDragDrop: function() {
				var tabModel = this.get("TabModel");
				var tabPanel = tabModel.get("tabPanel");
				var hiddenTabs = tabPanel.scrollIndex;
				var tabLabelPanelIndex = this.getPanelIndex();
				this.setPanelIndex(null);
				var viewModelItems = this.parentCollection;
				var viewModelItemId = this.get("Id");
				var viewModelItemsKeys = viewModelItems.getKeys();
				var itemIndex = viewModelItemsKeys.indexOf(viewModelItemId);
				if (!Ext.isEmpty(tabLabelPanelIndex)) {
					viewModelItems.removeByKey(viewModelItemId);
					if (itemIndex === -1 || (tabLabelPanelIndex <= itemIndex)) {
						if (hiddenTabs && hiddenTabs > 0) {
							var point = (tabLabelPanelIndex === -1) ? 1 : 0;
							var isHiddenTabs = (tabLabelPanelIndex === -1) ? hiddenTabs : 1;
							tabLabelPanelIndex += isHiddenTabs + point;
						} else {
							tabLabelPanelIndex += 1;
						}
					}
					viewModelItems.insert(tabLabelPanelIndex, viewModelItemId, this);
				} else if (itemIndex === -1) {
					viewModelItems.add(viewModelItemId, this);
					tabLabelPanelIndex = viewModelItems.getCount();
				} else {
					tabModel.restoreActiveTab();
					return false;
				}
				this.setPanelIndex(null);
				var tabViewModel = viewModelItems.get(viewModelItemId);
				var tabCode = tabViewModel.get("Code");
				tabModel.reorderTab(tabCode, tabLabelPanelIndex);
				return true;
			},

			/**
			 * Restore active tab after tab rerender
			 * @protected
			 */
			onItemReRender: function() {
				var tabModel = this.get("TabModel");
				tabModel.restoreActiveTab();
			},

			/**
			 * Set tab active after click on tab
			 * @protected
			 */
			onTabClick: function() {
				var tabModel = this.get("TabModel");
				var activeCode = this.get("Code");
				tabModel.setActiveTab(activeCode);
			}
		});
	});


