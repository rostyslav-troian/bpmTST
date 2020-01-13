Terrasoft.configuration.Structures["BaseTimelineDataProvider"] = {innerHierarchyStack: ["BaseTimelineDataProvider"]};
define("BaseTimelineDataProvider", ["BaseTimelineSearchProvider"], function() {
	/**
	 * Base timeline data provider class.
	 */
	Ext.define("Terrasoft.configuration.BaseTimelineDataProvider", {
		alternateClassName: "Terrasoft.BaseTimelineDataProvider",

		// region Properties: Private

		/**
		 * Instance of created search provider.
		 * @private
		 * @type {Terrasoft.BaseTimelineSearchProvider}
		 */
		_searchProviderInstance: null,

		// endregion

		// region Properties: Protected

		/**
		 * Class name of search provider.
		 * @protected
		 * @type {String}
		 */
		searchProviderClassName: null,

		/**
		 * Item view model primary column name.
		 * @protected
		 * @type {String}
		 */
		primaryColumnName: "Id",

		// endregion

		// region Properties: Public

		/**
		 * Item view model sort date column name.
		 * @type {String}
		 */
		sortDateColumnName: "TimelineSortDate",

		// endregion

		//region Constructors: Public

		constructor: function() {
			this._initSearchProvider();
		},

		// endregion

		// region Methods: Private

		/**
		 * Initialized search provider for data storage.
		 * @private
		 */
		_initSearchProvider: function() {
			this._searchProviderInstance = Ext.create(this.searchProviderClassName);
		},

		/**
		 * Performs search in timeline data using search provider and calls callback function with received result.
		 * @param {Object} config Data loading config.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 * @param {*} callbackArgs Callback function arguments that will be applied after search provider result.
		 */
		_searchUsingProvider: function(config, callback, scope, callbackArgs) {
			var userFilters = config.filters || {};
			this._searchProviderInstance.search({
				entitiesConfig: config.entities,
				searchKey: userFilters.searchKey,
				callback: callback,
				scope: scope,
				args: callbackArgs
			});
		},

		/**
		 * Performs data loading.
		 * @param {Object} config Data loading config.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		_loadData: function(config, callback, scope) {
			this._searchUsingProvider(config, this.loadDataBySearchResult, this, [config, callback, scope]);
		},

		// endregion

		// region Methods: Protected

		/**
		 * Loads data using specified search provider execution result.
		 * @protected
		 * @param {*} searchProviderResult Result received from search provider execution.
		 * @param {Object} config Data loading config.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		loadDataBySearchResult: function(searchProviderResult, config, callback, scope) {
			throw new Terrasoft.NotImplementedException();
		},

		/**
		 * Checks whether data should be loaded using the specified configuration or not.
		 * @protected
		 * @param {Object} config Data loading config.
		 * @return {Boolean} True if config is valid and provider should load data.
		 */
		validateConfig: function(config) {
			if (!config || !config.entities || !config.entities.length) {
				return false;
			}
			var entitiesToLoad = config.entities.filter(function(entityConfig) {
				return !entityConfig.pagingOptions || entityConfig.pagingOptions.rowCount > 0;
			});
			return entitiesToLoad.length > 0;
		},

		// endregion

		// region Methods: Public

		/**
		 * Cancels data loading.
		 */
		abort: function() {
			throw new Terrasoft.NotImplementedException();
		},

		/**
		 * Obtains a timeline data and passes it to the specified callback function.
		 * @param {Object} config Data loading config.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		getData: function(config, callback, scope) {
			if (!this.validateConfig(config)) {
				Ext.callback(callback, scope);
				return;
			}
			this._loadData(config, callback, scope);
		}

		// endregion

	});
});


