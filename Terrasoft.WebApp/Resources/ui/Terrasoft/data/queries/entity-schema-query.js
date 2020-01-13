/**
 * The query class for data fetching.
 */
Ext.define("Terrasoft.data.queries.EntitySchemaQuery", {
	extend: "Terrasoft.data.queries.BaseFilterableQuery",
	alternateClassName: "Terrasoft.EntitySchemaQuery",
	statics: {

		/**
		 * Cache sample results.
		 * @type {Object}
		 */
		cache: {},

		/**
		 * Clears the client cache of the results of the samples.
		 * @param {String[]|String} [keys] The key or array of cache entry keys to be freed.
		 * If not specified, the cache is completely cleared.
		 */
		clearCache: function(keys) {
			if (!keys) {
				this.cache = {};
				return;
			}
			if (!Ext.isArray(keys)) {
				keys = [keys];
			}
			keys.forEach(function(key) {
				delete this.cache[key];
			}, this);
		}
	},

	/**
	 * A collection of query columns.
	 * @type {Terrasoft.QueryColumns}
	 */
	columns: null,

	/**
	 * Determines if all columns must be queried.
	 * @type {Boolean}
	 */
	allColumns: false,

	/**
	 * Determines if merge duplicates in query result.
	 * @type {Boolean}
	 */
	isDistinct: false,

	/**
	 * Determines when to load lookup display values.
	 * @type {Boolean}
	 */
	ignoreDisplayValues: false,

	/**
	 * Rows count to query. All rows will be queried by default.
	 * @type {Number}
	 */
	rowCount: -1,

	/**
	 * Rows count to skip.
	 * @type {Number}
	 */
	rowsOffset: -1,

	/**
	 * The name of the primary column by default.
	 * @type {String}
	 */
	defaultPrimaryColumnName: "Id",

	/**
	 * A characteristic of a page-by-page sampling of data.
	 * @type {Boolean}
	 */
	isPageable: false,

	/**
	 * Conditions for constructing a page request.
	 * @type {Terrasoft.ColumnValues}
	 */
	conditionalValues: null,

	/**
	 * A characteristic of a hierarchical selection of data.
	 * @type {Boolean}
	 */
	isHierarchical: false,

	/**
	 * The maximum level of nesting a hierarchical query.
	 * @type {Number}
	 */
	hierarchicalMaxDepth: 0,

	/**
	 * The name of the column used to build the hierarchical query.
	 * @type {String}
	 */
	hierarchicalColumnName: "",

	/**
	 * The initial value of the hierarchical column from which the hierarchy will be built.
	 * @type {String}
	 */
	hierarchicalColumnValue: "",

	/**
	 * The parameter that determines whether to use the localized data.
	 * @type {Boolean}
	 */
	useLocalization: true,

	/**
	 * Represent parameter which determines disabling data in filtering.
	 * @type {Boolean}
	 */
	useRecordDeactivation: false,

	/**
	 * Name of the model class of the representation of the returned object based on the query results.
	 * @type {String}
	 */
	rowViewModelClassName: "Terrasoft.BaseViewModel",

	/**
	 * @property {Object} serverESQCacheParameters ESQ caching parameters on the server.
	 * @property {Terrasoft.ESQServerCacheLevels} serverESQCacheParameters.cacheLevel Level of ESQ cache placement
	 * It is indicated on the basis of Terrasoft.ESQServerCacheLevels.
	 * @property {String} serverESQCacheParameters.cacheGroup Caching group.
	 * @property {String} serverESQCacheParameters.cacheItemName The record key in the repository.
	 */
	serverESQCacheParameters: null,

	/**
	 * @property {Object} clientESQCacheParameters ESQ caching parameters on the client.
	 * @property {String} clientESQCacheParameters.cacheItemName The record key in the repository.
	 */
	clientESQCacheParameters: null,

	/**
	 * The parameter that determines whether to use the query optimization.
	 * @type {Boolean}
	 */
	queryOptimize: false,

	/**
	 * The parameter that determines whether to re execute the query.
	 * @type {Boolean}
	 */
	useReExecute: false,

	/**
	 * Use metrics for the query.
	 * @type {Boolean}
	 */
	useMetrics: false,

	/**
	 * Source of the query.
	 * @type {Terrasoft.QuerySource}
	 */
	querySource: Terrasoft.QuerySource.UNDEFINED,

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 * @param {Object|String} config Config object or root schema name.
	 */
	constructor: function(config) {
		this.callParent(arguments);
		this.serverESQCacheParameters = {
			cacheLevel: Terrasoft.ESQServerCacheLevels.SESSION,
			cacheGroup: "",
			cacheItemName: ""
		};
		if (!Ext.Object.isEmpty(config) && config.hasOwnProperty("serverESQCacheParameters")) {
			var serverESQCacheParameters = config.serverESQCacheParameters;
			if (serverESQCacheParameters.hasOwnProperty("cacheLevel")) {
				this.serverESQCacheParameters.cacheLevel = serverESQCacheParameters.cacheLevel;
			}
			if (serverESQCacheParameters.hasOwnProperty("cacheGroup")) {
				this.serverESQCacheParameters.cacheGroup = serverESQCacheParameters.cacheGroup;
			}
			if (serverESQCacheParameters.hasOwnProperty("cacheItemName")) {
				this.serverESQCacheParameters.cacheItemName = serverESQCacheParameters.cacheItemName;
			}
		}
		this.clientESQCacheParameters = {
			cacheItemName: ""
		};
		if (!Ext.Object.isEmpty(config) && config.hasOwnProperty("clientESQCacheParameters")) {
			var clientESQCacheParameters = config.clientESQCacheParameters;
			if (clientESQCacheParameters.hasOwnProperty("cacheItemName")) {
				this.clientESQCacheParameters.cacheItemName = clientESQCacheParameters.cacheItemName;
			}
		}
		this.useTimeStampHeader = this._isUseQueryOptimize();
		this.addEvents(
			/**
			 * @event createviewmodel
			 * Triggers when you create an instance of ViewModel based on query results. If in the event handler
			 * view model was not created - an instance of the {@link #rowViewModelClassName base} class is instantiated.
			 * @param {Object} eventArgs
			 * @param {Object} eventArgs.rawData Column values.
			 * @param {Object} eventArgs.rowConfig  Column types.
			 * @param {Object} eventArgs.viewModel View model.
			 */
			"createviewmodel",

			/**
			 * @event reexecute
			 * Triggers when previous execution was finished by timeout and re executed query with optimization.
			 */
			"reexecute"
		);
	},

	/**
	 * @private
	 */
	_destroy: function() {
		this.columns.destroy();
		delete this.columns;
	},

	/**
	 * Creates an instance of ViewModel based on query results.
	 * @private
	 * @param {Object} rawData The result string of the query.
	 * @param {Object} rowConfig Contains the types of all columns that were transferred from the server.
	 * @return {Terrasoft.BaseViewModel} An instance of the entity from rawData data, taking into account rowConfig.
	 */
	createViewModelByQueryResult: function(rawData, rowConfig) {
		var viewModelRowConfig = this.getViewModelRowConfig(rowConfig);
		var eventArgs = {
			viewModel: {},
			rawData: rawData,
			rowConfig: viewModelRowConfig
		};
		this.fireEvent("createviewmodel", eventArgs);
		if (Ext.Object.isEmpty(eventArgs.viewModel)) {
			return Ext.create(this.rowViewModelClassName, {
				entitySchema: this.rootSchema,
				rowConfig: viewModelRowConfig,
				values: rawData,
				isNew: false,
				isDeleted: false
			});
		}
		return eventArgs.viewModel;
	},

	/**
	 * Creates a column configuration for the BaseViewModel instance.
	 * @private
	 * @param {Object} rowConfig Contains the types of all columns that were transferred from the server.
	 * @return {Object} Returns the configuration of the columns of the entity.
	 */
	getViewModelRowConfig: function(rowConfig) {
		var result = rowConfig;
		this.columns.eachKey(function(key, column) {
			if (result[key]) {
				result[key].columnPath = column.columnPath;
			}
		}, this);
		return result;
	},

	/**
	 * Generates an instance of ViewModel based on query results.
	 * @private
	 * @param {Object} rawData The result string of the query.
	 * @param {Object} rowConfig Contains the types of all columns that were transferred from the server.
	 * @return {Terrasoft.BaseViewModel} Returns the created instance of the entity from rawData data,
	 * taking into account rowConfig.
	 */
	getViewModelByQueryResult: function(rawData, rowConfig) {
		Terrasoft.each(rowConfig, function(column, columnName) {
			var rowDataType = column.dataValueType;
			if (rowDataType === Terrasoft.DataValueType.DATE || rowDataType === Terrasoft.DataValueType.DATE_TIME ||
				rowDataType === Terrasoft.DataValueType.TIME) {
				var rawDate = rawData[columnName];
				rawData[columnName] = Ext.isEmpty(rawDate) ? null : Terrasoft.parseDate(rawDate);
			}
		}, this);
		return this.createViewModelByQueryResult(rawData, rowConfig);
	},

	/**
	 * Returns the selection caching key on the client.
	 * @private
	 * @param {String/Number} [primaryColumnValue] The value of the primary sampling key. Used for caching
	 * the results of a selection of individual records (such as, #getEntity).
	 * @return {String}
	 */
	getClientCacheItemName: function(primaryColumnValue) {
		var cacheItemName = "";
		if (this.clientESQCacheParameters) {
			cacheItemName = this.clientESQCacheParameters.cacheItemName;
		}
		if (!cacheItemName && this.serverESQCacheParameters) {
			cacheItemName = this.serverESQCacheParameters.cacheItemName;
		}
		if (cacheItemName && primaryColumnValue) {
			cacheItemName = cacheItemName + "__" + primaryColumnValue;
		}
		return cacheItemName;
	},

	/**
	 * Copies the properties for serialization to the serialized object. Implements the mixin interface.
	 * {@link Terrasoft.Serializable}
	 * @protected
	 * @override
	 * @param {Object} serializableObject Serializable object.
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.columns = this.getSerializableProperty(this.columns);
		serializableObject.isDistinct = this.isDistinct;
		serializableObject.rowCount = this.rowCount;
		serializableObject.rowsOffset = this.rowsOffset;
		serializableObject.isPageable = this.isPageable;
		serializableObject.allColumns = this.allColumns;
		serializableObject.useLocalization = this.useLocalization;
		serializableObject.useRecordDeactivation = this.useRecordDeactivation;
		serializableObject.serverESQCacheParameters = this.serverESQCacheParameters;
		serializableObject.queryOptimize = this.queryOptimize;
		serializableObject.useMetrics = this.useMetrics;
		serializableObject.querySource = this.querySource;
		serializableObject.ignoreDisplayValues = this.ignoreDisplayValues;
		if (this.isPageable) {
			serializableObject.conditionalValues = this.getSerializableProperty(this.conditionalValues);
		}
		serializableObject.isHierarchical = this.isHierarchical;
		if (this.isHierarchical) {
			serializableObject.hierarchicalMaxDepth = this.hierarchicalMaxDepth;
			serializableObject.hierarchicalColumnName = this.hierarchicalColumnName;
			serializableObject.hierarchicalColumnValue = this.hierarchicalColumnValue;
		}
	},

	/**
	 * Initializes a configuration object to create query elements.
	 * @protected
	 * @override
	 */
	initQueryItems: function() {
		this.callParent(arguments);
		this.columns = Ext.create("Terrasoft.QueryColumns");
	},

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
		return this.columns.addColumn(column, columnAlias, config);
	},

	/**
	 * Adds a column-parameter {@link Terrasoft.ParameterQueryColumn}. An instance of the column is created and
	 * is added to the column collection.
	 * @param {Mixed} paramValue The value of the parameter. The value must match the data type.
	 * @param {Terrasoft.DataValueType} paramDataType The data type parameter.
	 * @param {String} columnAlias (optional) The alias of the column.
	 * @return {Terrasoft.ParameterQueryColumn} Returns an instance of the added column.
	 */
	addParameterColumn: function(paramValue, paramDataType, columnAlias) {
		return this.columns.addParameterColumn(paramValue, paramDataType, columnAlias);
	},

	/**
	 * Add a function column {@link Terrasoft.FunctionQueryColumn},
	 * with the macro type {@Link Terrasoft.FunctionType.MACROS}. An instance of the column is created and
	 * is added to the column collection. The function adds a column with a macro type that does not require
	 * parameterization.
	 * For example, the current month, the current user, the Primary column, etc.
	 * @param {Terrasoft.QueryMacrosType} macrosType Macro type of the column.
	 * @param {String} columnAlias (optional) The alias of the column.
	 * @return {Terrasoft.FunctionQueryColumn} Returns an instance of the added column.
	 */
	addMacrosColumn: function(macrosType, columnAlias) {
		return this.columns.addMacrosColumn(macrosType, columnAlias);
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
		return this.columns.addDatePeriodMacrosColumn(macrosType, macrosValue, columnAlias);
	},

	/**
	 * Add a function column {@link Terrasoft.FunctionQueryColumn},
	 * with the date part type {@Link Terrasoft.FunctionType.DATE_PART}.
	 * An instance of the column is created and is added to the column collection.
	 * @param {String} columnPath The path of the column to add. The path is relative to {@link #rootSchema}.
	 * @param {Terrasoft.DatePartType} datePartType The date portion used as the value.
	 * @param {String} columnAlias (optional) The alias of the column.
	 * @return {Terrasoft.FunctionQueryColumn} Returns an instance of the added column.
	 */
	addDatePartFunctionColumn: function(columnPath, datePartType, columnAlias) {
		return this.columns.addDatePartFunctionColumn(columnPath, datePartType, columnAlias);
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
		return this.columns.addAggregationSchemaColumn(columnPath, aggregationType, columnAlias, aggregationEvalType);
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
		return this.columns.addWindowFunctionColumn(functionConfig, partitionByColumn, orderByColumn, columnAlias);
	},

	/**
	 * Adds function query column {@link Terrasoft.FunctionQueryColumn}.
	 * @param {String} columnPath Column path from {@link #rootSchema}.
	 * @param {Terrasoft.FunctionType} functionType Function type.
	 * @param {String} columnAlias (optional) Column alias.
	 * @return {Terrasoft.FunctionQueryColumn} Instance of column.
	 */
	addFunctionColumn: function(columnPath, functionType, columnAlias) {
		return this.columns.addFunctionColumn(columnPath, functionType, columnAlias);
	},

	/**
	 * @param response
	 * @param primaryColumnValue
	 * @param callback
	 * @param scope
	 * @private
	 */
	_parseGetEntityResponse: function(response, primaryColumnValue, callback, scope) {
		if (scope && scope.destroyed) {
			return;
		}
		var result = {success: response.success, entity: null};
		if (response.success) {
			if (response.entity) {
				result.entity = response.entity;
			} else if (response.collection) {
				result.entity = response.collection.find(primaryColumnValue)
					|| response.collection.first();
			} else {
				this._storeQueryResponseToCache(response, primaryColumnValue);
				result.entity = this._getEntityFromQueryResponse(response);
			}
		}
		Ext.callback(callback, scope || this, [result]);
		if (!response.success) {
			throw new Terrasoft.exceptions.QueryExecutionException(response.errorInfo);
		}
	},

	/**
	 * @param response
	 * @returns {Terrasoft.BaseViewModel}
	 * @private
	 */
	_getEntityFromQueryResponse: function(response) {
		var viewModel = null;
		if (response.rowsAffected > 0) {
			if (!response.rowConfig) {
				this._setDefaultRowConfig(response);
			}
			viewModel = this.getViewModelByQueryResult(response.rows[0], response.rowConfig);
		}
		return viewModel;
	},

	/**
	 * @param response
	 * @param primaryColumnValue
	 * @private
	 */
	_storeQueryResponseToCache: function(response, primaryColumnValue) {
		if (response.success) {
			var cache = Terrasoft.EntitySchemaQuery.cache;
			var cacheItemName = this.getClientCacheItemName(primaryColumnValue);
			if (cacheItemName && !cache[cacheItemName]) {
				cache[cacheItemName] = Terrasoft.deepClone(response);
			}
		}
	},

	/**
	 * @param primaryColumnValue
	 * @returns {Terrasoft.BaseViewModel}
	 * @private
	 */
	_restoreQueryResponseFromCache: function(primaryColumnValue) {
		var cache = Terrasoft.EntitySchemaQuery.cache;
		var cacheItemName = this.getClientCacheItemName(primaryColumnValue);
		return cacheItemName && cache[cacheItemName] && Terrasoft.deepClone(cache[cacheItemName]);
	},

	/**
	 * Returns instance of entity by primary column value
	 * @param {String/Number} primaryColumnValue Value of primary column value.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Context of callback execution.
	 * @throws {Terrasoft.exceptions.ArgumentNullOrEmptyException}
	 * Throws exception if primaryColumnValue is empty.
	 */
	getEntity: function(primaryColumnValue, callback, scope) {
		if (!primaryColumnValue) {
			throw new Terrasoft.ArgumentNullOrEmptyException();
		}
		if (this.destroyed !== true) {
			var response = this._restoreQueryResponseFromCache(primaryColumnValue);
			if (response) {
				Ext.callback(callback, scope || this, [{
					success: response.success,
					entity: this._getEntityFromQueryResponse(response)
				}]);
			} else {
				this.enablePrimaryColumnFilter(primaryColumnValue);
				Terrasoft.DataProvider.executeQuery(this, function(response) {
					this.disablePrimaryColumnFilter();
					this._parseGetEntityResponse(response, primaryColumnValue, callback, scope);
				}, this);
			}
		}
	},

	/**
	 * Returns collection of entities.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Scope of callback function.
	 */
	getEntityCollection: function(callback, scope) {
		this.execute(callback, scope);
	},

	/**
	 * @param response
	 * @private
	 */
	_setDefaultRowConfig: function(response) {
		response.rowConfig = {};
		this.columns.eachKey(function(key) {
			response.rowConfig[key] = {};
		}, this);
	},

	/**
	 * @param response
	 * @private
	 */
	_updateRowConfigWithNotFoundColumns: function(response) {
		var notFoundColumns = response.notFoundColumns || [];
		notFoundColumns.forEach(function(column) {
			response.rowConfig[column] = {
				dataValueType: Terrasoft.DataValueType.TEXT,
				isNotFound: true
			};
		});
	},

	/**
	 * @param response
	 * @returns {Terrasoft.BaseViewModelCollection}
	 * @private
	 */
	_getResponseEntityCollection: function(response) {
		var rowConfig = response.rowConfig;
		var result = Ext.create("Terrasoft.BaseViewModelCollection", {
			entitySchema: this.rootSchema,
			rowConfig: rowConfig
		});
		if (response.success && response.rowsAffected > 0) {
			var primaryColumnName = this.rootSchema
				? this.rootSchema.primaryColumnName
				: this.defaultPrimaryColumnName;
			Terrasoft.each(response.rows, function(row) {
				var entity = this.getViewModelByQueryResult(row, rowConfig);
				if (rowConfig[primaryColumnName]) {
					var key = entity.get(primaryColumnName);
					if (result.contains(key)) {
						result.addItem(entity);
					} else {
						result.add(key, entity);
					}
				} else {
					result.addItem(entity);
				}
			}, this);
		}
		return result;
	},

	/**
	 * Parses query execution response.
	 * @protected
	 * @override
	 * @param {Object} response Response object.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	parseResponse: function(response, callback, scope) {
		if (response.collection) {
			Ext.callback(callback, scope, [response]);
		} else {
			this._storeQueryResponseToCache(response);
			if (!response.rowConfig) {
				this._setDefaultRowConfig(response);
			}
			this._updateRowConfigWithNotFoundColumns(response);
			var result = {
				success: response.success,
				collection: this._getResponseEntityCollection(response),
				errorInfo: response.errorInfo
			};
			this.callParent([result, callback, scope]);
		}
	},

	/**
	 * @inheritDoc Terrasoft.BaseQuery#responseHandler
	 * @override
	 */
	responseHandler: function(response, callback, scope) {
		if (this._isUseReExecute(response)) {
			this.queryOptimize = true;
			this.fireEvent("reexecute");
			this.execute(callback, scope);
			return;
		}
		this.callParent(arguments);
	},

	/**
	 * Signs can re execute query.
	 * @param {Object} response Response object.
	 * @return {Boolean} True, if can re execute query, otherwise false.
	 * @private
	 */
	_isUseReExecute: function(response) {
		const isTimedout =  Terrasoft.findValueByPath(response, "errorInfo.response.timedout");
		return response && !response.success && isTimedout && this.useReExecute && !this.queryOptimize &&
			this._isUseQueryOptimize();
	},

	/**
	 * Signs can use query optimization.
	 * @return {Boolean} True, if can use query optimization, otherwise false.
	 * @private
	 */
	_isUseQueryOptimize: function() {
		return (Terrasoft.Features.getIsEnabled("UseQueryOptimize") || Terrasoft.isDebug);
	},

	/**
	 * @inheritdoc Terrasoft.data.queries.BaseQuery#execute
	 * @override
	 */
	execute: function(callback, scope) {
		var cacheItemName = this.getClientCacheItemName();
		var cache = Terrasoft.EntitySchemaQuery.cache;
		if (!cacheItemName || !cache[cacheItemName]) {
			this.callParent(arguments);
			return;
		}
		var response = cache[cacheItemName];
		this.parseResponse(Terrasoft.deepClone(response), callback, scope);
	},

	/**
	 * @inheritdoc Terrasoft.core.BaseObject#onDestroy
	 * @override
	 */
	onDestroy: function() {
		if (this.destroyed) {
			return;
		}
		var onParentDestroy = this.getParentMethod(this, arguments);
		if (Terrasoft.DataProvider.autoBatch) {
			Terrasoft.delay(function() {
				this._destroy();
				onParentDestroy();
			}, this, Terrasoft.DataProvider.autoBatchDelay * 10);
		} else {
			this._destroy();
			onParentDestroy();
		}
	}
});
