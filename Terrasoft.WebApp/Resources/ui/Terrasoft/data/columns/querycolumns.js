/**
 */
Ext.define("Terrasoft.data.columns.QueryColumns", {
	extend: "Terrasoft.ObjectCollection",
	alternateClassName: "Terrasoft.QueryColumns",

	/**
	 * Adds column {@link Terrasoft.EntityQueryColumn}. Creates column instance and adds to column collection.
	 * @param {String/Terrasoft.BaseQueryColumn} column Column path relative {@link #rootSchema}.
	 * Or instance of query column {@Link Terrasoft.BaseQueryColumn}.
	 * @param {String} [columnAlias] Column alias.
	 * @param {Object} [config] Entity query column initial config.
	 * @throws {Terrasoft.ArgumentNullOrEmptyException} If first argument is {@Link Terrasoft.BaseQueryColumn},
	 * then argument columnAlias becomes required.
	 * @return {Terrasoft.EntityQueryColumn} Returns instance of added column.
	 */
	addColumn: function(column, columnAlias, config) {
		var newColumn;
		if (Ext.isString(column)) {
			var itemConfig = {
				columnPath: column,
				parentCollection: this
			};
			if (Ext.isObject(config)) {
				Ext.apply(itemConfig, config);
			}
			newColumn = Ext.create("Terrasoft.EntityQueryColumn", itemConfig);
			columnAlias = columnAlias || column;
		} else {
			newColumn = column;
			if (Ext.isEmpty(columnAlias)) {
				throw new Terrasoft.ArgumentNullOrEmptyException({argumentName: columnAlias});
			}
		}
		this.addIfNotExists(columnAlias, newColumn);
		return newColumn;
	},

	/**
	 * Add a function column {@link Terrasoft.FunctionQueryColumn}. An instance of the column is created and
	 * is added to the column collection.
	 * @param {String} columnPath The column path to add. The path is relative to {@link #rootSchema}.
	 * @param {Terrasoft.FunctionType} functionType Type of function.
	 * @param {String} columnAlias (optional) The column alias.
	 * @return {Terrasoft.FunctionQueryColumn} Returns an instance of the added column.
	 */
	addFunctionColumn: function(columnPath, functionType, columnAlias) {
		var itemConfig = {
			functionType: functionType,
			columnPath: columnPath,
			parentCollection: this
		};
		var column = Ext.create("Terrasoft.FunctionQueryColumn", itemConfig);
		return columnAlias ? this.add(columnAlias, column) : this.addItem(column);
	},

	/**
	 * Add a function column {@link Terrasoft.FunctionQueryColumn},
	 * with the macro type {@Link Terrasoft.FunctionType.MACROS}. An instance of the column is created and
	 * is added to the column collection. The function adds a column with a macro type that does not require parameterization.
	 * For example, the current month, the current user, the Primary column, etc.
	 * @param {Terrasoft.QueryMacrosType} macrosType Macro type of the column.
	 * @param {String} columnAlias (optional) The alias of the column.
	 * @return {Terrasoft.FunctionQueryColumn} Returns an instance of the added column.
	 */
	addMacrosColumn: function(macrosType, columnAlias) {
		var itemConfig = {
			functionType: Terrasoft.FunctionType.MACROS,
			macrosType: macrosType,
			parentCollection: this
		};
		var column = Ext.create("Terrasoft.FunctionQueryColumn", itemConfig);
		return columnAlias ? this.add(columnAlias, column) : this.addItem(column);
	},

	/**
	 * Add a function column {@link Terrasoft.FunctionQueryColumn},
	 * with the macro type {@Link Terrasoft.FunctionType.MACROS}. An instance of the column is created and
	 * is added to the column collection. The function adds a column with a macro type that requires parameterization.
	 * For example, the following N days, the 3rd quarter of the year, etc.
	 * @param {Terrasoft.QueryMacrosType} macrosType Macro type of the column.
	 * @param {Number/Date} macrosValue (optional) Auxiliary variable for the macro.
	 * @param {String} columnAlias (optional) The alias of the column.
	 * @return {Terrasoft.FunctionQueryColumn} Returns an instance of the added column.
	 */
	addDatePeriodMacrosColumn: function(macrosType, macrosValue, columnAlias) {
		var itemConfig = {
			functionType: Terrasoft.FunctionType.MACROS,
			macrosType: macrosType,
			macrosValue: macrosValue,
			parentCollection: this
		};
		var column = Ext.create("Terrasoft.FunctionQueryColumn", itemConfig);
		return columnAlias ? this.add(columnAlias, column) : this.addItem(column);
	},

	/**
	 * Add a function column {@link Terrasoft.FunctionQueryColumn},
	 * with the date part type {@Link Terrasoft.FunctionType.DATE_PART}. An instance of the column is created and
	 * is added to the column collection.
	 * @param {String} columnPath The path of the column to add. The path is relative to {@link #rootSchema}.
	 * @param {Terrasoft.DatePartType} datePartType The date part used in the polishing value.
	 * @param {String} columnAlias (optional) The alias of the column.
	 * @return {Terrasoft.FunctionQueryColumn} Returns an instance of the added column.
	 */
	addDatePartFunctionColumn: function(columnPath, datePartType, columnAlias) {
		var itemConfig = {
			functionType: Terrasoft.FunctionType.DATE_PART,
			columnPath: columnPath,
			datePartType: datePartType,
			parentCollection: this
		};
		var column = Ext.create("Terrasoft.FunctionQueryColumn", itemConfig);
		return columnAlias ? this.add(columnAlias, column) : this.addItem(column);
	},

	/**
	 * Add a function column {@link Terrasoft.FunctionQueryColumn},
	 * with the aggregation type {@Link Terrasoft.FunctionType.AGGREGATION}. An instance of the column is created and
	 * is added to the column collection.
	 * @param {String} columnPath The path of the column to add. The path is relative to {@link #rootSchema}.
	 * @param {Terrasoft.AggregationType} aggregationType The type of aggregation used.
	 * @param {String} columnAlias (optional) The alias of the column.
	 * @param {Terrasoft.AggregationEvalType} aggregationEvalType The scope of the aggregating function
	 * @return {Terrasoft.FunctionQueryColumn} Returns an instance of the added column.
	 */
	addAggregationSchemaColumn: function(columnPath, aggregationType, columnAlias, aggregationEvalType) {
		var itemConfig = {
			functionType: Terrasoft.FunctionType.AGGREGATION,
			columnPath: columnPath,
			aggregationType: aggregationType,
			aggregationEvalType: aggregationEvalType || Terrasoft.AggregationEvalType.NONE,
			parentCollection: this
		};
		var column = Ext.create("Terrasoft.FunctionQueryColumn", itemConfig);
		return columnAlias ? this.add(columnAlias, column) : this.addItem(column);
	},

	/**
	 * Add a window function column {@link Terrasoft.FunctionQueryColumn},
	 * with the type {@Link Terrasoft.FunctionType.WINDOW}. An instance of the column is created and
	 * is added to the column collection.
	 * @param {Object} functionConfig - config of wrapped function.
	 * @param {String} partitionByColumn - partition by section column name.
	 * @param {String} orderByColumn - order by section column name
	 * @param {String} columnAlias (optional) The alias of the column.
	 * @return {Terrasoft.FunctionQueryColumn} Returns an instance of the added column.
	 */
	addWindowFunctionColumn: function(functionConfig, partitionByColumn, orderByColumn, columnAlias) {
		var itemConfig = {
			functionType: Terrasoft.FunctionType.WINDOW,
			functionArgument: {
				functionType: functionConfig.functionType,
				columnPath: functionConfig.columnPath,
				aggregationType: functionConfig.aggregationType,
				aggregationEvalType: functionConfig.aggregationEvalType || Terrasoft.AggregationEvalType.NONE,
				partitionByColumn: partitionByColumn,
				orderByColumn: orderByColumn
			},
			parentCollection: this
		};
		var column = Ext.create("Terrasoft.FunctionQueryColumn", itemConfig);
		return columnAlias ? this.add(columnAlias, column) : this.addItem(column);
	},

	/**
	 * Add a column-parameter {@link Terrasoft.ParameterQueryColumn}. An instance of the column is created and
	 * is added to the column collection.
	 * @param {Mixed} paramValue The value of the parameter. The value must match the data type.
	 * @param {Terrasoft.DataValueType} paramDataType The data type of the parameter.
	 * @param {String} columnAlias (optional) The alias of the column.
	 * @return {Terrasoft.ParameterQueryColumn} Returns an instance of the added column.
	 */
	addParameterColumn: function(paramValue, paramDataType, columnAlias) {
		var itemConfig = {
			parameterValue: paramValue,
			parameterDataType: paramDataType,
			parentCollection: this
		};
		var column = Ext.create("Terrasoft.ParameterQueryColumn", itemConfig);
		return columnAlias ? this.add(columnAlias, column) : this.addItem(column);
	}
});
