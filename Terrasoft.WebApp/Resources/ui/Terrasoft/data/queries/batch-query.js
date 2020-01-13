/**
 * Batch Query Class
 */
Ext.define("Terrasoft.data.queries.BatchQuery", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.BatchQuery",

	mixins: {
		serializable: "Terrasoft.Serializable"
	},

	/**
	 * Query operation type
	 * @type {Terrasoft.QueryOperationType}
	 */
	operationType: Terrasoft.QueryOperationType.BATCH,

	/**
	 * Queries collection
	 * @type {Array}
	 */
	queries: null,

	/**
	 * Query name to index map.
	 * @type {Object}
	 */
	queriesMap: null,

	/**
	 * Current query index.
	 * @private
	 * @type {Number}
	 */
	_queryIndex: null,

	/**
	 * Determines whether the query can aggregate process execution data.
	 * @type {Boolean}
	 */
	includeProcessExecutionData: true,

	/**
	 * Determines whether executionDataReady event should be raised when response contains processExecutionData.
	 * @type {Boolean}
	 */
	publishProcessExecutionData: true,

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent(arguments);
		this.queries = [];
		this.queriesMap = {};
		this._queryIndex = -1;
		Terrasoft.AjaxProvider.on("requestaborted", this._onRequestAborted, this);
	},

	/**
	 * @param queryInstanceId
	 * @returns {boolean}
	 * @private
	 */
	_hasQuery: function(queryInstanceId) {
		return !!Ext.Array.findBy(this.queries, function (item) {
			return item.query && item.query.instanceId === queryInstanceId;
		});
	},

	/**
	 * @param request
	 * @private
	 */
	_onRequestAborted: function(request) {
		var requestInstanceId = request && request.options && request.options.instanceId;
		if (requestInstanceId && requestInstanceId !== this.instanceId && !Ext.isEmpty(this.queries)) {
			this._abortedQueries = this._abortedQueries || [];
			if (this._hasQuery(requestInstanceId)) {
				this._abortedQueries.push(requestInstanceId);
				if (this._abortedQueries.length === this.queries.length) {
					Terrasoft.AjaxProvider.abortRequestByInstanceId(this.instanceId);
				}
			}
		}
	},

	/**
	 * Handles response
	 * @private
	 * @param {Object} response Response object.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	parseResponse: function(response, callback, scope) {
		if (this.publishProcessExecutionData) {
			Terrasoft.ProcessExecutionDataCollector.add(response.processExecutionData);
		}
		if (Ext.isFunction(callback)) {
			callback.call(scope || this, response);
		}
		if (!response.success) {
			return;
		}
		var queryResults = response.queryResults;
		if (!queryResults || queryResults.length === 0) {
			return;
		}
		Terrasoft.each(this.queries, function(item) {
			var query = item.query;
			var queryResult = queryResults.shift();
			if (item.callback && !Terrasoft.contains(this._abortedQueries, query.instanceId)) {
				queryResult.success = response.success;
				query.parseResponse(queryResult, item.callback, item.scope);
			}
		}, this);
	},

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		var items = serializableObject.items = [];
		if (this.includeProcessExecutionData && Terrasoft.Features.getIsEnabled("GetProcessStepsViaResponse")) {
			serializableObject.includeProcessExecutionData = true;
		}
		Terrasoft.each(this.queries, function(item) {
			var query = item.query;
			// The __type property must be the first one during the serialization
			// otherwise, deserialization on the server will be incorrect
			// TODO: CR 208003
			var serializableQuery = {};
			if (query instanceof Terrasoft.EntitySchemaQuery) {
				serializableQuery.__type = "Terrasoft.Nui.ServiceModel.DataContract.SelectQuery";
			}
			if (query instanceof Terrasoft.InsertQuery) {
				serializableQuery.__type = "Terrasoft.Nui.ServiceModel.DataContract.InsertQuery";
			}
			if (query instanceof Terrasoft.UpdateQuery) {
				serializableQuery.__type = "Terrasoft.Nui.ServiceModel.DataContract.UpdateQuery";
			}
			if (query instanceof Terrasoft.DeleteQuery) {
				serializableQuery.__type = "Terrasoft.Nui.ServiceModel.DataContract.DeleteQuery";
			}
			Ext.apply(serializableQuery, this.getSerializableProperty(query));
			items.push(serializableQuery);
		}, this);
		serializableObject.instanceId = this.instanceId;
	},

	/**
	 * Adds query to batch
	 * @throws {Terrasoft.ArgumentNullOrEmptyException}
	 * Throws if argument query is not defined
	 * @param {Terrasoft.BaseQuery} query Query
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	add: function(query, callback, scope) {
		if (!query) {
			throw new Terrasoft.ArgumentNullOrEmptyException({
				argumentName: "query"
			});
		}
		this.queries.push({
			query: query,
			callback: callback || null,
			scope: scope || this
		});
	},

	/**
	 * Adds named query to batch query.
	 * @throws {Terrasoft.ArgumentNullOrEmptyException}
	 * Thrown when query is not specified.
	 * @param {Terrasoft.BaseQuery} query Query to add.
	 * @param {String} queryName Query name.
	 * @param {Function} callback Callback-function called after server response.
	 * @param {Object} scope Callback scope.
	 */
	addNamedQuery: function (query, queryName, callback, scope) {
		this.add(query, callback, scope);
		++this._queryIndex;
		this.queriesMap[queryName] = this._queryIndex;
	},

	/** Executes query.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	execute: function(callback, scope) {
		var parseResponseCallback = function(result) {
			this.parseResponse(result, callback, scope);
		};
		Terrasoft.DataProvider.executeQuery(this, parseResponseCallback, this);
	},

	/**
	 * @inheritdoc Terrasoft.BaseObject#onDestroy
	 * @override
	 */
	onDestroy: function() {
		Terrasoft.AjaxProvider.un("requestaborted", this._onRequestAborted, this);
		this.queries = null;
		this.queriesMap = null;
		this.callParent(arguments);
	}

});
