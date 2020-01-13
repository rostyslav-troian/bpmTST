Terrasoft.configuration.Structures["ExpressionEditVMMixin"] = {innerHierarchyStack: ["ExpressionEditVMMixin"]};
define("ExpressionEditVMMixin", ["ExpressionEnums", "StructureExplorerUtilitiesV2",
		"StructureExplorerParameterMainViewModel", "BusinessRuleExpressionDataQueryBuilder"],
	function() {
		/**
		 * View model mixin for work with ExpressionEdit.
		 */
		Ext.define("Terrasoft.configuration.mixins.ExpressionEditVMMixin", {
			alternateClassName: "Terrasoft.ExpressionEditVMMixin",

			//region Methods: Private

			/**
			 * @private
			 */
			_loadToCollection: function(loader, outList) {
				if (!outList) {
					return;
				}
				const builder = Ext.create("Terrasoft.BusinessRuleExpressionDataQueryBuilder");
				loader(builder).then(function(collection) {
					outList.reloadAll(collection);
				});
			},

			/**
			 * @private
			 */
			_loadLookupValue: function(loader, callback, scope) {
				const builder = Ext.create("Terrasoft.BusinessRuleExpressionDataQueryBuilder");
				loader(builder).then(function(lookupValue) {
					callback.call(scope, lookupValue);
				});
			},

			/**
			 * @private
			 */
			_getFilterProperties: function(filter) {
				const result = {};
				result.filterValue = "";
				result.filterFn = null;
				if (Ext.isString(filter)) {
					result.filterValue = filter;
					return result;
				}
				if (Ext.isFunction(filter.filterFn)) {
					result.filterFn = filter.filterFn;
				}
				if (Ext.isString(filter.filterValue)) {
					result.filterValue = filter.filterValue;
				}
				return result;
			},

			//endregion

			//region Methods: Protected

			/**
			 * Prepare reference entity schema list.
			 * @protected
			 * @param {String} filter Filter value
			 * @param {Terrasoft.core.collections.Collection} list List.
			 */
			prepareReferenceSchemaList: function(filter, list) {
				if (!list) {
					return;
				}
				list.clear();
				var loadItems = {};
				Terrasoft.EntitySchemaManager.initialize(function() {
					var items = Terrasoft.EntitySchemaManager.getItems();
					items.each(function(item) {
						if (!item.getIsVirtual() && !item.getExtendParent()) {
							var uId = item.getUId();
							loadItems[uId] = {
								value: uId,
								displayValue: item.getCaption(),
								name: item.getName()
							};
						}
					}, this);
					list.loadAll(loadItems);
				}, this);
			},

			/**
			 * Process lookup value list.
			 * @protected
			 * @param {String} filter Filter value
			 * @param {Terrasoft.core.collections.Collection} list List.
			 * @param {Terrasoft.ExpressionEnums.ExpressionType} expressionType Expression type.
			 * @param {String} referenceSchemaName Reference schema name.
			 */
			prepareValueList: function(filter, list, expressionType, referenceSchemaName) {
				if (!list) {
					return;
				}
				list.clear();
				if (referenceSchemaName && expressionType === Terrasoft.ExpressionEnums.ExpressionType.CONSTANT) {
					this.prepareConstantValueList(filter, list, referenceSchemaName);
				}
			},

			/**
			 * Prepare constant lookup value list.
			 * @protected
			 * @param {String} filter Filter value
			 * @param {Terrasoft.core.collections.Collection} list List.
			 * @param {String} referenceSchemaName Reference schema name.
			 */
			prepareConstantValueList: function(filter, list, referenceSchemaName) {
				if (!list) {
					return;
				}
				var config = {
					"entitySchemaName": referenceSchemaName,
					"filterValue": filter
				};
				this.loadValueList(config, function(items) {
					list.loadAll(items);
				});
			},

			/**
			 * Load value list.
			 * @protected
			 * @param {Object} config Lookup config.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			loadValueList: function(config, callback, scope) {
				Terrasoft.chain(
					function(next) {
						next(config);
					},
					this.getEntitySchemaLookupQueryConfig,
					this.generateEntitySchemaLookupQuery,
					this.requestLookupValueItems,
					function(next, items) {
						callback.call(scope, items);
					},
					this);
			},

			/**
			 * Return entity schema lookup query config.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} config Lookup config.
			 * @param {String} config.entitySchemaName Entity schema name.
			 */
			getEntitySchemaLookupQueryConfig: function(callback, config) {
				Terrasoft.require([config.entitySchemaName], function(schema) {
					if (schema) {
						Ext.apply(config, {
							"primaryColumnName": schema.primaryColumnName,
							"primaryDisplayColumnName": schema.primaryDisplayColumnName
						});
						callback.call(this, config);
					}
				}, this);
			},

			/**
			 * Return entity schema lookup query.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Object} config Lookup config.
			 * @param {String} config.entitySchemaName Entity schema name.
			 * @param {String} config.primaryColumnName Entity schema primary column name.
			 * @param {String} config.primaryDisplayColumnName Entity schema primary display column name.
			 * @param {String} config.filterValue Filter value.
			 */
			generateEntitySchemaLookupQuery: function(callback, config) {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					"rootSchemaName": config.entitySchemaName,
					"rowCount": 100
				});
				esq.addColumn(config.primaryColumnName, "value");
				if (!Ext.isEmpty(config.primaryDisplayColumnName)) {
					esq.addColumn(config.primaryDisplayColumnName, "displayValue");
				}
				if (!Ext.isEmpty(config.filterValue)) {
					esq.filters.add("valueFilter", Terrasoft.createColumnFilterWithParameter(
						Terrasoft.ComparisonType.START_WITH, config.primaryDisplayColumnName, config.filterValue));
				}
				callback.call(this, esq, config);
			},

			/**
			 * Require lookup entity schema query.
			 * @protected
			 * @param {Function} callback Callback function.
			 * @param {Terrasoft.EntitySchemaQuery} esq Entity schema query.
			 */
			requestLookupValueItems: function(callback, esq) {
				esq.getEntityCollection(function(response) {
					if (response.success && response.collection) {
						this.onLookupValueItemsResponse(response.collection, callback, this);
					}
				}, this);
			},

			/**
			 * Prepare response of entity schema query.
			 * @protected
			 * @param {Terrasoft.core.collections.Collection} collection Response collection.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function context.
			 */
			onLookupValueItemsResponse: function(collection, callback, scope) {
				var items = {};
				collection.each(function(item) {
					var value = item.get("value");
					items[value] = {
						"value": value,
						"displayValue": item.get("displayValue") || value
					};
				}, this);
				callback.call(scope, items);
			},

			/**
			 * Returns reference schema by UId.
			 * @protected
			 * @param {String} referenceSchemaUId Reference schema UId.
			 * @return {Object} Reference schema.
			 */
			getReferenceSchemaLookupValue: function(referenceSchemaUId) {
				if (!Terrasoft.EntitySchemaManager.isInitialized) {
					return null;
				} else {
					var referenceSchema = Terrasoft.EntitySchemaManager.findItem(referenceSchemaUId);
					return referenceSchema && {
						value: referenceSchemaUId,
						displayValue: referenceSchema.getCaption(),
						name: referenceSchema.getName()
					};
				}
			},

			/**
			 * Returns reference schema by name.
			 * @protected
			 * @param {String} referenceSchemaName Reference schema name.
			 * @return {Object} Reference schema.
			 */
			getReferenceSchemaLookupValueByName: function(referenceSchemaName) {
				if (!Ext.isEmpty(referenceSchemaName)) {
					var referenceSchema = Terrasoft.EntitySchemaManager.findRootSchemaItemByName(referenceSchemaName);
					return this.getReferenceSchemaLookupValue(referenceSchema && referenceSchema.getUId());
				}
			},

			/**
			 * Loads entity schema column structure explorer.
			 * @protected
			 * @param {Object} explorerConfig Structure explorer config.
			 * @param {Boolean} explorerConfig.useBackwards Flag indicates when to use backwards relations.
			 * @param {Object} explorerConfig.expression Expression.
			 * @param {Number} explorerConfig.expandLevel Related lookup columns expand level.
			 * @param {String} explorerConfig.entitySchemaUId Entity schema uid.
			 * @param {String} explorerConfig.pageSchemaUId Client unit schema uid.
			 * @param {Function} callback The callback function.
			 * @param {Object} scope The callback function context.
			 */
			loadEntitySchemaColumnVocabulary: function(explorerConfig, callback, scope) {
				var moduleConfig = {
					useBackwards: explorerConfig.useBackwards || false,
					columnPath: explorerConfig.expression && explorerConfig.expression.name,
					displayId: explorerConfig.displayId,
					expandLevel: explorerConfig.expandLevel,
					allowedReferenceSchemas: explorerConfig.allowedReferenceSchemas,
					lookupsColumnsOnly: explorerConfig.lookupsColumnsOnly,
					columnsFiltrationMethod: explorerConfig.columnsFiltrationMethod
				};
				if (explorerConfig.entitySchemaUId) {
					var entityItem = Terrasoft.EntitySchemaManager.getItem(explorerConfig.entitySchemaUId);
					moduleConfig.schemaName = entityItem.getName();
				} else {
					moduleConfig.viewModelClassName = "Terrasoft.StructureExplorerParameterMainViewModel";
					moduleConfig.pageSchemaUId = explorerConfig.pageSchemaUId;
				}
				Terrasoft.StructureExplorerUtilities.open({
					moduleName: "StructureExploreModuleV2",
					moduleConfig: moduleConfig,
					handlerMethod: function(result) {
						callback.call(scope, {
							value: result.metaPath.join("."),
							name: result.path.join("."),
							displayValue: result.caption.join("."),
							dataValueType: result.dataValueType,
							referenceSchema: this.getReferenceSchemaLookupValueByName(result.referenceSchemaName)
						});
					},
					scope: this
				});
			},

			/**
			 * Prepares entity schema column list.
			 * @protected
			 * @param {Object} dataGetterConfig Data getter configuration object.
			 * @param {String} dataGetterConfig.entitySchemaUId Entity schema identifier.
			 * @param {String} dataGetterConfig.packageUId Package identifier.
			 * @param {Object} filterConfig Filter configuration object.
			 * @param {String} filterConfig.filterValue Filter search value.
			 * @param {Array} filterConfig.filterFns Filter functions.
			 * @param {Terrasoft.core.collections.Collection} outList Output page schema attributes list.
			 */
			prepareEntitySchemaColumnList: function(dataGetterConfig, filterConfig, outList) {
				this._loadToCollection(function(builder) {
					const filterValue = filterConfig.filterValue || "";
					const filterFns = filterConfig.filterFns || [];
					const filters = [builder.buildEntitySchemaColumnSimpleValueFilter({filterValue: filterValue})]
						.concat(filterFns);
					return builder
						.from(builder.buildEntitySchemaColumnsGetter(dataGetterConfig))
						.then(builder.filter(filters))
						.then(builder.select(builder.buildEntitySchemaColumnValueSelector()))
						.then(builder.sortByDisplayValue())
						.then(builder.toCollection());
				}, outList);
			},

			/**
			 * Prepares page schema attribute list.
			 * @protected
			 * @param {Object} dataGetterConfig Data getter configuration object.
			 * @param {String} dataGetterConfig.pageSchemaUId Page schema identifier.
			 * @param {String} dataGetterConfig.packageUId Package identifier.
			 * @param {Object} filterConfig Filter configuration object.
			 * @param {String} filterConfig.filterValue Filter search value.
			 * @param {Array} filterConfig.filterFns Filter functions.
			 * @param {Terrasoft.core.collections.Collection} outList Output page schema attributes list.
			 */
			preparePageSchemaParameterList: function(dataGetterConfig, filterConfig, outList) {
				this._loadToCollection(function(builder) {
					const filterValue = filterConfig.filterValue || "";
					const filterFns = filterConfig.filterFns || [];
					const filters = [builder.buildPageSchemaParameterSimpleValueFilter({filterValue: filterValue})]
						.concat(filterFns);
					return builder
						.from(builder.buildPageSchemaParametersGetter(dataGetterConfig))
						.then(builder.filter(filters))
						.then(builder.select(builder.buildPageSchemaParameterValueSelector()))
						.then(builder.sortByDisplayValue())
						.then(builder.toCollection());
				}, outList);
			},

			/**
			 * Returns data value type of system value.
			 * @protected
			 * @param {Terrasoft.SystemValueType} sysValueType System value type.
			 * @return {String} Data value type.
			 */
			findSysValueDataValueType: function(sysValueType) {
				const pairs = [{
					dataValueType: Terrasoft.DataValueType.TIME,
					sysValueTypes: [Terrasoft.SystemValueType.CURRENT_TIME]
				}, {
					dataValueType: Terrasoft.DataValueType.DATE,
					sysValueTypes: [Terrasoft.SystemValueType.CURRENT_DATE]
				}, {
					dataValueType: Terrasoft.DataValueType.DATE_TIME,
					sysValueTypes: [Terrasoft.SystemValueType.CURRENT_DATE_TIME]
				}, {
					dataValueType: Terrasoft.DataValueType.LOOKUP,
					sysValueTypes: [
						Terrasoft.SystemValueType.CURRENT_USER,
						Terrasoft.SystemValueType.CURRENT_USER_CONTACT,
						Terrasoft.SystemValueType.CURRENT_USER_ACCOUNT
					]
				}];
				for (let i = 0; i < pairs.length; i++) {
					if (Terrasoft.contains(pairs[i].sysValueTypes, sysValueType)) {
						return pairs[i].dataValueType;
					}
				}
			},

			/**
			 * Returns reference schema name of system value.
			 * @protected
			 * @param {Terrasoft.SystemValueType} sysValueType System value type.
			 * @return {String} Reference schema name.
			 */
			findSysValueReferenceSchemaName: function(sysValueType) {
				const pairs = [{
					referenceSchemaName: "Contact",
					sysValueTypes: [Terrasoft.SystemValueType.CURRENT_USER_CONTACT]
				}, {
					referenceSchemaName: "Account",
					sysValueTypes: [Terrasoft.SystemValueType.CURRENT_USER_ACCOUNT]
				}, {
					referenceSchemaName: "SysAdminUnit",
					sysValueTypes: [Terrasoft.SystemValueType.CURRENT_USER]
				}, {
					referenceSchemaName: null,
					sysValueTypes: [
						Terrasoft.SystemValueType.CURRENT_DATE_TIME,
						Terrasoft.SystemValueType.CURRENT_DATE,
						Terrasoft.SystemValueType.CURRENT_TIME
					]
				}];
				for (let i = 0; i < pairs.length; i++) {
					if (Terrasoft.contains(pairs[i].sysValueTypes, sysValueType)) {
						return pairs[i].referenceSchemaName;
					}
				}
			},

			/**
			 * Prepares system values list.
			 * @protected
			 * @param {Object} filter Filter config.
			 * @param {Terrasoft.core.collections.Collection} list System values list.
			 */
			prepareSysValuesList: function(filter, list) {
				if (!list) {
					return;
				}
				filter = this._getFilterProperties(filter);
				const filterFn = filter.filterFn;
				const filterValue = filter.filterValue;
				const sysValues = {};
				const sysValuesKeys = Object.keys(Terrasoft.SystemValueType);
				sysValuesKeys.forEach(function(key) {
					const sysValueName = Terrasoft.SystemValueType[key];
					const caption = this.getSysValueCaption(sysValueName);
					const dataValueType = this.findSysValueDataValueType(sysValueName);
					const referenceSchemaName = this.findSysValueReferenceSchemaName(sysValueName);
					const filtrationObject = {
						referenceSchemaName: referenceSchemaName,
						dataValueType: dataValueType
					};
					if (filterFn && filterFn(filtrationObject) !== true) {
						return;
					}
					if (dataValueType && caption && caption.indexOf(filterValue) >= 0) {
						sysValues[sysValueName] = {
							value: sysValueName,
							displayValue: caption,
							dataValueType: dataValueType
						};
					}
				}, this);
				list.reloadAll(sysValues);
			},

			/**
			 * Prepares system values list.
			 * @protected
			 * @param {Object} filter Column search value.
			 * @param {Terrasoft.core.collections.Collection} list System values list.
			 */
			prepareConstantList: function(filter, list) {
				if (!list) {
					return;
				}
				filter = this._getFilterProperties(filter);
				const filterFn = filter.filterFn;
				const filterValue = filter.filterValue;
				const constants = {};
				const constantKeys = Object.keys(Terrasoft.DataValueType);
				constantKeys.forEach(function(key) {
					const value = Terrasoft.DataValueType[key];
					if (filterFn && filterFn(value) !== true) {
						return;
					}
					const caption = Terrasoft.getDataValueTypeCaption(value);
					const name = Terrasoft.getDataValueTypeName(value);
					if (caption && caption.indexOf(filterValue) >= 0) {
						constants[name] = {
							value: name,
							displayValue: caption,
							dataValueType: value
						};
					}
				}, this);
				list.reloadAll(constants);
			},

			/**
			 * Prepares page schema attributes list.
			 * @protected
			 * @param {Object} dataGetterConfig Data getter configuration object.
			 * @param {Object} dataGetterConfig.pageSchemaUId Page schema identifier.
			 * @param {Object} filterConfig Filter configuration object.
			 * @param {String} filterConfig.filterValue Filter search value.
			 * @param {Array} filterConfig.filterFns Filter functions.
			 * @param {Terrasoft.core.collections.Collection} outList Output page schema attributes list.
			 */
			prepareAttributesList: function(dataGetterConfig, filterConfig, outList) {
				this._loadToCollection(function(builder) {
					const filterValue = filterConfig.filterValue || "";
					const filterFns = filterConfig.filterFns || [];
					const filters = [builder.buildPageSchemaAttributeSimpleValueFilter({filterValue: filterValue})]
						.concat(filterFns);
					return builder
						.from(builder.buildPageSchemaAttributesGetter(dataGetterConfig))
						.then(builder.filter(filters))
						.then(builder.select(builder.buildPageSchemaAttributeValueSelector()))
						.then(builder.sortByDisplayValue())
						.then(builder.toCollection());
				}, outList);
			},

			/**
			 * Returns entity schema column lookup value.
			 * @protected
			 * @param {Object} config Config.
			 * @param {String} config.entitySchemaUId Entity schema UId.
			 * @param {String} config.packageUId Package UId.
			 * @param {String} config.columnName Entity column name.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			getEntitySchemaColumnLookupValue: function(config, callback, scope) {
				this._loadLookupValue(function(builder) {
					const entitySchemaUId = config.entitySchemaUId;
					const packageUId = config.packageUId;
					const columnName = config.columnName;
					return builder
						.from(builder.buildEntitySchemaColumnsGetter({
							entitySchemaUId: entitySchemaUId,
							packageUId: packageUId
						}))
						.then(builder.filter([builder.buildNameFilter({name: columnName})]))
						.then(builder.select(builder.buildEntitySchemaColumnValueSelector()))
						.then(builder.firstOrDefault());
				}, callback, scope);
			},

			/**
			 * Returns page schema parameter lookup value.
			 * @protected
			 * @param {Object} config Config.
			 * @param {String} config.pageSchemaUId Page schema UId.
			 * @param {String} config.packageUId Package UId.
			 * @param {String} config.parameterName Parameter name.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			getPageSchemaParameterLookupValue: function(config, callback, scope) {
				this._loadLookupValue(function(builder) {
					const pageSchemaUId = config.pageSchemaUId;
					const packageUId = config.packageUId;
					const parameterName = config.parameterName;
					return builder
						.from(builder.buildPageSchemaParametersGetter({
							pageSchemaUId: pageSchemaUId,
							packageUId: packageUId
						}))
						.then(builder.filter([builder.buildNameFilter({name: parameterName})]))
						.then(builder.select(builder.buildPageSchemaParameterValueSelector()))
						.then(builder.firstOrDefault());
				}, callback, scope);
			},

			/**
			 * Returns attribute lookup value.
			 * @protected
			 * @param {Object} config Configuration object.
			 * @param {String} config.pageSchemaUId Page schema UId.
			 * @param {String} config.attributeName Attribute name.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Callback function scope.
			 */
			getAttributeLookupValue: function(config, callback, scope) {
				this._loadLookupValue(function(builder) {
					const pageSchemaUId = config.pageSchemaUId;
					const attributeName = config.attributeName;
					return builder
						.from(builder.buildPageSchemaAttributesGetter({pageSchemaUId: pageSchemaUId}))
						.then(builder.filter([builder.buildNameFilter({name: attributeName})]))
						.then(builder.select(builder.buildPageSchemaAttributeValueSelector()))
						.then(builder.firstOrDefault(builder.buildPageSchemaAttributeDefaultValueGenerator({name: attributeName})));
				}, callback, scope);
			},

			/**
			 * Returns system value caption.
			 * @protected
			 * @param {String} sysValue System value name.
			 * @return {String} System value caption.
			 */
			getSysValueCaption: function(sysValue) {
				return Terrasoft.Resources.SystemValueCaptions[sysValue];
			}

			//endregion

		});
	}
);


