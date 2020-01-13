Terrasoft.configuration.Structures["EsnTimelineDataProvider"] = {innerHierarchyStack: ["EsnTimelineDataProvider"]};
define("EsnTimelineDataProvider", ["ServiceHelper", "TimelineColumnFiltersBuilder", "EsnTimelineSearchProvider",
		"BaseAjaxTimelineDataProvider"], function(ServiceHelper, filtersBuilder) {
	/**
	 * Timeline data provider class that loads ESN data.
	 */
	Ext.define("Terrasoft.configuration.EsnTimelineDataProvider", {
		extend: "Terrasoft.BaseAjaxTimelineDataProvider",
		alternateClassName: "Terrasoft.EsnTimelineDataProvider",

		// region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.BaseTimelineDataProvider#searchProviderClassName
		 * @override
		 */
		searchProviderClassName: "Terrasoft.EsnTimelineSearchProvider",

		// endregion

		// region Methods: Private

		/**
		 * Returns config for request to EsnService.
		 * @param {Object} entityConfig ESN entity config.
		 * @param {Terrasoft.FilterGroup|null} searchResultEsqFilters Filter group that was build by search provider.
		 * @param {Object} userFilters Object containing data of user filters like 'by owner', 'by period' etc.
		 * @return {Object} Request config.
		 */
		_getEsnServiceConfig: function(entityConfig, searchResultEsqFilters, userFilters) {
			var pagingOptions = entityConfig.pagingOptions;
			var lastItem = entityConfig.lastItem;
			var lessThanDate = lastItem ? Terrasoft.encodeDate(lastItem.get(this.sortDateColumnName)) : undefined;
			var filtersData = Terrasoft.createFilterGroup();
			[
				searchResultEsqFilters && searchResultEsqFilters[entityConfig.entityConfigKey],
				filtersBuilder.buildOwnerFilter(entityConfig, userFilters),
				filtersBuilder.buildPeriodFilter(entityConfig, userFilters),
				filtersBuilder.buildPrimaryColumnFilter(entityConfig)
			].forEach(function(filter) {
				if (filter) {
					filtersData.addItem(filter);
				}
			});
			var masterEntityInfo = entityConfig.masterEntityInfo;
			return {
				"schemaUId": masterEntityInfo.entitySchemaUId,
				"entityId": entityConfig.masterRecordValue,
				"readOptions": {
					"ReadMessageCount": pagingOptions.rowCount,
					"OffsetDate": lessThanDate,
					"OrderDirection": entityConfig.orderDirection,
					"Filters": filtersData.getCount() > 0 ? filtersData.serialize() : ""
				}
			};
		},

		/**
		 * Creates config for creating timeline view models of ESN records from received ESN service response.
		 * @param {Object} response ESN service response.
		 * @param {Object} entityConfig ESN timeline config.
		 * @return {Object} Config for creating timeline view models of ESN records.
		 */
		_createTimelineViewModelsConfig: function(response, entityConfig) {
			var rowConfig = {};
			rowConfig[this.sortDateColumnName] = {
				dataValueType: Terrasoft.DataValueType.DATE_TIME
			};
			var rows = response.EsnMessages.map(function(esnMessage) {
				var row = {
					"Author": esnMessage.CreatedBy,
					"Message": esnMessage.Message,
					"EntityConfigKey": entityConfig.entityConfigKey,
					"EntitySchemaName": entityConfig.entitySchemaName,
					"IconUrl": entityConfig.iconUrl,
					"TimelineViewClassName": entityConfig.viewClassName
				};
				row[this.primaryColumnName] = esnMessage.Id;
				row[this.sortDateColumnName] = esnMessage.CreatedOn;
				return row;
			}, this);
			return {
				rows: rows,
				rowConfig: rowConfig,
				rowsAffected: response.EsnMessages.length
			};
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseTimelineDataProvider#validateConfig
		 * @override
		 */
		validateConfig: function(config) {
			var isValid = this.callParent(arguments);
			if (isValid && config.entities.length !== 1) {
				throw new Terrasoft.InvalidOperationException();
			}
			return isValid;
		},

		/**
		 * @inheritdoc Terrasoft.BaseAjaxTimelineDataProvider#performLoadDataRequest
		 * @override
		 */
		performLoadDataRequest: function(searchResultEsqFilters, config, callback, scope) {
			var entityConfig = config.entities[0];
			var userFilters = config.filters;
			var data = this._getEsnServiceConfig(entityConfig, searchResultEsqFilters, userFilters);
			var requestId = Terrasoft.generateGUID();
			ServiceHelper.callService({
				serviceName: "EsnService",
				methodName: "ReadEntityMessage",
				requestId: requestId,
				data: data,
				callback: callback,
				scope: scope
			});
			return requestId;
		},

		/**
		 * @inheritdoc Terrasoft.BaseAjaxTimelineDataProvider#onDataLoaded
		 * @override
		 */
		onDataLoaded: function(response, config, callback, scope) {
			var entityConfig = config.entities[0];
			var queryResults = [];
			if (response.success) {
				queryResults.push(this._createTimelineViewModelsConfig(response, entityConfig));
			}
			Ext.callback(callback, scope, [{
				success: response.success,
				queryResults: queryResults
			}]);
		}

		// endregion

	});
});


