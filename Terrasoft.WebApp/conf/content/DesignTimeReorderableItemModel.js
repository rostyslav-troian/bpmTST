Terrasoft.configuration.Structures["DesignTimeReorderableItemModel"] = {innerHierarchyStack: ["DesignTimeReorderableItemModel"]};
define("DesignTimeReorderableItemModel", ["ext-base", "terrasoft"],
	function(Ext, Terrasoft) {

		Ext.define("Terrasoft.DesignTimeReorderableItemModel", {
			alternateClassName: "Terrasoft.configuration.DesignTimeReorderableItemModel",
			extend: "Terrasoft.BaseViewModel",

			/**
			 * @inheritDoc Terrasoft.BaseModel#columns
			 * @protected
			 */
			columns: {
				ReorderableModel: {
					caption: "ReorderableModel",
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				},
				ReorderableIndexColumnName: {
					caption: "ReorderableIndexColumnName",
					dataValueType: Terrasoft.DataValueType.TEXT
				},
				Id: {
					caption: "Id",
					dataValueType: Terrasoft.DataValueType.TEXT
				}
			},

			/**
			 * Return reorder index value
			 * @protected
			 */
			setReordableIndex: function(value) {
				var reorderableModel = this.get("ReorderableModel");
				var columnName = this.get("ReorderableIndexColumnName");
				reorderableModel.set(columnName, value);
			},

			/**
			 * Set reorder index value
			 * @protected
			 * @param {Number} value Reorder index value
			 */
			getReordableIndex: function() {
				var reorderableModel = this.get("ReorderableModel");
				var columnName = this.get("ReorderableIndexColumnName");
				return reorderableModel.get(columnName);
			},

			/**
			 * Update reorder index after DragEnter event fire
			 * @protected
			 * @param {String} crossedItemId element Id.
			 */
			onDragEnter: function(crossedItemId) {
				this.setReordableIndex(null);
				var parentCollection = this.parentCollection;
				var parentCollectionKeys = parentCollection.getKeys();
				var indexOf = parentCollectionKeys.indexOf(crossedItemId);
				if (indexOf === -1) {
					indexOf = crossedItemId ? -1 : null;
				}
				this.setReordableIndex(indexOf);
			},

			/**
			 * Clear reorder index after DragOut event fire
			 * @protected
			 */
			onDragOut: function() {
				this.setReordableIndex(null);
			},

			/**
			 * Reordering tab collection
			 * @protected
			 */
			onDragDrop: function() {
				var reorderableIndex = this.getReordableIndex();
				this.setReordableIndex(null);
				var viewModelItems = this.parentCollection;
				var viewModelItemId = this.get("Id");
				var viewModelItemsKeys = viewModelItems.getKeys();
				var itemIndex = viewModelItemsKeys.indexOf(viewModelItemId);
				if (!Ext.isEmpty(reorderableIndex)) {
					if (itemIndex === -1 || (reorderableIndex <= itemIndex)) {
						reorderableIndex += 1;
					}
					viewModelItems.move(itemIndex, reorderableIndex);
				} else if (itemIndex === -1) {
					viewModelItems.add(viewModelItemId, this);
				} else {
					return false;
				}
				this.setReordableIndex(null);
				return true;
			}
		});
	});


