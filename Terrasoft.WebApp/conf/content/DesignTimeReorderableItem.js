Terrasoft.configuration.Structures["DesignTimeReorderableItem"] = {innerHierarchyStack: ["DesignTimeReorderableItem"]};
define("DesignTimeReorderableItem", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {

	Ext.define("Terrasoft.DesignTimeReorderableItem", {
		alternateClassName: "Terrasoft.configuration.DesignTimeReorderableItem",
		extend: "Terrasoft.DraggableContainer",

		// region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.Draggable#grabbedClassName
		 * @override
		 */
		grabbedClassName: "design-time-draggable-item-grabbed",

		/**
		 * @inheritdoc Terrasoft.Draggable#dragActionsCode
		 * @override
		 */
		dragActionsCode: Terrasoft.DragAction.MOVE,

		/**
		 * @inheritdoc Terrasoft.Draggable#dragCopy
		 * @override
		 */
		dragCopy: false,

		/**
		 * @inheritdoc Terrasoft.Draggable#showDropOverZoneHint
		 * @override
		 */
		showDropOverZoneHint: true,

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.Component#constructor
		 * @override
		 */
		constructor: function() {
			this.callParent(arguments);
			this.addEvents(
				"ondragenter",
				"ondragout",
				"ondragdrop"
			);
		},

		/**
		 * @inheritdoc Terrasoft.Draggable#getDraggableConfig
		 * @override
		 */
		getDraggableConfig: function() {
			var draggableConfig = {};
			draggableConfig[Terrasoft.DragAction.MOVE] = {
				handlers: {
					onDragOver: "onDragEnter",
					onDragOut: "onDragOut",
					onDragDrop: "onDragDrop",
					onInvalidDrop: "onInvalidDrop"
				}
			};
			return draggableConfig;
		},

		/**
		 * @inheritdoc Terrasoft.Draggable#getDraggableElementDefaultConfig
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
		 * DragOver event handler.
		 * @protected
		 */
		onDragEnter: function(event, crossedBlocks) {
			Terrasoft.each(crossedBlocks, function(crossedBlock) {
				if (!crossedBlock.droppableInstance) {
					this.fireEvent("ondragenter", crossedBlock.id);
					return false;
				}
			}, this);
		},

		/**
		 * DragOut event handler.
		 * @protected
		 */
		onDragOut: function() {
			this.fireEvent("ondragout");
		},

		/**
		 * Handler for onDragDrop event.
		 * @protected
		 */
		onDragDrop: function() {
			this.reRender();
			this.fireEvent("ondragdrop");
		},

		/**
		 * Handler for onInvalidDrop event.
		 * @protected
		 */
		onInvalidDrop: function() {
			this.reRender();
		}

		// endregion

	});
});


