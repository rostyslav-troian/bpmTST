Terrasoft.configuration.Structures["BusinessRuleExpressionDataQueryBuilder"] = {innerHierarchyStack: ["BusinessRuleExpressionDataQueryBuilder"]};
define("BusinessRuleExpressionDataQueryBuilder", ["ProcessModuleUtilities"], function() {
		/**
		 * Business rule expression data query builder.
		 */
		Ext.define("Terrasoft.configuration.BusinessRuleExpressionDataQueryBuilder", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.BusinessRuleExpressionDataQueryBuilder",

			//region Methods: Private

			/**
			 * @private
			 */
			_getReferenceSchemaLookupValueByUId: function(referenceSchemaUId) {
				if (!Terrasoft.EntitySchemaManager.isInitialized || !referenceSchemaUId) {
					return null;
				}
				const referenceSchema = Terrasoft.EntitySchemaManager.findItem(referenceSchemaUId);
				return referenceSchema && {
					value: referenceSchemaUId,
					displayValue: referenceSchema.getCaption(),
					name: referenceSchema.getName()
				};
			},

			/**
			 * @private
			 */
			_getReferenceSchemaLookupValueByName: function(referenceSchemaName) {
				if (!referenceSchemaName) {
					return null;
				}
				const referenceSchema = Terrasoft.EntitySchemaManager.findRootSchemaItemByName(referenceSchemaName);
				return this._getReferenceSchemaLookupValueByUId(referenceSchema && referenceSchema.getUId());
			},

			/**
			 * @private
			 */
			_getSupportedDataValueTypes: function() {
				return [
					Terrasoft.DataValueType.TEXT,
					Terrasoft.DataValueType.INTEGER,
					Terrasoft.DataValueType.FLOAT,
					Terrasoft.DataValueType.MONEY,
					Terrasoft.DataValueType.DATE_TIME,
					Terrasoft.DataValueType.DATE,
					Terrasoft.DataValueType.TIME,
					Terrasoft.DataValueType.LOOKUP,
					Terrasoft.DataValueType.ENUM,
					Terrasoft.DataValueType.BOOLEAN,
					Terrasoft.DataValueType.SHORT_TEXT,
					Terrasoft.DataValueType.MEDIUM_TEXT,
					Terrasoft.DataValueType.MAXSIZE_TEXT,
					Terrasoft.DataValueType.LONG_TEXT,
					Terrasoft.DataValueType.FLOAT1,
					Terrasoft.DataValueType.FLOAT2,
					Terrasoft.DataValueType.FLOAT3,
					Terrasoft.DataValueType.FLOAT4
				];
			},

			/**
			 * @private
			 */
			_getDataValueTypeValidator: function(dataValueType) {
				let validator;
				switch (dataValueType) {
					case Terrasoft.DataValueType.INTEGER:
					case Terrasoft.DataValueType.MONEY:
					case Terrasoft.DataValueType.FLOAT:
					case Terrasoft.DataValueType.FLOAT1:
					case Terrasoft.DataValueType.FLOAT2:
					case Terrasoft.DataValueType.FLOAT3:
					case Terrasoft.DataValueType.FLOAT4:
						validator = Terrasoft.isNumberDataValueType;
						break;
					case Terrasoft.DataValueType.DATE_TIME:
						validator = Terrasoft.isValidForMappingOnDateDataValueType;
						break;
					case Terrasoft.DataValueType.TIME:
						validator = function(itemDataValueType) {
							return itemDataValueType === Terrasoft.DataValueType.TIME;
						};
						break;
					default:
						validator = Terrasoft.findDataValueTypeValidator(dataValueType);
				}
				return validator;
			},

			/**
			 * @private
			 */
			_hasSameDataValueTypes: function(expressions) {
				const left = expressions.left;
				const right = expressions.right;
				if (Ext.isEmpty(left.dataValueType) || Ext.isEmpty(right.dataValueType)) {
					return true;
				}
				const validator = this._getDataValueTypeValidator(left.dataValueType);
				if (!validator) {
					return true;
				}
				return validator(right.dataValueType);
			},

			/**
			 * @private
			 */
			_hasSameReferenceSchemas: function(expressions) {
				const left = expressions.left;
				const right = expressions.right;
				if (Ext.isEmpty(left.dataValueType) || Ext.isEmpty(right.dataValueType)) {
					return true;
				}
				if (!Terrasoft.isLookupDataValueType(left.dataValueType) || !Terrasoft.isLookupDataValueType(right.dataValueType)) {
					return false;
				}
				if (Ext.isEmpty(left.referenceSchema) || Ext.isEmpty(right.referenceSchema)) {
					return true;
				}
				return left.referenceSchema === right.referenceSchema;
			},

			/**
			 * @private
			 */
			_hasSameTypes: function(expressions) {
				return !Terrasoft.isLookupDataValueType(expressions.left.dataValueType)
					? this._hasSameDataValueTypes(expressions)
					: this._hasSameReferenceSchemas(expressions);
			},

			//endregion

			//region Methods: Public

			//region Engine

			/**
			 * Gets values from data source.
			 * @param {Function} sourceGetter Data source getter function.
			 * @return {Promise} Data source getter promise.
			 */
			from: function(sourceGetter) {
				return new Promise(function(resolve) {
					sourceGetter(resolve);
				});
			},

			/**
			 * Returns function which filter elements of array.
			 * @param {Function} predicates Filter functions.
			 * @return {Function} Function which filter elements of array.
			 */
			filter: function(predicates) {
				return function(values) {
					return values.filter(function(value) {
						return predicates.every(function(predicate) {
							return predicate(value);
						});
					});
				};
			},

			/**
			 * Returns function which projects element of array into a new form.
			 * @param {Function} selector Element selector function.
			 * @return {Function} Function which projects element of array into a new form.
			 */
			select: function(selector) {
				return function(values) {
					return values.map(function(value) {
						return selector(value);
					});
				};
			},

			/**
			 * Returns function which gets first element of array or default value.
			 * @param {Function} defaultValueGenerator Function which generates default value.
			 * @return {Object} Function which gets first element of array or default value.
			 */
			firstOrDefault: function(defaultValueGenerator) {
				return function(values) {
					const value = values[0];
					if (value) {
						return value;
					}
					if (defaultValueGenerator) {
						return defaultValueGenerator();
					}
					return null;
				};
			},

			/**
			 * Returns function which gets collection from elements of array.
			 * @return {Function} Function which gets collection from elements of array.
			 */
			toCollection: function() {
				return function(values) {
					const collection = Ext.create("Terrasoft.Collection");
					values.forEach(function(value) {
						collection.add(value.value, value);
					});
					return collection;
				};
			},

			/**
			 * Returns function which sorts elements of array.
			 * @param {Object} config Configuration object.
			 * @param {Function} config.selector Element selector function.
			 * @return {Function} Function which sorts elements of array.
			 */
			sortBy: function(config) {
				const selector = config.selector;
				return function(values) {
					return values.sort(function(value1, value2) {
						const selectedValue1 = selector(value1);
						const selectedValue2 = selector(value2);
						if (selectedValue1 > selectedValue2) {
							return 1;
						}
						if (selectedValue1 < selectedValue2) {
							return -1;
						}
						return 0;
					});
				};
			},

			//endregion

			//region Data getter builders

			/**
			 * Builds entity schema columns getter.
			 * @param {Object} config Configuration object.
			 * @param {String} config.entitySchemaUId Entity schema UId.
			 * @param {String} config.packageUId Package UId.
			 * @return {Function} Entity schema column getter.
			 */
			buildEntitySchemaColumnsGetter: function(config) {
				const self = this;
				const entitySchemaUId = config.entitySchemaUId;
				const packageUId = config.packageUId;
				return function(callback) {
					const findInstanceConfig = {
						schemaUId: entitySchemaUId,
						packageUId: packageUId
					};
					Terrasoft.EntitySchemaManager.findBundleSchemaInstance(findInstanceConfig, function(entitySchema) {
						callback(entitySchema.columns.getItems());
					}, self);
				};
			},

			/**
			 * Builds page schema parameters getter.
			 * @param {Object} config Configuration object.
			 * @param {String} config.pageSchemaUId Page schema UId.
			 * @param {String} config.packageUId Package UId.
			 * @return {Function} Page schema parameters getter.
			 */
			buildPageSchemaParametersGetter: function(config) {
				const self = this;
				const pageSchemaUId = config.pageSchemaUId;
				const packageUId = config.packageUId;
				return function(callback) {
					const findInstanceConfig = {
						schemaUId: pageSchemaUId,
						packageUId: packageUId
					};
					Terrasoft.ClientUnitSchemaManager.findBundleSchemaInstance(findInstanceConfig, function(pageSchema) {
						callback(pageSchema.parameters.getItems());
					}, self);
				};
			},

			/**
			 * Builds page schema attributes getter.
			 * @param {Object} config Configuration object.
			 * @param {String} config.pageSchemaUId Page schema UId.
			 * @return {Function} Page schema attributes getter.
			 */
			buildPageSchemaAttributesGetter: function(config) {
				const pageSchemaUId = config.pageSchemaUId;
				return function(callback) {
					const attributesKey = "attributes_" + pageSchemaUId;
					callback(Terrasoft.ClientPageSessionCache.getItem(attributesKey));
				};
			},

			//endregion

			//region Filter builders

			/**
			 * Builds function which returns true if filter value is part of selected element value.
			 * @param {Object} config Configuration object.
			 * @param {Function} config.valueSelector Element selector function.
			 * @param {String} config.filterValue Filter value.
			 * @return {Function} Function which returns true if filter value is part of selected element value.
			 */
			buildSimpleValueFilter: function(config) {
				const valueSelector = config.valueSelector;
				const filterValue = config.filterValue;
				return function(value) {
					const selectedValue = valueSelector(value);
					if (!Ext.isString(selectedValue)) {
						return false;
					}
					return selectedValue.toUpperCase().indexOf(filterValue.toUpperCase()) >= 0;
				};
			},

			/**
			 * Builds function which returns true if data value type of element is supported.
			 * @return {Function} Function which returns true if data value type of element is supported.
			 */
			buildSupportedDataValueTypeFilter: function() {
				const self = this;
				return function(value) {
					const supportedDataValueTypes = self._getSupportedDataValueTypes();
					return Ext.isEmpty(value.dataValueType) || supportedDataValueTypes.indexOf(value.dataValueType) >= 0;
				};
			},

			/**
			 * Builds function which returns true if name of element is equal of name from configuration object.
			 * @param {Object} config Configuration object.
			 * @param {String} config.name Name.
			 * @return {Function} Function which returns true if name of element is equal name from configuration object.
			 */
			buildNameFilter: function(config) {
				const name = config.name;
				return function(value) {
					return value.name === name;
				};
			},

			/**
			 * Builds function which returns true if filter value is part of entity schema column caption.
			 * @param {Object} config Configuration object.
			 * @param {String} config.filterValue Filter value.
			 * @return {Function} Function which returns true if filter value is part of entity schema column caption.
			 */
			buildEntitySchemaColumnSimpleValueFilter: function(config) {
				return this.buildSimpleValueFilter({
					filterValue: config.filterValue,
					valueSelector: function(column) {
						return column.caption.getValue();
					}
				});
			},

			/**
			 * Builds function which returns true if filter value is part of page schema parameter caption.
			 * @param {Object} config Configuration object.
			 * @param {String} config.filterValue Filter value.
			 * @return {Function} Function which returns true if filter value is part of page schema parameter caption.
			 */
			buildPageSchemaParameterSimpleValueFilter: function(config) {
				return this.buildEntitySchemaColumnSimpleValueFilter(config);
			},

			/**
			 * Builds function which returns true if filter value is part of page schema attribute caption.
			 * @param {Object} config Configuration object.
			 * @param {String} config.filterValue Filter value.
			 * @return {Function} Function which returns true if filter value is part of page schema attribute caption.
			 */
			buildPageSchemaAttributeSimpleValueFilter: function(config) {
				return this.buildSimpleValueFilter({
					filterValue: config.filterValue,
					valueSelector: function(attribute) {
						return attribute.caption;
					}
				});
			},

			/**
			 * Builds function which returns true if entity schema column type is equal of configuration object type.
			 * @param {Object} config Configuration object.
			 * @param {String} config.dataValueType Data value type.
			 * @param {String} config.referenceSchemaUId Reference schema UId.
			 * @return {Function} Function which returns true if entity schema column type is equal of configuration object type.
			 */
			buildEntitySchemaColumnByDataValueTypeFilter: function(config) {
				const self = this;
				const dataValueType = config.dataValueType;
				const referenceSchemaUId = config.referenceSchemaUId;
				return function(column) {
					return self._hasSameTypes({
						left: {
							dataValueType: dataValueType,
							referenceSchema: referenceSchemaUId
						},
						right: {
							dataValueType: column.dataValueType,
							referenceSchema: column.referenceSchemaUId
						}
					});
				};
			},

			/**
			 * Builds function which returns true if page schema parameter type is equal of configuration object type.
			 * @param {Object} config Configuration object.
			 * @param {String} config.dataValueType Data value type.
			 * @param {String} config.referenceSchemaUId Reference schema UId.
			 * @return {Function} Function which returns true if page schema parameter type is equal of configuration object type.
			 */
			buildPageSchemaParameterByDataValueTypeFilter: function(config) {
				return this.buildEntitySchemaColumnByDataValueTypeFilter(config);
			},

			/**
			 * Builds function which returns true if page schema attribute type is equal of configuration object type.
			 * @param {Object} config Configuration object.
			 * @param {String} config.dataValueType Data value type.
			 * @param {String} config.referenceSchemaName Reference schema name.
			 * @return {Function} Function which returns true if page schema attribute type is equal of configuration object type.
			 */
			buildPageSchemaAttributeByDataValueTypeFilter: function(config) {
				const self = this;
				const dataValueType = config.dataValueType;
				const referenceSchemaName = config.referenceSchemaName;
				return function(attribute) {
					return self._hasSameTypes({
						left: {
							dataValueType: dataValueType,
							referenceSchema: referenceSchemaName
						},
						right: {
							dataValueType: attribute.dataValueType,
							referenceSchema: (attribute.referenceSchema && attribute.referenceSchema.name) || attribute.referenceSchemaName
						}
					});
				};
			},

			/**
			 * Builds function which returns true if system value type is equal of configuration object type.
			 * @param {Object} config Configuration object.
			 * @param {String} config.dataValueType Data value type.
			 * @param {String} config.referenceSchemaName Reference schema name.
			 * @return {Function} Function which returns true if system value type is equal of configuration object type.
			 */
			buildSysValueByDataValueTypeFilter: function(config) {
				const self = this;
				const dataValueType = config.dataValueType;
				const referenceSchemaName = config.referenceSchemaName;
				return function(sysValue) {
					return self._hasSameTypes({
						left: {
							dataValueType: dataValueType,
							referenceSchema: referenceSchemaName
						},
						right: {
							dataValueType: sysValue.dataValueType,
							referenceSchema: sysValue.referenceSchemaName
						}
					});
				};
			},

			/**
			 * Builds function which returns true if page schema parameter is not system.
			 * @return {Function} Function which returns true if page schema parameter is not system.
			 */
			buildNonSystemPageSchemaParameterFilter: function() {
				return function(parameter) {
					return !Terrasoft.ProcessModuleUtilities.isSystemParameter(parameter.name);
				};
			},

			//endregion

			//region Selector builders

			/**
			 * Builds function which projects entity schema column into lookup form.
			 * @return {Function} Function which projects entity schema column into lookup form.
			 */
			buildEntitySchemaColumnValueSelector: function() {
				const self = this;
				return function(column) {
					return {
						value: column.uId,
						name: column.name,
						displayValue: column.caption.getValue(),
						dataValueType: column.dataValueType,
						referenceSchema: self._getReferenceSchemaLookupValueByUId(column.referenceSchemaUId)
					};
				};
			},

			/**
			 * Builds function which projects page schema parameter into lookup form.
			 * @return {Function} Function which projects page schema parameter into lookup form.
			 */
			buildPageSchemaParameterValueSelector: function() {
				return this.buildEntitySchemaColumnValueSelector();
			},

			/**
			 * Builds function which projects page schema attribute into lookup form.
			 * @return {Function} Function which projects page schema attribute into lookup form.
			 */
			buildPageSchemaAttributeValueSelector: function() {
				const self = this;
				return function(attribute) {
					const referenceSchemaName =
						(attribute.referenceSchema && attribute.referenceSchema.name) || attribute.referenceSchemaName;
					return {
						value: attribute.name,
						name: attribute.name,
						displayValue: attribute.caption,
						dataValueType: attribute.dataValueType,
						referenceSchema: self._getReferenceSchemaLookupValueByName(referenceSchemaName)
					};
				};
			},

			//endregion

			//Default value generator builders

			/**
			 * Builds function which generates default value for attribute.
			 * @param {Object} config Configuration object.
			 * @param {String} config.name Attribute name.
			 * @return {Function} Function which generates default value for attribute.
			 */
			buildPageSchemaAttributeDefaultValueGenerator: function(config) {
				const self = this;
				const attributeName = config.name;
				return function() {
					const valueSelector = self.buildPageSchemaAttributeValueSelector();
					return valueSelector({
						name: attributeName,
						caption: attributeName,
						dataValueType: Terrasoft.DataValueType.TEXT
					});
				};
			},

			//endregion

			//Sorters

			/**
			 * Returns function which sorts elements of array by display value.
			 * @return {Function} Function which sorts elements of array by display value.
			 */
			sortByDisplayValue: function() {
				const selector = function(value) {
					return value.displayValue;
				};
				return this.sortBy({selector: selector});
			}

			//endregion

			//endregion

		});
	}
);


