Ext.define("Terrasoft.mixins.DraggableContentBlock", {
	extend: "Terrasoft.core.mixins.Draggable",
	alternateClassName: "Terrasoft.DraggableContentBlock",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#dragActionsCode
	 * @override
	 */
	dragActionsCode: Terrasoft.DragAction.MOVE,

	/**
	 * @inheritdoc Terrasoft.core.mixins.Draggable#showDropZoneHint
	 * @override
	 */
	showDropZoneHint: true,

	/**
	 * The drag and drop elements group name or groups list.
	 * @protected
	 * @type {String|String[]}
	 */
	groupName: null,

	//endregion

	//region Methods: Protected

	/**
	 * Adds draggable events to object.
	 * @protected
	 */
	addDraggableEvents: function() {
		this.addEvents(
			/**
			 * @event ondragover
			 * Fires when a drag over the insertion area {@link #onDragOver onDragOver()}
			 */
			"ondragover",
			/**
			 * @event ondragdrop
			 * Fires when successful drop {@link #onDragDrop onDragDrop()}.
			 */
			"ondragdrop",
			/**
			 * @event ondragdrop
			 * Fires when drag out from the insertion area {@link #onDragOut onDragOut()}.
			 */
			"ondragout",
			/**
			 * @event oninvaliddrop
			 * Fires when invalid drop {@link #onInvalidDrop onInvalidDrop()}.
			 */
			"oninvaliddrop"
		);
	},

	/**
	 * @inheritdoc Terrasoft.Draggable#initDraggable
	 * @override
	 */
	initDraggable: function() {
		this.callParent(arguments);
		if (this.isSelectable) {
			var dropZoneEl = this.getWrapEl();
			var dropZone = dropZoneEl.initDDTarget(this.getGroupName(), {
				id: this.id,
				itemType: "block"
			}, {});
			dropZone.droppableInstance = this;
		}
	},

	/**
	 * Removes drop zone from block.
	 */
	removeDropZone: function() {
		var wrapEl = this.getWrapEl();
		var elementId = wrapEl && wrapEl.id;
		var ddIds = Ext.dd.DragDropManager.ids;
		var groupName = this.getGroupName();
		var groupElements = groupName && ddIds[groupName];
		delete groupElements[elementId];
	},

	/**
	 * @inheritdoc Terrasoft.Draggable#getDraggableElementDefaultConfig
	 * @override
	 */
	getDraggableElementDefaultConfig: function() {
		return {
			isTarget: false,
			instance: this,
			tag: this.tag
		};
	},

	/**
	 * Handles before start drag block event.
	 * @protected
	 * @param {Number} x Mouse x coordinate value.
	 * @param {Number} y Mouse y coordinate value.
	 */
	b4StartDrag: function(x, y) {
		x = x || 0;
		y = y || 0;
		var wrapEl = this.getWrapEl();
		wrapEl && wrapEl.setOpacity(0.3, true);
		var tools = wrapEl && wrapEl.down('.content-block-tools-wrap', false);
		if (tools) {
			var draggEl = tools.down("#" + this.id + "dragg-el-wrapperEl", false);
			if (draggEl) {
				var clone = this.createDraggableClone(draggEl.dom, x, y);
				this.appendDraggableClone(clone);
			}
			tools.setVisible(false);
		}
		if (this.showDropZoneHint) {
			this.setDropZoneHintVisible(true);
		}
	},

	/**
	 * Handles drag enter the drop zone.
	 * @protected
	 */
	onDragEnter: Terrasoft.emptyFn,

	/**
	 * Handles drag over the drop zone.
	 * @protected
	 * @param {Object} event Event object.
	 * @param {Array} crossedBlocks Array of crossed blocks.
	 */
	onDragOver: function(event, crossedBlocks) {
		const container = crossedBlocks.find(function(item) {
			return item.config.itemType === "sheet" && item.droppableInstance;
		});
		if (container) {
			var blocks = crossedBlocks.filter(function(item) {
				return item.config.itemType === "block";
			});
			var block = blocks.length && (blocks.find(function(item) {
				return item.cursorIsOver;
			}));
			if (!block && blocks.length) {
				block = blocks.find(function(item) {
					return item.config.isZero;
				});
			}
			const itemId = block && block.config.id;
			this.fireEvent("ondragover", itemId);
		}
	},

	/**
	 * Handles drag out from the drop zone.
	 * @protected
	 * @param {Object} event Event object.
	 * @param {Array} crossedBlocks Array of crossed blocks.
	 */
	onDragOut: function(event, crossedBlocks) {
		const container = crossedBlocks.find(function(item) {
			return item.config.itemType === "sheet" && item.droppableInstance;
		});
		if (container) {
			container.droppableInstance.model.onItemDragOut();
		}
	},

	/**
	 * Handles successful drop.
	 * @protected
	 * @param {Object} event Event object.
	 * @param {Array} crossedBlocks Array of crossed blocks.
	 */
	onDragDrop: function(event, crossedBlocks) {
		this.reRender();
		this.fireEvent("ondragdrop");
	},

	/**
	 * Handles invalid drop.
	 * @protected
	 */
	onInvalidDrop: function() {
		this.reRender();
		this.fireEvent("oninvaliddrop");
	}

	//endregion

});
