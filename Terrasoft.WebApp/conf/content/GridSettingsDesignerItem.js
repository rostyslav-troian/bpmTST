Terrasoft.configuration.Structures["GridSettingsDesignerItem"] = {innerHierarchyStack: ["GridSettingsDesignerItem"]};
define('GridSettingsDesignerItemStructure', ['GridSettingsDesignerItemResources'], function(resources) {return {schemaUId:'18c9521d-fc28-418b-80f9-4116d7a984cc',schemaCaption: "", parentSchemaName: "", schemaName:'GridSettingsDesignerItem',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("GridSettingsDesignerItem", [], function() {
	Ext.define("Terrasoft.controls.GridSettingsDesignerItem", {
		alternateClassName: "Terrasoft.GridSettingsDesignerItem",
		extend: "Terrasoft.GridLayoutTableEditItem",

		/**
		 * Resizer element width.
		 * @protected
		 * @type {Number}
		 */
		resizerWidth: 4,

		/**
		 * Item states.
		 * @protected
		 * @type {Object}
		 */
		itemStates: {
			transforming: "transforming",
			ready: "ready"
		},

		/**
		 * Item drop hint positions.
		 * @protected
		 * @type {Object}
		 */
		itemDropHintPositions: {
			left: "left",
			right: "right"
		},

		/**
		 * Default margin width in percent.
		 * @protected
		 * @type {Number}
		 */
		marginWidth: 0.07,

		/**
		 * @inheritdoc Terrasoft.Draggable#showDropZoneHint
		 * @override
		 */
		showDropZoneHint: false,

		//region Methods: Private

		/**
		 * Animates left size changing.
		 * @private
		 * @param {Number} size Size value.
		 */
		_animateLeftSizeChanging: function(size) {
			this.animateSizeChanging({
				"left": size
			});
		},

		/**
		 * Animates right size changing.
		 * @private
		 * @param {Number} size Size value.
		 */
		_animateRightSizeChanging: function(size) {
			this.animateSizeChanging({
				"right": size
			});
		},

		/**
		 * Returns current drag element.
		 * @private
		 * @return {Ext.dd.DragDrop} Current drag element.
		 */
		_getExtCurrentDrag: function() {
			return Ext.dd.DragDropManager.dragCurrent;
		},

		/**
		 * Returns intersection position by cursor.
		 * @private
		 * @param {Object} event D&D event.
		 * @param {Array} cells D&D zones array.
		 * @return {Object} Intersection row and column.
		 */
		_getIntersectionPositionByCursor: function(event, cells) {
			var intersectionPosition;
			var resultItem;
			cells.forEach(function(item) {
				if (item.overlap.left <= event.xy[0] && item.overlap.right >= event.xy[0]
					&& item.overlap.top <= event.xy[1] && item.overlap.bottom >= event.xy[1]) {
					resultItem = item;
				}
			});
			if (resultItem) {
				resultItem = Ext.get(resultItem.id);
				intersectionPosition = {};
				intersectionPosition.column = parseInt(resultItem.getAttribute("data-column-index"), 10);
				intersectionPosition.row = parseInt(resultItem.getAttribute("data-row-index"), 10);
			}
			return intersectionPosition;
		},

		/**
		 * Initializes initial item position.
		 * @private.
		 */
		_initInitialPosition: function() {
			if (Ext.isEmpty(this.initialPosition)) {
				var wrapEl = this.getWrapEl();
				this.initialPosition = wrapEl && wrapEl.getRegion();
			}
		},

		/**
		 * Restores neighbours position.
		 * @private
		 */
		_restoreNeighboursPosition: function() {
			var gridLayoutEdit = this.getGridLayoutEditInstance();
			var wrapEl = this.getWrapEl();
			var wrapElRegion = wrapEl.getRegion();
			if (this.initialPosition && wrapElRegion && this.initialPosition.left === wrapElRegion.left
				&& this.initialPosition.right === wrapElRegion.right) {
				gridLayoutEdit.changeNeighbourItemsPositionOnResize(this, "restore", true, 0);
			}
			gridLayoutEdit.changeNeighbourItemsPositionOnResize(this, "clear", true, 0);
		},

		/**
		 * Returns initial resize parameters for resize event when emptyColsExistConstraint is false.
		 * @private
		 * @param {Event} event Resize event.
		 * @return {{needMoveNeighbour: boolean, needResizeNeighbour: boolean}} Initial resize parameters
		 */
		_getInitialResizeParams: function(event) {
			var isRtl = Terrasoft.getIsRtlMode();
			var initialX = this.initialPosition && (isRtl ? this.initialPosition.left : this.initialPosition.right);
			var needMoveAndRestoreNeighbour = isRtl ? initialX < event.xy[0] : initialX > event.xy[0];
			var needResizeAndRestoreNeighbour = isRtl ? (initialX > event.xy[0] && this.previousResizeX < initialX) :
				(initialX < event.xy[0] && this.previousResizeX > initialX);
			return {
				needMoveAndRestoreNeighbour: needMoveAndRestoreNeighbour,
				needResizeAndRestoreNeighbour: needResizeAndRestoreNeighbour
			};
		},

		/**
		 * Animate neighbours items when emptyColsExistConstraint is false.
		 * @private
		 * @param {Event} event Resize event.
		 */
		_animateNeighboursWithoutEmptyCells: function(event) {
			var gridLayoutEdit = this.getGridLayoutEditInstance();
			var resizeParams = this._getInitialResizeParams(event);
			var needMoveAndRestoreNeighbour = resizeParams.needMoveAndRestoreNeighbour;
			var needResizeAndRestoreNeighbour = resizeParams.needResizeAndRestoreNeighbour;
			if (needMoveAndRestoreNeighbour) {
				gridLayoutEdit.changeNeighbourItemsPositionOnResize(this, "restore", true, 0);
				gridLayoutEdit.changeNeighbourItemsPositionOnResize(this, "move", true, event.xy[0]);
			} else if (needResizeAndRestoreNeighbour) {
				gridLayoutEdit.changeNeighbourItemsPositionOnResize(this, "restore", true, 0);
				gridLayoutEdit.changeNeighbourItemsPositionOnResize(this, "resize", false, event.xy[0]);
			} else {
				gridLayoutEdit.changeNeighbourItemsPositionOnResize(this, "resize", false, event.xy[0]);
			}
		},

		/**
		 * Restores initial left and right position.
		 * @private
		 */
		_restoreSelfPosition: function() {
			if (this.initialPosition) {
				this.animateSizeChanging({
					"left": this.initialPosition.left,
					"right": this.initialPosition.right
				});
			}
		},

		/**
		 * Move item to new position.
		 * @private
		 * @param {Number} newPosition New position.
		 */
		_moveSelf: function(newPosition) {
			var sizeChangingArgs = {};
			var isRtl = Terrasoft.getIsRtlMode();
			var wrapEl = this.getWrapEl();
			var wrapElRegion = wrapEl && wrapEl.getRegion();
			if (wrapElRegion) {
				sizeChangingArgs[isRtl ? "right" : "left"] = newPosition;
				sizeChangingArgs[isRtl ? "left" : "right"] = isRtl ?
					wrapElRegion.left - (wrapElRegion.right - newPosition) :
					wrapElRegion.right - (wrapElRegion.left - newPosition);
				this.animateSizeChanging(sizeChangingArgs);
			}
		},

		/**
		 * Change item size (change left position).
		 * @private
		 * @param {Number} newPosition New position.
		 */
		_resizeSelf: function(newPosition) {
			var isRtl = Terrasoft.getIsRtlMode();
			var sizeChangingArgs = {};
			sizeChangingArgs[isRtl ? "right" : "left"] = newPosition;
			this.animateSizeChanging(sizeChangingArgs);
		},

		/**
		 * Sets visible of the body scroll-x.
		 * @private
		 * @param {Boolean} value Visible value of the body scroll-x.
		 */
		_setBodyScrollXVisible: function(value) {
			var bodyElDom = Ext.getBody().dom;
			if (value) {
				Terrasoft.utils.dom.removeClassName(bodyElDom, "hidden-scroll-x");
			} else {
				Terrasoft.utils.dom.addClassName(bodyElDom, "hidden-scroll-x");
			}
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItem#onMoveDragDrop
		 * @overridden
		 */
		onMoveDragDrop: function(event, cells) {
			var gridLayoutEdit = this.getGridLayoutEditInstance();
			gridLayoutEdit.setSelection();
			var intersectionPosition = this._getIntersectionPositionByCursor(event, cells);
			if (!intersectionPosition) {
				intersectionPosition = Ext.isIE
					? this.getIntersectionPositionByEvent(event)
					: this.getIntersectionPosition(cells);
			}
			this.fireEvent("afterPositionChange", intersectionPosition, this);
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItem#getIntersectionPositionByEvent
		 * @overridden
		 */
		getIntersectionPositionByEvent: function(event) {
			var intersection = {
				column: this.column,
				row: this.row
			};
			var cellClassName = this.gridLayoutTableEditTplConfig.selectorSuffixes.gridCell;
			var elementUnderMouse = document.elementFromPoint(event.xy[0], event.xy[1]);
			var elements = [];
			var displays = [];
			while (elementUnderMouse && elementUnderMouse.className !== cellClassName) {
				elements.push(elementUnderMouse);
				displays.push(elementUnderMouse.style.display);
				elementUnderMouse.style.display = "none";
				elementUnderMouse = document.elementFromPoint(event.xy[0], event.xy[1]);
			}
			if (elementUnderMouse) {
				intersection.column = parseInt(elementUnderMouse.getAttribute("data-column-index"), 10);
				intersection.row = parseInt(elementUnderMouse.getAttribute("data-row-index"), 10);
			}
			elements.forEach(function(element, index) {
				element.style.display = displays[index];
			});
			return intersection;
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItem#onMoveDragOver
		 * @overridden
		 */
		onMoveDragOver: function(event, cells) {
			this.callParent(arguments);
			this.showCustomDropHint(this._getIntersectionPositionByCursor(event, cells));
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItem#onItemDblClick
		 * @overridden
		 */
		onItemDblClick: function(event) {
			event.stopEvent();
			var gridLayoutEdit = this.getGridLayoutEditInstance();
			gridLayoutEdit.fireEvent("itemDblClick", this.itemId, this);
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItem#getTop
		 * @overridden
		 */
		getTop: function() {
			var gridLayoutEdit = this.getGridLayoutEditInstance();
			var topIndent = this.row * gridLayoutEdit.cellHeight;
			if (this.row) {
				return Ext.String.format("calc({0}em + {1}em)", topIndent, this.row * this.cellBorderLineSize / 10);
			}
			return Ext.String.format("calc({0}em + {1}px)", topIndent, this.cellBorderLineSize);
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItem#getHeight
		 * @overridden
		 */
		getHeight: function() {
			var height = this.callParent(arguments);
			return parseInt(height, 10) > 0 ? height : "0px";
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItem#getDraggableConfig
		 * @overridden
		 */
		getDraggableConfig: function() {
			var config = this.callParent(arguments) || {};
			Terrasoft.each(config, function(item) {
				item.handlers = item.handlers || {};
				item.handlers.b4EndDrag = "b4EndDrag";
			}, this);
			return config;
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItem#b4StartDrag
		 * @overridden
		 */
		b4StartDrag: function() {
			this._setBodyScrollXVisible(false);
			this.mixins.draggable.b4StartDrag.apply(this, arguments);
			this.setGridLayoutState(this.itemStates.transforming);
			this._initInitialPosition();
		},
		/**
		 * On D&D operation end event handler.
		 * @protected
		 */
		b4EndDrag: function() {
			this._setBodyScrollXVisible(true);
			this.setGridLayoutState(this.itemStates.ready);
			this._restoreNeighboursPosition();
			this.leftConstraint = null;
			this.rightConstraint = null;
			this.emptyColsExistConstraint = null;
			this.initialPosition = null;
			this.previousResizeX = null;
			var gridLayoutEdit = this.getGridLayoutEditInstance();
			gridLayoutEdit.clearItemsDropHint();
		},

		/**
		 * Sets grid layout and item state attribute.
		 * @protected
		 * @param {String} state Item state. Value of Terrasoft.GridSettingsDesignerItem#itemStates.
		 */
		setGridLayoutState: function(state) {
			var gridLayoutEdit = this.getGridLayoutEditInstance();
			var wrapEl = gridLayoutEdit && gridLayoutEdit.wrapEl;
			if (wrapEl) {
				wrapEl.set({"current-state": state});
			}
			var currentDraggableEl = this.getCurrentDraggableEl();
			if (currentDraggableEl) {
				currentDraggableEl.set({"item-state": state});
			}
			if (this.wrapEl) {
				this.wrapEl.set({"item-state": state});
			}
		},

		/**
		 * @inheritdoc Terrasoft.component#getBindConfig
		 * @overridden
		 */
		getBindConfig: function() {
			var bindConfig = this.callParent(arguments);
			var itemBindConfig = {
				itemDropHint: {
					changeMethod: "setItemDropHint"
				},
				resizeItemPosition: {
					changeMethod: "setResizeItemPosition"
				}
			};
			Ext.apply(itemBindConfig, bindConfig);
			return itemBindConfig;
		},

		/**
		 * Applies resize event constraints. Change event X value.
		 * @protected
		 * @param {Event} event Resize event.
		 */
		applyResizeConstraints: function(event) {
			var eventX = event.getX();
			var currentDrag = this._getExtCurrentDrag();
			if (eventX > currentDrag.maxX) {
				event.xy[0] = currentDrag.maxX;
			}
			if (eventX < currentDrag.minX) {
				event.xy[0] = currentDrag.minX;
			}
		},

		/**
		 * @inheritdoc Terrasoft.Draggable#onResizeLeftElDrag
		 * @overridden
		 */
		onResizeLeftElDrag: function(event) {
			if (!this.onResize(event)) {
				return;
			}
			if (Terrasoft.getIsRtlMode()) {
				this._animateRightSizeChanging(event.xy[0]);
			} else {
				this._animateLeftSizeChanging(event.xy[0]);
			}
		},

		/**
		 * @inheritdoc Terrasoft.Draggable#onResizeRightElDrag
		 * @overridden
		 */
		onResizeRightElDrag: function(event) {
			if (!this.onResize(event)) {
				return;
			}
			if (Terrasoft.getIsRtlMode()) {
				this._animateLeftSizeChanging(event.xy[0]);
			} else {
				this._animateRightSizeChanging(event.xy[0]);
			}
		},

		/**
		 * The method for processing the drag event when the default size is changed.
		 * @protected
		 * @param {Event} event Object of the drag event action.
		 * @return {Boolean} False if need stop event.
		 */
		onResize: function(event) {
			this.wrapEl.setVisible(true);
			this.setDraggableElVisible(false);
			if (Ext.isEmpty(this.leftConstraint) || Ext.isEmpty(this.rightConstraint)) {
				return false;
			}
			this.applyResizeConstraints(event);
			this.animateNeighboursOnResize(event);
			return true;
		},

		/**
		 * Animates neighbours items.
		 * @protected
		 * @param {Event} event Resize event.
		 */
		animateNeighboursOnResize: function(event) {
			var gridLayoutEdit = this.getGridLayoutEditInstance();
			if (this.emptyColsExistConstraint === false) {
				this._animateNeighboursWithoutEmptyCells(event);
			} else if (this.emptyColsExistConstraint === true) {
				gridLayoutEdit.changeNeighbourItemsPositionOnResize(this, "move", true, event.xy[0]);
			} else {
				return;
			}
			this.previousResizeX = event.xy[0];
		},

		/**
		 * Sets resize item position.
		 * @protected
		 * @param {Object} value Resize item value.
		 * @param {String} value.event Change position event name.
		 * @param {Number} value.position New item position.
		 */
		setResizeItemPosition: function(value) {
			if (!value || !this.getWrapEl()) {
				return;
			}
			var isRtl = Terrasoft.getIsRtlMode();
			var position = isRtl ? value.position - this.cellBorderLineSize * 2 :
				value.position + this.cellBorderLineSize * 2;
			this._initInitialPosition();
			switch (value.event) {
				case "resize":
					this._resizeSelf(position);
					break;
				case "move":
					this._moveSelf(position);
					break;
				case "restore":
					this._restoreSelfPosition();
					break;
				case "clear":
					this.initialPosition = null;
					break;
				default: {
					return;
				}
			}
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItem#setDraggableConstraints
		 * @overridden
		 */
		setDraggableConstraints: function(currentDraggable) {
			this.callParent(arguments);
			var gridLayoutEdit = this.getGridLayoutEditInstance();
			if (gridLayoutEdit.gridType === Terrasoft.GridType.LISTED) {
				currentDraggable.setYConstraint(0, 0);
			}
		},

		/**
		 * @inheritdoc
		 * @override Terrasoft.Draggable#createDraggableClone
		 */
		createDraggableClone: function(node) {
			var nodeEl = Ext.get(node);
			var nodeBox = nodeEl.getBox();
			var dragClone = this.callParent([node, nodeBox.x, nodeBox.y]);
			var config = {
				width: Ext.String.format("{0}px", nodeBox.width),
				height: Ext.String.format("{0}px", nodeBox.height),
				right: "auto"
			};
			this.applyDraggableCloneStyle(dragClone, config);
			var dragCurrent = Ext.dd.DragDropManager.dragCurrent;
			this.setDraggableConstraints(dragCurrent);
			return dragClone;
		},

		/**
		 * Sets resize constraints.
		 * @protected
		 */
		setResizeConstraints: function() {
			var gridLayoutEdit = this.getGridLayoutEditInstance();
			if (!Ext.isEmpty(this.leftConstraint) || !Ext.isEmpty(this.rightConstraint)) {
				return;
			}
			var cellWidth = this.getWrapEl().getWidth() / this.colSpan;
			var resizeConstraints = gridLayoutEdit.getResizeConstraint(this.row, this.column, this.colSpan, cellWidth);
			this.emptyColsExistConstraint = resizeConstraints.emptyColsExistConstraint;
			this.leftConstraint = resizeConstraints.leftConstraint;
			this.rightConstraint = resizeConstraints.rightConstraint;
			if (Terrasoft.getIsRtlMode()) {
				this._getExtCurrentDrag().setXConstraint(this.rightConstraint, this.leftConstraint);
			} else {
				this.rightConstraint = this.rightConstraint + this.resizerWidth;
				this._getExtCurrentDrag().setXConstraint(this.leftConstraint, this.rightConstraint);
			}
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItem#onResizeRightDragOver
		 * @overridden
		 */
		onResizeRightDragOver: function() {
			this.callParent(arguments);
			this.setResizeConstraints();
		},

		/**
		 * Shows custom drop hint.
		 * @param {Object} intersection Intersection position.
		 */
		showCustomDropHint: function(intersection) {
			var gridLayoutEdit = this.getGridLayoutEditInstance();
			if (!intersection) {
				return;
			}
			if (this.column <= intersection.column && intersection.column < this.column + this.colSpan
				&& this.row === intersection.row) {
				gridLayoutEdit.clearItemsDropHint();
				return;
			}
			if (this.row !== intersection.row) {
				gridLayoutEdit.setItemsDropHint(intersection, this.itemDropHintPositions.left, true);
				return;
			}
			var dropHintDirection = this.column + this.colSpan <= intersection.column ?
				this.itemDropHintPositions.right : this.itemDropHintPositions.left;
			gridLayoutEdit.setItemsDropHint(intersection, dropHintDirection, false);
		},

		/**
		 * Sets item drop hint.
		 * @protected
		 * @param {Object} dropHintValue Item drop hint value.
		 * @param {Boolean} dropHintValue.visible Item drop hint visibility.
		 * @param {String} dropHintValue.position Item drop hint position - left or right.
		 */
		setItemDropHint: function(dropHintValue) {
			if (!this.wrapEl) {
				return;
			}
			if (dropHintValue.visible) {
				this.wrapEl.addCls("item-drop-hint-" + dropHintValue.position);
			} else {
				this.wrapEl.removeCls(["item-drop-hint-left", "item-drop-hint-right"]);
			}
		},

		/**
		 * @inheritdoc
		 * @override Terrasoft.GridLayoutEditItem#getMarginWidth
		 */
		getMarginWidth: function() {
			return this.marginWidth;
		},

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItem#calculateColSpan
		 * @override
		 */
		calculateColSpan: function() {
			var grid = this.getGridLayoutEditInstance();
			var gridWrapEl = grid.getWrapEl();
			var gridWrapElWidth = gridWrapEl.getWidth();
			var wrapEl = this.getWrapEl();
			var wrapElWidth = wrapEl.getWidth();
			var percent = wrapElWidth / gridWrapElWidth * 100 + this.marginWidth * 2;
			return Math.round(percent / grid.cellWidth);
		},

		//endregion

		//region Methods: Public

		init: function() {
			this.callParent(arguments);
			this.addEvents(
				/**
				 * @event beforeColumnChange
				 * Fires after element move
				 */
				"afterPositionChange"
			);
		}

		//endregion

	});
});


