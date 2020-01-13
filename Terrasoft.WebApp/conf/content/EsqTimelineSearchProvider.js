Terrasoft.configuration.Structures["EsqTimelineSearchProvider"] = {innerHierarchyStack: ["EsqTimelineSearchProvider"]};
define("EsqTimelineSearchProvider", ["BaseTimelineSearchProvider"], function() {
	/**
	 * ESQ timeline search provider class.
	 */
	Ext.define("Terrasoft.configuration.EsqTimelineSearchProvider", {
		extend: "Terrasoft.BaseTimelineSearchProvider",
		alternateClassName: "Terrasoft.EsqTimelineSearchProvider",

		// region Properties: Private

		/**
		 * Finds all columns of entity that should be used for search.
		 * @private
		 * @param {Object} entityConfig Enitity timeline configuration.
		 * @return {String[]} Names of columns to search.
		 */
		_getEntitySearchColumns: function(entityConfig) {
			var searchColumns = [entityConfig.captionColumnName, entityConfig.messageColumnName];
			var entityColumns = entityConfig.columns || [];
			var additionalSearchColumns = entityColumns
				.filter(function(columnConfig) {
					return columnConfig.isSearchEnabled;
				})
				.map(function(columnConfig) {
					return columnConfig.columnName;
				});
			searchColumns = searchColumns.concat(additionalSearchColumns).filter(function(columnName) {
				return !Ext.isEmpty(columnName) && Ext.isString(columnName);
			});
			return searchColumns;
		},

		/**
		 * Builds ESQ filter group for search by entity timeline configuration.
		 * @private
		 * @param {Object} entityConfig Enitity timeline configuration.
		 * @param {String} searchKey Text to search.
		 * @return {Terrasoft.FilterGroup|null} ESQ filter group instance.
		 */
		_buildEntityEsqFilter: function(entityConfig, searchKey) {
			var searchColumns = this._getEntitySearchColumns(entityConfig);
			if (searchColumns.length === 0) {
				return null;
			}
			var filterGroup = Ext.create("Terrasoft.FilterGroup", {
				logicalOperation: Terrasoft.LogicalOperatorType.OR
			});
			Terrasoft.each(searchColumns, function(columnName) {
				filterGroup.addItem(
					Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.CONTAIN,
						columnName,
						searchKey
					)
				);
			}, this);
			return filterGroup;
		},

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseTimelineSearchProvider#performSearch
		 * @override
		 */
		performSearch: function(options) {
			var esqFilters = {};
			var args = Ext.isArray(options.args) ? options.args : [];
			Terrasoft.each(options.entitiesConfig, function(entityConfig) {
				var entityConfigKey = entityConfig.entityConfigKey;
				var esqFilter = this._buildEntityEsqFilter(entityConfig, options.searchKey);
				esqFilters[entityConfigKey] = esqFilter;
			}, this);
			Ext.callback(options.callback, options.scope, [esqFilters].concat(args));
		}

		// endregion

	});
});


