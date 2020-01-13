/**
 * Mixin class for ReorderableContainer, that contains view model logic.
 */
Ext.define("Terrasoft.mixins.ReorderableContainerVMMixin", {
	alternateClassName: "Terrasoft.ReorderableContainerVMMixin",

	/**
	 * Initializes mixin.
	 * @protected
	 */
	preInit: function() {
		this.initAttributes();
		this.initEvents();
		var items = Ext.create("Terrasoft.BaseViewModelCollection", {
			itemClass: this.get("DefaultItemClassName")
		});
		this.set("ViewModelItems", items);
	},

	/**
	 * Register mixin events.
	 * @protected
	 */
	initEvents: function() {
		this.addEvents(
			"beforeItemMove"
		);
	},

	/**
	 * Inits attributes of view model.
	 * @protected
	 */
	initAttributes: function() {
		var columns = this.columns;
		columns.Name = columns.Name || {
			type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
			caption: "Name",
			dataValueType: Terrasoft.core.enums.DataValueType.TEXT
		};
		columns.ReorderableIndex = columns.ReorderableIndex || {
			type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
			caption: "ReorderableIndex",
			dataValueType: Terrasoft.core.enums.DataValueType.INTEGER
		};
		columns.ViewModelItems = columns.ViewModelItems || {
			type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
			caption: "ViewModelItems",
			dataValueType: Terrasoft.core.enums.DataValueType.COLLECTION
		};
		columns.Schema = columns.Schema || {
			type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.core.enums.DataValueType.CUSTOM_OBJECT
		};
		columns.DefaultItemClassName = columns.DefaultItemClassName || {
			type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
			dataValueType: Terrasoft.core.enums.DataValueType.TEXT
		};
	},

	/**
	 * Returns reorderable view model items.
	 * @protected
	 * @return {Terrasoft.BaseViewModel[]}
	 */
	getViewModelItems: function() {
		return this.get("ViewModelItems");
	},

	/**
	 * Getting position of the element in the container.
	 * @protected
	 * @param {String} key Desired element key.
	 * @return {Number} Position of an element in the container.
	 */
	indexOf: function(key) {
		var viewModelItems = this.getViewModelItems();
		var viewModelItemsKeys = viewModelItems.getKeys();
		return viewModelItemsKeys.indexOf(key);
	},

	/**
	 * DragOver event handler.
	 * @protected
	 * @param {String} dragItemId Dragged item id.
	 * @param {String} dragOverItemId Item id.
	 */
	onDragOver: function(dragItemId, dragOverItemId) {
		this.clearReorderableIndex();
		var getDragOverData = this.getDragOverData(dragItemId, dragOverItemId);
		if (getDragOverData.isValid) {
			this.set("ReorderableIndex", getDragOverData.reorderableIndex);
		}
		return getDragOverData.isValid;
	},

	/**
	 * Returns data for dragOver event.
	 * @protected
	 * @param {String} dragItemId Drag item id.
	 * @param {String} dragOverItemId Id of item over which is dragged.
	 * @return {Object}
	 * @return {Number} return.reorderableIndex Reorderable index.
	 * @return {Boolean} return.isValid Indicates whether that drop zone is valid.
	 */
	getDragOverData: function(dragItemId, dragOverItemId) {
		var index = this.indexOf(dragOverItemId);
		if (index < 0) {
			index = this.getLastIndex(dragItemId);
		} else {
			index--;
		}
		return {
			reorderableIndex: index,
			isValid: true
		};
	},

	/**
	 * Handles block insertion events.
	 * @protected
	 * @param {String} dropItemId The element identifier.
	 */
	onDragDrop: function(dropItemId) {
		this.moveItem(dropItemId);
	},

	/**
	 * Adds item to collection.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} viewModelItem View model of element.
	 */
	addItem: function(viewModelItem) {
		var viewModelItemId = viewModelItem.get("Id");
		var viewModelItems = this.get("ViewModelItems");
		viewModelItems.add(viewModelItemId, viewModelItem);
	},

	/**
	 * Moves item to collection.
	 * @protected
	 * @param {String} moveItemId Item Id.
	 * @return {Number} insert position.
	 */
	moveItem: function(moveItemId) {
		var moveData = this.getMoveData(moveItemId);
		if (moveData.cancel === true) {
			return -1;
		}
		this.set("ReorderableIndex", null);
		if (this.fireEvent("beforeItemMove", this, moveData) === false) {
			return -1;
		}
		this.move(moveData);
		return moveData.targetIndex;
	},

	/**
	 * Returns current index to insert item.
	 * @protected
	 */
	getReorderableIndex: function() {
		return this.get("ReorderableIndex");
	},

	/**
	 * Returns data to move item in items collection.
	 * @protected
	 * @param {String} moveItemId Moved item id.
	 * @return {Object}
	 * @return {Boolean} [return.cancel] Indicates whether that need cancel item moves.
	 * @return {Object} [return.item] Moved item.
	 * @return {String} [return.item] Moved item id.
	 * @return {Terrasoft.Collection} [return.sourceCollection] Collection from which item is moved.
	 * @return {Terrasoft.Collection} [return.sourceIndex Item] index in source collection.
	 * @return {Terrasoft.Collection} [return.targetCollection] Collection to which item is moved.
	 * @return {Terrasoft.Collection} [return.targetIndex] Item index in target collection.
	 */
	getMoveData: function(moveItemId) {
		var reorderableIndex = this.getReorderableIndex();
		if (Ext.isEmpty(reorderableIndex)) {
			return {
				cancel: true
			};
		}
		var sourceViewModelItems = this.findViewModeCollectionByKey(moveItemId);
		var viewModelItem = sourceViewModelItems.get(moveItemId);
		var viewModelItemId = viewModelItem.get("Id");
		var itemIndex = this.indexOf(moveItemId);
		if (itemIndex === -1 || (reorderableIndex < itemIndex && itemIndex > 0)) {
			reorderableIndex += 1;
		}
		var viewModelItems = this.get("ViewModelItems");
		var sourceIndex = sourceViewModelItems.indexOf(viewModelItem);
		return {
			item: viewModelItem,
			itemId: viewModelItemId,
			sourceCollection: sourceViewModelItems,
			sourceIndex: sourceIndex,
			targetCollection: viewModelItems,
			targetIndex: reorderableIndex
		};
	},

	move: function(moveData) {
		//TODO CRM-26037
		moveData.sourceCollection.removeByKey(moveData.itemId);
		moveData.targetCollection.insert(moveData.targetIndex, moveData.itemId, moveData.item);
		return moveData.targetIndex;
	},

	/**
	 * DragOut event handler
	 * @protected
	 */
	onDragOut: function() {
		this.set("ReorderableIndex", null);
	},

	/**
	 * Finds items collection by key.
	 * @protected
	 * @param {String} key Item id.
	 * @return {Terrasoft.BaseViewModelCollection|null}
	 */
	findViewModeCollectionByKey: function(key) {
		var result = null;
		var viewModelItems = this.get("ViewModelItems");
		if (viewModelItems.contains(key)) {
			result = viewModelItems;
		}
		return result;
	},

	/**
	 * Clears reorderable index.
	 * @protected
	 */
	clearReorderableIndex: function() {
		this.set("ReorderableIndex", null);
	},

	/**
	 * Returns last index in collection. If the last element is dragged, it returns penultimate index.
	 * @private
	 * @param {String} dragItemId Dragged item id.
	 * @return {Number}
	 */
	getLastIndex: function(dragItemId) {
		var viewModelItems = this.getViewModelItems();
		var indexOf = viewModelItems.getCount() - 1;
		var indexDragItem = this.indexOf(dragItemId);
		if (indexDragItem > -1 && indexOf === indexDragItem) {
			indexOf--;
		}
		return indexOf;
	}
});
