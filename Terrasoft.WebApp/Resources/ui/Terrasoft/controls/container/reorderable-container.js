Ext.ns("Terrasoft.enums.ReorderableContainer");

/**
 * Reorderable container items align.
 * @enum
 */
Terrasoft.enums.ReorderableContainer.Align = {
	/**
	 * Vertical align.
	 */
	VERTICAL: "Vertical",

	/**
	 * Horizontal align.
	 */
	HORIZONTAL: "Horizontal"
};

Ext.define("Terrasoft.controls.ReorderableContainer", {
	extend: "Terrasoft.controls.DroppableContainer",
	alternateClassName: "Terrasoft.ReorderableContainer",

	mixins: {
		reorderable: "Terrasoft.Reorderable"
	},

	/**
	 * Css class name for wrap element.
	 * @protected
	 * @type {String}
	 */
	wrapClassName: "reorderable-container",

	/**
	 * Css class name for inner container element that contains items.
	 * @protected
	 * @type {String}
	 */
	innerContainerClassName: "reorderable-inner-container",

	/**
	 * Css class name for vertical items align.
	 * @protected
	 * @type {String}
	 */
	verticalAlignClassName: "vertical-align",

	/**
	 * Css class name for horizontal items align.
	 * @protected
	 * @type {String}
	 */
	horizontalClassName: "horizontal-align",

	/**
	 * Default child item class name. Applies when item view config doesn't specify className.
	 * @protected
	 * @type {String}
	 */
	itemClassName: "Terrasoft.DraggableContainer",

	/**
	 * Name of group DragAndDrop element.
	 * @type {String[]}
	 */
	dropGroupName: null,

	/**
	 * @inheritdoc Terrasoft.controls.Container#defaultRenderTpl
	 * @override
	 */
	defaultRenderTpl: [
		"<div id=\"{id}\" style=\"{wrapStyles}\" class=\"{wrapClassName}\">",
		"<div id=\"{id}-inner-container\" style=\"{innerContainerStyles}\" class=\"{innerContainerClassName}\">",
		"{%this.renderItems(out, values)%}",
		"</div>",
		"</div>"
	],

	/**
	 * Default child item view config. Applies when item view model doesn't specify config.
	 * @protected
	 * @type {Object}
	 */
	defaultItemConfig: null,

	/**
	 * Items align
	 * @type {Terrasoft.enums.ReorderableContainer.Align}
	 */
	align: Terrasoft.enums.ReorderableContainer.Align.VERTICAL,

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			"onDragEnter",
			"onDragOver",
			"onDragDrop",
			"onDragOut"
		);
	},

	/**
	 * DragEnter event handler.
	 * @param {String} dragItemId Dragged item id.
	 * @param {Ext.util.Region} dragRegion Dragging region.
	 * @param {Array} dragOverItems Items over which there is an draggable element.
	 */
	onDragEnter: function(dragItemId, dragRegion, dragOverItems) {
		this.onDrag(dragItemId, dragRegion, dragOverItems, "onDragEnter");
	},

	/**
	 * DragOver event handler.
	 * @param {String} dragItemId Dragged item id.
	 * @param {Ext.util.Region} dragRegion Dragging region.
	 * @param {Array} dragOverItems Items over which there is an draggable element.
	 */
	onDragOver: function(dragItemId, dragRegion, dragOverItems) {
		this.onDrag(dragItemId, dragRegion, dragOverItems, "onDragOver");
	},

	/**
	 * Drag event handler
	 * @protected
	 * @param {String} dragItemId Dragged item id.
	 * @param {Ext.util.Region} dragRegion Dragging region.
	 * @param {Array} dragOverItems Items over which there is an draggable element.
	 * @param {String} eventName Drag event name (onDragEnter/onDragOver).
	 */
	onDrag: function(dragItemId, dragRegion, dragOverItems, eventName) {
		Terrasoft.each(dragOverItems, function(dragOverItem) {
			var dragOverRegion = this.getDragOverRegion(dragOverItem);
			var isDragElementOverItem = this.getIsDragElementOverItem(dragRegion, dragOverRegion);
			if (isDragElementOverItem) {
				var isValidDrag = this.fireEvent(eventName, dragItemId, dragOverItem.config.tag);
				this.setInvalidDrag(dragItemId, isValidDrag);
				return false;
			}
		}, this);
	},

	/**
	 * Sets drag item as invalid. Not implemented.
	 * @protected
	 * @param {String} dragItemId Drag item id.
	 * @param {Boolean} isValid Indicates whether dragged item is over valid zone.
	 */
	setInvalidDrag: Terrasoft.emptyFn,

	/**
	 * Returns flag that indicates if item over which there is an draggable element.
	 * @protected
	 * @param {Ext.util.Region} dragRegion Dragging region.
	 * @param {Ext.util.Region} dragOverRegion Region over which there is an draggable element.
	 * @return {Boolean}
	 */
	getIsDragElementOverItem: function(dragRegion, dragOverRegion) {
		var isDragElementOverItem;
		if (this.align === Terrasoft.enums.ReorderableContainer.Align.HORIZONTAL) {
			isDragElementOverItem = dragRegion.right > dragOverRegion.left && dragRegion.right < dragOverRegion.right;
		}
		if (this.align === Terrasoft.enums.ReorderableContainer.Align.VERTICAL) {
			isDragElementOverItem = dragRegion.bottom > dragOverRegion.top && dragRegion.bottom < dragOverRegion.bottom;
		}
		return isDragElementOverItem;
	},

	/**
	 * Returns drag over region.
	 * @protected
	 * @param {Object} dragOverItem Item over which there is an draggable element.
	 * @return {Ext.util.Region}
	 */
	getDragOverRegion: function(dragOverItem) {
		var dragOverElement = dragOverItem.getEl();
		var dragOverRegion = Ext.util.Region.getRegion(dragOverElement);
		return dragOverRegion;
	},

	/**
	 * DragDrop event handler.
	 * @param {String} dropItemId Drop item id.
	 */
	onDragDrop: function(dropItemId) {
		this.fireEvent("onDragDrop", dropItemId);
	},

	/**
	 * DragOut event handler.
	 */
	onDragOut: function() {
		this.fireEvent("onDragOut", this.tag);
	},

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#getRenderToEl
	 * @protected
	 * @override
	 */
	getRenderToEl: function() {
		return this.innerContainerEl;
	},

	/**
	 * @inheritdoc Terrasoft.controls.Component#getTplData
	 * @protected
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.applyClasses(tplData);
		var selectors = this.getSelectors();
		Ext.apply(this.selectors, selectors);
		return tplData;
	},

	/**
	 * Returns ReorderableContainer selectors.
	 * @protected
	 * @return {Object} ReorderableContainer selectors.
	 */
	getSelectors: function() {
		return {
			innerContainerEl: "#" + this.id + "-inner-container"
		};
	},

	/**
	 * Sets ReorderableContainer css classes to tplData.
	 * @param {Object} tplData Render template data.
	 * @protected
	 */
	applyClasses: function(tplData) {
		var wrapClass = tplData.wrapClassName = tplData.wrapClassName || [];
		wrapClass.push(this.wrapClassName);
		var alignClassName = this.getAlignClassName(this.align);
		wrapClass.push(alignClassName);
		var innerContainerClasses = tplData.innerContainerClassName = [];
		innerContainerClasses.push(this.innerContainerClassName);
	},

	/**
	 * Returns css class name for items align.
	 * @param {Terrasoft.enums.ReorderableContainer.Align} align Items align.
	 * @return {String} Css class name.
	 */
	getAlignClassName: function(align) {
		var alignClassName = "";
		if (align === Terrasoft.enums.ReorderableContainer.Align.VERTICAL) {
			alignClassName = this.verticalAlignClassName;
		}
		if (align === Terrasoft.enums.ReorderableContainer.Align.HORIZONTAL) {
			alignClassName = this.horizontalClassName;
		}
		return alignClassName;
	},

	/**
	 * Returns item default view config.
	 * @protected
	 * @return {Object} Item view config.
	 */
	getDefaultItemConfig: function() {
		return this.defaultItemConfig || {};
	},

	/**
	 * @inheritdoc Terrasoft.controls.DroppableContainer#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.mixins.reorderable.onAfterRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.controls.DroppableContainer#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.mixins.reorderable.onAfterReRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.controls.DroppableContainer#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.mixins.reorderable.onDestroy.apply(this, arguments);
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.controls.AbstractContainer#bindItems
	 * Hides base implementation.
	 * @override
	 */
	bindItems: Terrasoft.emptyFn,

	/**
	 * @inheritdoc Terrasoft.controls.Component#getBindConfig
	 * Hides base implementation.
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var reorderableBindConfig = this.mixins.reorderable.getBindConfig.apply(this, arguments);
		Ext.apply(bindConfig, reorderableBindConfig);
		Ext.apply(bindConfig, {
			align: {
				changeMethod: "setAlign"
			}
		});
		return bindConfig;
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Reorderable#getItemConfig
	 * @override
	 */
	getItemConfig: function() {
		var itemConfig = this.mixins.reorderable.getItemConfig.apply(this, arguments);
		if (!itemConfig) {
			itemConfig = this.getDefaultItemConfig();
			Ext.applyIf(itemConfig, {
				className: this.itemClassName
			});
		}
		return itemConfig;
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Reorderable#subscribeForCollectionEvents
	 * @override
	 */
	subscribeForCollectionEvents: function(binding, property, model) {
		this.callParent(arguments);
		this.mixins.reorderable.subscribeForCollectionEvents.apply(this, arguments);
		if (property === "viewModelItems") {
			var collection = model.get(binding.modelItem);
			collection.on("move", this.onMoveItem, this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Reorderable#unSubscribeForCollectionEvents
	 * @override
	 */
	unSubscribeForCollectionEvents: function(binding, property, model) {
		this.callParent(arguments);
		this.mixins.reorderable.unSubscribeForCollectionEvents.apply(this, arguments);
		if (property === "viewModelItems") {
			var collection = model.get(binding.modelItem);
			collection.un("move", this.onMoveItem, this);
		}
	},

	/**
	 * Move item event handler.
	 * @protected
	 * @param {Number} fromIndex Moving element index.
	 * @param {Number} toIndex Destination index.
	 * @param {String} fromKey Moving element name.
	 */
	onMoveItem: function(fromIndex, toIndex, fromKey) {
		var items = this.items;
		var item = items.get(fromKey);
		items.suspendEvents();
		items.removeAt(fromIndex);
		items.insert(toIndex, fromKey, item);
		items.resumeEvents();
		if (item.allowRerender()) {
			item.reRender(toIndex);
		}
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Reorderable#getGroupName
	 * @override
	 */
	getGroupName: function() {
		return this.dropGroupName;
	},

	/**
	 * Sets items align.
	 * @param {Terrasoft.enums.ReorderableContainer.Align} align New items align.
	 */
	setAlign: function(align) {
		if (this.align === align) {
			return;
		}
		var classToRemove = this.getAlignClassName(this.align);
		var classToAdd = this.getAlignClassName(align);
		this.align = align;
		if (!this.rendered) {
			return;
		}
		var wrapElClassList = this.wrapEl.dom.classList;
		wrapElClassList.remove(classToRemove);
		wrapElClassList.add(classToAdd);
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Reorderable#insertZeroElement
	 * @override
	 */
	insertZeroElement: function(where, zeroElementHtml) {
		this.innerContainerEl.insertHtml("beforeEnd", zeroElementHtml);
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Reorderable#onViewModelItemRemove
	 * @override
	 */
	onViewModelItemRemove: function() {
		this.mixins.reorderable.onViewModelItemRemove.apply(this, arguments);
		this.applySelectors(this.wrapEl);
	}

});
