/**
 */
Ext.define("Terrasoft.mixins.ReorderableItemMixin", {
	alternateClassName: "Terrasoft.ReorderableItemMixin",
	extend: "Terrasoft.Draggable",

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			"beforeStartDrag",
			"onDragEnter",
			"onDragOver",
			"onDragOut",
			"onDragDrop",
			"onInvalidDrop"
		);
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#dragActionsCode
	 * @override
	 */
	dragActionsCode: Terrasoft.DragAction.MOVE,

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#dragCopy
	 * @override
	 */
	dragCopy: false,

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#showDropZoneHint
	 * @override
	 */
	showDropZoneHint: false,

	/**
	 * Reference to the container.
	 * @protected
	 * @type {Terrasoft.ReorderableContainer}
	 */
	container: null,

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#getDraggableConfig
	 * @override
	 */
	getDraggableConfig: function() {
		var draggableConfig = {};
		draggableConfig[Terrasoft.DragAction.MOVE] = {
			handlers: {
				b4StartDrag: "b4StartDrag",
				onDragEnter: "onDragEnter",
				onDragOver: "onDragOver",
				onDragOut: "onDragOut",
				onDragDrop: "onDragDrop",
				onInvalidDrop: "onInvalidDrop"
			}
		};
		return draggableConfig;
	},

	b4StartDrag: function() {
		this.callParent(arguments);
		this.fireEvent("beforeStartDrag", this);
	},

	/**
	 * DragEnter event handler.
	 * @protected
	 * @param {Object} event Event data.
	 * @param {Object[]} crossedBlocks DropZones over which there is an draggable element.
	 */
	onDragEnter: function(event, crossedBlocks) {
		this.onDrag(event, crossedBlocks, "onDragEnter");
	},

	/**
	 * DragOver event handler.
	 * @protected
	 * @param {Object} event Event data.
	 * @param {Object[]} crossedBlocks DropZones over which there is an draggable element.
	 */
	onDragOver: function(event, crossedBlocks) {
		this.onDrag(event, crossedBlocks, "onDragOver");
	},

	/**
	 * Drag event handler
	 * @protected
	 * @param {Object} event Event data.
	 * @param {Object[]} crossedBlocks DropZones over which there is an draggable element.
	 * @param {String} eventName Drag event name (onDragEnter/onDragOver).
	 */
	onDrag: function(event, crossedBlocks, eventName) {
		var dragCloneEl = Ext.get(this.getCloneId());
		var dragRegion = Ext.util.Region.getRegion(dragCloneEl);
		var container = this.findContainer(crossedBlocks, dragRegion);
		if (container) {
			this.container = container;
			var dragOverItems = this.findDragOverItems(crossedBlocks, container);
			var containerEventHandler = container[eventName];
			containerEventHandler.call(container, this.id, dragRegion, dragOverItems);
		}
	},

	/**
	 * InvalidDrop event handler.
	 * @protected
	 */
	onInvalidDrop: function() {
		this.reRender();
		this.fireEvent("onInvalidDrop");
	},

	/**
	 * DragOut event handler.
	 * @protected
	 */
	onDragOut: function() {
		var container = this.container;
		if (container) {
			container.onDragOut();
		}
	},

	/**
	 * DragDrop event handler.
	 * @protected
	 */
	onDragDrop: function() {
		this.reRender();
		var container = this.container;
		if (container) {
			container.onDragDrop(this.id);
		}
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#getDraggableElementDefaultConfig
	 * @override
	 */
	getDraggableElementDefaultConfig: function() {
		return {
			isTarget: true,
			instance: this,
			tag: this.tag
		};
	},

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#applyDraggableCloneStyle
	 * @override
	 */
	applyDraggableCloneStyle: function(node) {
		this.callParent(arguments);
		var height = this.wrapEl.getHeight();
		var width = this.wrapEl.getWidth();
		node.style.height = height + "px";
		node.style.width = width + "px";
	},

	/**
	 * Finds items over which there is an draggable element.
	 * @private
	 * @param {Object[]} crossedBlocks DropZones over which there is an draggable element.
	 * @param {Terrasoft.ReorderableContainer} container Container.
	 * @return {Array}
	 */
	findDragOverItems: function(crossedBlocks, container) {
		var items = [];
		var containerRegion = Ext.util.Region.getRegion(container.getWrapEl());
		Terrasoft.each(crossedBlocks, function(crossedBlock) {
			if (!crossedBlock.droppableInstance) {
				var dragOverRegion = Ext.util.Region.getRegion(crossedBlock.getEl());
				var intersectRegion = containerRegion.intersect(dragOverRegion);
				if (intersectRegion) {
					items.push(crossedBlock);
				}
			}
		}, this);
		return items;
	},

	/**
	 * Finds container.
	 * @private
	 * @param {Object[]} crossedBlocks DropZones over which there is an draggable element.
	 * @param {Ext.util.Region} dragRegion Dragging region.
	 * @return {Terrasoft.controls.ReorderableContainer|null}
	 */
	findContainer: function(crossedBlocks, dragRegion) {
		var container = null;
		Terrasoft.each(crossedBlocks, function(crossedBlock) {
			var droppable = crossedBlock.droppableInstance;
			if (droppable) {
				var containerRegion = Ext.util.Region.getRegion(crossedBlock.getEl());
				var intersectRegion = containerRegion.intersect(dragRegion);
				var halfDragRegionWidth = (dragRegion.right - dragRegion.left) / 2;
				if (intersectRegion.right - intersectRegion.left > halfDragRegionWidth) {
					container = droppable;
					return false;
				}
			}
		}, this);
		return container;
	}

});
