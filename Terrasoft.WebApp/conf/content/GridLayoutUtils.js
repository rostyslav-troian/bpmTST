Terrasoft.configuration.Structures["GridLayoutUtils"] = {innerHierarchyStack: ["GridLayoutUtils"]};
define("GridLayoutUtils", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	Ext.define("Terrasoft.configuration.GridLayoutUtils", {
		alternateClassName: "Terrasoft.GridLayoutUtils",
		singleton: true,

		//region Properties: Private

		/**
		 * Grid layout max grid row number.
		 * @private
		 * @type {Number}
		 */
		maxGridLayoutRow: 0,

		//endregion

		//region Properties: Protected

		/**
		 * Grid layout max columns count.
		 * @protected
		 * @type {Number}
		 */
		maxColumnsCount: 24,

		/**
		 * Default item layout.
		 * @protected
		 * @type {Object}
		 */
		defaultItemLayout: {
			colSpan: 0,
			row: 0,
			column: 0,
			rowSpan: 0
		},

		/**
		 * Default rowSpan value.
		 * @protected
		 * @type {Number}
		 */
		defaultRowSpan: 1,

		/**
		 * Default colSpan value.
		 * @protected
		 * @type {Number}
		 */
		defaultColSpan: 12,

		//endregion

		//region Methods: Private

		/**
		 * Searches items layout bitmap intersections.
		 * @private
		 * @param {Array} firstBitmap First item bitmap.
		 * @param {Array} secondBitmap Second item bitmap.
		 * @return {Boolean} Bitmap intersection.
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
		 * Calculates item row layout bitmap.
		 * @private
		 * @param {Number} itemColumn Item start column index.
		 * @param {Number} itemWidth Item columns count.
		 * @param {Number} totalColumnsCount Grid layout columns count.
		 * @return {Number} Item row layout bitmap.
		 */
		calculateBitMask: function(itemColumn, itemWidth, totalColumnsCount) {
			var columnOffset = totalColumnsCount - itemColumn;
			return (Math.pow(2, columnOffset) - 1) - (Math.pow(2, columnOffset - itemWidth) - 1);
		},

		/**
		 * Generates item layout bitmap.
		 * @private
		 * @param {Object} item Grid element layout config.
		 * @param {Number} columnsCount Grid layout columns count.
		 * @return {Array} Item layout bitmap.
		 */
		getItemBitmap: function(item, columnsCount) {
			var itemBitmap = [];
			if (Ext.isEmpty(item)) {
				return itemBitmap;
			}
			var itemColumn = item.column;
			var itemRow = item.row;
			var itemColSpan = item.colSpan || this.defaultColSpan;
			var itemRowSpan = item.rowSpan || this.defaultRowSpan;
			for (var i = itemRow, ln = itemRow + itemRowSpan; i < ln; i++) {
				var bitMask = this.calculateBitMask(itemColumn, itemColSpan, columnsCount);
				itemBitmap[i] = bitMask;
			}
			return itemBitmap;
		},

		/**
		 * Sets default values to layout property if it is not defined.
		 * @param {Object} layout1 First layout.
		 * @param {Object} layout2 Second layout.
		 * @param {String} propertyName Property name.
		 * @param {Number} defaultValue Default value.
		 */
		_setDefaultValue: function(layout1, layout2, propertyName, defaultValue) {
			if (!layout1[propertyName]) {
				layout1[propertyName] = defaultValue;
			}
			if (!layout2[propertyName]) {
				layout2[propertyName] = defaultValue;
			}
		},

		//endregion

		//region Methods: Protected

		/**
		 * Tries to fix item intersection.
		 * @protected
		 * @param {Object} intersectItem Item, that intersects config.
		 * @param {Object} item Item, that intersected config.
		 * @return {Object} Fixed item.
		 */
		fixItemIntersect: function(intersectItem, item) {
			var itemToFixLayout = intersectItem.layout;
			var layout = item.layout;
			var fixColumnResult = this.tryFixColumns(itemToFixLayout, layout);
			var fixRowsResult = true;
			if (!fixColumnResult) {
				fixRowsResult = this.tryFixRows(itemToFixLayout, layout);
			}
			if (!fixColumnResult && !fixRowsResult && itemToFixLayout.row >= this.maxGridLayoutRow) {
				this.maxGridLayoutRow = this.maxGridLayoutRow + 1;
			}
			if (!fixColumnResult && !fixRowsResult) {
				itemToFixLayout.row = this.maxGridLayoutRow;
			}
			return intersectItem;
		},

		/**
		 * Tries to fix item columns intersection.
		 * @protected
		 * @param {Object} intersectLayout Item, that intersects layout.
		 * @param {Object} layout Item, that intersected layout.
		 * @return {Object} Fixed item layout.
		 */
		tryFixColumns: function(intersectLayout, layout) {
			this._setDefaultValue(intersectLayout, layout, "colSpan", this.defaultColSpan);
			return this.calculateNewParameters(intersectLayout, layout, "column", "colSpan");
		},

		/**
		 * Tries to fix item rows intersection.
		 * @protected
		 * @param {Object} intersectLayout Item, that intersects layout.
		 * @param {Object} layout Item, that intersected layout.
		 * @return {Object} Fixed item layout.
		 */
		tryFixRows: function(intersectLayout, layout) {
			this._setDefaultValue(intersectLayout, layout, "rowSpan", this.defaultRowSpan);
			return this.calculateNewParameters(intersectLayout, layout, "row", "rowSpan");
		},

		/**
		 * Tries to fix item parameters intersection.
		 * @protected
		 * @param {Object} intersectLayout Item, that intersects layout.
		 * @param {Object} layout Item, that intersected layout.
		 * @param {String} paramName Item dimension parameter name.
		 * @param {String} spanParamName Item span dimension parameter name.
		 * @return {Object} Fixed item layout.
		 */
		calculateNewParameters: function(intersectLayout, layout, paramName, spanParamName) {
			var fixItemLength = intersectLayout[spanParamName];
			var itemLength = layout[spanParamName];
			var itemStart = layout[paramName];
			var itemEnd = itemStart + itemLength;
			var fixItemStart = intersectLayout[paramName];
			var fixItemEnd = fixItemStart + fixItemLength;
			var itemPositionLeft = itemStart <= fixItemStart;
			var rowIntersectionLength = itemPositionLeft
				? itemEnd - fixItemStart
				: fixItemEnd - itemStart;
			if (fixItemLength <= rowIntersectionLength) {
				return false;
			}
			if (itemPositionLeft) {
				intersectLayout[paramName] = itemEnd;
			}
			intersectLayout[spanParamName] = fixItemLength - rowIntersectionLength;
			return true;
		},

		/**
		 * Compares two items positions, returns true if first item position is on the right or lower than second item.
		 * @protected
		 * @param {Object} item1 First item parameters.
		 * @param {Object} item2 Second item Parameters.
		 * @return {Boolean} Comparison result.
		 */
		compareItemsPositions: function(item1, item2) {
			var item1Layout = item1.layout || Terrasoft.deepClone(this.defaultItemLayout);
			var item2Layout = item2.layout || Terrasoft.deepClone(this.defaultItemLayout);
			var item1Length = Math.max(item1Layout.colSpan || this.defaultColSpan, item1Layout.rowSpan || this.defaultRowSpan);
			var item2Length = Math.max(item2Layout.colSpan || this.defaultColSpan, item2Layout.rowSpan || this.defaultRowSpan);
			if (item1Layout.row !== item2Layout.row) {
				return (item1Layout.row < item2Layout.row) ? -1 : 1;
			}
			return (item1Length < item2Length) || ((item1Layout.column < item2Layout.column) &&
			(item1Length <= item2Length)) ? -1 : 1;
		},

		//endregion

		//region Methods: Public

		/**
		 * Searches all grid layout items intersections and tries to fix them.
		 * @param {Object[]} items Grid layout items configs.
		 * @param {Number} [columnsCount] Grid layout max columns count.
		 * @return {Object[]} Fixed grid layout items.
		 */
		fixItemsIntersections: function(items, columnsCount) {
			var solvedItems = [];
			var maxColumnsCount = this.maxColumnsCount || columnsCount;
			var itemsRow = items.map(function(layoutItem) {
				return layoutItem.layout && layoutItem.layout.row || 0;
			});
			this.maxGridLayoutRow = Ext.Array.max(itemsRow) || 0;
			var sortedItems = Ext.Array.sort(items, this.compareItemsPositions.bind(this));
			Terrasoft.each(sortedItems, function(item) {
				var itemBitmap = this.getItemBitmap(item.layout, maxColumnsCount);
				Terrasoft.each(solvedItems, function(currentSolvedItem) {
					var solvedItemBitmap = this.getItemBitmap(currentSolvedItem.layout, maxColumnsCount);
					if (this.checkBitmapIntersection(solvedItemBitmap, itemBitmap)) {
						item = this.fixItemIntersect(item, currentSolvedItem);
						itemBitmap = this.getItemBitmap(item.layout, maxColumnsCount);
					}
				}, this);
				solvedItems.push(item);
			}, this);
			return solvedItems;
		}

		//endregion

	});

	return Terrasoft.GridLayoutUtils;
});


