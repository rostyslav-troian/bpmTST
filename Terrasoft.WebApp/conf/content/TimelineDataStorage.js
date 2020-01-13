Terrasoft.configuration.Structures["TimelineDataStorage"] = {innerHierarchyStack: ["TimelineDataStorage"]};
define("TimelineDataStorage", ["BaseTimelineItemViewModel", "EsqTimelineDataProvider", "EsnTimelineDataProvider"],
		function() {
	/**
	 * Timeline data storage class.
	 */
	Ext.define("Terrasoft.configuration.TimelineDataStorage", {
		extend: "Terrasoft.BaseViewModelCollection",
		alternateClassName: "Terrasoft.TimelineDataStorage",

		// region Properties: Private

		/**
		 * Config for loading data.
		 * @private
		 * @type {Object}
		 */
		_queryConfig: null,

		/**
		 * Options for pageable loading.
		 * @private
		 * @type {Object}
		 */
		_pagingOptions: null,

		/**
		 * Row count for query.
		 * @private
		 * @type {Number}
		 */
		_queryRowCount: null,

		/**
		 * Default view model class name.
		 * @private
		 * @type {String}
		 */
		_defaultViewModelClassName: "Terrasoft.BaseTimelineItemViewModel",

		/**
		 * Current order direction of the collection.
		 * @private
		 * @type {Terrasoft.OrderDirection}
		 */
		_orderDirection: null,

		/**
		 * Internal collection for pageable loading.
		 * @private
		 * @type {Terrasoft.Collection}
		 */
		_internalCollection: Ext.create("Terrasoft.Collection"),

		/**
		 * Class name of default data provider.
		 * @private
		 * @type {String}
		 */
		_defaultDataProviderClassName: "Terrasoft.EsqTimelineDataProvider",

		/**
		 * Array of data provider instances.
		 * @private
		 * @type {Array}
		 */
		_providers: [],

		/**
		 * Flag of use esn data provider.
		 * @private
		 * @type {Boolean}
		 */
		_useEsnRights: Terrasoft.Features.getIsEnabled("UseEsnRights"),

		// endregion

		// region Properties: Protected

		/**
		 * Item view model sort date column name.
		 * @protected
		 * @type {String}
		 */
		sortDateColumnName: "TimelineSortDate",

		// endregion

		// region Methods: Private

		/**
		 * Cancels execution of the requests.
		 * @private
		 */
		_abortRequests: function() {
			Terrasoft.each(this._providers, function(provider) {
				provider.abort();
			});
		},

		/**
		 * Adds timeline items of specific entity to internal collection.
		 * @private
		 * @param {Object} queryResult Query result with timeline entity records.
		 */
		_loadEntityItems: function(queryResult) {
			Terrasoft.each(queryResult.rows, function(row) {
				var id = row.Id;
				var item = this._getViewModelByQueryResult(row, queryResult.rowConfig);
				this._internalCollection.addIfNotExists(id, item);
				var pagingOptions = this._getQueryPagingOptions(row.EntityConfigKey);
				pagingOptions.rowsOffset++;
			}, this);
		},

		/**
		 * Adds timeline items of all entities to internal collection.
		 * @private
		 * @param {Array} responses Array of server responses.
		 */
		_loadItems: function(responses) {
			Terrasoft.each(responses, function(response) {
				if (response && response.success) {
					Terrasoft.each(response.queryResults, function(queryResult) {
						this._loadEntityItems(queryResult);
					}, this);
				}
			}, this);
		},

		/**
		 * Returns instance of view model.
		 * @private
		 * @param {Object} row Item of query result.
		 * @param {Object} rowConfig Contains the types of all columns that were transferred from the server.
		 * @return {[this._defaultViewModelClassName]} Returns the created instance of the entity from the row data,
		 * by rowConfig.
		 */
		_getViewModelByQueryResult: function(row, rowConfig) {
			Terrasoft.each(rowConfig, function(column, columnName) {
				var rowDataType = column.dataValueType;
				if (rowDataType === Terrasoft.DataValueType.DATE || rowDataType === Terrasoft.DataValueType.DATE_TIME ||
						rowDataType === Terrasoft.DataValueType.TIME) {
					var rawDate = row[columnName];
					row[columnName] = Ext.isEmpty(rawDate) ? null : Terrasoft.parseDate(rawDate);
				}
			}, this);
			return this._createViewModelByQueryResult(row);
		},

		/**
		 * Creates instance of view model.
		 * @private
		 * @param {Object} row Item of query result.
		 * @return {[this._defaultViewModelClassName]} Returns the created instance of the entity from the row data,
		 * by rowConfig.
		 */
		_createViewModelByQueryResult: function(row) {
			var queryConfig = this._queryConfig;
			var entityConfig = this._getConfigByKey(row.EntityConfigKey);
			var viewModelClassName = entityConfig.viewModelClassName
				? entityConfig.viewModelClassName
				: this._defaultViewModelClassName;
			var viewModel = Ext.create(viewModelClassName, {
				sandbox: queryConfig.sandbox,
				values: row
			});
			viewModel.set("TypeColumnValue", entityConfig.typeColumnValue || null);
			return viewModel;
		},

		/**
		 * Returns config by entity config key.
		 * @private
		 * @param {String} entityConfigKey Entity config key.
		 * @return {Object} Config.
		 */
		_getConfigByKey: function(entityConfigKey) {
			var queryConfig = this._queryConfig;
			var result = Ext.Array.findBy(queryConfig.entities, function(item) {
				return item.entityConfigKey === entityConfigKey;
			});
			return result;
		},

		/**
		 * Initializes config for query.
		 * @private
		 * @param {Object} config Config for loading data.
		 */
		_initQueryConfig: function(config) {
			config = config || {};
			this._queryConfig = config;
			this._queryRowCount = config.queryRowCount;
			this._orderDirection = config.orderDirection;
		},

		/**
		 * Initializes options for pageable loading.
		 * @private
		 */
		_initPagingOptions: function() {
			var pagingOptions = {};
			var queryConfig = this._queryConfig;
			Terrasoft.each(queryConfig.entities, function(entity) {
				pagingOptions[entity.entityConfigKey] = {
					rowCount: this._queryRowCount,
					rowsOffset: 0
				};
			}, this);
			this._pagingOptions = pagingOptions;
		},

		/**
		 * Clears row counts in paging options for all timeline entities.
		 * @private
		 */
		_clearPagingOptionsRowCounts: function() {
			Terrasoft.each(this._pagingOptions, function(config) {
				config.rowCount = 0;
			}, this);
		},

		/**
		 * Optimizes paging options row counts.
		 * If rowsOffset is not a multiple of {@link #_queryRowCount}, then set rowCount to zero.
		 * @private
		 */
		_optimizePagingOptionsRowCounts: function() {
			Terrasoft.each(this._pagingOptions, function(config) {
				var rowsOffset = config.rowsOffset;
				var isFull = (rowsOffset === 0) || (rowsOffset % this._queryRowCount > 0);
				var rowCount = isFull ? 0 : this._queryRowCount;
				config.rowCount = rowCount;
			}, this);
		},

		/**
		 * Returns paging options for specified timeline entity.
		 * @private
		 * @param {String} entityConfigKey Entity config key.
		 * @return {Object} Paging options.
		 */
		_getQueryPagingOptions: function(entityConfigKey) {
			var pagingOptions = this._pagingOptions || {};
			return pagingOptions[entityConfigKey] || {};
		},

		/**
		 * Builds default paging options for loading exactly one record.
		 * @private
		 * @return {Object} Paging options.
		 */
		_getSingleRecordPagingOption: function() {
			return {
				rowCount: 1,
				rowsOffset: -1
			};
		},

		/**
		 * Returns ability to select entity.
		 * @private
		 * @param {Object} entityConfig Entity Configuration.
		 * @return {Boolean} Select entity flag.
		 */
		_canSelectEntity: function(entityConfig) {
			var entityFilters = this._queryConfig.filters;
			entityFilters = entityFilters && entityFilters.entityFilters;
			return (!Ext.isEmpty(entityConfig.masterRecordValue) &&
				(!entityFilters || Ext.Array.contains(entityFilters, entityConfig.entityConfigKey)));
		},

		/**
		 * Finds a configs for specified entities schema that can be selected in query config object.
		 * @private
		 * @param {Object} entitySchemaName Name of the entity schema.
		 * @param {Object} queryConfig Timeline query config.
		 * @return {Array} Configs for entities with specified name.
		 */
		_findSelectableEntityConfigs: function(entitySchemaName, queryConfig) {
			return Ext.isArray(queryConfig.entities)
				? queryConfig.entities.filter(function(entityConfig) {
					return entitySchemaName === entityConfig.entitySchemaName && this._canSelectEntity(entityConfig);
				}, this)
				: [];
		},

		/**
		 * Returns last loaded item by entity config key.
		 * @private
		 * @param {String} entityConfigKey Entity config key.
		 * @return {Terrasoft.BaseTimelineViewModel}
		 */
		_getLastLoadedItemByKey: function(entityConfigKey) {
			var lastItem = this._getLastCollectionItemByKey(this._internalCollection, entityConfigKey);
			lastItem = lastItem || this._getLastCollectionItemByKey(this, entityConfigKey);
			return lastItem;
		},

		/**
		 * Returns last collection item by entity config key.
		 * @param {Terrasoft.Collection} collection Collection.
		 * @param {Object} entityConfigKey Entity config key.
		 * @return {Terrasoft.BaseTimelineViewModel}
		 */
		_getLastCollectionItemByKey: function(collection, entityConfigKey) {
			var filteredCollection = collection.filterByFn(function(item) {
				return item.get("EntityConfigKey") === entityConfigKey;
			}, this);
			return filteredCollection.last();
		},

		/**
		 * Sorts items of timeline by order column.
		 * @private
		 * @param {Terrasoft.BaseViewModel} itemA Comparable item.
		 * @param {Terrasoft.BaseViewModel} itemB Comparable item.
		 * @return {Number} Result.
		 */
		_sortItemsByOrderColumn: function(itemA, itemB) {
			var dateA = itemA.get(this.sortDateColumnName);
			var dateB = itemB.get(this.sortDateColumnName);
			dateA = Ext.isDate(dateA) ? dateA.getTime() : -1;
			dateB = Ext.isDate(dateB) ? dateB.getTime() : -1;
			if (dateA === dateB) {
				return 0;
			}
			if (this._orderDirection === Terrasoft.OrderDirection.DESC) {
				return dateA > dateB ? -1 : 1;
			} else {
				return dateA < dateB ? -1 : 1;
			}
		},

		/**
		 * Adds portion of data from internal collection.
		 * @private
		 * @return {Terrasoft.Collection} Added items.
		 */
		_addDataPortion: function() {
			var nextItems = Ext.create("Terrasoft.Collection");
			var internalCollectionCount = this._internalCollection.getCount();
			for (var i = 0; i < this._queryRowCount && i < internalCollectionCount; i++) {
				var item = this._internalCollection.first();
				this._internalCollection.removeByIndex(0);
				if (!this.contains(item.id)) {
					nextItems.add(item.id, item);
				}
			}
			this.loadAll(nextItems);
			return nextItems;
		},

		/**
		 * Processes the result from the server.
		 * @private
		 * @param {Array} responses Array of responses.
		 * @param {Function} callback Callback method.
		 * @param {Object} scope Callback method scope.
		 */
		_onDataLoaded: function(responses, callback, scope) {
			this._loadItems(responses, this);
			this._internalCollection.sortByFn(this._sortItemsByOrderColumn, this);
			this._clearPagingOptionsRowCounts();
			var addedItems = this._addDataPortion();
			this._optimizePagingOptionsRowCounts();
			Ext.callback(callback, scope, [addedItems]);
		},

		/**
		 * Initializes data providers.
		 * @private
		 */
		_initDataProviders: function() {
			Terrasoft.each(this._getDataProviderClassNames(), function(providerClassName) {
				if (this._isIgnoredDataProvider(providerClassName) ||
						Terrasoft.findWhere(this._providers, {alternateClassName: providerClassName})) {
					return;
				}
				this._providers.push(Ext.create(providerClassName, {
					sortDateColumnName: this.sortDateColumnName
				}));
			}, this);
		},

		/**
		 * Returns array of data providers class names.
		 * @private
		 * @return {Array}
		 */
		_getDataProviderClassNames: function() {
			var classNames = [];
			var queryConfig = this._queryConfig;
			Terrasoft.each(queryConfig.entities, function(entityConfig) {
				var dataProviderClassName =
					entityConfig.dataProviderClassName || this._defaultDataProviderClassName;
				if (classNames && classNames.indexOf(dataProviderClassName) < 0) {
					classNames.push(dataProviderClassName);
				}
			}, this);
			return classNames;
		},

		/**
		 * Checks whether specified data provider is ignored or not.
		 * @private
		 * @param {String} providerClassName Name of data provider.
		 */
		_isIgnoredDataProvider: function(providerClassName) {
			var esnDataProviderClassName = "Terrasoft.EsnTimelineDataProvider";
			return !this._useEsnRights && providerClassName === esnDataProviderClassName;
		},

		/**
		 * Destroys all existing providers.
		 * @private
		 */
		_destroyDataProviders: function() {
			Terrasoft.each(this._providers, function(provider) {
				provider.destroy();
			}, this);
			this._providers = [];
		},

		/**
		 * Returns configs of entities whose records that should be loaded to storage.
		 * @private
		 * @param {Object} queryConfig Timeline query config.
		 * @return {Array}
		 */
		_getEntitiesToSelect: function(queryConfig) {
			return Ext.isArray(queryConfig.entities)
				? queryConfig.entities.filter(function(entityConfig) {
					return this._canSelectEntity(entityConfig);
				}, this)
				: [];
		},

		/**
		 * Builds config for each data provider.
		 * @private
		 * @param {Array} entitiesToSelect Entities whose records that should be loaded to storage.
		 * @param {Object} queryConfig Timeline query config.
		 * @return {Object}
		 */
		_buildProvidersConfig: function(entitiesToSelect, queryConfig) {
			var providersConfig = [];
			Terrasoft.each(entitiesToSelect, function(entityConfig) {
				var entityDataProviderClassName = entityConfig.dataProviderClassName;
				if (!entityDataProviderClassName || this._isIgnoredDataProvider(entityDataProviderClassName)) {
					entityDataProviderClassName = this._defaultDataProviderClassName;
				}
				var providerConfig = this._getProviderConfig(providersConfig, entityDataProviderClassName);
				this._decorateEntityConfigForProvider(entityConfig, queryConfig);
				providerConfig.entities.push(entityConfig);
			}, this);
			return providersConfig;
		},

		/**
		 * Returns existing provider config for specified data provider name or creates a new one.
		 * @private
		 * @param {Object} providersConfig Existing config of data providers.
		 * @param {String} entityDataProviderClassName Class name of data provider of specified entity.
		 * @return {Object} Provider configuration object.
		 */
		_getProviderConfig: function(providersConfig, entityDataProviderClassName) {
			var providerConfig = Terrasoft.findWhere(providersConfig, {className: entityDataProviderClassName});
			if (!providerConfig) {
				providerConfig = {
					className: entityDataProviderClassName,
					entities: []
				};
				providersConfig.push(providerConfig);
			}
			return providerConfig;
		},

		/**
		 * Decorates data loading config of specified entity with additional information before passing this config to
		 * a data provider.
		 * @private
		 * @param {Object} entityConfig Data loading config for specified entity.
		 * @param {Object} queryConfig Timeline query config.
		 */
		_decorateEntityConfigForProvider: function(entityConfig, queryConfig) {
			entityConfig.orderDirection = queryConfig.orderDirection;
			entityConfig.masterEntityInfo = queryConfig.masterEntityInfo;
			if (entityConfig.filters && entityConfig.filters.primaryColumnFilter) {
				entityConfig.lastItem = null;
				entityConfig.pagingOptions = this._getSingleRecordPagingOption();
			} else {
				entityConfig.lastItem = this._getLastLoadedItemByKey(entityConfig.entityConfigKey);
				entityConfig.pagingOptions = this._getQueryPagingOptions(entityConfig.entityConfigKey);
			}
		},

		/**
		 * Loads timeline records using data providers with specified configuration.
		 * @private
		 * @param {Object} providersConfig Config for each data provider.
		 * @param {Object} queryConfig Timeline query config.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution context.
		 */
		_loadDataByProvidersConfig: function(providersConfig, queryConfig, callback, scope) {
			Terrasoft.eachAsyncAll(providersConfig, function(providerConfig, nextFn) {
				var provider = Terrasoft.findWhere(this._providers, {alternateClassName: providerConfig.className});
				provider.getData({
					entities: providerConfig.entities,
					filters: queryConfig.filters
				}, nextFn, this);
			}, function(responses) {
				Ext.callback(callback, scope, [responses]);
			}, this);
		},

		/**
		 * Checks that response contains at least one record.
		 * @private
		 * @param {Array} responses Array of responses.
		 * @return {Boolean} True if at least one record was loaded.
		 */
		_checkAnyRecordLoaded: function(responses) {
			var result = false;
			Terrasoft.each(responses, function(response) {
				if (response && response.success) {
					response.queryResults.forEach(function(queryResult) {
						result = result || queryResult.rowsAffected > 0;
					});
				}
			}, this);
			return result;
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseObject#onDestroy
		 * @override
		 */
		onDestroy: function() {
			this._abortRequests();
			this._destroyDataProviders();
			this.callParent(arguments);
		},

		// endregion

		// region Methods: Public

		/**
		 * Initializes properties.
		 * @param {Object} config Config for loading data.
		 */
		init: function(config) {
			this._initQueryConfig(config);
			this._initPagingOptions();
			this._initDataProviders();
		},

		/**
		 * Loads list of timeline items.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		loadData: function(callback, scope) {
			this._abortRequests();
			var queryConfig = Terrasoft.deepClone(this._queryConfig);
			var entitiesToSelect = this._getEntitiesToSelect(queryConfig);
			if (entitiesToSelect.length === 0) {
				Ext.callback(callback, scope);
				return;
			}
			var providersConfig = this._buildProvidersConfig(entitiesToSelect, queryConfig);
			this._loadDataByProvidersConfig(providersConfig, queryConfig, function(response) {
				this._onDataLoaded(response, callback, scope);
			}, this);
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModelCollection#clear
		 * @override
		 */
		clear: function() {
			this._internalCollection.clear();
			this._clearPagingOptionsRowCounts();
			this.callParent(arguments);
		},

		/**
		 * Checks item that was recently added to master record can be visible in timeline.
		 * @param {Object} recordInfo Information about new timeline item.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback execution context.
		 */
		checkRecordCanBeVisible: function(recordInfo, callback, scope) {
			var queryConfig = Terrasoft.deepClone(this._queryConfig);
			var entitiesToSelect = this._findSelectableEntityConfigs(recordInfo.entitySchemaName, queryConfig);
			if (entitiesToSelect.length === 0) {
				Ext.callback(callback, scope, [false]);
				return;
			}
			entitiesToSelect.forEach(function(entityConfig) {
				entityConfig.filters = entityConfig.filters || {};
				entityConfig.filters.primaryColumnFilter = {
					primaryColumnName: recordInfo.primaryColumnName,
					primaryColumnValue: recordInfo.primaryColumnValue
				};
			}, this);
			var providersConfig = this._buildProvidersConfig(entitiesToSelect, queryConfig);
			this._loadDataByProvidersConfig(providersConfig, queryConfig, function(response) {
				var anyRecordWasLoaded = this._checkAnyRecordLoaded(response);
				Ext.callback(callback, scope, [anyRecordWasLoaded]);
			}, this);
		}

		// endregion

	});
});


