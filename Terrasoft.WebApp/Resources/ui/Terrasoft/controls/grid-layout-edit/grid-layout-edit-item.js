/**
 */
Ext.define("Terrasoft.controls.GridLayoutEditItem", {
	extend: "Terrasoft.controls.DraggableContainer",
	alternateClassName: "Terrasoft.GridLayoutEditItem",

	//region Properties: Protected

	/**
	 * The identifier of the GridLayoutEdit control.
	 * @protected
	 * @type {String}
	 */
	gridLayoutEditId: null,

	/**
	 * The parameter object of the element's template in the grid.
	 * @protected
	 * @type {Object}
	 */
	tplConfig: {
		classes: {
			wrapClasses: ["grid-layout-edit-item-wrap"],
			elClasses: ["grid-layout-edit-item-el"],
			contentWrapClasses: ["grid-layout-edit-item-content-wrap"],
			textWrapClasses: ["grid-layout-edit-item-content-text-wrap"],
			imageWrapClasses: ["grid-layout-edit-item-content-image-wrap"],
			imageClasses: ["grid-layout-edit-item-content-image"],
			actionsWrapClasses: ["grid-layout-edit-item-actions-wrap"]
		},
		selectorSuffixes: {
			wrap: "grid-layout-edit-item-wrap",
			gridCell: "grid-layout-edit-cell",
			gridTable: "grid-layout-edit-table"
		},
		styles: {
			width: "0px",
			height: "0px",
			top: "0px"
		}
	},

	/**
	 * @inheritdoc Terrasoft.component#tpl
	 * @override
	 */
	tpl: [
		"<div id=\"{id}-grid-layout-edit-item-wrap\" class=\"{wrapClasses}\" data-selected-item=\"{selected}\" " +
			"data-group-name=\"{groupName}\"",
		"style=\"{wrapStyles}\">",
		"<div id=\"{id}-grid-layout-edit-item-el\" class=\"{elClasses}\">",
		"<div id=\"{id}-grid-layout-edit-item-content\" class=\"{contentWrapClasses}\">",
		"<tpl if=\"hasImage\">",
		"<div class=\"{imageWrapClasses}\">",
		"<img class=\"{imageClasses}\" src=\"{imageUrl}\"/>",
		"</div>",
		"</tpl>",
		"<tpl if=\"showContent\">",
		"<div class=\"{textWrapClasses}\">",
		"{content}",
		"</div>",
		"</tpl>",
		"</div>",
		"<tpl if=\"hasActions\">",
		"<div id=\"{id}-grid-layout-edit-item-actions\" class=\"{actionsWrapClasses}\">",
		"{%this.renderItems(out, values)%}",
		"</div>",
		"</tpl>",
		"</div>",
		"</div>"
	],

	/**
	 * The thickness of the cell border line.
	 * @protected
	 * @type {Number}
	 */
	cellBorderLineSize: 1,

	//endregion

	//region Properties: Public

	/**
	 * The item ID.
	 * @type {String}
	 */
	itemId: null,

	/**
	 * The index of the left column.
	 * @type {Number}
	 */
	column: null,

	/**
	 * The number of columns occupied.
	 * @type {Number}
	 */
	colSpan: null,

	/**
	 * The index of the top line.
	 * @type {Number}
	 */
	row: null,

	/**
	 * The number of rows occupied.
	 * @type {Number}
	 */
	rowSpan: null,

	/**
	 * The contents of the element.
	 * @type {String}
	 */
	content: null,

	/**
	 * Item marker.
	 * @type {String}
	 */
	markerValue: null,

	/**
	 * Indicates the selectability of the item.
	 * @type {Boolean}
	 */
	selected: null,

	/**
	 * Previous item position.
	 * @type {Object}
	 */
	oldPosition: null,

	/**
	 * Element picture configuration
	 * @type {Object}
	 */
	imageConfig: null,

	/**
	 * @inheritdoc Terrasoft.draggable#dragActionsCode
	 * @override
	 */
	dragActionsCode: 511,

	/**
	 * Group name.
	 * @type {String}
	 */
	groupName: null,

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_cellsSort: function(cells) {
		cells.sort((a,b) => {
			const elA =  Ext.get(a.id);
			const elB =  Ext.get(b.id);
			const rowA = parseInt(elA.getAttribute("data-row-index"), 10);
			const rowB = parseInt(elB.getAttribute("data-row-index"), 10);
			if (rowA === rowB) {
				const colA = parseInt(elA.getAttribute("data-column-index"), 10);
				const colB = parseInt(elB.getAttribute("data-column-index"), 10);
				return colA > colB ? 1 : -1;
			} else {
				return rowA > rowB ? 1 : -1;
			}
		});
	},

	//endregion

	//region Methods: Protected

	/**
	 * The click handler for the element's action element.
	 * @protected
	 * @param {String} tag Action tag.
	 * @param {String} itemId The identifier of the element.
	 */
	onActionItemClick: function(tag, itemId) {
		var gridLayoutEditInstance = this.getGridLayoutEditInstance();
		gridLayoutEditInstance.fireEvent("itemActionClick", tag, itemId);
	},

	/**
	 * Generates a unique identifier for the action item.
	 * @protected
	 * @return {String} The unique identifier for the action element.
	 */
	generateActionItemId: function() {
		return this.id + "-action-item-" + Terrasoft.generateGUID();
	},

	/**
	 * Adds click handlers to element action items.
	 * @protected
	 */
	addItemActionsHandlers: function() {
		var self = this;

		function actionHandler() {
			self.onActionItemClick(this.tag, self.itemId);
		}

		Terrasoft.each(this.items, function(item) {
			item.id = this.generateActionItemId();
			if (item.hasOwnProperty("menu") && item.menu.hasOwnProperty("items")) {
				var menuItems = item.menu.items;
				Terrasoft.each(menuItems, function(menuItem) {
					menuItem.id = this.generateActionItemId();
					if (!menuItem.hasOwnProperty("handler")) {
						menuItem.onClick = actionHandler;
					}
				}, this);
			} else {
				item.onClick = actionHandler;
			}
		}, this);
	},

	/**
	 * Performs the applying of  control template parameter settings.
	 * @protected
	 * @param {Object} tplData The parameter object of the control's rendering template.
	 * @param {String} configNodeName The name of the properties property of the configuration template.
	 */
	applyTplConfigProperties: function(tplData, configNodeName) {
		Terrasoft.each(this.tplConfig[configNodeName], function(propertyValue, propertyName) {
			tplData[propertyName] = propertyValue;
		}, this);
	},

	/**
	 * Fills in the application of the control's template classes.
	 * @protected
	 * @param {Object} tplData The parameter object of the control's rendering template.
	 */
	applyTplClasses: function(tplData) {
		this.applyTplConfigProperties(tplData, "classes");
	},

	/**
	 * Fills in the application styles of the control template.
	 * @protected
	 * @param {Object} tplData The parameter object of the control's rendering template.
	 */
	applyTplStyles: function(tplData) {
		this.applyTplConfigProperties(tplData, "styles");
	},

	/**
	 * @inheritdoc Terrasoft.component#getTplData
	 * @override
	 */
	getTplData: function() {
		this.selectors.wrapEl = Ext.String.format("#{0}-{1}", this.id, this.tplConfig.selectorSuffixes.wrap);
		var tplData = this.callParent(arguments);
		this.applyTplClasses(tplData);
		this.applyTplStyles(tplData);
		var itemBox = this.getItemBox();
		tplData.wrapStyles = Ext.apply(this.tplConfig.styles, itemBox);
		tplData.selected = this.selected;
		tplData.hasActions = this.items && this.items.getCount();
		tplData.hasImage = !!this.imageConfig;
		tplData.showContent = true;
		if (this.imageConfig) {
			tplData.imageUrl = Terrasoft.ImageUrlBuilder.getUrl(this.imageConfig);
		}
		tplData.content = Terrasoft.encodeHtml(this.content);
		tplData.groupName = this.groupName || "";
		return tplData;
	},

	/**
	 * @inheritdoc Terrasoft.component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var itemBindConfig = {
			itemId: {
				changeMethod: "onItemIdChange"
			},
			content: {
				changeMethod: "onContentChange"
			},
			column: {
				changeMethod: "onAfterColumnChange",
				changeEvent: "afterColumnChange"
			},
			colSpan: {
				changeMethod: "onAfterColSpanChange",
				changeEvent: "afterColSpanChange"
			},
			row: {
				changeMethod: "onAfterRowChange",
				changeEvent: "afterRowChange"
			},
			rowSpan: {
				changeMethod: "onAfterRowSpanChange",
				changeEvent: "afterRowSpanChange"
			},
			dragActionsCode: {
				changeMethod: "setDragActionsCode"
			},
			imageConfig: {
				changeMethod: "setImageConfig"
			},
			groupName: {
				changeMethod: "setGroupName"
			}
		};
		Ext.apply(itemBindConfig, bindConfig);
		return itemBindConfig;
	},

	/**
	 * The event handler "onItemIdChange".
	 * @protected
	 * @param {String} value The value of the view model property.
	 */
	onItemIdChange: function(value) {
		this.itemId = value;
	},

	/**
	 * The onContentChange event handler.
	 * @protected
	 * @param {String} value The value of the view model property.
	 */
	onContentChange: function(value) {
		this.content = value;
		this.show();
	},

	/**
	 * The "onBeforeRowChange" event handler, triggered before the "row" property is changed.
	 * @protected
	 * @param {Number} value The current value of the "row" property.
	 */
	onBeforeRowChange: function(value) {
		this.oldPosition.row = value;
	},

	/**
	 * The "onBeforeRowSpanChange" event handler, triggered before the "rowSpan" property change.
	 * @protected
	 * @param {Number} value The current value of the "rowSpan" property.
	 */
	onBeforeRowSpanChange: function(value) {
		this.oldPosition.rowSpan = value;
	},

	/**
	 * The "onBeforeColumnChange" event handler that triggers before the "column" property is changed.
	 * @protected
	 * @param {Number} value The current value of the "column" property.
	 */
	onBeforeColumnChange: function(value) {
		this.oldPosition.column = value;
	},

	/**
	 t * The "onBeforeColSpanChange" event handler, triggered before the "colSpan" property change.
	 t * @protected
	 t * @param {Number} value The current value of the "colSpan" property.
	 t */
	onBeforeColSpanChange: function(value) {
		this.oldPosition.colSpan = value;
	},

	/**
	 * Canceling of change the position of the item.
	 */
	revertPositionChanges: function() {
		Ext.apply(this, this.oldPosition);
		this.fireEvent("afterRowChange", this.row);
		this.fireEvent("afterRowSpanChange", this.rowSpan);
		this.fireEvent("afterColumnChange", this.column);
		this.fireEvent("afterColSpanChange", this.colSpan);
	},

	/**
	 * The "onAfterColumnChange" event handler that triggers after the "column" property is changed.
	 * @protected
	 * @param {Number} value The value of the presentation model property.
	 */
	onAfterColumnChange: function(value) {
		this.setColumn(value);
	},

	/**
	 * "OnAfterColSpanChange" event handler, triggered after the "colSpan" property change.
	 * @protected
	 * @param {Number} value The value of the view model property.
	 */
	onAfterColSpanChange: function(value) {
		this.setColSpan(value);
	},

	/**
	 * The "onAfterRowChange" event handler that fires after the "row" property is changed.
	 * @protected
	 * @param {Number} value The value of the view model property.
	 */
	onAfterRowChange: function(value) {
		this.setRow(value);
	},

	/**
	 * The "onAfterRowSpanChange" event handler that fires after the "rowSpan" property is changed.
	 * @protected
	 * @param {Number} value The value of the view model property.
	 */
	onAfterRowSpanChange: function(value) {
		this.setRowSpan(value);
	},

	/**
	 * Sets the image settings object.
	 * @protected
	 * @param {Object} value The image settings object.
	 */
	setImageConfig: function(value) {
		this.imageConfig = value;
		this.show();
	},

	/**
	 * Sets the code for the available drag-and-drop operations.
	 * @protected
	 * @param {Number} value Value.
	 */
	setDragActionsCode: function(value) {
		if (this.dragActionsCode === value) {
			return;
		}
		this.dragActionsCode = value;
		this.show();
	},

	/**
	 * Returns the GridLayoutEdit cell element by the given coordinates.
	 * @protected
	 * @param {Number} row String.
	 * @param {Number} column Column.
	 * @return {Ext.dom.Element} The GridLayoutEdit cell element.
	 */
	getCell: function(row, column) {
		var cellId = Ext.String.format("{0}-{1}-{2}-{3}", this.gridLayoutEditId,
			this.tplConfig.selectorSuffixes.gridCell, row, column);
		return Ext.get(cellId);
	},

	/**
	 * Returns the GridLayoutEdit table entry.
	 * @protected
	 * @return {Ext.dom.Element} The GridLayoutEdit table element.
	 */
	getGridLayoutEditTableEl: function() {
		return Ext.get(this.gridLayoutEditId + "-" + this.tplConfig.selectorSuffixes.gridTable);
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.applyPositionChange();
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.applyPositionChange();
	},

	/**
	 * @inheritdoc Terrasoft.component#onDestroy
	 * @override
	 */
	onDestroy: function() {
		var wrapEl = this.getWrapEl();
		if (this.rendered) {
			wrapEl.un("mousedown", this.onItemClick, this);
			wrapEl.un("dblclick", this.onItemDblClick, this);
		}
		this.un("beforeRowChange", this.onBeforeRowChange, this);
		this.un("beforeRowSpanChange", this.onBeforeRowSpanChange, this);
		this.un("beforeColumnChange", this.onBeforeColumnChange, this);
		this.un("beforeColSpanChange", this.onBeforeColSpanChange, this);
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.Draggable#getDraggableConfig
	 * @override
	 */
	getDraggableConfig: function() {
		var config = {};
		config[Terrasoft.DragAction.MOVE] = {
			handlers: {
				b4StartDrag: "b4StartDrag",
				onDragDrop: "onMoveDragDrop",
				onDragOver: "onMoveDragOver",
				onInvalidDrop: "show"
			}
		};
		config[Terrasoft.DragAction.RESIZE_TOP] = {
			handlers: {
				b4StartDrag: "b4StartDrag",
				onDragDrop: "onResizeTopDragDrop",
				onDragOver: "onResizeTopDragOver",
				onInvalidDrop: "show"
			}
		};
		config[Terrasoft.DragAction.RESIZE_TOP_RIGHT] = {
			handlers: {
				b4StartDrag: "b4StartDrag",
				onDragDrop: "onResizeTopRightDragDrop",
				onDragOver: "onResizeTopRightDragOver",
				onInvalidDrop: "show"
			}
		};
		config[Terrasoft.DragAction.RESIZE_RIGHT] = {
			handlers: {
				b4StartDrag: "b4StartDrag",
				onDragDrop: "onResizeRightDragDrop",
				onDragOver: "onResizeRightDragOver",
				onInvalidDrop: "show"
			}
		};
		config[Terrasoft.DragAction.RESIZE_BOTTOM_RIGHT] = {
			handlers: {
				b4StartDrag: "b4StartDrag",
				onDragDrop: "onResizeBottomRightDragDrop",
				onDragOver: "onResizeBottomRightDragOver",
				onInvalidDrop: "show"
			}
		};
		config[Terrasoft.DragAction.RESIZE_BOTTOM] = {
			handlers: {
				b4StartDrag: "b4StartDrag",
				onDragDrop: "onResizeBottomDragDrop",
				onDragOver: "onResizeBottomDragOver",
				onInvalidDrop: "show"
			}
		};
		config[Terrasoft.DragAction.RESIZE_BOTTOM_LEFT] = {
			handlers: {
				b4StartDrag: "b4StartDrag",
				onDragDrop: "onResizeBottomLeftDragDrop",
				onDragOver: "onResizeBottomLeftDragOver",
				onInvalidDrop: "show"
			}
		};
		config[Terrasoft.DragAction.RESIZE_LEFT] = {
			handlers: {
				b4StartDrag: "b4StartDrag",
				onDragDrop: "onResizeLeftDragDrop",
				onDragOver: "onResizeLeftDragOver",
				onInvalidDrop: "show"
			}
		};
		config[Terrasoft.DragAction.RESIZE_TOP_LEFT] = {
			handlers: {
				b4StartDrag: "b4StartDrag",
				onDragDrop: "onResizeTopLeftDragDrop",
				onDragOver: "onResizeTopLeftDragOver",
				onInvalidDrop: "show"
			}
		};
		return config;
	},

	/**
	 * Returns the position object (row and column) of the drag element's intersection with the drop on the event.
	 * @protected
	 * @param {Object} event Event.
	 * @return {Object} The position object (row and column) of the intersection of the drag element with the drop zone
	 */
	getIntersectionPositionByEvent: function(event) {
		var intersection = {
			column: 0,
			row: 0
		};
		var elementUnderMouse = document.elementFromPoint(event.xy[0], event.xy[1]);
		if (elementUnderMouse) {
			intersection.column = parseInt(elementUnderMouse.getAttribute("data-column-index"), 10);
			intersection.row = parseInt(elementUnderMouse.getAttribute("data-row-index"), 10);
		}
		return intersection;
	},

	/**
	 * Returns the position object (row and column) of the intersection of the drag element with the drop zone.
	 * @protected
	 * @param {Object []} cells An array of intersecting objects.
	 * @return {Object} The position object (row and column) of the intersection of the drag element with the drop zone
	 */
	getIntersectionPosition: function(cells) {
		this._cellsSort(cells);
		var cellEl = Ext.get(cells[0].id);
		return {
			row: parseInt(cellEl.getAttribute("data-row-index"), 10),
			column: parseInt(cellEl.getAttribute("data-column-index"), 10)
		};
	},

	/**
	 * The method of processing the event before starting the D&D operation.
	 * @protected
	 */
	b4StartDrag: function() {
		var currentDraggable = Ext.dd.DragDropManager.dragCurrent;
		currentDraggable.resetConstraints(true);
		currentDraggable.clearConstraints();
		this.setDraggableConstraints(currentDraggable);
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		gridLayoutEdit.setSelection({
			row: this.row,
			rowSpan: this.rowSpan,
			column: this.column,
			colSpan: this.colSpan
		});
		this.wrapEl.setVisible(false);
	},

	/**
	 * Sets constraints for currently dragged element.
	 * @protected
	 * @param {Ext.dom.Element} currentDraggable Currently dragged element.
	 */
	setDraggableConstraints: function(currentDraggable) {
		currentDraggable.constrainTo(this.getGridLayoutEditTableEl());
	},

	/**
	 * Updates the item's position.
	 * @param {Object} position The new position of the element.
	 */
	updatePosition: function(position) {
		var newRow = position.row;
		var newColumn = position.column;
		this.fireEvent("beforeRowChange", this.row, this);
		this.row = newRow;
		this.fireEvent("afterRowChange", this.row, this);
		this.fireEvent("beforeColumnChange", this.column, this);
		this.column = newColumn;
		this.fireEvent("afterColumnChange", this.column, this);
		this.actualizeGridSize();
	},

	/**
	 * The method for processing the drag-out event when the position changes.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onMoveDragDrop: function(event, cells) {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		gridLayoutEdit.setSelection();
		var intersectionPosition = this.getIntersectionPosition(cells);
		this.updatePosition(intersectionPosition);
	},

	/**
	 * The method for processing the drag event when the position changes.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onMoveDragOver: function(event, cells) {
		var intersection = {
			rowSpan: this.rowSpan,
			colSpan: this.colSpan
		};
		var intersectionPosition = this.getIntersectionPosition(cells);
		intersection.column = intersectionPosition.column;
		intersection.row = intersectionPosition.row;
		this.showDropHint(intersection);
	},

	/**
	 * The method for processing the drag-out event when the size is changed from the top.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeTopDragDrop: function(event, cells) {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		gridLayoutEdit.setSelection();
		var intersectionPosition = this.getIntersectionPosition(cells);
		this.updateHeight(intersectionPosition.row);
	},

	/**
	 * Method for handling the drag event when changing the size from the top.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeTopDragOver: function(event, cells) {
		var intersectionPosition = this.getIntersectionPosition(cells);
		var intersection = {
			column: this.column,
			row: intersectionPosition.row,
			rowSpan: this.row - intersectionPosition.row + this.rowSpan,
			colSpan: this.colSpan
		};
		this.showDropHint(intersection);
	},

	/**
	 * Method for processing the drag-and-drop event when the size changes from the top to the right.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeTopRightDragDrop: function(event, cells) {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		gridLayoutEdit.setSelection();
		var intersectionPosition = this.getIntersectionPosition(cells);
		this.updateWidth(intersectionPosition.column, true, true);
		this.updateHeight(intersectionPosition.row);
	},

	/**
	 * The method for processing the drag event when resizing from the top right.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeTopRightDragOver: function(event, cells) {
		var intersectionPosition = this.getIntersectionPosition(cells);
		var intersection = {
			column: this.column,
			row: intersectionPosition.row,
			rowSpan: this.row - intersectionPosition.row + this.rowSpan,
			colSpan: intersectionPosition.column - this.column + 1
		};
		this.showDropHint(intersection);
	},

	/**
	 * The method for processing the drag-and-drop event when the right dimension changes.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeRightDragDrop: function(event, cells) {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		gridLayoutEdit.setSelection();
		var intersectionPosition = this.getIntersectionPosition(cells);
		this.updateWidth(intersectionPosition.column, true);
	},

	/**
	 * The method for processing the drag event when the size is changed from the right.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeRightDragOver: function(event, cells) {
		var intersectionPosition = this.getIntersectionPosition(cells);
		var intersection = {
			column: this.column,
			row: this.row,
			rowSpan: this.rowSpan,
			colSpan: intersectionPosition.column - this.column + 1
		};
		this.showDropHint(intersection);
	},

	/**
	 * The method for processing the drag-and-drop event when the size is changed from the bottom right.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeBottomRightDragDrop: function(event, cells) {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		gridLayoutEdit.setSelection();
		var intersectionPosition = this.getIntersectionPosition(cells);
		this.updateHeight(intersectionPosition.row, true, true);
		this.updateWidth(intersectionPosition.column, true);
	},

	/**
	 * The method for processing the drag event when the size is changed from the bottom right.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeBottomRightDragOver: function(event, cells) {
		var intersectionPosition = this.getIntersectionPosition(cells);
		var intersection = {
			column: this.column,
			row: this.row,
			rowSpan: intersectionPosition.row - this.row + 1,
			colSpan: intersectionPosition.column - this.column + 1
		};
		this.showDropHint(intersection);
	},

	/**
	 * The method for processing the drag-and-drop event when the size is changed from bottom.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeBottomDragDrop: function(event, cells) {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		gridLayoutEdit.setSelection();
		var intersectionPosition = this.getIntersectionPosition(cells);
		this.updateHeight(intersectionPosition.row, true);
	},

	/**
	 * The method for processing the drag event when the size is changed from bottom.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeBottomDragOver: function(event, cells) {
		var intersectionPosition = this.getIntersectionPosition(cells);
		var intersection = {
			column: this.column,
			row: this.row,
			rowSpan: intersectionPosition.row - this.row + 1,
			colSpan: this.colSpan
		};
		this.showDropHint(intersection);
	},

	/**
	 * The method for processing the drag-and-drop event when the size is changed from the bottom left.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeBottomLeftDragDrop: function(event, cells) {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		gridLayoutEdit.setSelection();
		var intersectionPosition = this.getIntersectionPosition(cells);
		this.updateHeight(intersectionPosition.row, true, true);
		this.updateWidth(intersectionPosition.column);
	},

	/**
	 * The method for processing the drag event when the size is changed from the bottom left.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeBottomLeftDragOver: function(event, cells) {
		var intersectionPosition = this.getIntersectionPosition(cells);
		var intersection = {
			column: intersectionPosition.column,
			row: this.row,
			rowSpan: intersectionPosition.row - this.row + 1,
			colSpan: this.column - intersectionPosition.column + this.colSpan
		};
		this.showDropHint(intersection);
	},

	/**
	 * The method for processing the drag-and-drop event when the size is changed from the left.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeLeftDragDrop: function(event, cells) {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		gridLayoutEdit.setSelection();
		var intersectionPosition = this.getIntersectionPosition(cells);
		this.updateWidth(intersectionPosition.column);
	},

	/**
	 * The method for processing the drag event when the left dimension is changed.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeLeftDragOver: function(event, cells) {
		var intersectionPosition = this.getIntersectionPosition(cells);
		var intersection = {
			column: intersectionPosition.column,
			row: this.row,
			rowSpan: this.rowSpan,
			colSpan: this.column - intersectionPosition.column + this.colSpan
		};
		this.showDropHint(intersection);
	},

	/**
	 * The method for processing the drag-and-drop event when the top left size changes.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeTopLeftDragDrop: function(event, cells) {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		gridLayoutEdit.setSelection();
		var intersectionPosition = this.getIntersectionPosition(cells);
		this.updateHeight(intersectionPosition.row, false, true);
		this.updateWidth(intersectionPosition.column);
	},

	/**
	 * The method for processing the drag event when changing the size on the top left.
	 * @protected
	 * @param {Object} event The event object of the drag-and-drop action.
	 * @param {Object []} cells An array of intersecting objects.
	 */
	onResizeTopLeftDragOver: function(event, cells) {
		var intersectionPosition = this.getIntersectionPosition(cells);
		var intersection = {
			column: intersectionPosition.column,
			row: intersectionPosition.row,
			rowSpan: this.row - intersectionPosition.row + this.rowSpan,
			colSpan: this.column - intersectionPosition.column + this.colSpan
		};
		this.showDropHint(intersection);
	},

	/**
	 * Method for displaying the visual prompts of the Drag & Drop action.
	 * @protected
	 * @param {Object} intersection The object of the intersection range.
	 */
	showDropHint: function(intersection) {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		var gridLayoutEditSelection = gridLayoutEdit.selection;
		if (!gridLayoutEditSelection || gridLayoutEditSelection.row !== intersection.row ||
			gridLayoutEditSelection.rowSpan !== intersection.rowSpan ||
			gridLayoutEditSelection.column !== intersection.column ||
			gridLayoutEditSelection.colSpan !== intersection.colSpan) {
			gridLayoutEdit.setSelection();
			gridLayoutEdit.setSelection(intersection);
		}
	},

	/**
	 * Returns an object of class Terrasoft.GridLayoutEdit.
	 * @protected
	 * @return {Terrasoft.GridLayoutEdit}
	 */
	getGridLayoutEditInstance: function() {
		return Ext.getCmp(this.gridLayoutEditId);
	},

	/**
	 * Actualizes the grid size.
	 * @protected
	 */
	actualizeGridSize: function() {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		gridLayoutEdit.updateSize(this);
	},

	/**
	 * @inheritdoc Terrasoft.Draggable#getGroupName
	 * @override
	 */
	getGroupName: function() {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		return [gridLayoutEdit.getGroupName()];
	},

	/**
	 * Sets the selection of the element.
	 * @protected
	 * @param {Boolean} selected Selection.
	 */
	setSelected: function(selected) {
		this.selected = selected;
		this.wrapEl.dom.setAttribute("data-selected-item", selected);
	},

	/**
	 * The click event handler for the element.
	 * @protected
	 * @param {Object} event The event object.
	 */
	onItemClick: function(event) {
		event.stopEvent();
		this.setSelected(true);
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		gridLayoutEdit.selectItem(this.itemId, event.ctrlKey);
		gridLayoutEdit.setSelection();
		gridLayoutEdit.fireEvent("itemClick", this, this.itemId, this.gridLayoutEditId);
		event.stopPropagation();
	},

	/**
	 * Double-click event handler for the element.
	 * @protected
	 * @param {Object} event The event object.
	 */
	onItemDblClick: function(event) {
		event.stopEvent();
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		gridLayoutEdit.setSelection();
		gridLayoutEdit.fireEvent("itemDblClick", this, this.itemId, this.gridLayoutEditId);
	},

	/**
	 * Sets tpl config.
	 * @protected
	 */
	setTplConfig: function() {
		var directionCssProperty = Terrasoft.getIsRtlMode() ? "right" : "left";
		this.tplConfig.styles[directionCssProperty] = "0px";
	},

	/**
	 * Calculated colSpan value.
	 * @protected
	 * @param {Number} value The column index.
	 * @param {Boolean} updateRight A flag that the item is changing on the right.
	 * @return {Number} calculated colSpan value.
	 */
	calculateColSpan: function(value, updateRight) {
		var colSpan = updateRight
			? value - this.column + 1
			: this.column - value + this.colSpan;
		return Math.max(1, colSpan);
	},

	//endregion

	//region Methods: Public

	/**
	 * inheritdoc Terrasoft.Component#constructor
	 * @override
	 */
	constructor: function() {
		this.setTplConfig();
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.component#init
	 * @override
	 */
	init: function() {
		this.addItemActionsHandlers();
		this.callParent(arguments);
		this.selectors = {
			wrapEl: ""
		};
		this.oldPosition = {
			row: 0,
			column: 0,
			rowSpan: 0,
			colSpan: 0
		};
		this.addEvents(
			/**
			 * @event beforeColumnChange
			 * Triggers before changing the column.
			 */
			"beforeColumnChange",
			/**
			 * @event beforeColSpanChange
			 * Works before changing the number of columns occupied.
			 */
			"beforeColSpanChange",
			/**
			 * @event beforeRowChange
			 * Triggers before the line changes.
			 */
			"beforeRowChange",
			/**
			 * @event beforeRowSpanChange
			 * Triggers before changing the number of lines occupied.
			 */
			"beforeRowSpanChange",
			/**
			 * @event afterColumnChange
			 * Triggers after changing the column.
			 */
			"afterColumnChange",
			/**
			 * @event afterColSpanChange
			 * Triggers after changing the number of columns occupied.
			 */
			"afterColSpanChange",
			/**
			 * @event afterRowChange
			 * Triggers after changing the line.
			 */
			"afterRowChange",
			/**
			 * @event afterRowSpanChange
			 * Triggers after changing the number of lines occupied.
			 */
			"afterRowSpanChange"
		);
		this.on("beforeRowChange", this.onBeforeRowChange, this);
		this.on("beforeRowSpanChange", this.onBeforeRowSpanChange, this);
		this.on("beforeColumnChange", this.onBeforeColumnChange, this);
		this.on("beforeColSpanChange", this.onBeforeColSpanChange, this);
	},

	/**
	 * @inheritdoc Terrasoft.Component#initDomEvents
	 * @protected
	 */
	initDomEvents: function() {
		var wrapEl = this.wrapEl;
		wrapEl.on("mousedown", this.onItemClick, this);
		wrapEl.on("dblclick", this.onItemDblClick, this);
	},

	/**
	 * Returns the width of the element.
	 * @return {String} Returns the width of the element.
	 */
	getWidth: function() {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		var marginRight = this.getMarginWidth() * 2;
		var result = this.colSpan * gridLayoutEdit.getCellWidth() - marginRight;
		return result + gridLayoutEdit.getCellWidthType();
	},

	/**
	 * Returns the height of the element in pixels.
	 * @return {String} Returns the height of the element in pixels.
	 */
	getHeight: function() {
		var topCell = this.getCell(this.row, this.column);
		var bottomCell = this.getCell(this.getBottomRow(), this.column);
		var result = 0;
		if (topCell && bottomCell) {
			result = bottomCell.getBottom() - topCell.getTop() - this.cellBorderLineSize * (this.row === 0 ? 2 : 1);
		}
		return result + "px";
	},

	/**
	 * Returns the position of the element from above in pixels.
	 * @return {String} Returns the position of the element from above in pixels.
	 */
	getTop: function() {
		var cell = this.getCell(this.row, this.column);
		var gridLayoutWrapEl = this.getGridLayoutEditTableEl();
		var result = 0;
		if (cell && gridLayoutWrapEl) {
			result = cell.getTop() - gridLayoutWrapEl.getTop() + this.cellBorderLineSize * (this.row === 0 ? 1 : 0);
		}
		return result + "px";
	},

	/**
	 * Returns the position of the item on the left.
	 * @return {String} Returns the position of the element on the left.
	 */
	getLeft: function() {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		var marginLeft = this.getMarginWidth();
		var result = this.column * gridLayoutEdit.getCellWidth() + marginLeft;
		return result + gridLayoutEdit.getCellWidthType();
	},

	/**
	 * Gets margin width in percent of the item.
	 * @protected
	 * @return {Number} Margin width in percent of the item.
	 */
	getMarginWidth: function() {
		var gridLayoutEdit = this.getGridLayoutEditInstance();
		var gridLayoutEditTableEl = gridLayoutEdit.tableEl;
		var margin = 100 / gridLayoutEditTableEl.getWidth();
		return margin;
	},

	/**
	 * Returns position and size of object.
	 * @return {Object} Returns position and size of object..
	 */
	getItemBox: function() {
		var box = {
			width: this.getWidth(),
			height: this.getHeight(),
			top: this.getTop()
		};
		var directionCssProperty = Terrasoft.getIsRtlMode() ? "right" : "left";
		box[directionCssProperty] = this.getLeft();
		return box;
	},

	/**
	 * Returns the index of the top line of the element.
	 * @return {Number} Returns the index of the top line of the element.
	 */
	getRow: function() {
		return this.row;
	},

	/**
	 * Returns the index of the bottom line of the element.
	 * @return {Number} Returns the index of the bottom line of the element.
	 */
	getBottomRow: function() {
		return this.row + this.rowSpan - 1;
	},

	/**
	 * Returns the number of rows occupied.
	 * @return {Number} Returns the number of rows occupied.
	 */
	getRowSpan: function() {
		return this.rowSpan;
	},

	/**
	 * Returns the index of the left column of the element.
	 * @return {Number} Returns the index of the left column of the element.
	 */
	getColumn: function() {
		return this.column;
	},

	/**
	 * Returns the index of the right column of the element.
	 * @return {Number} Returns the index of the right column of the element.
	 */
	getRightColumn: function() {
		return this.column + this.colSpan - 1;
	},

	/**
	 * Returns the number of columns occupied.
	 * @return {Number} Returns the number of columns occupied.
	 */
	getColSpan: function() {
		return this.colSpan;
	},

	/**
	 * Displays the control.
	 */
	show: function() {
		var renderTo = this.renderTo;
		if (renderTo && renderTo.isVisible()) {
			this.visible = true;
			if (!this.rendered) {
				this.render(this.renderTo);
			} else {
				this.reRender(null, this.renderTo);
			}
		}
	},

	/**
	 * Sets the index of the string.
	 * @param {Number} value The index of the string.
	 * @param {Boolean} skipRendering A flag that the element will not be repainted after the installation.
	 */
	setRow: function(value, skipRendering) {
		if (this.row === value) {
			return;
		}
		var oldRow = Ext.isEmpty(this.row) ? value : this.row;
		this.fireEvent("beforeRowChange", oldRow, this);
		this.row = value;
		this.fireEvent("afterRowChange", this.row, this);
		if (!skipRendering) {
			this.actualizeGridSize();
		}
	},

	/**
	 * Sets the number of rows occupied.
	 * @param {Number} value The number of rows occupied.
	 * @param {Boolean} skipRendering A flag that the element will not be repainted after the installation.
	 */
	setRowSpan: function(value, skipRendering) {
		if (this.rowSpan === value) {
			return;
		}
		var oldRowSpan = Ext.isEmpty(this.rowSpan) ? value : this.rowSpan;
		this.fireEvent("beforeRowSpanChange", oldRowSpan, this);
		this.rowSpan = value;
		this.fireEvent("afterRowSpanChange", value, this);
		if (!skipRendering) {
			this.actualizeGridSize();
		}
	},

	/**
	 * Updates the height of the element.
	 * @param {Number} value The index of the string.
	 * @param {Boolean} updateBottom A flag that the item is changing from below.
	 * @param {Boolean} skipRendering A flag that the element will not be repainted after the installation.
	 */
	updateHeight: function(value, updateBottom, skipRendering) {
		var rowSpan = (updateBottom) ? (value - this.row + 1) : (this.row - value + this.rowSpan);
		if (!updateBottom) {
			var oldRow = Ext.isEmpty(this.row) ? value : this.row;
			this.fireEvent("beforeRowChange", oldRow, this);
			this.row = value;
			this.fireEvent("afterRowChange", this.row, this);
		}
		rowSpan = (rowSpan >= 1) ? rowSpan : 1;
		var oldRowSpan = Ext.isEmpty(this.rowSpan) ? rowSpan : this.rowSpan;
		this.fireEvent("beforeRowSpanChange", oldRowSpan, this);
		this.rowSpan = rowSpan;
		this.fireEvent("afterRowSpanChange", this.rowSpan, this);
		if (!skipRendering) {
			this.actualizeGridSize();
		}
	},

	/**
	 * Sets the column index.
	 * @param {Number} value The column index.
	 * @param {Boolean} skipRendering A flag that the element will not be repainted after the installation.
	 */
	setColumn: function(value, skipRendering) {
		if (this.column === value) {
			return;
		}
		var oldColumn = Ext.isEmpty(this.column) ? value : this.column;
		this.fireEvent("beforeColumnChange", oldColumn, this);
		this.column = value;
		this.fireEvent("afterColumnChange", this.column, this);
		if (!skipRendering) {
			this.actualizeGridSize();
		}
	},

	/**
	 * Sets the number of columns occupied.
	 * @param {Number} value The number of columns occupied.
	 * @param {Boolean} skipRendering A flag that the element will not be repainted after the installation.
	 */
	setColSpan: function(value, skipRendering) {
		if (this.colSpan === value) {
			return;
		}
		var oldColSpan = Ext.isEmpty(this.colSpan) ? value : this.colSpan;
		this.fireEvent("beforeColSpanChange", oldColSpan, this);
		this.colSpan = value;
		this.fireEvent("afterColSpanChange", value, this);
		if (!skipRendering) {
			this.actualizeGridSize();
		}
	},

	/**
	 * Updates the width of the element.
	 * @param {Number} value The column index.
	 * @param {Boolean} updateRight A flag that the item is changing on the right.
	 * @param {Boolean} skipRendering A flag that the element will not be repainted after the installation.
	 */
	updateWidth: function(value, updateRight, skipRendering) {
		var colSpan = this.calculateColSpan(value, updateRight);
		if (!updateRight) {
			var oldColumn = Ext.isEmpty(this.column) ? value : this.column;
			this.fireEvent("beforeColumnChange", oldColumn, this);
			this.column = value;
			this.fireEvent("afterColumnChange", this.column, this);
		}
		var oldColSpan = Ext.isEmpty(this.colSpan) ? colSpan : this.colSpan;
		this.fireEvent("beforeColSpanChange", oldColSpan, this);
		this.colSpan = colSpan;
		this.fireEvent("afterColSpanChange", this.colSpan, this);
		if (!skipRendering) {
			this.actualizeGridSize();
		}
	},

	/**
	 * Updates the previous item position.
	 */
	applyPositionChange: function() {
		const gridLayoutEditInstance = this.getGridLayoutEditInstance();
		gridLayoutEditInstance.fireEvent("itemPositionChanged", this.itemId, Ext.apply({}, this.oldPosition));
		this.oldPosition.row = this.row;
		this.oldPosition.column = this.column;
		this.oldPosition.rowSpan = this.rowSpan;
		this.oldPosition.colSpan = this.colSpan;
	},

	/**
	 * @inheritdoc Terrasoft.Component#setDomAttributes
	 * @override
	 */
	setDomAttributes: function(attributes) {
		if (attributes && !Ext.isEmpty(attributes["data-selected-item"])) {
			throw new Terrasoft.InvalidOperationException();
		}
		this.callParent(arguments);
	},


	/**
	 * Sets item group name.
	 * @param {String} value Group name.
	 */
	setGroupName: function(value) {
		if (this.groupName === value) {
			return;
		}
		this.groupName = value;
		this.safeRerender();
	}

	//endregion

});
