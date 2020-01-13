/*jshint quotmark: false */
define(["ext-base", "terrasoft", "data-provider"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
			Ext.onReady(function() {
				/**
     * Provider of object schema filtering
     */
				Ext.define('Terrasoft.data.filters.EntitySchemaFilterProviderMock', {
					extend: 'Terrasoft.BaseFilterProvider',
					alternateClassName: 'Terrasoft.EntitySchemaFilterProviderMock',

					rootSchemaName: "Contact",

					/**
      * Emulate the results of the StructureExplorer work to select the left part of the filter
      * The array of configs for the left parts of the filters
      * @private
      */
					leftExpressionsArrayMock: [
						{
							dataValueType: Terrasoft.DataValueType.TEXT,
							leftExpressionCaption: 'Имя',
							leftExpressionColumnPath: 'Name'
						},
						{
							dataValueType: Terrasoft.DataValueType.INTEGER,
							leftExpressionCaption: 'Возраст',
							leftExpressionColumnPath: 'Age'
						},
						{
							dataValueType: Terrasoft.DataValueType.DATE,
							leftExpressionCaption: 'Дата рождения',
							leftExpressionColumnPath: 'BirthDate'
						},
						{
							dataValueType: Terrasoft.DataValueType.LOOKUP,
							isLookup: true,
							referenceSchemaName: 'Account',
							leftExpressionCaption: 'Контрагент',
							leftExpressionColumnPath: 'Account'
						},
						{
							dataValueType: Terrasoft.DataValueType.BOOLEAN,
							leftExpressionCaption: 'Не звонить',
							leftExpressionColumnPath: 'DoNotCall'
						}
					],

					/**
      * Emulate the results of the StructureExplorer work to select the left part of the filter
      * The array of configs for the left parts of the filters
      * @private
      */
					lookupValuesArrayMock: [
						{
							value: '33cc4a3a-babb-464d-82a0-1b904d198d31',
							displayValue: 'Террасофт'
						},
						{
							value: '33cc4a3a-babb-464d-82a0-1b904d198d32',
							displayValue: 'Феерия'
						},
						{
							value: '33cc4a3a-babb-464d-82a0-1b904d198d33',
							displayValue: 'Microsoft'
						},
						{
							value: '33cc4a3a-babb-464d-82a0-1b904d198d34',
							displayValue: 'Apple'
						},
						{
							value: '33cc4a3a-babb-464d-82a0-1b904d198d35',
							displayValue: 'Компания'
						}
					],

					/**
      * Allowed types of filters
      * @type {Terrasoft.FilterType[]}
      */
					allowedFilterTypes: [
						Terrasoft.FilterType.COMPARE,
						Terrasoft.FilterType.IS_NULL,
						Terrasoft.FilterType.IN,
						Terrasoft.FilterType.EXISTS
					],

					leftExpressionTypes: [
						"ColumnExpression"
					],

					/**
      * Gets the left side of the expression and calls the callback function in the scope context
      * @param {Function} the callback function that will be called when the left side of the expression is received
      * @param {Object} the scope context in which the callback function is called
      */
					getLeftExpression: function(callback, scope) {
						// TODO: Because this is the configuration module, you need to call the StructureExplorer window
						// TODO: Processing the column selection results
						var randomLeftExpressionNumber = Ext.Number.randomInt(0, this.leftExpressionsArrayMock.length - 1);
						var leftExpressionResult = this.leftExpressionsArrayMock[randomLeftExpressionNumber];
						callback.call(scope || this, leftExpressionResult);
					},

					/**
      * Creates a default filter for the specified configuration
      * @param {Object} filterConfig Filter Configuration
      * @return {Terrasoft.BaseFilter} Returns the created instance of the filter
      */
					createDefaultFilter: function(filterConfig) {
						var leftExpression = Ext.create('Terrasoft.ColumnExpression', {
							columnPath: filterConfig.leftExpressionColumnPath
						});
						var dataValueType = filterConfig.dataValueType;
						var config = {
							dataValueType: dataValueType,
							leftExpressionCaption: filterConfig.leftExpressionCaption,
							leftExpression: leftExpression,
							comparisonType: this.defaultComparisonType
						};
						var filterClassName;
						if (dataValueType === Terrasoft.DataValueType.LOOKUP) {
							filterClassName = 'Terrasoft.InFilter';
						} else {
							filterClassName = 'Terrasoft.CompareFilter';
							Ext.apply(config, {
								rightExpression: Ext.create('Terrasoft.ParameterExpression', {
									parameterDataType: dataValueType,
									parameterValue: (dataValueType === Terrasoft.DataValueType.BOOLEAN) ? true : null
								})
							});
						}
						return Ext.create(filterClassName, config);
					},

					/**
      * Gets the value for the reference column and executes the callback function in the context scope
      * @param {Terrasoft.BaseFilter} filter Filter by reference column
      */
					getLookupFilterValue: function(filter) {
						// TODO: Because this is the configuration module, you need to call the StructureExplorer window
						// TODO: Handling the results of selecting reference records
						var randomNumber = Ext.Number.randomInt(0, this.lookupValuesArrayMock.length - 1);
						var lookupValueResult = this.lookupValuesArrayMock[randomNumber];
						this.setRightExpressionsValues(filter, [lookupValueResult]);
					}
				});
				var entitySchemaProvider = Ext.create('Terrasoft.EntitySchemaFilterProviderMock');
				var filterManager = window.filterManager = Ext.create('Terrasoft.FilterManager', {
					provider: entitySchemaProvider
				});
				filterManager.setFilters(Ext.create('Terrasoft.FilterGroup'));

				/* Aggregation Filters */
				Terrasoft.DataProvider.getFiltersMetaData = function(filters, callback, scope) {
					callback.call(scope, filters);
				};
				var aggregationSubFilter = Ext.create('Terrasoft.CompareFilter', {
					leftExpressionCaption: 'Заголовок',
					leftExpression: Ext.create('Terrasoft.ColumnExpression', {
						columnPath: 'Title'
					}),
					rightExpression: Ext.create('Terrasoft.ParameterExpression', {
						parameterDataType: Terrasoft.DataValueType.TEXT,
						parameterValue: 'Some title'
					})
				});
				var leftExpression = Ext.create('Terrasoft.AggregationQueryExpression', {
					columnPath: '[Activity.Contact].Id',
					aggregationType: Terrasoft.AggregationType.COUNT,
					subFilters: Ext.create('Terrasoft.FilterGroup', {
						items: [
							aggregationSubFilter
						]
					})
				});
				var rightExpression = Ext.create('Terrasoft.ParameterExpression', {
					parameterDataType: Terrasoft.DataValueType.INTEGER,
					parameterValue: 10
				});
				var aggregationCountFilter = Ext.create('Terrasoft.CompareFilter', {
					leftExpression: leftExpression,
					leftExpressionCaption: 'Активность (по колонке Контакт)',
					rightExpression: rightExpression,
					isAggregative: true
				});
				var aggregationIsNullFilter = Ext.create('Terrasoft.IsNullFilter', {
					leftExpression: leftExpression,
					leftExpressionCaption: 'Активность (по колонке Контакт)',
					isAggregative: true
				});

				var existsFilter = Ext.create('Terrasoft.ExistsFilter', {
					leftExpression: leftExpression,
					leftExpressionCaption: 'Активность (по колонке Контакт)'
				});

				var aggregationFilterRootGroup = Ext.create('Terrasoft.FilterGroup', {
					items: [
						aggregationCountFilter,
						aggregationIsNullFilter,
						existsFilter
					]
				});
				var aggregationFilterManager = window.aggregationFilterManager = Ext.create('Terrasoft.FilterManager', {
					provider: entitySchemaProvider
				});
				aggregationFilterManager.setFilters(aggregationFilterRootGroup);
				/* Aggregation Filters */

				// Binding example
				var viewModel = window.viewModel = Ext.create('Terrasoft.BaseViewModel', {
					values: {
						FilterManager: filterManager,
						SelectedFilters: null
					},
					methods: {
						getFiltersArray: function() {
							var selectedItems = this.get('SelectedFilters');
							var filtersArray = [];
							Terrasoft.each(selectedItems, function(item) {
								filtersArray.push(item);
							});
							return filtersArray;
						},
						getFilter: function() {
							var selectedItems = this.get('SelectedFilters');
							var filtersArray = [];
							Terrasoft.each(selectedItems, function(item) {
								filtersArray.push(item);
							});
							return (filtersArray.length > 0) ? filtersArray[0] : null;
						},
						groupItems: function() {
							var filterManager = this.get('FilterManager');
							filterManager.groupFilters(this.getFiltersArray());
						},
						unGroupItems: function() {
							var filterManager = this.get('FilterManager');
							filterManager.unGroupFilters(this.getFilter());
						},
						moveUp: function() {
							var filterManager = this.get('FilterManager');
							filterManager.moveUp(this.getFilter());
						},
						moveDown: function() {
							var filterManager = this.get('FilterManager');
							filterManager.moveDown(this.getFilter());
						}
					}
				});
				var filterEditContainer = Ext.create('Terrasoft.Container', {
					id: 'filteredit',
					renderTo: renderTo,
					selectors: {
						wrapEl: '#filteredit'
					},
					items: [
						{
							className: 'Terrasoft.Container',
							id: 'filter-edit-toolbar',
							selectors: {
								el: '#filter-edit-toolbar',
								wrapEl: '#filter-edit-toolbar'
							},
							items: [
								{
									className: 'Terrasoft.Button',
									caption: 'Группировать',
									click: {
										bindTo: 'groupItems'
									}
								},
								{
									className: 'Terrasoft.Button',
									caption: 'Разгруппировать',
									click: {
										bindTo: 'unGroupItems'
									}
								},
								{
									className: 'Terrasoft.Button',
									caption: 'Вверх',
									click: {
										bindTo: 'moveUp'
									}
								},
								{
									className: 'Terrasoft.Button',
									caption: 'Вниз',
									click: {
										bindTo: 'moveDown'
									}
								}
							]
						},
						{
							className: 'Terrasoft.FilterEdit',
							renderTo: Ext.get('filteredit'),
							filterManager: {
								bindTo: 'FilterManager'
							},
							selectedItems: {
								bindTo: 'SelectedFilters'
							}
						}
					]
				});
				filterEditContainer.bind(viewModel);
			});
		}
	};
});
/*jshint quotmark: true */
