Terrasoft.configuration.Structures["EsqTimelineDataProvider"] = {innerHierarchyStack: ["EsqTimelineDataProvider"]};
define("EsqTimelineDataProvider", ["TimelineColumnFiltersBuilder", "EsqTimelineSearchProvider",
		"BaseAjaxTimelineDataProvider"], function(filtersBuilder) {
	/**
	 * Timeline data provider class that uses Entity Schema Query for loading data of different entities.
	 */
	Ext.define("Terrasoft.configuration.EsqTimelineDataProvider", {
		extend: "Terrasoft.BaseAjaxTimelineDataProvider",
		alternateClassName: "Terrasoft.EsqTimelineDataProvider",

		// region Properties: Protected

		/**
		 * @override
		 */
		searchProviderClassName: "Terrasoft.EsqTimelineSearchProvider",

		// endregion

		// region Methods: Private

		/**
		 * Creates batch query for loading items and applies search filters if search was applied.
		 * @private
		 * @param {Object} searchResultEsqFilters Search result - Esq filter groups for each entity.
		 * @param {Array} entitiesConfig Array of configs for each entity whose records should be loaded.
		 * @param {Object} userFilters Object containing data of user filters like 'by owner', 'by period' etc.
		 */
		_createBatchQueryBySearchResult: function(searchResultEsqFilters, entitiesConfig, userFilters) {
			var batchQuery = Ext.create("Terrasoft.BatchQuery");
			var isSearchApplied = searchResultEsqFilters !== null;
			Terrasoft.each(entitiesConfig, function(entityConfig) {
				var entityEsqSearchFilter = isSearchApplied
					? searchResultEsqFilters[entityConfig.entityConfigKey]
					: null;
				if (isSearchApplied && !entityEsqSearchFilter) {
					return;
				}
				var pagingOptions = entityConfig.pagingOptions;
				if (pagingOptions.rowCount !== 0) {
					var esq = this._getItemQuery(entityConfig, userFilters);
					if (entityEsqSearchFilter) {
						esq.filters.addItem(entityEsqSearchFilter);
					}
					batchQuery.add(esq);
				}
			}, this);
			return batchQuery;
		},

		/**
		 * Builds EntitySchemaQuery for loading items of specific entity.
		 * @private
		 * @param {Object} entityConfig Entity config.
		 * @param {Object} userFilters User filters.
		 * @return {Terrasoft.EntitySchemaQuery} Query for loading items.
		 */
		_getItemQuery: function(entityConfig, userFilters) {
			var entitySchemaName = entityConfig.entitySchemaName;
			var esq = this._createEntitySchemaQuery(entitySchemaName);
			this._initQueryPagingOption(esq, entityConfig);
			this._addColumnsToEsq(esq, entityConfig);
			this._addParameterColumnsToEsq(esq, entityConfig);
			this._addEsqFilters(esq, entityConfig, userFilters);
			return esq;
		},

		/**
		 * Creates new EntitySchemaQuery instance for specified schema.
		 * @private
		 * @param {String} schemaName Root schema name.
		 * @return {Terrasoft.EntitySchemaQuery} Query for loading items.
		 */
		_createEntitySchemaQuery: function(schemaName) {
			return Ext.create("Terrasoft.EntitySchemaQuery", {
				rootSchemaName: schemaName,
				queryKind: Terrasoft.QueryKind.LIMITED
			});
		},

		/**
		 * Inits paging options for specific query.
		 * @private
		 * @param {Terrasoft.EntitySchemaQuery} esq Query.
		 * @param {Object} entityConfig Entity config.
		 */
		_initQueryPagingOption: function(esq, entityConfig) {
			var pagingOptions = entityConfig.pagingOptions;
			esq.isPageable = true;
			esq.rowCount = pagingOptions.rowCount;
			if (Terrasoft.useOffsetFetchPaging) {
				esq.rowsOffset = pagingOptions.rowsOffset;
			} else {
				this._addConditionalValues(esq, entityConfig);
			}
		},

		/**
		 * Adds conditional values to esq.
		 * @private
		 * @param {Terrasoft.EntitySchemaQuery} esq Query.
		 * @param {Object} entityConfig Entity config.
		 */
		_addConditionalValues: function(esq, entityConfig) {
			var lastItem = entityConfig.lastItem;
			if (!lastItem) {
				return;
			}
			var entitySchema = Terrasoft.configuration.EntityStructure[entityConfig.entitySchemaName] || {};
			var entityPrimaryColumnName = entitySchema.primaryColumnName || this.primaryColumnName;
			var conditionalValues = Ext.create("Terrasoft.ColumnValues");
			conditionalValues.setParameterValue(
				entityPrimaryColumnName,
				lastItem.get(this.primaryColumnName),
				Terrasoft.DataValueType.GUID
			);
			conditionalValues.setParameterValue(
				this.sortDateColumnName,
				lastItem.get(this.sortDateColumnName),
				Terrasoft.DataValueType.DATE_TIME
			);
			esq.conditionalValues = conditionalValues;
		},

		/**
		 * Adds columns to esq from configs.
		 * @private
		 * @param {Terrasoft.EntitySchemaQuery} esq Query.
		 * @param {Object} entityConfig Entity config.
		 */
		_addColumnsToEsq: function(esq, entityConfig) {
			var columns = entityConfig.columns;
			esq.addMacrosColumn(Terrasoft.QueryMacrosType.PRIMARY_COLUMN, this.primaryColumnName);
			this._addDefaultColumnsToEsq(esq, entityConfig);
			Terrasoft.each(
				columns,
				function(columnConfig) {
					esq.addColumn(columnConfig.columnName, columnConfig.columnAlias);
				},
				this
			);
		},

		/**
		 * Adds parameter columns to esq from configs.
		 * @private
		 * @param {Terrasoft.EntitySchemaQuery} esq Query.
		 * @param {Object} entityConfig Entity config.
		 */
		_addParameterColumnsToEsq: function(esq, entityConfig) {
			esq.addParameterColumn(entityConfig.entitySchemaName, Terrasoft.DataValueType.TEXT, "EntitySchemaName");
			esq.addParameterColumn(entityConfig.viewClassName, Terrasoft.DataValueType.TEXT, "TimelineViewClassName");
			esq.addParameterColumn(entityConfig.iconUrl, Terrasoft.DataValueType.TEXT, "IconUrl");
			esq.addParameterColumn(entityConfig.entityConfigKey, Terrasoft.DataValueType.TEXT, "EntityConfigKey");
		},

		/**
		 * Adds default columns to esq from configs.
		 * @private
		 * @param {Terrasoft.EntitySchemaQuery} esq Query.
		 * @param {Object} entityConfig Entity config.
		 */
		_addDefaultColumnsToEsq: function(esq, entityConfig) {
			if (entityConfig.orderColumnName) {
				var orderColumn = esq.addColumn(entityConfig.orderColumnName, this.sortDateColumnName);
				orderColumn.orderDirection = entityConfig.orderDirection;
			}
			if (entityConfig.authorColumnName) {
				esq.addColumn(entityConfig.authorColumnName, "Author");
			}
			if (entityConfig.captionColumnName) {
				esq.addColumn(entityConfig.captionColumnName, "Caption");
			}
			if (entityConfig.messageColumnName) {
				esq.addColumn(entityConfig.messageColumnName, "Message");
			}
		},

		/**
		 * Applies filters for request.
		 * @protected
		 * @param {Terrasoft.EntitySchemaQuery} esq Query.
		 * @param {Object} entityConfig Config for loading data.
		 * @param {Object} userFilters User filters.
		 */
		_addEsqFilters: function(esq, entityConfig, userFilters) {
			[
				filtersBuilder.buildOwnerFilter(entityConfig, userFilters),
				filtersBuilder.buildPeriodFilter(entityConfig, userFilters),
				filtersBuilder.buildMasterColumnFilter(entityConfig),
				filtersBuilder.buildTypeFilter(entityConfig),
				filtersBuilder.buildCustomFilter(entityConfig),
				filtersBuilder.buildPrimaryColumnFilter(entityConfig),
				filtersBuilder.buildOrderColumnNotEmptyFilter(entityConfig)
			].forEach(function(filter) {
				if (filter) {
					esq.filters.addItem(filter);
				}
			});
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseAjaxTimelineDataProvider#performLoadDataRequest
		 * @override
		 */
		performLoadDataRequest: function(searchResultEsqFilters, config, callback, scope) {
			var batchQuery =
				this._createBatchQueryBySearchResult(searchResultEsqFilters, config.entities, config.filters);
			if (batchQuery.queries.length === 0) {
				Ext.callback(callback, scope);
				return;
			}
			batchQuery.execute(callback, scope);
			return batchQuery.instanceId;
		},

		/**
		 * @inheritdoc Terrasoft.BaseAjaxTimelineDataProvider#onDataLoaded
		 * @override
		 */
		onDataLoaded: function(result, config, callback, scope) {
			Ext.callback(callback, scope, [Terrasoft.deepClone(result)]);
		}

		// endregion

	});
});


