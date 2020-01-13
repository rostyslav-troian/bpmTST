Terrasoft.configuration.Structures["MobileDashboardUtils"] = {innerHierarchyStack: ["MobileDashboardUtils"]};
/**
 * @class Terrasoft.configuration.DashboardUtils
 * Dashboard utilities.
 */
Ext.define("Terrasoft.configuration.DashboardUtils", {
	alternateClassName: "Terrasoft.DashboardUtils",
	singleton: true,

	/**
	 * @property {String} Dashboard view generator class name.
	 */
	DashboardViewGeneratorClassName: "Terrasoft.configuration.DashboardViewGenerator",

	/**
	 * @private
	 */
	shouldLayoutItemFillWholeRow: function(layoutItem, columnsCount) {
		if (layoutItem && layoutItem.halfRow === true) {
			return layoutItem.colSpan > (columnsCount / 2);
		} else {
			return true;
		}
	},

	/**
	 * @private
	 */
	convertGridLookupColumn: function(value, modelName) {
		if (!value.value) {
			return null;
		}
		return Terrasoft.Grid.generateRecordLink(modelName, value.value, value.displayValue);
	},

	/**
	 * Gets class name of widget.
	 * @param {Terrasoft.DashboardItemWidgetType} type Widget type.
	 * @returns {String} Class name of widget.
	 */
	getCustomWidgetClassName: function(type) {
		var customClassName = Terrasoft.DashboardItemClassName[type];
		if (customClassName && Ext.ClassManager.get(customClassName) !== null) {
			return customClassName;
		}
		return null;
	},

	/**
	 * Checks if widget type is supported.
	 * @param {Terrasoft.DashboardItemWidgetType} type Widget type.
	 * @returns {Boolean} True, if widget type is supported.
	 */
	getIsSupported: function(type) {
		return Terrasoft.DashboardItemWidgetType[type] || this.getCustomWidgetClassName(type) !== null;
	},

	/**
	 * Sorts grid layout items by rows and columns.
	 * @param {Object[]} layoutItems Grid layout items configs.
	 * @returns {Object[]} Grid layout items configs.
	 */
	sortGridLayoutItems: function(layoutItems) {
		layoutItems.sort(function(itemA, itemB) {
			itemA.row = Ext.isNumber(itemA.row) ? itemA.row : 0;
			itemA.column = Ext.isNumber(itemA.column) ? itemA.column : 0;
			itemB.row = Ext.isNumber(itemB.row) ? itemB.row : 0;
			itemB.column = Ext.isNumber(itemB.column) ? itemB.column : 0;
			if (itemA.row > itemB.row) {
				return 1;
			} else  if (itemA.row < itemB.row) {
				return -1;
			} else {
				return itemA.column - itemB.column;
			}
		});
	},

	/**
	 * Adapts grid layout config into phone layout. Indicator dashboard item may have 50% of width, others only 100%.
	 * @param {Object[]} layoutItems Grid layout items config.
	 * @param {Number} columnsCount Number of columns in the layout
	 * @returns {Object[]} Grid layout items config.
	 */
	adaptGridLayoutIntoPhoneLayout: function(layoutItems, columnsCount) {
		if (!Ext.isArray(layoutItems)) {
			return layoutItems;
		}
		var row = 0;
		for (var i = 0, ln = layoutItems.length; i < ln; i++) {
			var layoutItem = layoutItems[i];
			var nextLayoutItem = layoutItems[i + 1];
			if (this.shouldLayoutItemFillWholeRow(layoutItem, columnsCount) ||
				this.shouldLayoutItemFillWholeRow(nextLayoutItem, columnsCount)) {
				layoutItem.row = row;
				layoutItem.colSpan = columnsCount;
				row++;
			} else {
				layoutItem.row = nextLayoutItem.row = row;
				layoutItem.colSpan = nextLayoutItem.colSpan = columnsCount / 2;
				nextLayoutItem.rowSpan = 1;
				nextLayoutItem.column = columnsCount / 2;
				row++;
				i++;
			}
			layoutItem.rowSpan = 1;
			layoutItem.column = 0;
		}
		return layoutItems;
	},

	/**
	 * Return configuration of columns for grid.
	 * @param {Object} config Configuration object:
	 * @param {String} config.modelName Name of model.
	 * @param {String} config.columnName Name of column.
	 * @param {String} config.caption Caption of column.
	 * @param {Number} config.cols Number of grid cols.
	 * @param {Terrasoft.DataValueType} config.dataValueType Data value type.
	 * @param {String} config.columnModelName Name of model of lookup column.
	 * @return {Object} Configuration of columns for grid.
	 */
	getGridColumnConfig: function(config) {
		var model =  Ext.ModelManager.getModel(config.modelName);
		var primaryColumnName;
		var displayColumnName;
		if (model) {
			primaryColumnName = model.PrimaryColumnName;
			displayColumnName = model.PrimaryDisplayColumnName;
		} else {
			primaryColumnName = Terrasoft.BaseModel.getIdProperty();
			displayColumnName = null;
		}
		var gridColumnConfig = {
			name: config.columnName,
			caption: config.caption,
			cols: config.cols
		};
		if (config.columnName === displayColumnName) {
			gridColumnConfig.convert = function(value, values) {
				if (values[primaryColumnName]) {
					return Terrasoft.Grid.generateRecordLink(config.modelName, values[primaryColumnName], value);
				} else {
					return value;
				}
			};
		} else {
			if (config.dataValueType === Terrasoft.DataValueType.Lookup) {
				gridColumnConfig.convert = function(value) {
					return this.convertGridLookupColumn(value, config.columnModelName);
				}.bind(this);
			}
		}
		return gridColumnConfig;
	},

	/**
	 * Returns css class name by widget type.
	 * @param {Terrasoft.DashboardStyle} style Dashboard style.
	 * @return {String} Css class.
	 */
	getClassNameByStyle: function(style) {
		return "cf-dashboard-item-" + style;
	},

	/**
	 * Creates instance of dashboard view generator.
	 * @param {Object} config Constructor config.
	 * @return {DashboardViewGeneratorClassName} Instance.
	 */
	getDashboardViewGeneratorInstance: function(config) {
		return Ext.create(this.DashboardViewGeneratorClassName, config);
	}

});


