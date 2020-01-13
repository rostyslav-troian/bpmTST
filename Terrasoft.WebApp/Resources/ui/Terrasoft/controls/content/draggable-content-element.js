Ext.define("Terrasoft.mixins.DraggableContentElement", {
	extend: "Terrasoft.core.mixins.Draggable",
	alternateClassName: "Terrasoft.DraggableContentElement",

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
	showDropZoneHint: false,

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
			 * Fires when drag out from the insertion area {@link #onDragOut onDragOut()}.
			 */
			"ondragout",
			/**
			 * @event ondragdrop
			 * Fires when successful drop {@link #onDragDrop onDragDrop()}.
			 */
			"ondragdrop",
			/**
			 * @event oninvaliddrop
			 * Fires when invalid drop {@link #onInvalidDrop onInvalidDrop()}.
			 */
			"oninvaliddrop"
		);
	},

	/**
	 * Sets visibility of the column hint.
	 * @protected
	 * @param {Boolean} value Visibility option value.
	 * @param {Terrasoft.ContentColumn} column Target container.
	 */
	setColumnHintVisible: function(value, column) {
		var container = column || this.container;
		var wrapEl = container && container.getWrapEl();
		if (!wrapEl) {
			return;
		}
		if (value) {
			wrapEl.addCls(this.dropZoneHintClass);
		} else {
			wrapEl.removeCls(this.dropZoneHintClass);
		}
	},

	/**
	 * Handles before start drag element event.
	 * @protected
	 * @param {Number} x Mouse x coordinate value.
	 * @param {Number} y Mouse y coordinate value.
	 */
	b4StartDrag: function(x, y) {
		x = x || 0;
		y = y || 0;
		var wrapEl = this.getWrapEl();
		wrapEl && wrapEl.setOpacity(0.3, true);
		var tools = wrapEl && wrapEl.down(".content-element-tools-wrap", false);
		if (tools) {
			var draggEl = tools.down("#" + this.id + "-dragg-el-wrapperEl", false);
			var clone = this.createDraggableClone(draggEl.dom, x, y);
			this.appendDraggableClone(clone);
			tools && tools.setVisible(false);
		}
	},

	/**
	 * Handles dragged element enter the drop zone.
	 * @protected
	 */
	onDragEnter: Terrasoft.emptyFn,

	/**
	 * Handles element drag over the drop zone.
	 * @protected
	 * @param {Object} event Event object.
	 * @param {Array} crossedBlocks Array of crossed elements.
	 */
	onDragOver: function(event, crossedBlocks) {
		const containers = crossedBlocks.filter(function(item) {
			return item.config.itemType === "column" && item.droppableInstance;
		});
		if (containers.length) {
			var container = containers.find(function(item) {
				return item.cursorIsOver;
			});
			container = container || containers[0];
			if (!this.container) {
				this.container = container.droppableInstance;
				this.setColumnHintVisible(true);
			}
			if (this.container.id !== container.droppableInstance.id) {
				this.setColumnHintVisible(false);
				this.container.model.onElementDragOut();
				this.container = container.droppableInstance;
				this.setColumnHintVisible(true);
			}
			const containerViewModel = this.container.model;
			const containerId = this.container.id;
			const elements = crossedBlocks.filter(function(item) {
				return item.config.itemType === "element" && item.config.columnId === containerId;
			});
			var element = elements.length && (elements.find(function(item) {
				return item.cursorIsOver;
			}));
			if (!element && elements.length) {
				element = elements.find(function(item) {
					return item.config.isZero;
				});
			}
			const elementId = element && element.config.id;
			containerViewModel.onElementDragOver(elementId);
		}
	},

	/**
	 * Handles element drag out from the drop zone.
	 * @protected
	 * @param {Object} event Event object.
	 * @param {Array} crossedBlocks Array of crossed elements.
	 */
	onDragOut: function(event, crossedBlocks) {
		const container = crossedBlocks.find(function(item) {
			return item.config.itemType === "column" && item.droppableInstance;
		});
		if (container) {
			container.droppableInstance.model.onElementDragOut();
			this.setColumnHintVisible(false, container.droppableInstance);
			if (this.container && this.container.id === container.droppableInstance.id) {
				this.container = null;
			}
		}
	},

	/**
	 * Handles successful drop.
	 * @override
	 * @param {Object} event Event object.
	 * @param {Array} crossedBlocks Array of crossed elements.
	 */
	onDragDrop: function(event, crossedBlocks) {
		this.reRender();
		var containerId = this.container && this.container.id;
		var container = crossedBlocks.find(function(item) {
			return item.config.itemType === "column" && item.config.columnId === containerId
				&& item.droppableInstance;
		});
		if (container) {
			this.container.model.onElementDragDrop(this.model);
			this.setColumnHintVisible(false);
			this.container = null;
		}
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
