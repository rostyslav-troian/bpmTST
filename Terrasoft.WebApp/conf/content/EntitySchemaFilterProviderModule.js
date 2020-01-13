Terrasoft.configuration.Structures["EntitySchemaFilterProviderModule"] = {innerHierarchyStack: ["EntitySchemaFilterProviderModule"]};
define("EntitySchemaFilterProviderModule", ["terrasoft", "sandbox", "EntitySchemaFilterProviderModuleResources",
	"StructureExplorerUtilities", "LookupUtilities"],
	function(Terrasoft, sandbox, resources, StructureExplorerUtilities, LookupUtilities) {

		/**
		 * ################ ###### ########
		 * @private
		 * @type {Object}
		 */
		var localizableStrings = resources.localizableStrings;

		/**
		 * @class Terrasoft.data.filters.EntitySchemaFilterProvider
		 * ######### ########## #### ########
		 */
		Ext.define("Terrasoft.data.filters.EntitySchemaFilterProvider", {
			extend: "Terrasoft.data.filters.BaseFilterProvider",
			alternateClassName: "Terrasoft.EntitySchemaFilterProvider",
			sandbox: sandbox,

			/**
			 * ######### ###### ## {@link Ext.Element} # ####### ##### ########### ####### ##########.
			 * #### ######## ####### - ## ######### ###### ########### ##### ## ## ########## ############.
			 * #### ######## ## ####### - ## ##### ############## ######## ##### {@link #render render()}
			 * @type {Ext.Element}
			 */
			renderTo: null,

			/**
			 * Root schema name.
			 * @type {String}
			 */
			rootSchemaName: "",

			/**
			 * Indicates the filter provider can display column Id.
			 * @type {Boolean}
			 */
			canDisplayId: false,

			/**
			 * Indicates if the lookup actions are visible.
			 * @type {Boolean}
			 */
			shouldHideLookupActions: false,

			/**
			 * ############# ###### ###### #######
			 * @type {String}
			 */
			structureExplorerId: "",

			/**
			 * ############# ###### ###### ########## ########
			 * @type {String}
			 */
			selectDataId: "",

			/**
			 * ########### #### ########
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
			 * Indicates if the column settings are hidden.
			 * @type {Boolean}
			 */
			isColumnSettingsHidden: false,

			/**
			 * ####### ######### #########
			 * @return {Terrasoft.Collection} ########## ######### ######### #########
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initDateMacrosTypes();
				var sandbox = this.sandbox;
				var structureExplorerId = this.structureExplorerId = sandbox.id + "_StructureExplorerPage";
				sandbox.subscribe("StructureExplorerInfo", function() {
					return {
						useBackwards: true,
						useExists: true,
						summaryColumnsOnly: false
					};
				}, [structureExplorerId]);
				this.selectDataId = sandbox.id + "_LookupPage";
				var entitySchemaFilterProvider = this;
				sandbox.subscribe("GetStructureExplorerSchemaName", function() {
					return entitySchemaFilterProvider.rootSchemaName;
				}, [structureExplorerId]);
			},

			/**
			 * ######### ####### ###### #######
			 * @private
			 */
			onColumnSelected: function(leftExpressionResult, callback, scope) {
				callback.call(scope || this, leftExpressionResult);
			},

			/**
			 * ######## ### ######### ## ######### ## #### ######## dataValueType
			 * @param {Terrasoft.DataValueType} dataValueType ### ########
			 * @return {Terrasoft.AggregationType} ########## ### #########
			 */
			getAggregationTypeByDataValueType: function(dataValueType) {
				var result;
				switch (dataValueType) {
					case Terrasoft.DataValueType.INTEGER:
					case Terrasoft.DataValueType.FLOAT:
					case Terrasoft.DataValueType.MONEY:
						result = Terrasoft.AggregationType.SUM;
						break;
					case Terrasoft.DataValueType.DATE:
					case Terrasoft.DataValueType.DATE_TIME:
					case Terrasoft.DataValueType.TIME:
						result = Terrasoft.AggregationType.MAX;
						break;
					default:
						throw new Terrasoft.UnsupportedTypeException();
				}
				return result;
			},

			/**
			 * ######## ##### ##### ######### # ######## ####### callback # ######### scope
			 * @virtual
			 * @param {Function} callback #######, ####### ##### ####### ### ######### ###### ##### #########
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback
			 * @param {Terrasoft.BaseFilter} oldFilter ############ ######, ####### ##### ######## #########
			 */
			getLeftExpression: function(callback, scope, oldFilter) {
				var entitySchemaFilterProvider = this;
				var config = this.getLeftExpressionConfig();
				if (oldFilter) {
					var oldFilterConfig = {
						columnPath: oldFilter.leftExpression.columnPath,
						isAggregative: oldFilter.isAggregative,
						leftExpressionAggregationType: oldFilter.leftExpression.aggregationType,
						leftExpressionFilterType: oldFilter.filterType
					};
					Ext.apply(config, oldFilterConfig);
				}
				var handler = function(args) {
					entitySchemaFilterProvider.onColumnSelected(args, callback, scope);
				};
				this.openStructureExplorer(config, handler, this);
			},

			/**
			 * Opens the structure explorer.
			 * @private
			 * @param {Object} config Config.
			 * @param {Function} callback Callback function.
			 * @param {Function} callback Callback execution context.
			 */
			openStructureExplorer: function(config, callback, scope) {
				StructureExplorerUtilities.Open(this.sandbox, config, callback, this.renderTo, scope || this);
			},

			/**
			 * Returns config for the editor of left expression.
			 * @protected
			 * @returns {Object} Config.
			 */
			getLeftExpressionConfig: function() {
				return {
					excludeDataValueTypes: [Terrasoft.DataValueType.IMAGELOOKUP],
					useBackwards: true,
					displayId: this.canDisplayId,
					schemaName: this.rootSchemaName
				};
			},

			/**
			 * ####### ####### ###### ## ######## ############
			 * @param {Object} filterConfig ############ #######
			 * @return {Terrasoft.BaseFilter} ########## ######### ######### #######
			 */
			createSimpleFilter: function(filterConfig) {
				var leftExpression = Ext.create("Terrasoft.ColumnExpression", {
					columnPath: filterConfig.leftExpressionColumnPath
				});
				var dataValueType = filterConfig.dataValueType;
				var config = {
					dataValueType: dataValueType,
					leftExpressionCaption: filterConfig.leftExpressionCaption,
					leftExpression: leftExpression
				};
				var filterClassName;
				switch (dataValueType) {
					case Terrasoft.DataValueType.LOOKUP:
						filterClassName = "Terrasoft.InFilter";
						Ext.apply(config, {
							referenceSchemaName: filterConfig.referenceSchemaName
						});
						break;
					case Terrasoft.DataValueType.IMAGELOOKUP:
						filterClassName = "Terrasoft.IsNullFilter";
						Ext.apply(config, {
							comparisonType: this.defaultImageLookupComparisonType
						});
						break;
					default:
						filterClassName = "Terrasoft.CompareFilter";
						Ext.apply(config, {
							rightExpression: Ext.create("Terrasoft.ParameterExpression", {
								parameterDataType: dataValueType,
								parameterValue: (dataValueType === Terrasoft.DataValueType.BOOLEAN) ? true : null
							})
						});
						break;
				}
				return Ext.create(filterClassName, config);
			},

			/**
			 * ####### ############# ###### ## ######## ############
			 * @param {Object} filterConfig ############ #######
			 * @return {Terrasoft.BaseFilter} ########## ######### ######### #######
			 */
			createAggregativeFilter: function(filterConfig) {
				var config = {
					isAggregative: true,
					leftExpressionCaption: filterConfig.leftExpressionCaption
				};
				var referenceSchemaName = filterConfig.referenceSchemaName;
				var subFilters = Ext.create("Terrasoft.FilterGroup", {
					rootSchemaName: referenceSchemaName,
					key: Terrasoft.generateGUID()
				});
				var filterClassName = "Terrasoft.CompareFilter";
				var leftExpressionClassName = "Terrasoft.AggregationQueryExpression";
				var dataValueType = filterConfig.dataValueType;
				if (!dataValueType) {
					dataValueType = Terrasoft.DataValueType.INTEGER;
				}
				var useAggregativeFunction = filterConfig.isAggregative;
				var aggregationType = this.getAggregationTypeByDataValueType(dataValueType);
				if (useAggregativeFunction) {
					switch (filterConfig.aggregationFunction) {
						case "exists":
							filterClassName = "Terrasoft.ExistsFilter";
							leftExpressionClassName = "Terrasoft.ColumnExpression";
							break;
						case "count":
							dataValueType = Terrasoft.DataValueType.INTEGER;
							aggregationType = Terrasoft.AggregationType.COUNT;
							break;
					}
				}
				Ext.apply(config, {
					leftExpression: Ext.create(leftExpressionClassName, {
						columnPath: filterConfig.leftExpressionColumnPath
					})
				});
				if (filterClassName === "Terrasoft.CompareFilter") {
					Ext.apply(config, {
						comparisonType: this.defaultAggregationComparisonType,
						dataValueType: dataValueType,
						rightExpression: Ext.create("Terrasoft.ParameterExpression", {
							parameterDataType: dataValueType,
							parameterValue: null
						})
					});
					Ext.apply(config.leftExpression, {
						subFilters: subFilters,
						aggregationType: aggregationType
					});
				} else {
					config.subFilters = subFilters;
				}
				return Ext.create(filterClassName, config);
			},

			/**
			 * ####### ###### ## ######### ## ######## ############
			 * @param {Object} filterConfig ############ #######
			 * @return {Terrasoft.BaseFilter} ########## ######### ######### #######
			 */
			createDefaultFilter: function(filterConfig) {
				var defaultFilter;
				if (filterConfig.isBackward) {
					defaultFilter = this.createAggregativeFilter(filterConfig);
				} else {
					defaultFilter = this.createSimpleFilter(filterConfig);
				}
				return defaultFilter;
			},

			/**
			 * ####### ######## ## ######### ######## ##### #######
			 * @param {String} schemaName ######## ##### #######
			 */
			subscribeForFilterSchemaName: function(schemaName) {
				var sandbox = this.sandbox;
				var structureExplorerId = this.structureExplorerId = sandbox.id + "_StructureExplorerPage";
				sandbox.subscribe("GetStructureExplorerSchemaName", function() {
					return schemaName;
				}, [structureExplorerId]);
			},

			/**
			 * ######## ######## ### ########## ####### # ######### ####### callback # ######### scope
			 * @virtual
			 * @param {Terrasoft.BaseFilter} filter ###### ## ########## #######
			 */
			getLookupFilterValue: function(filter) {
				var selectDataId = this.selectDataId;
				var sandbox = this.sandbox;
				sandbox.subscribe("LookupInfo", function() {
					return {
						entitySchemaName: filter.referenceSchemaName,
						multiSelect: true
					};
				}, [selectDataId]);
				var entitySchemaFilterProvider = this;
				var handler = function(lookupValueResult) {
					var selectedValues = lookupValueResult.selectedRows.getItems();
					entitySchemaFilterProvider.setRightExpressionsValues(filter, selectedValues);
				};
				var config = this.getLookupFilterConfig(filter);
				LookupUtilities.Open(sandbox, config, handler, this, this.renderTo, false);
			},

			/**
			 * Get config for lookup.
			 * @virtual
			 * @protected
			 * @param filter Lookup filter.
			 * @returns {Object} Lookup config.
			 */
			getLookupFilterConfig: function(filter) {
				return {
					entitySchemaName: filter.referenceSchemaName,
					multiSelect: true,
					selectedValues: this.getRightExpressionSelectedItemsIds(filter),
					hideActions: this.shouldHideLookupActions,
					isColumnSettingsHidden: this.isColumnSettingsHidden
				};
			},

			/**
			 * ###### ############ ##### ######## #### ######
			 * @private
			 * @type {Object}
			 */
			dataValueTypeFilterMacrosType: {},

			/**
			 * ############## ###### ############ ##### ######## #### ######
			 * @private
			 */
			initDateMacrosTypes: function() {
				this.dataValueTypeFilterMacrosType[Terrasoft.DataValueType.TIME] = [
					Terrasoft.FilterMacrosType.HOUR_PREVIOUS,
					Terrasoft.FilterMacrosType.HOUR_CURRENT,
					Terrasoft.FilterMacrosType.HOUR_NEXT,
					Terrasoft.FilterMacrosType.HOUR_EXACT,
					Terrasoft.FilterMacrosType.HOUR_PREVIOUS_N,
					Terrasoft.FilterMacrosType.HOUR_NEXT_N
				];
				this.dataValueTypeFilterMacrosType[Terrasoft.DataValueType.DATE] = [
					Terrasoft.FilterMacrosType.DAY_YESTERDAY,
					Terrasoft.FilterMacrosType.DAY_TODAY,
					Terrasoft.FilterMacrosType.DAY_TOMORROW,
					Terrasoft.FilterMacrosType.DAY_OF_MONTH,
					Terrasoft.FilterMacrosType.DAY_OF_WEEK,
					Terrasoft.FilterMacrosType.DAY_PREVIOUS_N,
					Terrasoft.FilterMacrosType.DAY_NEXT_N,
					Terrasoft.FilterMacrosType.WEEK_PREVIOUS,
					Terrasoft.FilterMacrosType.WEEK_CURRENT,
					Terrasoft.FilterMacrosType.WEEK_NEXT,
					Terrasoft.FilterMacrosType.MONTH_PREVIOUS,
					Terrasoft.FilterMacrosType.MONTH_CURRENT,
					Terrasoft.FilterMacrosType.MONTH_NEXT,
					Terrasoft.FilterMacrosType.MONTH_EXACT,
					Terrasoft.FilterMacrosType.QUARTER_PREVIOUS,
					Terrasoft.FilterMacrosType.QUARTER_CURRENT,
					Terrasoft.FilterMacrosType.QUARTER_NEXT,
					Terrasoft.FilterMacrosType.HALF_YEAR_PREVIOUS,
					Terrasoft.FilterMacrosType.HALF_YEAR_CURRENT,
					Terrasoft.FilterMacrosType.HALF_YEAR_NEXT,
					Terrasoft.FilterMacrosType.YEAR_PREVIOUS,
					Terrasoft.FilterMacrosType.YEAR_CURRENT,
					Terrasoft.FilterMacrosType.YEAR_NEXT,
					Terrasoft.FilterMacrosType.YEAR_EXACT,
					Terrasoft.FilterMacrosType.DAY_OF_YEAR_TODAY,
					Terrasoft.FilterMacrosType.DAY_OF_YEAR_TODAY_PLUS_DAYS_OFFSET,
					Terrasoft.FilterMacrosType.NEXT_N_DAYS_OF_YEAR,
					Terrasoft.FilterMacrosType.PREVIOUS_N_DAYS_OF_YEAR
				];
				this.dataValueTypeFilterMacrosType[Terrasoft.DataValueType.DATE_TIME] =
						this.dataValueTypeFilterMacrosType[Terrasoft.DataValueType.TIME].concat(
								this.dataValueTypeFilterMacrosType[Terrasoft.DataValueType.DATE]
						);
			},

			/**
			 * ########## ###### ########## ######## ### ########## #### ######
			 * @param {Terrasoft.core.enums.DataValueType} dataValueType ### ######
			 * @return {Terrasoft.FilterMacrosType[]} ###### ########## ########
			 */
			getDataValueTypeMacrosType: function(dataValueType) {
				return this.dataValueTypeFilterMacrosType[dataValueType];
			},

			/**
			 * ########## ###### ######## ### ########## #### #######
			 * @throws {Terrasoft.UnsupportedTypeException}
			 * #### ### ########## #### ####### ## ###### ###### ########
			 * @param {Terrasoft.FilterMacrosType} filterMacrosType ### #######
			 * @return {Object} ###### ########
			 */
			getMacrosTypeConfig: function(filterMacrosType) {
				return Terrasoft.getMacrosTypeConfig(filterMacrosType);
			},

			/**
			 * ########## ###### ######### ######## ### ########## #######
			 * @param {Terrasoft.BaseFilter} filter
			 * @return {Terrasoft.FilterMacrosType[]}
			 */
			getAllowedMacrosTypes: function(filter) {
				var filterDataValueType = filter.dataValueType;
				var macrosTypes = [];
				if (Terrasoft.isDateDataValueType(filterDataValueType)) {
					macrosTypes = Terrasoft.deepClone(this.getDataValueTypeMacrosType(filterDataValueType));
				} else if (filter.referenceSchemaName === "Contact") {
					macrosTypes.push(Terrasoft.FilterMacrosType.CONTACT_CURRENT);
				} else if (filter.referenceSchemaName === "SysAdminUnit") {
					macrosTypes.push(Terrasoft.FilterMacrosType.USER_CURRENT);
				}
				return macrosTypes;
			},

			/**
			 * Checks if the value is in the configured range. If not, returns the closest range boundary.
			 * @private
			 * @param {Object} macrosConfig Configuration object for the specified macros type.
			 * @param {Number} macrosConfig.value.maxValue Maximum allowed value.
			 * @param {Number} macrosConfig.value.minValue Minimum allowed value.
			 * @param {Number} value Macros value to be validated and corrected if out of range.
			 * @returns {Number} Initial macros value if it is within the range, otherwise the closest range boundry.
			 */
			_getValidMacrosValue: function(macrosConfig, value) {
				var macrosValue = macrosConfig && macrosConfig.value;
				if (macrosValue && macrosValue.dataValueType === Terrasoft.DataValueType.INTEGER) {
					var maxValue = macrosValue.maxValue;
					var minValue = macrosValue.minValue;
					if (!Ext.isEmpty(maxValue) && maxValue < value) {
						return maxValue;
					}
					if (!Ext.isEmpty(minValue) && minValue > value) {
						return minValue;
					}
				}
				return value;
			},

			/**
			 * ############# ######## ### ###### ##### #######.
			 * @throws {Terrasoft.UnsupportedTypeException}
			 * #### ### ####### ############### ######### ## ###### # ## ##### ####.
			 * @param {Terrasoft.BaseFilter} filter ###### #######.
			 * @param {String/Number/Date/Boolean} value ########.
			 * @param {Terrasoft.FilterMacrosType} macrosType ### #######.
			 * @param {Terrasoft.core.enums.DataValueType} [dataValueType] ### #########.
			 */
			setRightExpressionValue: function(filter, value, macrosType, dataValueType) {
				var functionArgumentExpression = filter.leftExpression.functionArgument;
				if (functionArgumentExpression) {
					filter.leftExpression = functionArgumentExpression;
				}
				var expression;
				if (!Ext.isEmpty(macrosType)) {
					var macrosTypeConfig = this.getMacrosTypeConfig(macrosType);
					value = this._getValidMacrosValue(macrosTypeConfig, value);
					switch (macrosTypeConfig.functionType) {
						case Terrasoft.FunctionType.MACROS:
							expression = Ext.create("Terrasoft.FunctionExpression", {
								functionType: Terrasoft.FunctionType.MACROS,
								macrosType: macrosTypeConfig.queryMacrosType
							});
							if (Terrasoft.ParameterizedFilterMacrosTypes.indexOf(macrosType) > -1) {
								expression.functionArgument = Ext.create("Terrasoft.ParameterExpression", {
									parameterDataType: macrosTypeConfig.value.dataValueType,
									parameterValue: value
								});
							}
							break;
						case Terrasoft.FunctionType.DATE_PART:
							var aggregationType = filter.leftExpression && filter.leftExpression.aggregationType;
							var leftExpression = Ext.create("Terrasoft.FunctionExpression", {
								functionType: Terrasoft.FunctionType.DATE_PART,
								datePartType: macrosTypeConfig.datePartType,
								functionArgument: filter.leftExpression,
								aggregationType: aggregationType
							});
							filter.leftExpression = leftExpression;
							var macrosTypeConfigValue = macrosTypeConfig.value;
							var hasDisplayRange = !Ext.isEmpty(macrosTypeConfigValue.displayValueRange);
							var parameterValue = (hasDisplayRange && !Ext.isEmpty(value)) ? (value + 1) : value;
							expression = Ext.create("Terrasoft.ParameterExpression", {
								parameterDataType: macrosTypeConfigValue.dataValueType,
								parameterValue: parameterValue
							});
							break;
						default:
							throw new Terrasoft.UnsupportedTypeException();
					}
					if (filter.filterType === Terrasoft.FilterType.IN) {
						var config = {
							leftExpressionColumnPath: filter.leftExpression.columnPath,
							dataValueType: Terrasoft.DataValueType.GUID,
							leftExpressionCaption: filter.leftExpressionCaption
						};
						var newFilter = this.createSimpleFilter(config);
						newFilter.comparisonType = filter.comparisonType;
						newFilter.referenceSchemaName = filter.referenceSchemaName;
						newFilter.setRightExpression(expression);
						this.fireEvent("replaceFilter", filter, newFilter);
					} else {
						filter.setRightExpression(expression);
					}
				} else {
					expression = Ext.create("Terrasoft.ParameterExpression", {
						parameterDataType: dataValueType || filter.dataValueType,
						parameterValue: value
					});
					filter.setRightExpression(expression);
				}
			},

			/**
			 * ############# ######## ### ###### ##### #######.
			 * @throws {Terrasoft.UnsupportedTypeException}
			 * #### values ## ######, ## ############ ##########.
			 * @param {Terrasoft.BaseFilter} filter ###### #######.
			 * @param {Array} values ###### ########.
			 * @param {Terrasoft.core.enums.DataValueType} [dataValueType] ### #########.
			 */
			setRightExpressionsValues: function(filter, values, dataValueType) {
				if (values && !Ext.isArray(values)) {
					throw new Terrasoft.UnsupportedTypeException({
						message: localizableStrings.setRightExpressionsValuesException
					});
				}
				var actualFilter;
				if (filter.filterType !== Terrasoft.FilterType.IN) {
					var config = {
						leftExpressionColumnPath: filter.leftExpression.columnPath,
						dataValueType: Terrasoft.DataValueType.LOOKUP,
						referenceSchemaName: filter.referenceSchemaName,
						leftExpressionCaption: filter.leftExpressionCaption
					};
					actualFilter = this.createSimpleFilter(config);
					this.fireEvent("replaceFilter", filter, actualFilter);
				} else {
					actualFilter = filter;
				}
				var expressions = [];
				Terrasoft.each(values, function(value) {
					var expression = Ext.create("Terrasoft.ParameterExpression", {
						parameterValue: value,
						parameterDataType: dataValueType || Terrasoft.DataValueType.LOOKUP
					});
					expressions.push(expression);
				});
				actualFilter.setRightExpressions(expressions);
			},

			/**
			 * ########## ###### ######## ### #### ####### #######
			 * @throws {Terrasoft.UnsupportedTypeException}
			 * #### ### #### ####### ####### ## ###### ##### ########### #### ####### #######
			 * @param {Terrasoft.BaseFilter} filter ####### #######
			 * @return {Object} ###### ######## ### #### ####### #######
			 */
			getFilterMacrosConfig: function(filter) {
				return Terrasoft.GetFilterMacrosConfig(filter);
			},

			/**
			 * ########## ###### ############ ######## ####### #######
			 * @param {Terrasoft.BaseFilter} filter ####### #######
			 * @return {Object} ###### ############ ######## ####### #######
			 * @return {Object.macrosCaption} ######### #######
			 * @return {Object.macrosParameterCaption} ###### ############ ######## ####### #######
			 */
			getRightExpressionMacrosDisplayValues: function(filter) {
				return Terrasoft.GetRightExpressionMacrosDisplayValues(filter);
			},

			/**
			 * ######### ###### ############### ######## ####### ### ######## # #### ###### ## ###########.
			 * @param {Terrasoft.BaseFilter} filter ####### #######.
			 * @return {Array} ###### ###############.
			 */
			getRightExpressionSelectedItemsIds: function(filter) {
				if (!filter.rightExpressions || !Ext.isArray(filter.rightExpressions)) {
					return null;
				}
				var selectedIds = [];
				Terrasoft.each(filter.rightExpressions, function(selectedItem) {
					var filterValue = selectedItem.parameter && selectedItem.parameter.getValue();
					if (filterValue && filterValue.value) {
						selectedIds.push(filterValue.value);
					}
				}, this);
				return selectedIds;
			}

		});

		return Terrasoft.EntitySchemaFilterProvider;
	});


