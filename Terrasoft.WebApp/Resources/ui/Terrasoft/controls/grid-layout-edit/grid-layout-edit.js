Ext.ns("Terrasoft.control.enums");

/**
 * Grid layout edit selection types.
 * @enum
 */
Terrasoft.GridLayoutEditSelectionType = {
	/** Full */
	FULL: 0,
	/** Vertical */
	VERTICAL: 1,
	/** Horizontal */
	HORIZONTAL: 2
};

/**
 * Class of control element which changes grid element settings.
 */
Ext.define("Terrasoft.controls.GridLayoutEdit", {
	alternateClassName: "Terrasoft.GridLayoutEdit",
	extend: "Terrasoft.Component",
	mixins: {
		droppable: "Terrasoft.Droppable"
	},

	//region Properties: Protected

	/**
	 * Parameters object of control element template.
	 * @protected
	 * @type {Object}
	 */
	tplConfig: {
		/* jshint ignore:start */
		classes: {
			gridLayoutEditWrap: ["grid-layout-edit-wrap"],
			gridLayoutEditTable: ["grid-layout-edit-table"],
			gridLayoutEditRow: ["grid-layout-edit-row"],
			gridLayoutEditCell: ["grid-layout-edit-cell"],
			selectionBorderClasses: {
				top: "grid-layout-edit-selection-border-top",
				bottom: "grid-layout-edit-selection-border-bottom",
				left: "grid-layout-edit-selection-border-left",
				right: "grid-layout-edit-selection-border-right"
			}
		},
		selectorSuffixes: {
			wrap: "grid-layout-edit-wrap",
			table: "grid-layout-edit-table",
			row: "grid-layout-edit-row",
			cell: "grid-layout-edit-cell"
		},
		styles: {},
		rowTpl: '<div id="{0}-grid-layout-edit-row-{1}" data-row-index="{1}" class="grid-layout-edit-row">{2}</div>',
		cellTpl: '<div id="{0}-grid-layout-edit-cell-{1}-{2}" data-row-index={1} data-column-index={2} ' +
			'data-selected={3} class="grid-layout-edit-cell" style="{4}"></div>'
		/* jshint ignore:end */
	},

	/**
	 * @inheritdoc Terrasoft.component#tpl
	 * @override
	 */
	tpl: [
		"<div id=\"{id}-grid-layout-edit-wrap\" class=\"{gridLayoutEditWrap}\">",
		"<div id=\"{id}-grid-layout-edit-table\" class=\"{gridLayoutEditTable}\">",
		"{%this.prepareTableTplData(out, values)%}",
		"</div>",
		"</div>"
	],

	/**
	 * Bind-parameters object of grid elements.
	 * @protected
	 * @type {Object}
	 */
	itemBindingConfig: null,

	/**
	 * The name of the grid elements class.
	 * @protected
	 * @type {String}
	 */
	itemClassName: "Terrasoft.GridLayoutEditItem",

	/**
	 * The internal collection of grid cells.
	 * @protected
	 * @type {Terrasoft.Collection}
	 */
	gridLayoutEditItemsCollection: null,

	//endregion

	//region Properties: Public

	/**
	 * Number of rows.
	 * @type {Number}
	 */
	rows: null,

	/**
	 * The minimum allowable number of rows.
	 * @type {Number}
	 */
	minRows: 1,

	/**
	 * The maximum allowable number of rows.
	 * @type {Number}
	 */
	maxRows: 500,

	/**
	 * Indicates of automatically increase the height of the grid to a maximum bottom element position.
	 * @type {Number}
	 */
	autoHeight: false,

	/**
	 * Number of columns.
	 * @type {Number}
	 */
	columns: null,

	/**
	 * The minimum allowable number of columns.
	 * @type {Number}
	 */
	minColumns: 1,

	/**
	 * The maximum allowable number of columns.
	 * @type {Number}
	 */
	maxColumns: 24,

	/**
	 * Indicates of automatic increase the width of the grid to the maximum right position of the element.
	 * @type {Number}
	 */
	autoWidth: false,

	/**
	 * Indicates which allows intersection of items.
	 * @type {Boolean}
	 */
	allowItemsIntersection: true,

	/**
	 * Indicates of needing change position for intersected items.
	 * @type {Boolean}
	 */
	changePositionForIntersectedItems: false,

	/**
	 * Collection of view model elements for grid settings.
	 * @protected
	 * @type {Terrasoft.BaseViewModelCollection}
	 */
	items: null,

	/**
	 * Item configuration.
	 * @protected
	 * @type {Object}
	 */
	itemConfig: null,

	/**
	 * Object of selection grid range.
	 * Example:
	 * {
	 *	row: 0,
	 *	rowSpan: 2,
	 *	column: 0,
	 *	colSpan: 3
	 * }
	 * @protected
	 * @type {Object}
	 */
	selection: null,

	/**
	 * Selected items array.
	 * @type {String[]}
	 */
	selectedItems: null,

	/**
	 * Selection type.
	 * @type {Number}
	 */
	selectionType: Terrasoft.GridLayoutEditSelectionType.FULL,

	/**
	 * Indicates the ability of manual selection.
	 * @type {Boolean}
	 */
	useManualSelection: true,

	/**
	 * Indicates the ability of multiple selection.
	 * @type {Boolean}
	 */
	multipleSelection: false,

	/**
	 * Indicates if selection border is used.
	 * @type {Boolean}
	 */
	useSelectionBorder: true,

	/**
	 * Array of element actions.
	 * @protected
	 * [
	 *          {
	 *              className: "Terrasoft.Button",
	 *              style: Terrasoft.controls.ButtonEnums.style.BLUE,
	 *              caption: "Edit",
	 *              tag: "edit"
	 *          },
	 *          {
	 *              className: "Terrasoft.Button",
	 *              style: Terrasoft.controls.ButtonEnums.style.GREY,
	 *              caption: "Copy",
	 *              tag: "copy"
	 *          },
	 *          {
	 *              className: "Terrasoft.Button",
	 *              style: Terrasoft.controls.ButtonEnums.style.GREY,
	 *              caption: "Delete",
	 *              tag: "delete"
	 *          }
	 * ]
	 * @type {Array}
	 */
	itemActions: null,

	/**
	 * Grid cell width in "em" by default.
	 * @type {Number}
	 */
	cellWidth: 5,

	/**
	 * Grid cell height in "em" by default.
	 * @type {Number}
	 */
	cellHeight: 5,

	/**
	 * Indicates if cell width is fixed.
	 * @type {Boolean}
	 */
	fixedCellWidth: false,

	/**
	 * @inheritdoc Terrasoft.Droppable#dropZonePadding
	 * @override
	 */
	dropZonePadding: 0,

	//endregion

	//region Methods: Private

	/**
	 * Checks bitmap elements to determine their intersection.
	 * @private
	 * @param {Array} firstBitmap First bitmap.
	 * @param {Array} secondBitmap Second bitmap.
	 * @return {Boolean} Indicates whether there is a bitmap intersection.
	 */
	/* jshint ignore:start */
	checkBitmapIntersection: function(firstBitmap, secondBitmap) {
		for (var i = 0, ln = firstBitmap.length; i < ln; i++) {
			if ((firstBitmap[i] & secondBitmap[i]) > 0) {
				return true;
			}
		}
		return false;
	},
	/* jshint ignore:end */

	/**
	 * Checks if the grid element intersects with other elements.
	 * @private
	 * @param {Terrasoft.GridLayoutEditItem} item Grid item.
	 * @return {Boolean} Indicates if the grid element intersects with other elements.
	 */
	isItemIntersected: function(item) {
		var itemsBitmap = this.getItemsBitmap([item]);
		var itemBitmap = this.getItemBitmap(item);
		return this.checkBitmapIntersection(itemsBitmap, itemBitmap);
	},

	/**
	 * Calculates the bit mask.
	 * @private
	 * @return {Number} Bit mask.
	 */
	calculateBitMask: function(itemColumn, itemWidth, totalColumnsCount) {
		var columnOffset = totalColumnsCount - itemColumn;
		return (Math.pow(2, columnOffset) - 1) - (Math.pow(2, columnOffset - itemWidth) - 1);
	},

	/**
	 * Checks whether there is in column the grid element.
	 * @private
	 * @return {Boolean} Indicates whether there is a grid element in column.
	 */
	rowHasItem: function(rowIndex, itemRow, itemWidth) {
		return rowIndex >= itemRow && rowIndex < (itemRow + itemWidth);
	},

	/**
	 * Returns item bitmap.
	 * @private
	 * @param {Terrasoft.GridLayoutEditItem} item Grid item.
	 * @return {Array} Bitmap with bit mask of item.
	 */
	getItemBitmap: function(item) {
		var itemBitmap = [];
		var columnsCount = this.columns || 1;
		var itemColumn = item.column;
		var itemRow = item.row;
		var itemColSpan = item.colSpan || 1;
		var itemRowSpan = item.rowSpan || 1;
		for (var i = itemRow, ln = itemRow + itemRowSpan; i < ln; i++) {
			var bitMask = this.calculateBitMask(itemColumn, itemColSpan, columnsCount);
			itemBitmap[i] = bitMask;
		}
		return itemBitmap;
	},

	/**
	 * Returns bitmap of all items.
	 * @private
	 * @param {Array} excludingItems Array of items which must be excluded from bitmap.
	 * @return {Array} Bitmap of items.
	 */
	/* jshint ignore:start */
	getItemsBitmap: function(excludingItems) {
		var bitmap = [];
		var columnsCount = this.columns || 1;
		var rowsCount = this.rows || 1;
		var items = this.gridLayoutEditItemsCollection.getItems();
		Terrasoft.each(items, function(item) {
			if (excludingItems.indexOf(item) === -1) {
				var position = item.oldPosition;
				for (var j = 0; j < rowsCount; j++) {
					var bitMask = 0;
					if (!bitmap[j]) {
						bitmap[j] = bitMask;
					}
					if (this.rowHasItem(j, position.row, position.rowSpan)) {
						bitMask = this.calculateBitMask(position.column, position.colSpan, columnsCount);
						bitmap[j] = bitmap[j] | bitMask;
					}
				}
			}
		}, this);
		return bitmap;
	},
	/* jshint ignore:end */

	/**
	 * Returns maximum area selection.
	 * @private
	 * @param {Object} selection Object describes current selection area.
	 * @return {Object} Object describes maximum selection area.
	*/
	getMaxSelection: function(selection) {
		selection.column = this.getMaxColumnPosition(selection.column, selection.colSpan);
		selection.row = this.getMaxRowPosition(selection.row, selection.rowSpan);
		return selection;
	},

	/**
	 * Returns maximum column position.
	 * @private
	 * @param {Number} position Current column position.
	 * @param {Number} count Count of columns in block.
	 * @return {Number} Maximum column position.
	*/
	getMaxColumnPosition: function(position, count) {
		return this.getMaxItemPosition(position, count, this.columns);
	},

	/**
	 * Returns maximum row position.
	 * @private
	 * @param {Number} position Current row position.
	 * @param {Number} count Count of rows in block.
	 * @return {Number} Maximum row position.
	 */
	getMaxRowPosition: function(position, count) {
		return this.getMaxItemPosition(position, count, this.rows);
	},

	/**
	 * Returns maximum item position.
	 * @private
	 * @param {Number} position Current item position.
	 * @param {Number} count Count of items in block.
	 * @param {Number} maxCount Maximum count of items in grid.
	 * @return {Number} Maximum item position.
	 */
	getMaxItemPosition: function(position, count, maxCount) {
		return (position + count) > maxCount
			? maxCount - count
			: position;
	},

	//endregion

	//region Methods: Protected

	/**
	 * Applying the template configuration of control item.
	 * @protected
	 * @param {Object} tplData The object of settings of rendering template of control item.
	 * @param {String} configNodeName Configuration node name.
	 */
	applyTplConfigProperties: function(tplData, configNodeName) {
		Terrasoft.each(this.tplConfig[configNodeName], function(propertyValue, propertyName) {
			tplData[propertyName] = propertyValue;
		}, this);
	},

	/**
	 * Applying the template classes of control item.
	 * @protected
	 * @param {Object} tplData Settings object of rendering control item template.
	 */
	applyTplClasses: function(tplData) {
		this.applyTplConfigProperties(tplData, "classes");
	},

	/**
	 * Applying the template styles of control item.
	 * @protected
	 * @param {Object} tplData Settings object of rendering control item template.
	 */
	applyTplStyles: function(tplData) {
		this.applyTplConfigProperties(tplData, "styles");
	},

	/**
	 * Prepares the grid template of control item.
	 * @protected
	 * @param {Array} out An array of layout elements.
	 * @param {Object} value Object of properties.
	 */
	prepareTableTplData: function(out, value) {
		var self = value.self;
		var cellStyle = self.getCellStyle();
		for (var row = 0; row < self.rows; row++) {
			var rowCells = [];
			for (var column = 0; column < self.columns; column++) {
				var cellTpl = Ext.String.format(Terrasoft.deepClone(self.tplConfig.cellTpl), self.id, row, column, 0,
					cellStyle);
				rowCells.push(cellTpl);
			}
			var rowTpl = Ext.String.format(Terrasoft.deepClone(self.tplConfig.rowTpl), self.id, row, rowCells.join(""));
			out.push(rowTpl);
		}
	},

	/**
	 * Validates control item properties.
	 * @protected
	 * @param {Number} value Value.
	 * @param {String} propertyName Property name.
	 */
	validateProperty: function(value, propertyName) {
		if (!Ext.isNumber(value)) {
			throw new Terrasoft.UnsupportedTypeException({
				message: Ext.String.format(Terrasoft.Resources.Controls.GridLayoutEdit.PropertyIsNotANumber,
					propertyName)
			});
		} else if (value <= 0) {
			throw new Terrasoft.UnsupportedTypeException({
				message: Ext.String.format(Terrasoft.Resources.Controls.GridLayoutEdit.PropertyIsLessThan,
					propertyName, "0")
			});
		}
	},

	/**
	 * @inheritdoc Terrasoft.component#getTplData
	 * @override
	 */
	getTplData: function() {
		this.selectors.wrapEl = Ext.String.format("#{0}-" + this.tplConfig.selectorSuffixes.wrap, this.id);
		this.selectors.tableEl = Ext.String.format("#{0}-" + this.tplConfig.selectorSuffixes.table, this.id);
		var tplData = this.callParent(arguments);
		this.applyTplClasses(tplData);
		this.applyTplStyles(tplData);
		tplData.prepareTableTplData = this.prepareTableTplData;
		return tplData;
	},

	/**
	 * @inheritdoc Terrasoft.component#getBindConfig
	 * @override
	 */
	getBindConfig: function() {
		return Ext.apply(this.callParent(arguments), {
			items: {
				changeMethod: "onItemsLoad"
			},
			rows: {
				changeMethod: "setRows",
				changeEvent: "rowsChanged"
			},
			columns: {
				changeMethod: "setColumns",
				changeEvent: "columnsChanged"
			},
			selection: {
				changeMethod: "setSelection",
				changeEvent: "selectionChanged"
			},
			selectedItems: {
				changeEvent: "selectedItemsChange"
			},
			allowItemsIntersection: {
				changeMethod: "setAllowItemsIntersection"
			}
		});
	},

	/**
	 * Handler of "dataLoaded" of Terrasoft.BaseViewModelCollection.
	 * @protected
	 * @param {Terrasoft.BaseViewModelCollection} collection Collection.
	 */
	onItemsLoad: function(collection) {
		collection.eachKey(function(key, item, index) {
			this.onItemAdd(item, index, key);
		}, this);
		if (this.rendered) {
			this.reRender();
		}
	},

	/**
	 * Handler of "add" of Terrasoft.BaseViewModelCollection.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} item Item of collection.
	 * @param {Number} index Index of collection item.
	 * @param {String} key Key of collection item.
	 */
	onItemAdd: function(item, index, key) {
		var itemConfig = Ext.apply(this.itemConfig || {}, {gridLayoutEditId: this.id});
		var itemBindingConfig = Ext.apply(itemConfig, this.itemBindingConfig);
		if (this.itemActions) {
			itemBindingConfig.items = Terrasoft.deepClone(this.itemActions);
		}
		var gridLayoutEditItem = Ext.create(this.itemClassName, itemBindingConfig);
		this.gridLayoutEditItemsCollection.add(key, gridLayoutEditItem);
		gridLayoutEditItem.bind(item);
		if (!this.allowItemsIntersection) {
			if (!this.isItemIntersected(gridLayoutEditItem)) {
				this.updateSize(gridLayoutEditItem, true);
				this.setSelection();
			} else {
				item.parentCollection.removeByKey(key);
			}
		}
	},

	/**
	 * Handler of "clear" of Terrasoft.BaseViewModelCollection.
	 * @protected
	 */
	onItemsClear: function() {
		this.gridLayoutEditItemsCollection.each(function(item) {
			item.destroy();
		}, this);
		this.gridLayoutEditItemsCollection.clear();
		this.updateSize();
		this.selectedItems = [];
		this.fireEvent("selectedItemsChange", this.selectedItems, this);
	},

	/**
	 * Handler of "remove" of Terrasoft.BaseViewModelCollection.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} item Collection item.
	 * @param {String} key Key of collection item.
	 */
	onItemRemove: function(item, key) {
		var gridLayoutEditItem = this.gridLayoutEditItemsCollection.get(key);
		gridLayoutEditItem.destroy();
		this.gridLayoutEditItemsCollection.removeByKey(key);
		this.updateSize(gridLayoutEditItem, true);
		this.selectedItems = Ext.Array.remove(this.selectedItems, key);
		this.fireEvent("selectedItemsChange", this.selectedItems, this);
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @protected
	 */
	subscribeForCollectionEvents: function(binding, property, model) {
		this.callParent(arguments);
		var collection = model.get(binding.modelItem);
		if (property === "items") {
			collection.on("dataLoaded", this.onItemsLoad, this);
			collection.on("add", this.onItemAdd, this);
			collection.on("remove", this.onItemRemove, this);
			collection.on("clear", this.onItemsClear, this);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#unSubscribeForCollectionEvents
	 * @protected
	 */
	unSubscribeForCollectionEvents: function(binding, property, model) {
		this.callParent(arguments);
		var collection = model.get(binding.modelItem);
		if (property === "items") {
			collection.un("dataLoaded", this.onItemsLoad, this);
			collection.un("add", this.onItemAdd, this);
			collection.un("remove", this.onItemRemove, this);
			collection.un("clear", this.onItemsClear, this);
		}
	},

	/**
	 * Shows grid item.
	 * @protected
	 * @param {Terrasoft.GridLayoutEditItem} item Grid item.
	 */
	showItem: function(item) {
		item.renderTo = this.tableEl;
		item.show();
	},

	/**
	 * Shows grid items.
	 * @protected
	 */
	showItems: function() {
		if (this.gridLayoutEditItemsCollection) {
			this.gridLayoutEditItemsCollection.each(function(item) {
				this.showItem(item);
			}, this);
		}
	},

	/**
	 * Performs the operation after draw/redraw of control item.
	 * @protected
	 */
	postRender: function() {
		this.validateProperty(this.rows, "rows");
		this.validateProperty(this.columns, "columns");
		this.showItems();
	},

	/**
	 * Returns default binding configuration of items.
	 * @protected
	 * @return {Object} Object of default binding configuration of items.
	 */
	getDefaultItemBindingConfig: function() {
		var defaultItemBindingConfig = {};
		var gridLayoutEditItemClass = Ext.ClassManager.get(this.itemClassName);
		var gridLayoutEditItemClassPrototype = gridLayoutEditItemClass.prototype;
		var gridLayoutEditItemBindConfig = gridLayoutEditItemClassPrototype.getBindConfig();
		Terrasoft.each(Object.keys(gridLayoutEditItemBindConfig), function(propertyName) {
			defaultItemBindingConfig[propertyName] = {
				bindTo: propertyName
			};
		}, this);
		return defaultItemBindingConfig;
	},

	/**
	 * @inheritdoc Terrasoft.Droppable#getDropZones
	 * @override
	 */
	getDropZones: function() {
		var result = [];
		this.cellElements = {};
		var wrapEl = this.getWrapEl();
		var dropZones  = Ext.query(Ext.String.format("[id|='{0}-{1}']", this.id,
				this.tplConfig.selectorSuffixes.cell), wrapEl.dom);
		Terrasoft.each(dropZones, function(domElement) {
			var el = Ext.get(domElement);
			result.push(el);
			this.cellElements[el.id] = el;
		}, this);
		return result;
	},

	/**
	 * Returns the items max row.
	 * @protected
	 * @return {Number} The items max row.
	 */
	getItemsMaxRow: function() {
		var maxRow = this.minRows;
		this.gridLayoutEditItemsCollection.each(function(item) {
			var itemBottomRow = item.getBottomRow() + 2;
			maxRow = (maxRow < itemBottomRow) ? itemBottomRow : maxRow;
		}, this);
		return (maxRow > this.maxRows) ? this.maxRows : maxRow;
	},

	/**
	 * Returns the items max column.
	 * @protected
	 * @return {Number} The items max column.
	 */
	getItemsMaxColumn: function() {
		var maxColumn = this.minColumns;
		this.gridLayoutEditItemsCollection.each(function(item) {
			var itemRightColumn = item.getRightColumn() + 2;
			maxColumn = (maxColumn < itemRightColumn) ? itemRightColumn : maxColumn;
		}, this);
		return (maxColumn > this.maxColumns) ? this.maxColumns : maxColumn;
	},

	/**
	 * Updates grid height on elements.
	 * @protected
	 * @return {Boolean} Indicates that that the parameter has been updated.
	 */
	updateHeight: function() {
		var updated = false;
		if (this.autoHeight) {
			var maxRow = this.getItemsMaxRow();
			if (this.rows !== maxRow) {
				this.setRows(maxRow);
				updated = true;
			}
		}
		return updated;
	},

	/**
	 * Updates grid width on elements.
	 * @protected
	 * @return {Boolean} Indicates that that the parameter has been updated.
	 */
	updateWidth: function() {
		var updated = false;
		if (this.autoWidth) {
			var maxColumn = this.getItemsMaxColumn();
			if (this.columns !== maxColumn) {
				this.setColumns(maxColumn);
				updated = true;
			}
		}
		return updated;
	},

	/**
	 * @inheritdoc Terrasoft.Droppable#getGroupName
	 * @override
	 */
	getGroupName: function() {
		return this.id;
	},

	/**
	 * Returns the event cell position.
	 * @protected
	 * @param {Object} event Event object.
	 * @return {Object} The object of the event cell position.
	 */
	getEventCellPosition: function(event) {
		var result;
		var cellDom = event.getTarget();
		if (cellDom) {
			result = {
				row: parseInt(cellDom.getAttribute("data-row-index"), 10),
				column: parseInt(cellDom.getAttribute("data-column-index"), 10)
			};
		}
		return result;
	},

	/**
	 * Event handler of table element click.
	 * @protected
	 * @param {Object} event Event object.
	 */
	onTableElClick: function(event) {
		var cellPosition = this.getEventCellPosition(event);
		this.fireEvent("cellClick", cellPosition);
	},

	/**
	 * Event handler of table element double-clicking.
	 * @protected
	 * @param {Object} event Event object.
	 */
	onTableElDblClick: function(event) {
		var cellPosition = this.getEventCellPosition(event);
		this.fireEvent("cellDblClick", cellPosition);
	},

	/**
	 * Returns the range between the upper left and lower right points.
	 * @protected
	 * @param {Object} startPoint Start point.
	 * @param {Object} endPoint End point.
	 * @return {Object} Range.
	 */
	getRangeBetweenPoints: function(startPoint, endPoint) {
		var startRow = startPoint.row;
		var endRow = endPoint.row;
		if (startRow > endRow) {
			endRow = startRow;
			startRow = endPoint.row;
		}
		var startColumn = startPoint.column;
		var endColumn = endPoint.column;
		if (startColumn > endColumn) {
			endColumn = startColumn;
			startColumn = endPoint.column;
		}
		return {
			row: startRow,
			rowSpan: endRow - startRow + 1,
			column: startColumn,
			colSpan: endColumn - startColumn + 1
		};
	},

	/**
	 * Sets the range selection.
	 * @protected
	 * @param {Object} selection The range selection.
	 */
	setSelection: function(selection) {
		if (!selection) {
			this.removeSelectionBorderClasses();
			var selector = Ext.String.format(".{0} [data-selected=\"1\"]", this.tplConfig.selectorSuffixes.table);
			var selectedCells = Ext.select(selector, this.tableEl);
			selectedCells.each(function(selectedCell) {
				this.setCellSelected(selectedCell.dom, 0);
			}, this);
		} else {
			switch (this.selectionType) {
				case Terrasoft.GridLayoutEditSelectionType.HORIZONTAL:
					selection.rowSpan = 1;
					break;
				case Terrasoft.GridLayoutEditSelectionType.VERTICAL:
					selection.colSpan = 1;
					break;
			}
			var selected = 1;
			selection = this.getMaxSelection(selection);
			this.setCellRangeSelected(selection, selected);
		}
		this.selection = selection;
		this.fireEvent("selectionChanged", this.selection);
	},

	/**
	 * Defines if cell is selected.
	 * @protected
	 * @param {Object} cellDomEl Dom-element of cell.
	 * @return {Number} Excretion.
	 */
	isCellSelected: function(cellDomEl) {
		return parseInt(cellDomEl.getAttribute("data-selected"), 10);
	},

	/**
	 * Sets the selected cell
	 * @protected
	 * @param {Object} cellDomEl Dom-element of cell.
	 * @param {Boolean} isSelected Excretion.
	 */
	setCellSelected: function(cellDomEl, isSelected) {
		cellDomEl.setAttribute("data-selected", isSelected);
	},

	/**
	 * Returns the upper neighbour cell.
	 * @protected
	 * @param {Number} row Row.
	 * @param {Number} column Column.
	 * @return {Ext.dom.Element} Cell.
	 */
	getUpNeighbourCell: function(row, column) {
		var cellId = Ext.String.format("{0}-{1}-{2}-{3}", this.id, this.tplConfig.selectorSuffixes.cell, row - 1, column);
		var cell = Ext.get(cellId);
		return cell;
	},

	/**
	 * Returns the left neighbour cell.
	 * @protected
	 * @param {Number} row Row.
	 * @param {Number} column Column.
	 * @return {Ext.dom.Element} Cell.
	 */
	getLeftNeighbourCell: function(row, column) {
		var cellId = Ext.String.format("{0}-{1}-{2}-{3}", this.id, this.tplConfig.selectorSuffixes.cell, row, column - 1);
		var cell = Ext.get(cellId);
		return cell;
	},

	/**
	 * Sets the selection border for cell.
	 * @protected
	 * @param {Object} range Range.
	 * @param {Ext.dom.Element} cell Cell.
	 * @param {Number} row Row.
	 * @param {Number} column Column.
	 */
	setSelectionBorder: function(range, cell, row, column) {
		if (!this.useSelectionBorder) {
			return;
		}
		var selectionBorderClasses = this.tplConfig.classes.selectionBorderClasses;
		if (row === range.row) {
			if (row === 0) {
				cell.addCls(selectionBorderClasses.top);
			} else {
				var upperCell = this.getUpNeighbourCell(row, column);
				if (upperCell) {
					upperCell.addCls(selectionBorderClasses.bottom);
				}
			}
		}
		if (row === range.row + range.rowSpan - 1) {
			cell.addCls(selectionBorderClasses.bottom);
		}
		if (column === range.column) {
			if (column === 0) {
				cell.addCls(selectionBorderClasses.left);
			} else {
				var lefterCell = this.getLeftNeighbourCell(row, column);
				if (lefterCell) {
					lefterCell.addCls(selectionBorderClasses.right);
				}
			}
		}
		if (column === range.column + range.colSpan - 1) {
			cell.addCls(selectionBorderClasses.right);
		}
	},

	/**
	 * Removes element selection border.
	 * @protected
	 */
	removeSelectionBorderClasses: function() {
		if (!this.useSelectionBorder) {
			return;
		}
		var selectionBorderObject = this.tplConfig.classes.selectionBorderClasses;
		var borderClasses = Ext.Object.getValues(selectionBorderObject);
		Terrasoft.each(borderClasses, function(borderClass) {
			var selectedCells = Ext.select("." + borderClass, this.tableEl);
			selectedCells.each(function(selectedCell) {
				selectedCell.removeCls(borderClass);
			}, this);
		}, this);
	},

	/**
	 * Sets the cell range selected.
	 * @protected
	 * @param {Object} range Range of the cell.
	 * @param {Boolean} isSelected Excretion.
	 */
	setCellRangeSelected: function(range, isSelected) {
		if (!this.rendered) {
			return;
		}
		for (var i = range.row; i < range.row + range.rowSpan; i++) {
			for (var j = range.column; j < range.column + range.colSpan; j++) {
				var cellId = Ext.String.format("{0}-{1}-{2}-{3}", this.id, this.tplConfig.selectorSuffixes.cell, i, j);
				var cell = this.cellElements[cellId];
				if (cell) {
					this.setSelectionBorder(range, cell, i, j);
					this.setCellSelected(cell.dom, isSelected);
				}
			}
		}
	},

	/**
	 * Event handler of mouse down.
	 * @protected
	 * @param {Object} event Event object.
	 */
	onMouseDown: function(event) {
		this.selectItem();
		this.setSelection();
		this.selectionMode = this.useManualSelection;
		this.selectionStartPosition = this.getEventCellPosition(event);
	},

	/**
	 * Event handler of mouse up.
	 * @protected
	 * @param {Object} event Event object.
	 */
	onMouseUp: function(event) {
		if (this.selectionMode) {
			var currentPosition = this.getEventCellPosition(event);
			var selection = this.getRangeBetweenPoints(this.selectionStartPosition, currentPosition);
			this.setSelection(selection);
			this.selectionStartPosition = null;
			this.selectionMode = false;
			this.fireEvent("selectionEnded", event, selection, this);
		}
	},

	/**
	 * Event handler of mouse move.
	 * @protected
	 * @param {Object} event Event object.
	 */
	onMouseMove: function(event) {
		if (this.selectionMode) {
			var currentPosition = this.getEventCellPosition(event);
			var selectionRange = this.getRangeBetweenPoints(this.selectionStartPosition, currentPosition);
			this.setSelection();
			this.setSelection(selectionRange);
		}
	},

	/**
	 * Returns cell width.
	 * @protected
	 * @return {Number} Cell width.
	 */
	getCellWidth: function() {
		return this.fixedCellWidth ? this.cellWidth : (100 / this.columns);
	},

	/**
	 * Returns the cell width type.
	 * @protected
	 * @return {Number} The cell width type.
	 */
	getCellWidthType: function() {
		return this.fixedCellWidth ? "em" : "%";
	},

	/**
	 * Returns the cell style.
	 * @protected
	 * @return {Number} The cell style.
	 */
	getCellStyle: function() {
		return Ext.String.format("width: {0}{1}", this.getCellWidth(), this.getCellWidthType());
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.component#init
	 * @override
	 */
	init: function() {
		this.callParent(arguments);
		this.selectors = {
			wrapEl: "",
			tableEl: ""
		};
		this.gridLayoutEditItemsCollection = Ext.create("Terrasoft.Collection");
		this.rows = (this.autoHeight) ? this.getItemsMaxRow() : this.rows;
		this.columns = (this.autoWidth) ? this.getItemsMaxColumn() : this.columns;
		this.itemBindingConfig = this.itemBindingConfig || this.getDefaultItemBindingConfig();
		this.selectedItems = [];
		this.addEvents(
			/**
			 * @event cellClick
			 * Event of the click on cell.
			 */
			"cellClick",
			/**
			 * @event cellDblClick
			 * Event of the double-click on cell.
			 */
			"cellDblClick",
			/**
			 * @event selectionChanged
			 * Event of selection changed.
			 */
			"selectionChanged",
			/**
			 * @event selectedItemsChange
			 * Event of selected items change.
			 */
			"selectedItemsChange",
			/**
			 * @event itemClick
			 * Event of click on item.
			 */
			"itemClick",
			/**
			 * @event itemDblClick
			 * Event of double-click on item.
			 */
			"itemDblClick",
			/**
			 * @event rowsChanged
			 * Event of rows changed.
			 */
			"rowsChanged",
			/**
			 * @event columnsChanged
			 * Event of columns count changed.
			 */
			"columnsChanged",
			/**
			 * @event itemActionClick
			 * Event of click on action item.
			 */
			"itemActionClick",
			/**
			 * @event selectionEnded
			 * Event of selection ended.
			 */
			"selectionEnded",
			/**
			 * @event itemPositionChanged
			 * Event of item position change.
			 */
			"itemPositionChanged"
		);
	},

	/**
	 * @inheritdoc Terrasoft.Component#initDomEvents
	 * @protected
	 */
	initDomEvents: function() {
		var tableEl = this.tableEl;
		tableEl.on("click", this.onTableElClick, this);
		tableEl.on("dblclick", this.onTableElDblClick, this);
		tableEl.on("mousemove", this.onMouseMove, this);
		tableEl.on("mousedown", this.onMouseDown, this);
		tableEl.on("mouseup", this.onMouseUp, this);
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.postRender();
		this.mixins.droppable.onAfterRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.postRender();
		this.mixins.droppable.onAfterReRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.component#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.onItemsClear();
		this.gridLayoutEditItemsCollection.destroy();
		this.gridLayoutEditItemsCollection = null;
		this.mixins.droppable.onDestroy.apply(this, arguments);
		var tableEl = this.tableEl;
		if (this.rendered) {
			tableEl.un("click", this.onTableElClick, this);
			tableEl.un("dblclick", this.onTableElDblClick, this);
			tableEl.un("mousemove", this.onMouseMove, this);
			tableEl.un("mousedown", this.onMouseDown, this);
			tableEl.un("mouseup", this.onMouseUp, this);
		}
		this.callParent(arguments);
	},

	/**
	 * Sets the number of rows.
	 * @param {Number} value The number of rows.
	 */
	setRows: function(value) {
		if (value && this.rows !== value) {
			this.rows = parseInt(value, 10);
			this.fireEvent("rowsChanged", this.rows);
			this.safeRerender();
		}
	},

	/**
	 * Sets allow items intersection.
	 * @param {Boolean}
	 */
	setAllowItemsIntersection: function(value) {
		this.allowItemsIntersection = Boolean(value);
	},

	/**
	 * Adds a row.
	 */
	addRow: function() {
		this.setRows(this.rows + 1);
	},

	/**
	 * Removes a row.
	 */
	removeRow: function() {
		this.setRows(this.rows - 1);
	},

	/**
	 * Sets the number of columns.
	 * @param {Number} value The number of columns.
	 */
	setColumns: function(value) {
		if (value && this.columns !== value) {
			this.columns = parseInt(value, 10);
			this.fireEvent("columnsChanged", this.columns);
			this.safeRerender();
		}
	},

	/**
	 * Adds a column.
	 */
	addColumn: function() {
		this.setColumns(this.columns + 1);
	},

	/**
	 * Removes a column.
	 */
	removeColumn: function() {
		this.setColumns(this.columns - 1);
	},

	/**
	 * Changes the position of the grid elements relative to the position of another element.
	 * @param {Terrasoft.GridLayoutEditItem} targetItem Grid item, in relation to which positions of the other
	 * items are specified.
	 */
	changeItemsPositions: function(targetItem) {
		var targetItemNewRow = targetItem.row;
		var targetItemOldRow = targetItem.oldPosition.row;
		var items = this.gridLayoutEditItemsCollection.getItems();
		Terrasoft.each(items, function(item) {
			if (item.id !== targetItem.id) {
				var itemRow = item.row;
				if (itemRow > targetItemOldRow && (itemRow - 1) >= targetItemOldRow &&
					itemRow <= targetItemNewRow) {
					item.setRow(itemRow - 1, true);
				} else if (itemRow < targetItemOldRow && (itemRow + 1) <= targetItemOldRow &&
					itemRow >= targetItemNewRow) {
					item.setRow(itemRow + 1, true);
				}
				this.showItem(item);
			}
		}, this);
	},

	/**
	 * Updates the grid sizes relative to the elements.
	 * @param {Terrasoft.GridLayoutEditItem} item Grid item.
	 * @param {Boolean} skipIntersection Indicates to skip checking if the intersection of mesh objects.
	 */
	updateSize: function(item, skipIntersection) {
		var updated = false;
		if (!this.allowItemsIntersection && !skipIntersection && item && this.isItemIntersected(item)) {
			if (this.columns === 1 && this.changePositionForIntersectedItems) {
				this.changeItemsPositions(item);
			} else {
				item.revertPositionChanges();
			}
			this.showItem(item);
		} else {
			var heightUpdated = this.updateHeight();
			var widthUpdated = this.updateWidth();
			if ((heightUpdated || widthUpdated) && this.allowRerender()) {
				updated = true;
				this.reRender();
			} else {
				if (item && !item.destroyed) {
					this.showItem(item);
				}
			}
		}
		return updated;
	},

	/**
	 * Sets the item id of selected element.
	 * @param {String} selectedItemId Item id of selected element..
	 * @param {Boolean} ctrlKeyPressed Indicates of the button CTRL pressed.
	 */
	selectItem: function(selectedItemId, ctrlKeyPressed) {
		if (this.multipleSelection && ctrlKeyPressed) {
			this.selectedItems = Terrasoft.deepClone(this.selectedItems);
			this.selectedItems.push(selectedItemId);
		} else {
			var selectedItems = this.gridLayoutEditItemsCollection.filterByFn(function(item) {
				return item.selected && item.itemId !== selectedItemId;
			}, this);
			selectedItems.each(function(item) {
				item.setSelected(false);
			}, this);
			this.selectedItems = (selectedItemId) ? [selectedItemId] : [];
		}
		this.fireEvent("selectedItemsChange", this.selectedItems, this);
	}

	//endregion

});
