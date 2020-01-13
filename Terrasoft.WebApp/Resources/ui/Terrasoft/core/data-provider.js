/**
 * Provides transport layer for data modifications
 */
Ext.define("Terrasoft.core.DataProvider", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.DataProvider",
	singleton: true,

	//region Properties: Private

	/**
	 * @private
	 */
	serviceProvider: Terrasoft.ServiceProvider,

	/**
	 * @private
	 * @type {String[]}
	 */
	dataServiceMethods: [
		"SelectQuery",
		"InsertQuery",
		"UpdateQuery",
		"DeleteQuery",
		"BatchQuery",
		"ListSelectQuery",
		"FilteredSelectQuery",
		"LookupSelectQuery"
	],

	/**
	 * @private
	 * @type {String}
	 */
	getFiltersMetaDataServiceMethod: "Filters",

	/**
	 * @private
	 */
	_queries: [],

	/**
	 * @private
	 */
	_batchSize: 10,

	/**
	 * @private
	 */
	_esqCount: 0,

	/**
	 * @private
	 */
	_bqCount: 0,

	/**
	 * @private
	 */
	_printStatistic: false,

	//endregion

	//region Properties: Public

	/**
	 * Indicates using of autoBatch.
	 * @type {Boolean}
	 */
	autoBatchDelay: 100,

	/**
	 * Indicates using of autoBatch.
	 * @type {Boolean}
	 */
	autoBatch: Terrasoft.Features && Terrasoft.Features.getIsEnabled("DataProviderAutoBatch"),

	//endregion

	//region Methods: Private

	/**
	 * @private
	 */
	_isBatchable: function(query) {
		return (this.autoBatch || query.isBatchable) && query.operationType === Terrasoft.QueryOperationType.SELECT;
	},

	/**
	 * @private
	 */
	_execute: function() {
		var batchItem = this._queries.shift();
		if (batchItem) {
			var batch = Ext.create("Terrasoft.BatchQuery");
			while (batchItem) {
				batch.add.apply(batch, batchItem);
				batchItem = this._queries.shift();
			}
			this._bqCount++;
			batch.execute(Terrasoft.emptyFn, this);
		}
		if (this._printStatistic) {
			console.clear();
			console.info(this._getStatistic());
		}
	},

	/**
	 * @private
	 */
	_getStatistic: function() {
		var eco = Ext.Number.toFixed(100 - this._bqCount * 100 / this._esqCount, 1);
		return Ext.String.format("ESQ:{0} | BQ:{1} | ECO:{2}%", this._esqCount, this._bqCount, eco);
	},

	//endregion

	//region Methods: Public

	/**
	 * Sends request to server.
	 * @param {Terrasoft.BaseQuery} query Query to be send.
	 * @param {Function} callback Callback method.
	 * @param {Object} scope Callback method context.
	 * @return {Object} Returns instance of the request.
	 */
	executeQuery: function(query, callback, scope) {
		if (this._isBatchable(query)) {
			this._queries.push([query, callback, scope]);
			this._esqCount++;
			Terrasoft.debounce(
				this._execute.bind(this),
				this.autoBatchDelay,
				this._queries.length >= this._batchSize
			)();
		} else {
			return this.serviceProvider.executeRequest(this.dataServiceMethods[query.operationType], query,	callback,
				scope);
		}
	},

	/**
	 * Returns actual filter meta data.
	 * @param {Terrasoft.FilterGroup} filters Filters for actualization.
	 * @param {Function} callback Callback function.
	 * @param {Object} scope Context of callback function execution.
	 */
	getFiltersMetaData: function(filters, callback, scope) {
		this.serviceProvider.executeRequest(this.getFiltersMetaDataServiceMethod, filters, callback, scope);
	}

	//endregion

});