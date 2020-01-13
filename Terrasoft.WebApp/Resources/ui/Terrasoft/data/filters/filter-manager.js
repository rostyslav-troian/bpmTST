/**
 * Class for work with collection of filters by current provider
 */
Ext.define("Terrasoft.data.filters.FilterManager", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.FilterManager",

	/**
	 * Names of filter classes for create a filter by type {@link Terrasoft.FilterType}
	 * @private
	 * @type {String[]}
	 */
	filterClasses: [
		"Terrasoft.BaseFilter",
		"Terrasoft.CompareFilter",
		"Terrasoft.IsNullFilter",
		"Terrasoft.BetweenFilter",
		"Terrasoft.InFilter",
		"Terrasoft.ExistsFilter",
		"Terrasoft.FilterGroup",
		"Terrasoft.AggregationFilter"
	],

	/**
	 * Filter provider
	 * @private
	 * @type {Terrasoft.BaseFilterProvider}
	 */
	provider: null,

	/**
	 * Root schema name
	 * @type {String}
	 */
	rootSchemaName: "",

	/**
	 * Group of filters
	 * @type {Terrasoft.FilterGroup}
	 */
	filters: null,

	/**
	 * Creates object instance {@link Terrasoft.FilterManager}
	 * @param {Object} config Instance configuration object.
	 * @return {Terrasoft.BaseFilter}
	 */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event changeFilter
			 * Fires on filter item change.
			 * @param {Terrasoft.BaseFilter} filter Changed filter item.
			 * @param {Terrasoft.FilterGroup} parentFilterGroup Parent filter group.
			 */
			"changeFilter",
			/**
			 * @event addFilter
			 * Fires on add filter item.
			 * @param {Terrasoft.BaseFilter} filter Added filter item.
			 * @param {Terrasoft.FilterGroup} parentFilterGroup Parent filter group.
			 */
			"addFilter",
			/**
			 * @event removeFilter
			 * Fires on remove filter item from filter group.
			 * @param {Terrasoft.BaseFilter} filter Deleted item filter.
			 * @param {Terrasoft.FilterGroup} parentFilterGroup Parent filter group.
			 */
			"removeFilter",
			/**
			 * @event rootFiltersChanged
			 * Fires on set root filter group.
			 * @param {Terrasoft.FilterGroup} filterGroup Root filter group.
			 */
			"rootFiltersChanged"
		);
		var provider = this.provider;
		if (provider) {
			this.rootSchemaName = provider.rootSchemaName;
			provider.on("replaceFilter", this.replaceFilter, this);
		}
	},

	/**
	 * Set root filter group.
	 * @param {Terrasoft.FilterGroup} filters Root filter group.
	 */
	setFilters: function(filters) {
		if (this.filters === filters) {
			return;
		}
		this.unSubscribeForFiltersTreeEvents(this.filters);
		filters.rootSchemaName = this.rootSchemaName;
		this.filters = filters;
		if (filters.getCount() > 0) {
			this.setRootFiltersMetaData(filters, function() {
				this.subscribeForFiltersTreeEvents(filters);
				this.fireEvent("rootFiltersChanged", filters, this);
			}, this);
		} else {
			this.subscribeForFiltersTreeEvents(filters);
			this.fireEvent("rootFiltersChanged", filters, this);
		}
	},

	/**
	 * Set root filters meta data.
	 * @private
	 * @param {Terrasoft.FilterGroup} filters Filters for actualize.
	 * @param {Function} callback Callback method.
	 * @param {Object} scope Callback method context.
	 */
	setRootFiltersMetaData: function(filters, callback, scope) {
		filters.serializationInfo = {serializeFilterManagerInfo: true};
		Terrasoft.DataProvider.getFiltersMetaData(filters, function(filtersMetaData) {
			this.setFilterGroupMetaData(filtersMetaData);
			callback.call(scope);
		}, this);
	},

	/**
	 * Set filter group meta data.
	 * @private
	 * @param {Object} filterGroupMetaData Filter group meta data.
	 * @param {String} groupKey Filter group key.
	 */
	setFilterGroupMetaData: function(filterGroupMetaData) {
		Terrasoft.each(filterGroupMetaData.items, function(filter, key) {
			if (filter.filterType === Terrasoft.FilterType.FILTER_GROUP) {
				this.setFilterGroupMetaData(filter, key);
			} else {
				this.setFilterMetaData(filter, key);
			}
		}, this);
	},

	/**
	 * Set filter meta data.
	 * @private
	 * @param {Object} filterMetaData Filter meta data.
	 * @param {String} filterKey Filter key.
	 */
	setFilterMetaData: function(filterMetaData, filterKey) {
		var filter = this.getItemByKey(filterKey);
		filter.dataValueType = filterMetaData.dataValueType;
		if (filter.dataValueType === Terrasoft.DataValueType.DATE_TIME) {
			filter.trimDateTimeParameterToDate = true;
		}
		var leftExpressionCaption = filterMetaData.leftExpressionCaption;
		// TODO: #213670
		var primaryColumnRegExp = new RegExp("\\.Id$", "ig");
		if (primaryColumnRegExp.test(leftExpressionCaption)) {
			var leftExpressionCaptionParts = leftExpressionCaption.split(".");
			leftExpressionCaptionParts = leftExpressionCaptionParts.slice(0, leftExpressionCaptionParts.length - 1);
			leftExpressionCaption = leftExpressionCaptionParts.join(".");
		}
		filter.leftExpressionCaption = leftExpressionCaption;
		filter.referenceSchemaName = filterMetaData.referenceSchemaName;
	},

	/**
	 * Hierarchical subscribe on filter group items events.
	 * @private
	 * @param {Terrasoft.FilterGroup} filters Filter group.
	 */
	subscribeForFiltersTreeEvents: function(filters) {
		if (!filters) {
			return;
		}
		this.subscribeForFilterEvents(filters);
		filters.each(function(item) {
			this.subscribeForFilterEvents(item);
			if (item.filterType === Terrasoft.FilterType.FILTER_GROUP) {
				this.subscribeForFiltersTreeEvents(item);
			}
		}, this);
	},

	/**
	 * Hierarchical unsubscribe on filter group items events.
	 * @private
	 * @param {Terrasoft.FilterGroup} filters Filter group.
	 */
	unSubscribeForFiltersTreeEvents: function(filters) {
		if (!filters) {
			return;
		}
		filters.each(function(item) {
			this.unSubscribeForFilterEvents(item);
			if (item.filterType === Terrasoft.FilterType.FILTER_GROUP) {
				this.unSubscribeForFiltersTreeEvents(item);
			}
		}, this);
		this.unSubscribeForFilterEvents(filters);
	},

	/**
	 * Subscribe for filter events.
	 * @private
	 * @param {Terrasoft.BaseFilter} filter Filter for subscribe.
	 */
	subscribeForFilterEvents: function(filter) {
		if (filter.filterType === Terrasoft.FilterType.FILTER_GROUP) {
			filter.on("add", this.onFiltersAddFilter, this);
			filter.on("remove", this.onFiltersRemoveFilter, this);
			filter.on("changeItem", this.onFiltersChangeFilter, this);
			if (!filter.parentCollection) {
				filter.on("logicalOperationChanged", this.onFiltersChangeFilter, this);
			}
		} else {
			filter.on("comparisonTypeChange", this.onFilterComparisonTypeChanged, this);
			// TODO: Another events
		}
		if (filter.isAggregative) {
			var subFilters = filter.subFilters ? filter.subFilters : filter.leftExpression.subFilters;
			this.subscribeForFiltersTreeEvents(subFilters);
		}
	},

	/**
	 * Unsubscribe for filter events.
	 * @private
	 * @param {Terrasoft.BaseFilter} filter Filter for unsubscribe.
	 */
	unSubscribeForFilterEvents: function(filter) {
		if (filter.filterType === Terrasoft.FilterType.FILTER_GROUP) {
			filter.un("add", this.onFiltersAddFilter, this);
			filter.un("remove", this.onFiltersRemoveFilter, this);
			filter.un("changeItem", this.onFiltersChangeFilter, this);
			if (!filter.parentCollection) {
				filter.un("logicalOperationChanged", this.onFiltersChangeFilter, this);
			}
		} else {
			filter.un("comparisonTypeChange", this.onFilterComparisonTypeChanged, this);
			// TODO: Another events
		}
		if (filter.isAggregative) {
			var subFilters = filter.subFilters ? filter.subFilters : filter.leftExpression.subFilters;
			this.unSubscribeForFiltersTreeEvents(subFilters);
		}
	},

	/**
	 * Returns item by key from filter group. Method worked by key for all chield items.
	 * @private
	 * @param {String} key Key.
	 * @param {Terrasoft.FilterGroup} filterGroup (optional) Filter group for search.
	 * If a group not specified, search starting with goor filter group.
	 * @return {Terrasoft.BaseFilter/Terrasoft.FilterGroup}
	 */
	getItemByKey: function(key, filterGroup) {
		var result = null;
		var parentFilters = filterGroup || this.filters;
		if (parentFilters.contains(key)) {
			result = parentFilters.get(key);
		} else {
			var items = parentFilters.getItems();
			for (var i = 0, ln = items.length; i < ln; i++) {
				var item = items[i];
				if (item.filterType === Terrasoft.FilterType.FILTER_GROUP) {
					result = this.getItemByKey(key, item);
				}
				if (item.isAggregative) {
					result = this.getItemInAggregationFilterByKey(item, key);
				}
				if (result) {
					break;
				}
			}
		}
		return result;
	},

	/**
	 * Returns item by key from aggregation filter.
	 * @private
	 * @param {Terrasoft.AggregationFilter} item Aggregative filter for search.
	 * @param {String} key Item key.
	 * @return {Terrasoft.BaseFilter/Terrasoft.FilterGroup}
	 */
	getItemInAggregationFilterByKey: function(item, key) {
		var subFilters = item.subFilters ? item.subFilters : item.leftExpression.subFilters;
		if (subFilters.key === key) {
			return subFilters;
		}
		var result = this.getItemByKey(key, subFilters);
		return result;
	},

	/**
	 * Handler for change filter item event.
	 * @private
	 * @param {Terrasoft.BaseFilter/Terrasoft.FilterGroup} filter Changed item.
	 */
	onFiltersChangeFilter: function(filter) {
		this.fireEvent("changeFilter", filter, filter.getParentFilters(), this);
	},

	/**
	 * Handler for add filter item event. {@link #filters}
	 * @private
	 * @param {Terrasoft.BaseFilter/Terrasoft.FilterGroup} filter Added item.
	 */
	onFiltersAddFilter: function(filter, key) {
		this.subscribeForFilterEvents(filter);
		this.fireEvent("addFilter", filter, filter.getParentFilters(), key, this);
	},

	/**
	 * Handler for remove filter item event. {@link #filters}
	 * @private
	 * @param {Terrasoft.BaseFilter/Terrasoft.FilterGroup} filter Removed item.
	 */
	onFiltersRemoveFilter: function(filter, key) {
		this.unSubscribeForFilterEvents(filter);
		this.fireEvent("removeFilter", filter, filter.getParentFilters(), key, this);
	},

	/**
	 * Handler for comparison type change event.
	 * @private
	 * @param {Terrasoft.BaseFilter} filter Filter.
	 */
	onFilterComparisonTypeChanged: function(filter) {
		var matchedFilterType = this.provider.getMatchingFilterType(filter);
		if (filter.filterType !== matchedFilterType) {
			var newFilter = Ext.create(this.filterClasses[matchedFilterType], {
				leftExpression: filter.leftExpression,
				dataValueType: filter.dataValueType,
				leftExpressionCaption: filter.leftExpressionCaption,
				comparisonType: filter.comparisonType,
				referenceSchemaName: filter.referenceSchemaName
			});
			this.replaceFilter(filter, newFilter);
		}
	},

	/**
	 * Replace filter in filter group.
	 * @private
	 * @param {Terrasoft.BaseFilter} oldFilter Removed filter.
	 * @param {Terrasoft.BaseFilter} newFilter Inserted filter.
	 */
	replaceFilter: function(oldFilter, newFilter) {
		var filterKey = oldFilter.key;
		var parentFilterGroup = oldFilter.getParentFilters();
		var index = parentFilterGroup.indexOf(oldFilter);
		parentFilterGroup.suspendEvents(false);
		try {
			parentFilterGroup.remove(oldFilter);
			this.unSubscribeForFilterEvents(oldFilter);
			parentFilterGroup.insert(index, filterKey, newFilter);
			this.subscribeForFilterEvents(newFilter);
		} finally {
			parentFilterGroup.resumeEvents();
		}
		parentFilterGroup.filterChanged(newFilter);
	},

	/**
	 * Returns serialized filters.
	 * @return {String}
	 */
	serializeFilters: function() {
		var serializationInfo = this.filters.getDefSerializationInfo();
		serializationInfo.serializeFilterManagerInfo = true;
		return this.filters.serialize(serializationInfo);
	},

	/**
	 * Add filter.
	 * @param {Terrasoft.FilterGroup} filterGroup Filter group.
	 * @param {Terrasoft.BaseFilter} oldFilter Old filter for replace.
	 */
	addFilter: function(filterGroup, oldFilter) {
		if (!filterGroup) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.FilterManager.FilterGroupIsNotDefined
			});
		}
		var schemaName = filterGroup.rootSchemaName ? filterGroup.rootSchemaName :
			filterGroup.parentCollection.rootSchemaName;
		filterGroup.rootSchemaName = schemaName;
		this.provider.subscribeForFilterSchemaName(schemaName);
		this.provider.rootSchemaName = schemaName;
		this.provider.getLeftExpression(function(leftExpressionResult) {
			var filter = this.provider.createDefaultFilter(leftExpressionResult);
			if (filter.dataValueType === Terrasoft.DataValueType.DATE_TIME ||
					filter.dataValueType === Terrasoft.DataValueType.DATE) {
				filter.trimDateTimeParameterToDate = true;
			}
			if (oldFilter) {
				this.replaceFilter(oldFilter, filter);
			} else {
				filterGroup.addItem(filter);
			}
		}, this, oldFilter);
	},

	/**
	 * Enables or disables filter or filter group by key.
	 * @param {String} filterKey Filter key.
	 * @param {Boolean} value Enable value.
	 */
	setEnableFilterValueByKey: function(filterKey, value) {
		var filter = this.getItemByKey(filterKey) || this.filters;
		filter.isEnabled = value;
		this.onFiltersChangeFilter(filter);
	},

	/**
	 * Groups selected filters.
	 * @param {Terrasoft.BaseFilter[]} filters
	 */
	groupFilters: function(filters) {
		if (!filters || filters.length === 0) {
			return;
		}
		var firstFilter = filters[0];
		var currentFilterGroup = firstFilter.getParentFilters();
		if (!currentFilterGroup) {
			return;
		}
		var startIndex = currentFilterGroup.indexOf(firstFilter);
		var newFilterGroup = Terrasoft.createFilterGroup();
		var newFilterGroupKey = Terrasoft.generateFilterKey();
		newFilterGroup.rootSchemaName = currentFilterGroup.rootSchemaName;
		currentFilterGroup.insert(startIndex, newFilterGroupKey, newFilterGroup);
		Terrasoft.each(filters, function(filter) {
			var filterKey = filter.key;
			currentFilterGroup.remove(filter);
			newFilterGroup.add(filterKey, filter);
		}, this);
	},

	/**
	 * Ungroups selected filter group, all filters move to parent filter group.
	 * @param {Terrasoft.FilterGroup} filterGroup
	 */
	unGroupFilters: function(filterGroup) {
		if (!filterGroup || !(filterGroup instanceof Terrasoft.FilterGroup)) {
			return;
		}
		var parentFilterGroup = filterGroup.getParentFilters();
		if (!parentFilterGroup) {
			return;
		}
		var startIndex = parentFilterGroup.indexOf(filterGroup);
		parentFilterGroup.remove(filterGroup);
		var filtersToUnGroup = filterGroup.getItems();
		for (var i = 0, ln = filtersToUnGroup.length; i < ln; i++) {
			var filter = filtersToUnGroup[0];
			var filterKey = filter.key;
			filterGroup.remove(filter);
			parentFilterGroup.insert(startIndex + i, filterKey, filter);
		}
	},

	/**
	 * Move up filter group item.
	 * @param {Terrasoft.BaseFilter/Terrasoft.FilterGroup} filter Filter group item.
	 */
	moveUp: function(filter) {
		if (!filter) {
			return;
		}
		var filterGroup = filter.getParentFilters();
		if (!filterGroup) {
			return;
		}
		var filterKey = filter.key;
		var index = filterGroup.indexOf(filter);
		if (index === 0) {
			var parentFilterGroup = filterGroup.getParentFilters();
			if (!parentFilterGroup) {
				return;
			}
			filterGroup.remove(filter);
			var indexInParentGroup = parentFilterGroup.indexOf(filterGroup);
			parentFilterGroup.insert(indexInParentGroup, filterKey, filter);
		} else {
			var upperFilter = filterGroup.getByIndex(index - 1);
			filterGroup.remove(filter);
			if (upperFilter.filterType === Terrasoft.FilterType.FILTER_GROUP) {
				upperFilter.add(filterKey, filter);
			} else {
				filterGroup.insert(index - 1, filterKey, filter);
			}
		}
	},

	/**
	 * Move down filter group item.
	 * @param {Terrasoft.BaseFilter/Terrasoft.FilterGroup} filter Filter group item.
	 */
	moveDown: function(filter) {
		if (!filter) {
			return;
		}
		var filterGroup = filter.getParentFilters();
		if (!filterGroup) {
			return;
		}
		var filterKey = filter.key;
		var index = filterGroup.indexOf(filter);
		var itemsCount = filterGroup.getCount();
		if (index === itemsCount - 1) {
			var parentFilterGroup = filterGroup.getParentFilters();
			if (!parentFilterGroup) {
				return;
			}
			filterGroup.remove(filter);
			var indexInParentGroup = parentFilterGroup.indexOf(filterGroup);
			parentFilterGroup.insert(indexInParentGroup + 1, filterKey, filter);
		} else {
			var lowerFilter = filterGroup.getByIndex(index + 1);
			filterGroup.remove(filter);
			if (lowerFilter.filterType === Terrasoft.FilterType.FILTER_GROUP) {
				lowerFilter.insert(0, filterKey, filter);
			} else {
				filterGroup.insert(index + 1, filterKey, filter);
			}
		}
	},

	/**
	 * Returns right expression display value.
	 * @param {Terrasoft.BaseFilter} filter Filter group item.
	 */
	getRightExpressionDisplayValue: function(filter) {
		return Terrasoft.getRightExpressionDisplayValue(filter);
	},

	/**
	 * Returns right expression value.
	 * @param {Terrasoft.BaseFilter} filter Filter group item.
	 */
	getRightExpressionValue: function(filter) {
		return Terrasoft.getRightExpressionValue(filter);
	},

	/**
	 * Toggle logical operation type (AND/OR) for filter group.
	 * @param {Terrasoft.FilterGroup} filterGroup Filter group.
	 */
	toggleFilterGroupLogicalOperation: function(filterGroup) {
		var newLogicalOperation = (filterGroup.logicalOperation === Terrasoft.LogicalOperatorType.AND) ?
			Terrasoft.LogicalOperatorType.OR : Terrasoft.LogicalOperatorType.AND;
		filterGroup.setLogicalOperation(newLogicalOperation);
	},

	/**
	 * Toggle filter right expression value by logical type column.
	 * @param {Terrasoft.CompareFilter} filter Filter.
	 */
	toggleFilterBooleanValue: function(filter) {
		if (filter.dataValueType !== Terrasoft.DataValueType.BOOLEAN) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		var currentValue = filter.rightExpression.parameter.getValue();
		this.setRightExpressionValue(filter, !currentValue);
	},

	/**
	 * Delete filter group item.
	 * @param {Terrasoft.BaseFilter/Terrasoft.FilterGroup} filter Filter group item.
	 */
	deleteItem: function(filter) {
		var parentFilters = filter.getParentFilters();
		parentFilters.remove(filter);
	},

	/**
	 * Set value for filter right expression.
	 * @param {Terrasoft.BaseFilter} filter Filter.
	 * @param {String/Number/Date/Boolean} value Value.
	 * @param {Terrasoft.FilterMacrosType} macrosType Macros type.
	 * @param {Terrasoft.core.enums.DataValueType} [dataValueType] Parameter type.
	 */
	setRightExpressionValue: function(filter, value, macrosType, dataValueType) {
		this.provider.setRightExpressionValue(filter, value, macrosType, dataValueType);
	},

	/**
	 * Sets values for filter right expressions.
	 * @param {Terrasoft.BaseFilter} filter Filter instance.
	 * @param {Array} values Array of values for right expressions.
	 * @param {Terrasoft.core.enums.DataValueType} [dataValueType] Type of right expression parameters.
	 */
	setRightExpressionsValues: function(filter, values, dataValueType) {
		this.provider.setRightExpressionsValues(filter, values, dataValueType);
	},

	/**
	 * Set comparison type for filter.
	 * @param {Terrasoft.BaseFilter} filter Filter.
	 * @param {Terrasoft.ComparisonType} comparisonType Comparison type.
	 */
	setComparisonType: function(filter, comparisonType) {
		filter.setComparisonType(comparisonType);
	},

	/**
	 * Set aggregation operation type for filter.
	 * @param {Terrasoft.BaseFilter} filter Filter
	 * @param {Terrasoft.ComparisonType} aggregationOperationCaption Aggregation operation type.
	 */
	setAggregationOperation: function(filter, aggregationOperationCaption) {
		var provider = this.provider;
		var matchedFilterType = provider.getFilterTypeByAggregationOperationCaption(aggregationOperationCaption);
		var leftExpression = filter.leftExpression;
		var comparisonType = provider.getComparisonTypeByCaption(aggregationOperationCaption);
		var aggregationType = provider.getAggregationTypeByCaption(aggregationOperationCaption);
		var filterTypeChanged = (filter.filterType !== matchedFilterType ||
				(!Ext.isEmpty(comparisonType) && filter.comparisonType !== comparisonType));
		var subFilters = filter.subFilters ? filter.subFilters : leftExpression.subFilters;
		var filterConfig = {};
		if (matchedFilterType === Terrasoft.FilterType.EXISTS) {
			filter.setLeftExpression(
				Ext.create("Terrasoft.ColumnExpression", {
					columnPath: leftExpression.columnPath
				})
			);
			filter.comparisonType = comparisonType;
			filterConfig = {
				subFilters: subFilters
			};
		} else {
			comparisonType = this.provider.defaultAggregationComparisonType;
			if (aggregationType === Terrasoft.AggregationType.COUNT) {
				filter.dataValueType = Terrasoft.DataValueType.INTEGER;
			}
			if (leftExpression.functionArgument) {
				leftExpression.functionArgument.aggregationType = aggregationType;
				filter.setLeftExpression(
					Ext.create("Terrasoft.FunctionExpression", {
						functionType: leftExpression.functionType,
						datePartType: leftExpression.datePartType,
						functionArgument: leftExpression.functionArgument,
						aggregationType: aggregationType
					}));
			} else {
				filter.setLeftExpression(
					Ext.create("Terrasoft.AggregationQueryExpression", {
						columnPath: leftExpression.columnPath,
						subFilters: subFilters,
						aggregationType: aggregationType
					}));
			}
		}
		if (filterTypeChanged) {
			Ext.apply(filterConfig, {
				leftExpression: filter.leftExpression,
				dataValueType: filter.dataValueType,
				leftExpressionCaption: filter.leftExpressionCaption,
				comparisonType: comparisonType,
				referenceSchemaName: filter.referenceSchemaName,
				isAggregative: true
			});
			var newFilter = Ext.create(this.filterClasses[matchedFilterType], filterConfig);
			this.replaceFilter(filter, newFilter);
		}
	},

	/**
	 * Returns allowed aggregation operation array for filter.
	 * @param {Terrasoft.BaseFilter} filter Filter.
	 * @return {String[]}
	 */
	getAllowedAggregationOperations: function(filter) {
		return this.provider.getAllowedAggregationOperations(filter);
	},

	/**
	 * Returns aggregation operation title for filter.
	 * @param {Terrasoft.BaseFilter} filter Filter.
	 * @return {String}
	 */
	getAggregationOperation: function(filter) {
		return this.provider.getAggregationOperation(filter);
	},

	/**
	 * Returns allowed comparison type array for filter.
	 * @param {Object} filter Filter.
	 * @return {Terrasoft.ComparisonType[]}
	 */
	getAllowedComparisonTypes: function(filter) {
		return this.provider.getAllowedComparisonTypes(filter);
	},

	/**
	 * Returns filterGroup allowed manage operations.
	 * @param {Terrasoft.BaseFilter} filterGroup FilterGroup for which operations requested.
	 * @return {Object} Allowed manage operations
	 * @return {Boolean} return.canViewEnabled Flag that indicates whether that the user can view filterGroup
	 * enable property.
	 * @return {Boolean} return.canEditEnabled Flag that indicates whether that the user can edit filterGroup
	 * enable\disable property.
	 * @return {Boolean} return.canViewGroupType Flag that indicates whether that the user can view filterGroup type.
	 * @return {Boolean} return.canEditGroupType Flag that indicates whether that the user can change filterGroup type.
	 * @return {Boolean} return.canAddFilters Flag that indicates whether that the user can add filters to filterGroup.
	 * @return {Boolean} return.canRemove Flag that indicates whether that the user can remove filterGroup.
	 * @return {Boolean} return.canSelect Flag that indicates whether that the user can select filterGroup.
	 */
	getAllowedFilterGroupManageOperations: function(filterGroup) {
		return this.provider.getAllowedFilterGroupManageOperations(filterGroup);
	},

	/**
	 * Returns filter allowed manage operations.
	 * @param {Terrasoft.BaseFilter} filterItem Filter for which operations requested.
	 * @return {Object} Allowed manage operations
	 * @return {Boolean} return.canViewEnabled Flag that indicates whether that the user can view filter
	 * enable property.
	 * @return {Boolean} return.canEditEnabled Flag that indicates whether that the user can edit filter
	 * enable\disable property.
	 * @return {Boolean} return.canEditLeftExpression Flag that indicates whether that the user can change filter
	 * left expression.
	 * @return {Boolean} return.canEditRightExpression Flag that indicates whether that the user can change filter
	 * right expression.
	 * @return {Boolean} return.canEditComparisonType Flag that indicates whether that the user can change filter
	 * comparison type.
	 * @return {Boolean} return.canRemove Flag that indicates whether that the user can remove filter.
	 * @return {Boolean} return.canSelect Flag that indicates whether that the user can select filter.
	 */
	getAllowedFilterManageOperations: function(filterItem) {
		return this.provider.getAllowedFilterManageOperations(filterItem);
	},

	/**
	 * Select lookup column value and set value into filter right expressions.
	 * @param {Terrasoft.BaseFilter} filter Filter.
	 */
	getLookupFilterValue: function(filter) {
		this.provider.getLookupFilterValue(filter);
	},

	/**
	 * Unsubscribe all events and destroy object instance.
	 * @override
	 */
	onDestroy: function() {
		var filters = this.filters;
		this.unSubscribeForFiltersTreeEvents(filters);
		var provider = this.provider;
		if (provider) {
			provider.un("replaceFilter", this.replaceFilter, this);
		}
		this.callParent(arguments);
	}

});
