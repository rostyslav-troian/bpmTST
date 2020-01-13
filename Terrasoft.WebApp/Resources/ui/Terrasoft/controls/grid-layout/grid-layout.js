/**
 * Control element which allows to have the children on the grid.
 *
 * Example:
 *        Ext.create("Terrasoft.GridLayout", {
 *			id: "grid-layout-0",
 *			selectors: {
 *				wrapEl: "#grid-layout-0"
 *			},
 *			items: [{
 *				row: 0, // row number from top to bottom; indication from 0; important
 *				rowSpan: 1, // number of combined rows; default value is 1; unimportant
 *				column: 0, // column number from left to right; indication from 0; important
 *				colSpan: 12, // number of combined columns; default and minimum value is 1, maximum is 24; unimportant
 *				item: {<item config>} // control element configuration
 *			}, {
 *				row: 0,
 *				rowSpan: 1,
 *				column: 12,
 *				colSpan: 12,
 *				item: {<item config>}
 *			}]
 *		});
 */
Ext.define("Terrasoft.controls.GridLayout", {
	extend: "Terrasoft.controls.Container",
	alternateClassName: "Terrasoft.GridLayout",

	//region Properties: Protected

	/**
	 * Control items configuration into the grid.
	 * @protected
	 * @property {Object} layoutItems
	 * @property {Object} layoutItems.row Row number.
	 * @property {Object} layoutItems.row.column Column number.
	 * @property {Object} layoutItems.row.column.layoutItem Layout object.
	 * @property {Number} layoutItems.row.column.layoutItem.row Row number.
	 * @property {Number} layoutItems.row.column.layoutItem.rowSpan Number of combined rows.
	 * @property {Number} layoutItems.row.column.layoutItem.column Column number.
	 * @property {Number} layoutItems.row.column.layoutItem.colSpan Number of combined columns.
	 * @property {String} layoutItems.row.column.layoutItem.itemId Item id in the current position.
	 * @property {String} layoutItems.row.column.layoutItem.useFixedColumnHeight
	 * Flag that indicates use fixed column height.
	 */
	layoutItems: null,

	/**
	 * Maximum number of rows in the layout.
	 * @protected
	 * @type {Number}
	 */
	maxRowsCount: 0,

	/**
	 * Maximum number of columns in the layout.
	 * @protected
	 * @type {Number}
	 */
	maxColumnsCount: 24,

	/**
	 * Number of columns with equal width. Can be used for easy count. For example,
	 * if layout has two columns with the same width, and sets the "equalColumnsCount" equal to 2,
	 * all widths and column numbers can be specified relative to 2 columns in the layout.
	 *
	 * Sets the "equalColumnsCount" equal to 2, two columns with the same width in the layout:
	 *        Ext.create("Terrasoft.GridLayout", {
	 *			id: "grid-layout-0",
	 *			selectors: {
	 *				wrapEl: "#grid-layout-0"
	 *			},
	 *			equalColumnsCount: 2,
	 *			items: [{
	 *				row: 0,
	 *				rowSpan: 1,
	 *				column: 0, // indication from 0
	 *				colSpan: 1, // width can be set as a one column
	 *				item: {<item config>}
	 *			}, {
	 *				row: 0,
	 *				rowSpan: 1,
	 *				column: 1, // second column position
	 *				colSpan: 1,
	 *				item: {<item config>}
	 *			}]
	 *		});
	 * @property {Number} equalColumnsCount
	 */
	equalColumnsCount: 24,

	/**
	 * Column width multiplier. Uses for count of column width based on the
	 * {@link Terrasoft.GridLayout#equalColumnsCount}.
	 * @protected
	 * @type {Number}
	 */
	columnsMultiplier: 1,

	/**
	 * Minimum row height. If cell has combine rows, as a result height will be multiplied by the number of
	 * combined rows. As a result minimum cell height must starts from the minimum value.
	 * @property {String} rowHeight
	 */
	rowHeight: "0px",

	/**
	 * Fixed column height.
	 * @protected
	 * @type {Number}
	 */
	fixedColumnHeight: 32,

	/**
	 * Fixed column height css class.
	 * @protected
	 * @type {String}
	 */
	fixedColumnHeightCssClass: "fixed-col-height",

	/**
	 * CSS class for a standard spacing between rows. Added for empty rows in the layout.
	 * @protected
	 * @type {String}
	 */
	spacerCssClass: "grid-layout-spacer",

	/**
	 * Suffix before the control item identifier in the layout.
	 * @protected
	 * @type {String}
	 */
	itemDomIdSuffix: "-item-",

	/**
	 * Tag if empty row collapsible.
	 * @protected
	 * @type {Boolean}
	 */
	collapseEmptyRow: false,

	/**
	 * Tag if grid layout is in view mode.
	 * Disables child elements.
	 * @protected
	 * @type {Boolean}
	 */
	isViewMode: false,

	/**
	 * Error message template of cells intersection.
	 * @protected
	 * @type {String}
	 */
	cellsIntersectionErrorMessageTemplate: Terrasoft.Resources.GridLayout.ColumnsWidthIntersected,

	/**
	 * Row class template.
	 * @protected
	 * @type {String}
	 */
	rowClassTemplate: "grid-layout-row ts-box-sizing {rowClassName}",

	/**
	 * Column class template.
	 * @protected
	 * @type {String}
	 */
	columnClassTemplate: "grid-layout-column ts-box-sizing {columnClassName}",

	/**
	 * Flag that indicates whether grid allow items overlap. If true, the intersecting items are moved to free rows.
	 * @type {Boolean}
	 */
	allowOverlap: false,

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_checkLayoutItem: function(layoutItem) {
		if (!layoutItem.hasOwnProperty("item") || Ext.isEmpty(layoutItem.item)) {
			var messageTemplate = Terrasoft.Resources.GridLayout.ItemConfigIsEmpty;
			var errorMessage = Terrasoft.getFormattedString(
				messageTemplate,
				this.id,
				layoutItem.row.toString(),
				layoutItem.column.toString()
			);
			throw new Terrasoft.NullOrEmptyException({
				message: errorMessage
			});
		}
	},

	/**
	 * @private
	 */
	_preparePosition: function(layoutItem) {
		var layoutItemList = this.getLayoutItemList();
		var intersects = _.filter(layoutItemList, function(item) {
			return this.isIntersect(item, layoutItem);
		}, this);
		if (_.isEmpty(intersects)) {
			return;
		}
		var lowestIntersect = _.max(intersects, function(item) {
			return item.row + (item.rowSpan || 1);
		});
		layoutItem.row = lowestIntersect.row + lowestIntersect.rowSpan;
		var newItems = {};
		var items = this.layoutItems;
		var rows = _.keys(items).reverse();
		rows.forEach(function(row) {
			row = Number(row);
			if (row >= layoutItem.row) {
				var nextRow = row + layoutItem.rowSpan + 1;
				newItems[nextRow] = {};
				const columns = _.keys(items[row]);
				columns.forEach(function(column) {
					newItems[nextRow][column] = items[row][column];
					newItems[nextRow][column].row = nextRow;
				}, this);
			} else {
				newItems[row] = items[row];
			}
		}, this);
		this.layoutItems = newItems;
	},

	/**
	 * Separates layout configuration away from the control items configuration; If layout item not contains
	 * control item configuration will be thrown the exception.
	 * @private
	 * @param {Object} config Layout item config.
	 * @return {Array} Array of control items configuration {@link Terrasoft.AbstractContainer#items}
	 */
	separateItemsFromLayout: function(config) {
		var items = [];
		var multiplier = this.columnsMultiplier;
		Terrasoft.each(config, function(layoutItem) {
			this._checkLayoutItem(layoutItem);
			items.push(layoutItem.item);
			layoutItem.itemId = layoutItem.item.id;
			delete layoutItem.item;
			layoutItem.rowSpan = layoutItem.rowSpan || 1;
			layoutItem.colSpan = layoutItem.colSpan || 1;
			layoutItem.column = multiplier * layoutItem.column;
			layoutItem.colSpan = multiplier * layoutItem.colSpan;
			if (this.allowOverlap) {
				this._preparePosition(layoutItem);
			}
			this.addLayoutItem(layoutItem);
		}, this);
		return items;
	},

	/**
	 * Returns layout item list.
	 * @private
	 * @return {Array} Layout item list.
	 */
	getLayoutItemList: function() {
		var layoutItems = Ext.Object.getValues(this.layoutItems);
		var layoutItemsValues = Ext.Array.map(layoutItems, function(layoutItem) {
			return Ext.Object.getValues(layoutItem);
		});
		return layoutItemsValues.length === 0 ? [] : layoutItemsValues.reduce(function(previousValue, currentValue) {
			return previousValue.concat(currentValue);
		});
	},

	/**
	 * Performs generation of row object for {@link Ext.DomHelper}.
	 * @private
	 * @param {Object} options Value range for the generation.
	 * @param {Number} options.minRow Minimum row number value.
	 * @param {Number} options.maxRow Maximum row number value.
	 * @param {Number} options.minColumn Minimum column number value.
	 * @param {Number} options.maxColumn Maximum column number value.
	 * @param {Boolean} options.withoutChildrens Necessity of row object generation without layout at this
	 * stage of the recursion.
	 * @return {Object[]} Object for {@link Ext.DomHelper}
	 */
	generateRow: function(options) {
		var rows = [];
		for (var currentRow = options.minRow; currentRow < options.maxRow; currentRow++) {
			var row = null;
			for (var currentColumn = options.minColumn; currentColumn < options.maxColumn; currentColumn++) {
				var layoutItem = this.getLayoutItem({
					row: currentRow,
					column: currentColumn
				});
				if (layoutItem) {
					var newMaxRow = currentRow + layoutItem.rowSpan;
					var rowHeight = this.calculateRowHeight({
						minRow: currentRow,
						maxRow: newMaxRow,
						minColumn: options.minColumn,
						maxColumn: options.maxColumn
					});
					row = this.getRowHtmlConfig();
					if (!options.withoutChildrens) {
						row.children = this.generateColumn({
							minRow: currentRow,
							maxRow: currentRow + rowHeight,
							minColumn: options.minColumn,
							maxColumn: options.maxColumn
						});
					}
					currentRow += rowHeight - 1;
					break;
				}
			}
			if (!row) {
				row = this.getRowHtmlConfig();
				row.children = [this.getSpacerHtmlConfig()];
				rows.push(row);
			} else {
				rows.push(row);
			}
		}
		return rows;
	},

	/**
	 * Sets column style.
	 * @private
	 * @param {Number} rowHeightDigits Row height digits.
	 * @param {Object} column Object configuration of column {@link Ext.DomHelper}.
	 * @param {String} rowHeightUnits Row height units.
	 * @param {Object} layoutItem Element config of number row and column.
	 */
	_setColumnStyle: function(rowHeightDigits, column, rowHeightUnits, layoutItem) {
		if (!column.hasOwnProperty("style")) {
			column.style = {};
		}
		var rowspan = layoutItem && layoutItem.rowSpan || column["data-rowspan"];
		if (rowHeightDigits > 0) {
			column.style.height = (rowspan * rowHeightDigits) + rowHeightUnits;
		}
		if (layoutItem && layoutItem.useFixedColumnHeight) {
			column.style.height = (rowspan * this.fixedColumnHeight) + rowHeightUnits;
			column.cls += this.fixedColumnHeightCssClass;
		}
	},

	/**
	 * Returns object configuration of column {@link Ext.DomHelper} with default config.
	 * @private
	 * @param {Object} column Object configuration of column {@link Ext.DomHelper}.
	 * @param {Number} rowHeightDigits Row height digits.
	 * @param {String} rowHeightUnits Row height units.
	 * @return {Object} Object configuration of column {@link Ext.DomHelper}.
	 */
	_getDefaultColumnConfig: function(column, rowHeightDigits, rowHeightUnits) {
		column = this.getColumnHtmlConfig(1, 1);
		column.children = [this.getSpacerHtmlConfig()];
		this._setColumnStyle(rowHeightDigits, column, rowHeightUnits);
		return column;
	},

	/**
	 * Counts cell width for range of columns and rows.
	 * @private
	 * @param {Object} options Values range where will be calculated cell width.
	 * @param {Number} options.minRow Minimum row number value.
	 * @param {Number} options.maxRow Maximum row number value.
	 * @param {Number} options.minColumn Minimum column number value.
	 * @param {Number} options.maxColumn Maximum column number value.
	 * @return {Number} Column width.
	 */

	/**
	 * Returns values range where will be calculated cell width.
	 * @private
	 * @param {Object} options Value range for the generation.
	 * @param {Number} currentColumn Current column number value.
	 * @param {Number} addMaxColumnCount Additional column count.
	 * @return {Object} Values range where will be calculated cell width.
	 */
	_getValueRangeConfig: function(options, currentColumn, addMaxColumnCount) {
		return {
			minRow: options.minRow,
			maxRow: options.maxRow,
			minColumn: currentColumn,
			maxColumn: currentColumn + addMaxColumnCount
		};
	},

	/**
	 * Performs generation of column object for {@link Ext.DomHelper}
	 * @private
	 * @param {Object} options Value range for the generation.
	 * @param {Number} options.minRow Minimum row number value.
	 * @param {Number} options.maxRow Maximum row number value.
	 * @param {Number} options.minColumn Minimum column number value.
	 * @param {Number} options.maxColumn Maximum column number value.
	 * @return {Object[]} Object for {@link Ext.DomHelper}
	 */
	generateColumn: function(options) {
		var columns = [];
		var rowHeightDigits = parseInt(this.rowHeight, 10);
		var rowHeightUnits = this.rowHeight.replace(rowHeightDigits, "");
		for (var currentColumn = options.minColumn; currentColumn < options.maxColumn; currentColumn++) {
			var column = null;
			for (var currentRow = options.minRow; currentRow < options.maxRow; currentRow++) {
				var layoutItem = this.getLayoutItem({
					row: currentRow,
					column: currentColumn
				});
				if (layoutItem) {
					var rangeConfig = this._getValueRangeConfig(options, currentColumn, layoutItem.colSpan);
					var columnWidth = this.getColumnWidth(rangeConfig);
					var generateRowConfig = this._getValueRangeConfig(options, currentColumn, columnWidth);
					var rowConfig = Ext.apply(Terrasoft.deepClone(generateRowConfig), {withoutChildrens: true});
					var rows = this.generateRow(rowConfig);
					var useFullWidth = (rows.length === 1) && (options.maxColumn - options.minColumn === columnWidth);
					var width = useFullWidth ? this.maxColumnsCount : columnWidth;
					column = this.getColumnHtmlConfig(width, layoutItem.rowSpan);
					if (rows.length > 1) {
						column.children = this.generateRow(generateRowConfig);
					} else {
						column.html = this.getLayoutItemHtmlConfig(layoutItem);
						column.cls += " {itemCell}";
						column["data-column"] = layoutItem.column;
						column["data-row"] = layoutItem.row;
						this._setColumnStyle(rowHeightDigits, column, rowHeightUnits, layoutItem);
						if (layoutItem && layoutItem.hasOwnProperty("itemId") && layoutItem.itemId) {
							column.id = this.id + this.itemDomIdSuffix + layoutItem.itemId;
						}
					}
					currentColumn += columnWidth - 1;
					break;
				}
			}
			if (column) {
				columns.push(column);
			} else {
				columns.push(this._getDefaultColumnConfig(column, rowHeightDigits, rowHeightUnits));
			}
		}
		columns = this.postProcessColumns(columns);
		return columns;
	},

	/**
	 * Counts cell width for range of columns and rows.
	 * @private
	 * @param {Object} options Values range where will be calculated cell width.
	 * @param {Number} options.minRow Minimum row number value.
	 * @param {Number} options.maxRow Maximum row number value.
	 * @param {Number} options.minColumn Minimum column number value.
	 * @param {Number} options.maxColumn Maximum column number value.
	 * @return {Number} Column width.
	 */
	getColumnWidth: function(options) {
		var width = options.maxColumn - options.minColumn;
		var resetRowsRange = false;
		for (var currentRow = options.minRow; currentRow < options.maxRow; currentRow++) {
			for (var currentColumn = options.minColumn; currentColumn < options.maxColumn; currentColumn++) {
				var element = this.getLayoutItem({
					row: currentRow,
					column: currentColumn
				});
				if (element) {
					var colSpan = element.colSpan;
					if (currentColumn + colSpan > options.maxColumn) {
						options.maxColumn = currentColumn + colSpan;
						width = options.maxColumn - options.minColumn;
						resetRowsRange = true;
					}
				}
			}
			if (resetRowsRange === true) {
				currentRow = options.minRow - 1;
				resetRowsRange = false;
			}
		}
		return width;
	},

	/**
	 * Calculates the width in the percentage relatively width in the columns. Calculates the sum of all cell widths
	 * in a row and it is taken as 100%; then each cell receives percentage value of its share in the columns.
	 * @private
	 * @param {Object[]} columns Array of columns object.
	 * @return {Object[]} columns Column object array with specified width in percentage.
	 */
	postProcessColumns: function(columns) {
		var columnsSum = 0;
		Ext.Array.each(columns, function(column) {
			columnsSum += parseInt(column["data-colspan"], 10);
		}, this);
		Ext.Array.each(columns, function(column) {
			if (!column.hasOwnProperty("style")) {
				column.style = {};
			}
			column.style.width = ((column["data-colspan"] * 100) / columnsSum) + "%";
			column.style = Ext.DomHelper.generateStyles(column.style);
		}, this);
		return columns;
	},

	/**
	 * Returns element config of number row and column.
	 * @private
	 * @param {Object} options Layout item options.
	 * @param {Number} options.row Row number.
	 * @param {Number} options.column Column number.
	 * @return {Object/Null} Returns the markup object {@link Terrasoft.GridLayout#layoutItems}
	 * if object not find then returns null.
	 */
	getLayoutItem: function(options) {
		var row = options.row;
		var column = options.column;
		var layoutItem = this.layoutItems[row] && this.layoutItems[row][column];
		return layoutItem || null;
	},

	/**
	 * Calculates the number of rows of markings, which are combined in the range of rows and columns.
	 * @private
	 * @param {Object} options Range of values for which there is a calculation of height row.
	 * @param {Number} options.minRow Min value of number row.
	 * @param {Number} options.maxRow Max value of number row.
	 * @param {Number} options.minColumn Min value of number column.
	 * @param {Number} options.maxColumn Max value of number row.
	 * @return {Number} Calculated row height.
	 */
	calculateRowHeight: function(options) {
		var height = options.maxRow - options.minRow;
		for (var currentRow = options.minRow; currentRow < options.maxRow; currentRow++) {
			for (var currentColumn = options.minColumn; currentColumn < options.maxColumn; currentColumn++) {
				var layoutItem = this.getLayoutItem({
					row: currentRow,
					column: currentColumn
				});
				if (layoutItem) {
					var rowSpan = currentRow + (layoutItem.rowSpan);
					if (rowSpan > options.maxRow) {
						options.maxRow = rowSpan;
						height = options.maxRow - options.minRow;
					}
				}
			}
		}
		return height;
	},

	/**
	 * Returns the column object configuration {@link Ext.DomHelper}.
	 * @private
	 * @return {Object} Object for {@link Ext.DomHelper}.
	 * @return {String} return.tag Tag name.
	 * @return {String} return.cls Css classes.
	 * @return {Array} return.children An array of objects for attachments of child elements.
	 */
	getRowHtmlConfig: function() {
		return {
			tag: "div",
			cls: this.rowClassTemplate,
			children: []
		};
	},

	/**
	 * Returns object configuration of column {@link Ext.DomHelper}.
	 * @private
	 * @param {Number} columns Number of columns that cell combines.
	 * @param {Number} rows Number of rows that cell combines.
	 * @return {Object} Object for {@link Ext.DomHelper}.
	 * @return {String} return.tag Tag name.
	 * @return {String} return.cls Css classes.
	 * @return {String} data-colspan  Column width.
	 * @return {String} data-rowspan Row height.
	 * @return {Array} return.children An array of objects for attachments of child elements.
	 */
	getColumnHtmlConfig: function(columns, rows) {
		return {
			tag: "div",
			cls: this.columnClassTemplate,
			"data-colspan": columns,
			"data-rowspan": rows,
			children: []
		};
	},

	/**
	 * Returns the template for rendering an internal control.
	 * @private
	 * @param {Object} layoutItem One of the objects {@link Terrasoft.GridLayout#layoutItems}.
	 * @return {String} Layout item html config.
	 */
	getLayoutItemHtmlConfig: function(layoutItem) {
		var itemId = (layoutItem && layoutItem.hasOwnProperty("itemId")) ? layoutItem.itemId : "";
		return (!Ext.isEmpty(itemId)) ? "{%parent.renderItem(out, values, \"" + itemId + "\")%}" : "";
	},

	/**
	 * Returns an empty layout template row.
	 * @private
	 * @return {String} Space html config.
	 */
	getSpacerHtmlConfig: function() {
		return "<div class=\"grid-layout-columns " + this.spacerCssClass + " {spacerClassName}\" style=\"width:100%;\"></div>";
	},

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#init
	 * @override
	 */
	init: function() {
		this.layoutItems = this.layoutItems || {};
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		tplData.wrapClassName = this.getTplDataClasses();
		return tplData;
	},

	/**
	 * Returns grid layout classes.
	 * @protected
	 * @return {String[]} Classes for grid layout wrapper.
	 */
	getTplDataClasses: function() {
		var classes = ["grid-layout", "ts-box-sizing"];
		if (this.collapseEmptyRow) {
			classes.push("collapse-empty-row");
		}
		return classes;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#prepareItems
	 * @override
	 */
	prepareItems: function(items) {
		this.columnsMultiplier = this.maxColumnsCount / this.equalColumnsCount;
		items = this.separateItemsFromLayout(items);
		this.checkCellsIntersection();
		this.maxRowsCount = this.getRowsCount();
		return this.callParent([items]);
	},

	/**
	 * Calculates number of rows in configuration {@link Terrasoft.GridLayout#layoutItems}.
	 * @protected
	 * @return {Number} Max row number.
	 */
	getRowsCount: function() {
		var rowKeys = Ext.Object.getKeys(this.layoutItems);
		var rowIndexes = Ext.Array.map(rowKeys, function(rowKey) {
			return parseInt(rowKey, 10);
		});
		return Ext.Array.max(rowIndexes) + 1;
	},

	/**
	 * Adds layout item to layout item configuration {@link Terrasoft.GridLayout#layoutItems}.
	 * @protected
	 * @param {Object} layoutItem An item from array {@link Terrasoft.GridLayout#layoutItems}.
	 */
	addLayoutItem: function(layoutItem) {
		var row = layoutItem.row;
		var column = layoutItem.column;
		this.layoutItems[row] = this.layoutItems[row] || {};
		this.layoutItems[row][column] = layoutItem;
	},

	/**
	 * Checks whether the objects intersect.
	 * @protected
	 * @param {Object} item1Config Layout item configuration 1.
	 * @param {Object} item2Config Layout item configuration 2.
	 * @return {Boolean} If items intersect that then returns true, else returns false.
	 */
	isIntersect: function(item1Config, item2Config) {
		return item1Config.column < (item2Config.column + item2Config.colSpan) &&
			item2Config.column < (item1Config.column + item1Config.colSpan) &&
			item1Config.row < (item2Config.row + item2Config.rowSpan) &&
			item2Config.row < (item1Config.row + item1Config.rowSpan);
	},

	/**
	 * Handles cell intersection error.
	 * @protected
	 * @param {Object} item1Config Layout item configuration 1.
	 * @param {Object} item2Config Layout item configuration 2.
	 */
	handleCellsIntersectionError: function(item1Config, item2Config) {
		var errorMessage = Terrasoft.getFormattedString(this.cellsIntersectionErrorMessageTemplate,
			this.id, item1Config.itemId, item2Config.itemId);
		this.log(errorMessage, Terrasoft.LogMessageType.ERROR);
	},

	/**
	 * Checks layout items cell intersection. If intersection was found, displays message to console.
	 * @protected
	 */
	checkCellsIntersection: function() {
		var layoutItemList = this.getLayoutItemList();
		Ext.Array.sort(layoutItemList, function(item1, item2) {
			if (this.isIntersect(item1, item2)) {
				this.handleCellsIntersectionError(item1, item2);
			}
		}.bind(this));
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#renderItem
	 * @override
	 */
	renderItem: function(out, values, itemId) {
		var items = values.items;
		var item = items.getByKey(itemId);
		this.callParent([out, item]);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#renderItems
	 * @override
	 */
	renderItems: function(out, renderData) {
		var self = renderData.self;
		var htmlConfig = self.generateRow({
			minRow: 0,
			maxRow: self.maxRowsCount,
			minColumn: 0,
			maxColumn: self.maxColumnsCount
		});
		var template = Ext.DomHelper.markup(htmlConfig);
		template = new Ext.XTemplate(template);
		template.applyOut(renderData, out, self);
	},

	//endregion

	//region Methods: Public

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#getRenderToEl
	 * @override
	 */
	getRenderToEl: function(item) {
		var wrapEl = this.getWrapEl();
		if (!wrapEl) {
			return null;
		}
		var elementSelect = wrapEl.select("#" + this.id + this.itemDomIdSuffix + item.id);
		return elementSelect.first();
	}

	//endregion

});
