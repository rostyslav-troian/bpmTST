Terrasoft.configuration.Structures["TimelineColumnFiltersBuilder"] = {innerHierarchyStack: ["TimelineColumnFiltersBuilder"]};
define("TimelineColumnFiltersBuilder", [], function() {
	/**
	 * Class containing logic for building column filters for Timeline data providers.
	 * See {@link Terrasoft.CompareFilter}.
	 */
	Ext.define("Terrasoft.configuration.TimelineColumnFiltersBuilder", {
		alternateClassName: "Terrasoft.TimelineColumnFiltersBuilder",

		// region Methods: Private

		/**
		 * Builds exists filter by owner for request.
		 * @private
		 * @param {Object} ownerFilterConfig Owner filter config.
		 * @param {Object} owner Value for filtering.
		 * @return {Terrasoft.ExistsFilter} Exists filter.
		 */
		_buildExistsOwnerFilter: function(ownerFilterConfig, owner) {
			var subFilters = Terrasoft.createFilterGroup();
			subFilters.addItem(
				Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					ownerFilterConfig.subFilterColumnName,
					owner.value
				)
			);
			return Terrasoft.createExistsFilter(ownerFilterConfig.existsFilterColumnName, subFilters);
		},

		// endregion

		// region Methods: Public

		/**
		 * Builds filter by period for request.
		 * @param {Object} entityConfig Config for loading data.
		 * @param {Object} userFilters User filter config.
		 * @return {Terrasoft.CompareFilter|null}
		 */
		buildPeriodFilter: function(entityConfig, userFilters) {
			if (!userFilters || !userFilters.periodFilter) {
				return null;
			}
			var periodFilter = userFilters.periodFilter;
			var startDate = periodFilter.startDate;
			var dueDate = periodFilter.dueDate;
			var filterColumnName = entityConfig.orderColumnName;
			var filter = null;
			if (Ext.isDate(startDate) && Ext.isDate(dueDate)) {
				filter = Terrasoft.createColumnBetweenFilterWithParameters(
					filterColumnName,
					Terrasoft.startOfDay(startDate),
					Terrasoft.endOfDay(dueDate)
				);
			} else if (Ext.isDate(startDate)) {
				filter = Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.GREATER_OR_EQUAL,
					filterColumnName,
					Terrasoft.startOfDay(startDate)
				);
			} else if (Ext.isDate(dueDate)) {
				filter = Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.LESS_OR_EQUAL,
					filterColumnName,
					Terrasoft.endOfDay(dueDate)
				);
			}
			return filter;
		},

		/**
		 * Builds filter by owner for request.
		 * @param {Object} entityConfig Config for loading data.
		 * @param {Object} userFilters User filter config.
		 * @return {Terrasoft.FilterGroup|null}
		 */
		buildOwnerFilter: function(entityConfig, userFilters) {
			var filterColumnName = entityConfig.authorColumnName;
			if (!userFilters || !userFilters.ownerFilter || !filterColumnName) {
				return null;
			}
			var ownerFilters = userFilters.ownerFilter;
			var filtersConfig = entityConfig.filters || {};
			var ownerFilterConfig = filtersConfig.ownerFilter || {};
			var isExistsFilter =
				ownerFilterConfig.comparisonType &&
				ownerFilterConfig.comparisonType === Terrasoft.ComparisonType.EXISTS;
			var filterGroup = Terrasoft.createFilterGroup();
			filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.OR;
			Terrasoft.each(ownerFilters, function(owner) {
				if (!owner.value) {
					return;
				}
				if (isExistsFilter && ownerFilterConfig.existsFilterColumnName &&
					ownerFilterConfig.subFilterColumnName) {
					filterGroup.addItem(this._buildExistsOwnerFilter(ownerFilterConfig, owner));
				} else {
					filterGroup.addItem(
						Terrasoft.createColumnFilterWithParameter(
							Terrasoft.ComparisonType.EQUAL,
							filterColumnName,
							owner.value
						)
					);
				}
			}, this);
			return filterGroup;
		},

		/**
		 * Builds filter by primary column value.
		 * @param {Object} entityConfig Config for loading data.
		 * @return {Terrasoft.CompareFilter}
		 */
		buildMasterColumnFilter: function(entityConfig) {
			return Terrasoft.createColumnFilterWithParameter(
				Terrasoft.ComparisonType.EQUAL,
				entityConfig.referenceColumnName,
				entityConfig.masterRecordValue
			);
		},

		/**
		 * Builds filter by type for request.
		 * @param {Object} entityConfig Config for loading data.
		 * @return {Terrasoft.CompareFilter|null}
		 */
		buildTypeFilter: function(entityConfig) {
			var typeFilterConfig = (entityConfig.filters && entityConfig.filters.typeFilter) || {};
			var typeColumnName = typeFilterConfig.columnName || entityConfig.typeColumnName;
			var typeColumnValue = typeFilterConfig.columnValue || entityConfig.typeColumnValue;
			var comparisonType = typeFilterConfig.comparisonType || Terrasoft.ComparisonType.EQUAL;
			return typeColumnName && typeColumnValue
				? Terrasoft.createColumnFilterWithParameter(comparisonType, typeColumnName, typeColumnValue)
				: null;
		},

		/**
		 * Builds custom filter for request.
		 * @param {Object} entityConfig Config for loading data.
		 * @return {Terrasoft.CompareFilter|null}
		 */
		buildCustomFilter: function(entityConfig) {
			var customFilterConfig = entityConfig.filters && entityConfig.filters.customFilter;
			if (!customFilterConfig) {
				return null;
			}
			var comparisonType = customFilterConfig.comparisonType;
			switch (comparisonType) {
				case Terrasoft.ComparisonType.IS_NULL: {
					return Terrasoft.createColumnIsNullFilter(customFilterConfig.columnName);
				}
				case Terrasoft.ComparisonType.EQUAL:
				case Terrasoft.ComparisonType.NOT_EQUAL: {
					return Terrasoft.createColumnFilterWithParameter(
						comparisonType,
						customFilterConfig.columnName,
						customFilterConfig.columnValue
					);
				}
				default: {
					return null;
				}
			}
		},

		/**
		 * Builds filter checking that order column is not empty.
		 * @param {Object} entityConfig Config for loading data.
		 * @return {Terrasoft.CompareFilter|null}
		 */
		buildOrderColumnNotEmptyFilter: function(entityConfig) {
			//TODO: #CRM-37428 Error on Oracle version below 12. After fix remove the condition.
			return Terrasoft.useOffsetFetchPaging
				? Terrasoft.createColumnIsNotNullFilter(entityConfig.orderColumnName)
				: null;
		},

		/**
		 * Builds primary column value filter for entity schema query.
		 * @param {Object} entityConfig Config for loading data.
		 * @return {Terrasoft.CompareFilter|null}
		 */
		buildPrimaryColumnFilter: function(entityConfig) {
			var primaryColumnFilter = entityConfig.filters && entityConfig.filters.primaryColumnFilter;
			return primaryColumnFilter
				? Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL,
					primaryColumnFilter.primaryColumnName,
					primaryColumnFilter.primaryColumnValue
				)
				: null;
		}

		// endregion

	});

	return Ext.create("Terrasoft.TimelineColumnFiltersBuilder");
});


