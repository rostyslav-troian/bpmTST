Ext.ns("Terrasoft.mixins.enums");

/**
 * Drag&drop action type.
 */
Terrasoft.mixins.enums.DragAction = {
	/** Move */
	MOVE: 1,
	/** Resizing top */
	RESIZE_TOP: 2,
	/** Resizing top right */
	RESIZE_TOP_RIGHT: 4,
	/** Resizing right */
	RESIZE_RIGHT: 8,
	/** Resizing bottom right */
	RESIZE_BOTTOM_RIGHT: 16,
	/** Resizing bottom */
	RESIZE_BOTTOM: 32,
	/** Resizing bottom left */
	RESIZE_BOTTOM_LEFT: 64,
	/** Resizing left */
	RESIZE_LEFT: 128,
	/** Resizing top left */
	RESIZE_TOP_LEFT: 256,
	/** All available operations */
	ALL: 511
};

/**
 * Abbreviation for {@link Terrasoft.mixins.enums.DragAction}
 * @member Terrasoft
 * @inheritdoc Terrasoft.mixins.enums.DragAction
 */
Terrasoft.DragAction = Terrasoft.mixins.enums.DragAction;

/**
 * Mixin is used for drag control.
 */
Ext.define("Terrasoft.core.mixins.Draggable", {
	alternateClassName: "Terrasoft.Draggable",

	//region Properties: Public

	/**
	 * The code for the available drag and drop operations.
	 * The allowed range is 2 ^ 9 (9 is the number of operations).
	 * The definition of available operations is based on the principle of overlaying a bitmask.
	 * The operation can be defined starting with the move - 0, then clockwise, changing the size of the top - 1,
	 * top right - 2, right - 3, bottom right - 4, bottom - 5, bottom left - 6, left - 7 and
	 * top left - 8 corners.
	 * |8|1|2|
	 * |7|0|3|
	 * |6|5|4|
	 * Or by adding transaction values: Terrasoft.DragAction.MOVE | Terrasoft.DragAction.RESIZE_LEFT.
	 *
	 * Examples:
	 *
	 * 1. Implement only movement of an item.
	 * Solution:
	 * Decompose this into the bit mask of our operations:
	 * |8|7|6|5|4|3|2|1|0|
	 * |0|0|0|0|0|0|0|0|1|
	 * Resulting binary number is 000000001, or 1 in the decimal representation. dragActionsCode = 1
	 * Or Terrasoft.DragAction.MOVE = 1 = 1
	 *
	 * 2. Implement vertical and horizontal resizing only.
	 * Solution:
	 * Decompose this into the bit mask of our operations:
	 * |8|7|6|5|4|3|2|1|0|
	 * |0|1|0|1|0|1|0|1|0|
	 * Resulting binary number is 010101010, or 170 in the decimal representation. dragActionsCode = 170
	 * Or Terrasoft.DragAction.TOP | Terrasoft.DragAction.RIGHT | Terrasoft.DragAction.BOTTOM |
	 * Terrasoft.DragAction.LEFT = 2 + 8 + 32 + 128 = 170
	 *
	 * 3. Implement both movement and complete resizing.
	 * Solution:
	 * Decompose this into the bit mask of our operations:
	 * |8|7|6|5|4|3|2|1|0|
	 * |1|1|1|1|1|1|1|1|1|
	 * Resulting binary number is 111111111, or 511 in the decimal representation. dragActionsCode = 511
	 * OR ... = 1 + 2 + 4 + 8 + 16 + 32 + 64 + 128 + 256 = 511
	 *
	 * @protected
	 * @type {Number}
	 */
	dragActionsCode: 511,

	/**
	 * A "hint" class for available drop-zones.
	 * @protected
	 * @type {String}
	 */
	dropZoneHintClass: "drop-zone-hint",

	/**
	 * A "hint" class for drop-zones which are ready to take an item.
	 * @protected
	 * @type {String}
	 */
	dropOverZoneHintClass: "dropover-zone-hint",

	/**
	 * Indicates the visibility of the available drop-zone "hint".
	 * @protected
	 * @type {Boolean}
	 */
	showDropZoneHint: true,

	/**
	 * Indicates the visibility of the drop-zone "hint" which are ready to take an item.
	 * @protected
	 * @type {Boolean}
	 */
	showDropOverZoneHint: false,

	/**
	 * Indicates dragging an item's copy.
	 * @protected
	 * @type {Boolean}
	 */
	dragCopy: false,

	/**
	 * Class of "captured" item copy.
	 * @protected
	 * @type {String}
	 */
	grabbedClassName: "draggable-item-grabbed",

	/**
	 * Drag and drop group name.
	 * @protected
	 * @type {String}
	 */
	groupName: "draggable-group",

	/**
	 * Drag zone padding.
	 * @protected
	 * @type {Number|Number[]}
	 */
	dragZonePadding: 0,

	//endregion

	//region Methods: Protected

	/**
	 * Initialization method.
	 * @protected
	 */
	init: Terrasoft.emptyFn,

	/**
	 * Returns an array of drag item Ids.
	 * @protected
	 * @return {String[]} An array of drag item Ids.
	 */
	getDraggableElementIds: function() {
		var elements = [];
		Terrasoft.each(Terrasoft.DragAction, function(dragAction) {
			var config = this.getActionDraggableConfig(dragAction);
			var elementId = config && config.elementId;
			if (elementId) {
				elements.push(elementId);
			}
		}, this);
		return elements;
	},

	/**
	 * Apply draggable clone styles.
	 * @private
	 * @param {Object} node Draggable clone node.
	 * @param {Object} styles Styles.
	 */
	applyDraggableCloneStyle: function(node, styles) {
		Ext.apply(node.style, styles);
	},

	/**
	 * Create draggable clone.
	 * @protected
	 * @param {Object} node Draggable clone node.
	 * @param {Number} x X position.
	 * @param {Number} y Y position.
	 */
	createDraggableClone: function(node, x, y) {
		var dragEl = Ext.dd.DragDropManager.dragCurrent;
		dragEl.resetConstraints(true);
		dragEl.clearConstraints();
		this.deleteDraggableClone();
		var cloneId = this.getCloneId();
		var clone = node.cloneNode(true);
		clone.classList.add(this.grabbedClassName);
		var config = {
			position: "absolute",
			top: Ext.String.format("{0}px", y),
			left: Ext.String.format("{0}px", x)
		};
		this.applyDraggableCloneStyle(clone, config);
		clone.id = cloneId;
		dragEl.setDragElId(cloneId);
		return clone;
	},

	/**
	 * Gets clone id.
	 * @protected
	 * @return {String}
	 */
	getCloneId: function() {
		return this.id + "-draggable-clone";
	},

	/**
	 * Append draggable clone to body.
	 * @protected
	 * @param {Object} clone Clone element.
	 */
	appendDraggableClone: function(clone) {
		var body = Ext.getBody();
		body.appendChild(clone);
	},

	/**
	 * Deletes a clone of drag item.
	 * @protected
	 */
	deleteDraggableClone: function() {
		var cloneId = this.getCloneId();
		var clone = Ext.get(cloneId);
		if (clone) {
			clone.remove();
		}
	},

	/**
	 * The method of processing a drag event.
	 * @param {Number} x Mouse x coordinate value.
	 * @param {Number} y Mouse y coordinate value.
	 * @protected
	 */
	b4StartDrag: function(x, y) {
		x = x || 0;
		y = y || 0;
		var wrapEl = this.getWrapEl();
		if (wrapEl) {
			var clone = this.createDraggableClone(wrapEl.dom, x, y);
			this.appendDraggableClone(clone);
			wrapEl.setVisible(this.dragCopy);
		}
		if (this.showDropZoneHint) {
			this.setDropZoneHintVisible(true);
		}
	},

	/**
	 * The method of processing a before drag over event.
	 * @protected
	 * @param {Ext.EventObject} event Event object.
	 * @param {Ext.dd.DDTarget[]} targets Drag&drop targets.
	 */
	b4DragOver: function(event, targets) {
		if (this.showDropOverZoneHint) {
			var droppableInstances = [];
			targets.forEach(function(target) {
				if (target.droppableInstance) {
					droppableInstances.push(target.droppableInstance);
				}
			}, this);
			if (droppableInstances.length) {
				this.setDropOverZoneHintVisible(true, droppableInstances);
			}
		}
	},

	/**
	 * The method of processing a before drag out event.
	 * @protected
	 * @param {Ext.EventObject} event Event object.
	 * @param {Ext.dd.DDTarget[]} targets Drag&drop targets.
	 */
	b4DragOut: function() {
		if (this.showDropOverZoneHint) {
			this.setDropOverZoneHintVisible(false);
		}
	},

	/**
	 * Returns the default operation settings object.
	 * @protected
	 * @return {Object} Returns the default operation settings object.
	 */
	getDefaultDraggableConfig: function() {
		var wrapEl = this.getWrapEl();
		var config = {};
		config[Terrasoft.DragAction.MOVE] = {
			autoGenerateDraggableElement: true,
			autoGenerateDraggableElementTpl:
				"<div id='{0}-draggable-item-move' class='draggable-item-move'>",
			elementId: wrapEl.id,
			getInitConfigMethod: Terrasoft.emptyFn,
			handlers: {
				b4StartDrag: "b4StartDrag",
				onInvalidDrop: "reRender",
				b4DragOver: "b4DragOver",
				b4DragOut: "b4DragOut"
			}
		};
		config[Terrasoft.DragAction.RESIZE_TOP] = {
			autoGenerateDraggableElement: true,
			autoGenerateDraggableElementTpl:
				"<div id='{0}-draggable-item-top' class='draggable-item-resize-top'></div>",
			elementId: Ext.String.format("{0}-draggable-item-top", this.id),
			getInitConfigMethod: Terrasoft.emptyFn,
			handlers: {
				onDrag: "onResizeTopElDrag",
				onInvalidDrop: "reRender"
			}
		};
		config[Terrasoft.DragAction.RESIZE_TOP_RIGHT] = {
			autoGenerateDraggableElement: true,
			autoGenerateDraggableElementTpl:
				"<div id='{0}-draggable-item-top-right' class='draggable-item-resize-top-right'></div>",
			elementId: Ext.String.format("{0}-draggable-item-top-right", this.id),
			getInitConfigMethod: Terrasoft.emptyFn,
			handlers: {
				onDrag: "onResizeTopRightElDrag",
				onInvalidDrop: "reRender"
			}
		};
		config[Terrasoft.DragAction.RESIZE_RIGHT] = {
			autoGenerateDraggableElement: true,
			autoGenerateDraggableElementTpl:
				"<div id='{0}-draggable-item-right' class='draggable-item-resize-right'></div>",
			elementId: Ext.String.format("{0}-draggable-item-right", this.id),
			getInitConfigMethod: Terrasoft.emptyFn,
			handlers: {
				onDrag: "onResizeRightElDrag",
				onInvalidDrop: "reRender"
			}
		};
		config[Terrasoft.DragAction.RESIZE_BOTTOM_RIGHT] = {
			autoGenerateDraggableElement: true,
			autoGenerateDraggableElementTpl:
				"<div id='{0}-draggable-item-bottom-right' class='draggable-item-resize-bottom-right'></div>",
			elementId: Ext.String.format("{0}-draggable-item-bottom-right", this.id),
			getInitConfigMethod: Terrasoft.emptyFn,
			handlers: {
				onDrag: "onResizeBottomRightElDrag",
				onInvalidDrop: "reRender"
			}
		};
		config[Terrasoft.DragAction.RESIZE_BOTTOM] = {
			autoGenerateDraggableElement: true,
			autoGenerateDraggableElementTpl:
				"<div id='{0}-draggable-item-bottom' class='draggable-item-resize-bottom'></div>",
			elementId: Ext.String.format("{0}-draggable-item-bottom", this.id),
			getInitConfigMethod: Terrasoft.emptyFn,
			handlers: {
				onDrag: "onResizeBottomElDrag",
				onInvalidDrop: "reRender"
			}
		};
		config[Terrasoft.DragAction.RESIZE_BOTTOM_LEFT] = {
			autoGenerateDraggableElement: true,
			autoGenerateDraggableElementTpl:
				"<div id='{0}-draggable-item-bottom-left' class='draggable-item-resize-bottom-left'></div>",
			elementId: Ext.String.format("{0}-draggable-item-bottom-left", this.id),
			getInitConfigMethod: Terrasoft.emptyFn,
			handlers: {
				onDrag: "onResizeBottomLeftElDrag",
				onInvalidDrop: "reRender"
			}
		};
		config[Terrasoft.DragAction.RESIZE_LEFT] = {
			autoGenerateDraggableElement: true,
			autoGenerateDraggableElementTpl:
				"<div id='{0}-draggable-item-left' class='draggable-item-resize-left'></div>",
			elementId: Ext.String.format("{0}-draggable-item-left", this.id),
			getInitConfigMethod: Terrasoft.emptyFn,
			handlers: {
				onDrag: "onResizeLeftElDrag",
				onInvalidDrop: "reRender"
			}
		};
		config[Terrasoft.DragAction.RESIZE_TOP_LEFT] = {
			autoGenerateDraggableElement: true,
			autoGenerateDraggableElementTpl:
				"<div id='{0}-draggable-item-top-left' class='draggable-item-resize-top-left'></div>",
			elementId: Ext.String.format("{0}-draggable-item-top-left", this.id),
			getInitConfigMethod: Terrasoft.emptyFn,
			handlers: {
				onDrag: "onResizeTopLeftElDrag",
				onInvalidDrop: "reRender"
			}
		};
		return config;
	},

	/**
	 * The method for processing the drag event when the top-level size is changed by default.
	 * @protected
	 * @param {Object} event Object of the drag event action.
	 */
	onResizeTopElDrag: function(event) {
		this.animateSizeChanging({
			"top": event.xy[1]
		});
	},

	/**
	 * The method for processing the drag event when the default size is changed at the bottom.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 */
	onResizeBottomElDrag: function(event) {
		this.animateSizeChanging({
			"bottom": event.xy[1]
		});
	},

	/**
	 * The method for processing the drag event when the default size is changed on the right.
	 * @protected
	 * @param {Object} event Object of the drag event action.
	 */
	onResizeRightElDrag: function(event) {
		this.animateSizeChanging({
			"right": event.xy[0]
		});
	},

	/**
	 * The method for processing the drag event when the default size is changed on the left.
	 * @protected
	 * @param {Object} event Object of the drag event action.
	 */
	onResizeLeftElDrag: function(event) {
		this.animateSizeChanging({
			"left": event.xy[0]
		});
	},

	/**
	 * The method for processing the drag event when the size is changed on the top-left by default.
	 * @protected
	 * @param {Object} event Object of the drag event action.
	 */
	onResizeTopLeftElDrag: function(event) {
		this.animateSizeChanging({
			"left": event.xy[0],
			"top": event.xy[1]
		});
	},

	/**
	 * The method for processing the drag event when the size is changed on the top-right by default.
	 * @protected
	 * @param {Object} event Object of the drag event action.
	 */
	onResizeTopRightElDrag: function(event) {
		this.animateSizeChanging({
			"right": event.xy[0],
			"top": event.xy[1]
		});
	},

	/**
	 * The method for processing the drag event when the size is changed on the bottom-right by default.
	 * @protected
	 * @param {Object} event Object of the drag event action.
	 */
	onResizeBottomRightElDrag: function(event) {
		this.animateSizeChanging({
			"right": event.xy[0],
			"bottom": event.xy[1]
		});
	},

	/**
	 * The method for processing the drag event when the size is changed on the bottom-left by default.
	 * @protected
	 * @param {Object} event Object of the drag event action.
	 */
	onResizeBottomLeftElDrag: function(event) {
		this.animateSizeChanging({
			"left": event.xy[0],
			"bottom": event.xy[1]
		});
	},

	/**
	 * The animation method when resizing an item.
	 * @protected
	 * @param {Object} propertyValues Object of Values.
	 */
	animateSizeChanging: function(propertyValues) {
		var wrapEl = this.getWrapEl();
		var wrapElRegion = wrapEl.getRegion();
		Terrasoft.each(propertyValues, function(propertyValue, propertyName) {
			wrapElRegion[propertyName] = propertyValue;
		}, this);
		wrapEl.setRegion(wrapElRegion);
	},

	/**
	 * Returns the object of additional drag parameter initialization.
	 * @protected
	 * @return {Object} Object of additional drag parameter initialization.
	 */
	getDraggableElementDefaultConfig: function() {
		return {
			isTarget: false,
			instance: this
		};
	},

	/**
	 * Returns object with additional parameters for drag element initialization.
	 * @protected
	 * @param {Terrasoft.mixins.enums.DragAction} action Drag action.
	 */
	initDraggableElement: function(action) {
		var actionConfig = this.getActionDraggableConfig(action);
		if (!actionConfig) {
			return;
		}
		var elementId = actionConfig && actionConfig.elementId;
		if (actionConfig.autoGenerateDraggableElement) {
			this.generateDraggableElement(Ext.String.format(actionConfig.autoGenerateDraggableElementTpl, this.id));
		}
		var overrides = this.bindConfigHandlers(actionConfig.handlers);
		var element = Ext.get(elementId);
		if (!element) {
			return;
		}
		var ddItem = element.initDD(elementId, Ext.apply(this.getDraggableElementDefaultConfig(),
			actionConfig.getInitConfigMethod), overrides);
		var dragZonePadding = this.dragZonePadding;
		if (dragZonePadding instanceof Array) {
			ddItem.setPadding.apply(ddItem, dragZonePadding);
		} else {
			ddItem.setPadding(dragZonePadding, dragZonePadding, dragZonePadding, dragZonePadding);
		}
		var groups = this.getGroupName();
		if (Ext.isArray(groups)) {
			Terrasoft.each(groups, function(group) {
				ddItem.addToGroup(group);
			}, this);
		} else {
			ddItem.addToGroup(groups);
		}
	},

	/**
	 * Returns the object of the current operation parameters of the element.
	 * @protected
	 * @param {Terrasoft.DragActions} action Type of drag operation.
	 * @return {Object} Object of the current operation parameters of the element.
	 */
	getActionDraggableConfig: function(action) {
		if (!this.defaultDraggableConfig) {
			this.defaultDraggableConfig = this.getDefaultDraggableConfig();
		}
		var defaultDraggableConfig = this.defaultDraggableConfig || {};
		var draggableConfig = this.getDraggableConfig() || {};
		return Ext.Object.merge(defaultDraggableConfig[action], draggableConfig[action]);
	},

	/**
	 * Executes binding of event handlers to operations with methods.
	 * @protected
	 * @param {Object} config Object of the handler parameters.
	 * @return {Object} The object of the associated event handlers for the operation of methods.
	 */
	bindConfigHandlers: function(config) {
		var result = {};
		Terrasoft.each(config, function(method, event) {
			var bindedMethod = Ext.isFunction(method) ? method : this[method];
			if (!bindedMethod) {
				throw new Terrasoft.NullOrEmptyException();
			}
			if (!Ext.isFunction(bindedMethod)) {
				throw new Terrasoft.UnsupportedTypeException();
			}
			result[event] = bindedMethod.bind(this);
		}, this);
		return result;
	},

	/**
	 * Generates the markup element in the wrapper element.
	 * @protected
	 * @param {String} html Element markup template.
	 */
	generateDraggableElement: function(html) {
		var wrapEl = this.getWrapEl();
		wrapEl.insertHtml("beforeEnd", html);
	},

	/**
	 * The method of initializing the elements of an object
	 * @protected
	 */
	initDraggable: function() {
		Ext.dd.DragDropManager.notifyOccluded = true;
		Terrasoft.each(Terrasoft.DragAction, function(dragAction) {
			var availableAction = this.dragActionsCode & dragAction;
			if (availableAction === dragAction) {
				this.initDraggableElement(dragAction);
			}
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		return {
			groupName: {
				changeMethod: "setGroupName"
			}
		};
	},

	/**
	 * Sets drag and drop group name.
	 * @protected
	 * @param {String} newValue New drag and drop group name.
	 */
	setGroupName: function(newValue) {
		this.groupName = newValue;
	},

	/**
	 * Returns drag and drop group name.
	 * @protected
	 * @return {String} Drag and drop group name.
	 */
	getGroupName: function() {
		return this.groupName;
	},

	/**
	 * Returns the operation settings object.
	 * Example:
	 * {
	 * 0: {
	 *   autoGenerateDraggableElement: true, // auto-generated sign of a markup element for implementation
	 *    of the operation functions
	 *   autoGenerateDraggableElementTpl: "<div id='{0}-someId' class='draggable-item-move'>",
	 *   // markup template for auto generated item
	 *   elementId: 'someId', // item Id
	 *
	 *   getInitConfigMethod: Terrasoft.emptyFn, // The method returns an object of additional parameters
	 *    for item initialization
	 *   handlers: {
	 *    onDragDrop: "onMoveDragDrop"
	 *  } // object of drag&drop event handlers. Complete list of events:
	 *    http://docs.sencha.com/extjs/4.2.0/#!/api/Ext.dd.DD
	 * },
	 * 1: {},
	 * ...
	 * 8: {}
	 * }
	 * 0, 1, ..., 8 - Indexes of the corresponding operations (Terrasoft.DragAction)
	 * @protected
	 * @return {Object} Returns operation settings object.
	 */
	getDraggableConfig: Terrasoft.emptyFn,

	/**
	 * Returns instanced of drop-zone objects in manager's group
	 * @protected
	 * @param {String} groupName Group name
	 */
	getGroupDropZoneInstances: function(groupName) {
		var result = {};
		var groupDDs = Ext.dd.DragDropManager.ids[groupName];
		Terrasoft.each(groupDDs, function(oDD) {
			if (oDD.isTarget) {
				var droppableInstance = oDD.droppableInstance;
				if (droppableInstance && !result[droppableInstance.id]) {
					result[droppableInstance.id] = droppableInstance;
				}
			}
		}, this);
		return result;
	},

	/**
	 * Returns drop zone object instances.
	 * @protected
	 */
	getDropZoneInstances: function() {
		var result = {};
		var groupNames = this.getGroupName();
		if (Ext.isArray(groupNames)) {
			Terrasoft.each(groupNames, function(groupName) {
				Ext.apply(result, this.getGroupDropZoneInstances(groupName));
			}, this);
		} else if (Ext.isString(groupNames)) {
			Ext.apply(result, this.getGroupDropZoneInstances(groupNames));
		}
		return result;
	},

	/**
	 * Sets visibility of the the drop zone hint.
	 * @protected
	 * @param {Boolean} value Visibility option value.
	 */
	setDropZoneHintVisible: function(value) {
		var dropZoneInstances = this.getDropZoneInstances();
		Terrasoft.each(dropZoneInstances, function(droppableInstance) {
			var wrapEl = droppableInstance.getWrapEl();
			if (!wrapEl) {
				return true;
			}
			if (value) {
				wrapEl.addCls(this.dropZoneHintClass);
			} else {
				wrapEl.removeCls(this.dropZoneHintClass);
			}
		}, this);
	},

	/**
	 * Sets visibility of the the drop zone which are ready to take an item over it.
	 * @protected
	 * @param {Boolean} value Visible value.
	 * @param {Ext.dd.DDTarget[]} [dropZoneInstances] Drop over zone instances.
	 */
	setDropOverZoneHintVisible: function(value, dropZoneInstances) {
		if (!dropZoneInstances) {
			dropZoneInstances = this.getDropZoneInstances();
		}
		Terrasoft.each(dropZoneInstances, function(droppableInstance) {
			var wrapEl = droppableInstance.getWrapEl();
			if (value) {
				wrapEl.addCls(this.dropOverZoneHintClass);
			} else {
				wrapEl.removeCls(this.dropOverZoneHintClass);
			}
		}, this);
	},

	/**
	 * Gets current draggable element.
	 * @protected
	 * @return {Ext.dom.Element} Current draggable element.
	 */
	getCurrentDraggableEl: function() {
		var dragCurrent = Ext.dd.DragDropManager.dragCurrent;
		var dragEl = dragCurrent && Ext.get(dragCurrent.dragElId);
		return dragEl;
	},

	/**
	 * Display or hide current draggable element.
	 * @protected
	 * @param {Boolean} value Visible value true or false.
	 */
	setDraggableElVisible: function(value) {
		var dragEl = this.getCurrentDraggableEl();
		if (dragEl) {
			dragEl.setVisible(value);
		}
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.initDraggable();
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.initDraggable();
		this.deleteDraggableClone();
		if (this.showDropZoneHint) {
			this.setDropZoneHintVisible(false);
		}
		if (this.showDropOverZoneHint) {
			this.setDropOverZoneHintVisible(false);
		}
	},

	/**
	 * @inheritdoc Terrasoft.component#onDestroy
	 * @override
	 */
	onDestroy: function() {
		if (this.rendered) {
			var ddIds = Ext.dd.DragDropManager.ids;
			var draggableElementIds = this.getDraggableElementIds();
			var groups = this.getGroupName();
			Terrasoft.each(draggableElementIds, function(elementId) {
				delete ddIds[elementId];
				if (Ext.isArray(groups)) {
					Terrasoft.each(groups, function(group) {
						if (ddIds[group]) {
							delete ddIds[group][elementId];
						}
					}, this);
				} else {
					if (ddIds[groups]) {
						delete ddIds[groups][elementId];
					}
				}
			}, this);
		}
	}

	//endregion

});
