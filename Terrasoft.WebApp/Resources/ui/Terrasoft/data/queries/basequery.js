/**
 * @abstract
 */
Ext.define("Terrasoft.data.queries.BaseQuery", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.BaseQuery",
	mixins: {
		serializable: "Terrasoft.Serializable"
	},

	/**
	 * Configuration object to create query.
	 * @protected
	 * @type {Object}
	 */
	queryItemConfig: null,

	/**
	 * The query kind.
	 * @protected
	 * @type {Terrasoft.core.enums.QueryKind}
	 */
	queryKind: Terrasoft.QueryKind.GENERAL,

	/**
	 * The parameter that determines whether to use time stamp in request header.
	 * @protected
	 * @type {Boolean}
	 */
	useTimeStampHeader: false,

	/**
	 * Query type.
	 * @type {Terrasoft.QueryOperationType}
	 */
	operationType: Terrasoft.QueryOperationType.SELECT,

	/**
	 * Root schema for query.
	 * @type {Terrasoft.BaseEntitySchema}
	 */
	rootSchema: null,

	/**
	 * Root schema name.
	 * @type {String}
	 */
	rootSchemaName: "",

	/**
	 * Query parameters collection.
	 * @type {Terrasoft.Parameters}
	 */
	parameters: null,

	/**
	 * Query cache level.
	 * @type {String}
	 */
	cacheLevel: "",

	/**
	 * Query cache key.
	 * @type {String}
	 */
	cacheKey: "",

	/**
	 * Last running request.
	 */
	request: null,

	/**
	 * Indicates if query is batchable.
	 * @type {Boolean}
 	 */
	isBatchable: false,

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
	 * Creates BaseQuery instance.
	 * @param {Object|String} config Config object or root schema name.
	 */
	constructor: function(config) {
		if (Ext.isString(config)) {
			config = {
				rootSchemaName: config
			};
		}
		this.callParent([config]);
		this.initQueryItems();
	},

	/**
	 * Copies object properties for serialize to serializable object. Implements mixin interface
	 * {@link Terrasoft.Serializable}
	 * @protected
	 * @override
	 * @param {Object} serializableObject Object in which serializable property collected.
	 */
	getSerializableObject: function(serializableObject) {
		const rootSchema = this.rootSchema;
		serializableObject.rootSchemaName = (rootSchema) ? rootSchema.name : this.rootSchemaName;
		serializableObject.operationType = this.operationType;
		if (this.includeProcessExecutionData && Terrasoft.Features.getIsEnabled("GetProcessStepsViaResponse")) {
			serializableObject.includeProcessExecutionData = true;
		}
		if (this.queryKind !== Terrasoft.QueryKind.GENERAL) {
			serializableObject.queryKind = this.queryKind;
		}
		// TODO: #178879 NUI (ESQ): ParameterExpression: must have link to parameter from ESQ.Parameters
		// serializableObject.parameters = this.getSerializableProperty(this.parameters);
	},

	/**
	 * Creates query items.
	 * @protected
	 */
	initQueryItems: function() {
		this.parameters = Ext.create("Terrasoft.Parameters");
	},

	/**
	 * Process server response and returns query result object.
	 * @protected
	 * @param {Object} response Server response.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function call context.
	 */
	parseResponse: function(response, callback, scope) {
		if (this.publishProcessExecutionData) {
			Terrasoft.ProcessExecutionDataCollector.add(response.processExecutionData);
		}
		Ext.callback(callback, scope, [response]);
	},

	/**
	 * Request to execute query on server.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function call context.
	 */
	execute: function(callback, scope) {
		if (this.destroyed === true) {
			return;
		}
		this.request = Terrasoft.DataProvider.executeQuery(this, function(response) {
			this.responseHandler(response, callback, scope);
		}, this);
	},

	/**
	 * Handles response.
	 * @protected
	 * @param {Object} response Response object.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Callback function context.
	 */
	responseHandler: function(response, callback, scope) {
		if (scope && scope.destroyed) {
			return;
		}
		this.parseResponse(response, callback, scope);
		if (!response.success) {
			throw new Terrasoft.exceptions.QueryExecutionException(response.errorInfo);
		}
	},

	/**
	 * Removes event listeners and destroy object.
	 * @override
	 */
	onDestroy: function() {
		this.abortQuery();
		this.parameters.destroy();
		delete this.parameters;
		this.callParent(arguments);
	},

	/**
	 * Abort running query.
	 */
	abortQuery: function() {
		const request = this.request;
		if(request && !request.completed) {
			Terrasoft.AjaxProvider.abortRequest(request);
		}
	}

});
