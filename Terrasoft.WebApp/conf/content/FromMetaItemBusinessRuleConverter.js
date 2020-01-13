Terrasoft.configuration.Structures["FromMetaItemBusinessRuleConverter"] = {innerHierarchyStack: ["FromMetaItemBusinessRuleConverter"]};
define("FromMetaItemBusinessRuleConverter", ["BusinessRuleModule"], function(BusinessRuleModule) {

	/**
	 * @class Terrasoft.configuration.FromMetaItemBusinessRuleConverter
	 * FromMetaItemBusinessRuleConverter class.
	 */
	Ext.define("Terrasoft.configuration.FromMetaItemBusinessRuleConverter", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.FromMetaItemBusinessRuleConverter",

		// region Properties: Private

		/**
		 * Action type map.
		 * @private
		 * @type {Object}
		 */
		actionTypeMap: null,

		/**
		 * Expression type map.
		 * @private
		 * @type {Object}
		 */
		expressionTypeMap: null,

		/**
		 * Attribute actions.
		 * @private
		 * @type {Array}
		 */
		attributeActions: null,

		/**
		 * Entity schema.
		 * @private
		 * @type {Terrasoft.BaseEntitySchema}
		 */
		entitySchema: null,

		/**
		 * Page schema UId.
		 * @private
		 * @type {String}
		 */
		pageSchemaUId: null,

		// endregion

		// region Methods: Private

		/**
		 * Returns entity schema column name.
		 * @private
		 * @param {String} columnUId Column uId.
		 * @return {String} Entity schema column name.
		 */
		getEntitySchemaColumnName: function(columnUId, modelName) {
			var result;
			const entitySchema = Terrasoft.BusinessRuleSchemaManager.getEntitySchemaByDataModel(modelName,
				this.pageSchemaUId);
			Terrasoft.each(entitySchema.columns, function(column, columnName) {
				if (column.uId === columnUId) {
					result = columnName;
					return false;
				}
			}, this);
			if (!Ext.isDefined(result)) {
				throw new Terrasoft.ItemNotFoundException();
			}
			return result;
		},

		/**
		 * @private
		 */
		_getAttributeName: function(columnUId, modelName) {
			const columnName = this.getEntitySchemaColumnName(columnUId, modelName);
			return Terrasoft.BusinessRuleSchemaManager.getAttributeName(columnName, modelName, this.pageSchemaUId);
		},

		/**
		 * Checks object is of className type.
		 * @private
		 * @param {Object} object Object.
		 * @param {String} className Class name.
		 * @return {Boolean} If object is of type, returns true.
		 */
		isObjectOfClass: function(object, className) {
			return Terrasoft.isInstanceOfClass(object, "Terrasoft.manager." + className);
		},

		/**
		 * Checks object is of type from classNameMap.
		 * @private
		 * @param {Object} object Object.
		 * @param {Object} classNameMap Class name map.
		 * @return {Boolean} If object is of type, returns true.
		 */
		isObjectOfClasses: function(object, classNameMap) {
			var result = false;
			Terrasoft.each(classNameMap, function(value, key) {
				if (this.isObjectOfClass(object, Ext.isArray(classNameMap) ? value : key)) {
					result = true;
					return false;
				}
			}, this);
			return result;
		},

		/**
		 * Returns old enum type by object type.
		 * @private
		 * @param {Object} classNameMap Class name map.
		 * @param {Object} object Object.
		 * @return {Object} Old enum type.
		 */
		getEnumTypeByObject: function(classNameMap, object) {
			var fullClassName = Ext.getClassName(object);
			var className = fullClassName.split(".").pop();
			var result = this[classNameMap][className];
			if (!Ext.isEmpty(result)) {
				return result;
			} else {
				throw new Terrasoft.InvalidOperationException();
			}
		},

		/**
		 * @private
		 */
		_getEntitySchemaColumnPathByMetaPath: function(entitySchemaUId, metaPath, callback, scope) {
			var request = {
				getSchemaColumnInformation: {
					entitySchemaUId: entitySchemaUId,
					schemaColumnMetaPath: metaPath
				}
			};
			Terrasoft.SchemaDesignerUtilities.execute(request, function(response) {
				var schemaColumnInformation = response && response.getSchemaColumnInformationResponse;
				if (Ext.isEmpty(schemaColumnInformation)) {
					throw new Terrasoft.InvalidOperationException();
				}
				callback.call(scope, schemaColumnInformation.columnPath);
			}, this);
		},

		/**
		 * Returns entity schema column path by metaPath.
		 * @private
		 * @param {String} metaPath Entity schema column metaPath.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		getEntitySchemaColumnPathByMetaPath: function(metaPath, modelName, callback, scope) {
			const entitySchema = Terrasoft.BusinessRuleSchemaManager.getEntitySchemaByDataModel(modelName,
				this.pageSchemaUId);
			const entitySchemaUId = entitySchema.uId;
			this._getEntitySchemaColumnPathByMetaPath(entitySchemaUId, metaPath, callback, scope);
		},

		/**
		 * @private
		 */
		_getParameterColumnPathByMetaPath: function(expression, callback, scope) {
			const paths = expression.columnMetaPath.split(".");
			const parameterUId = paths[0];
			const columnMetaPath = paths.splice(1).join(".");
			let attribute;
			Terrasoft.chain(
				function(next) {
					Terrasoft.ClientUnitSchemaManager.findParameterByUId({
						schemaUId: this.pageSchemaUId,
						parameterUId: parameterUId
					}, next, this);
				},
				function(next, parameter) {
					attribute = parameter.name;
					var entitySchemaUId = parameter.referenceSchemaUId;
					this._getEntitySchemaColumnPathByMetaPath(entitySchemaUId, columnMetaPath, next, this);
				},
				function(next, columnPath) {
					callback.call(scope, {
						attribute: attribute,
						attributePath: columnPath
					});
				}, this
			);
		},

		/**
		 * Validates business rule expression metaItem.
		 * @private
		 * @param {Terrasoft.BaseBusinessRuleExpression} expression Business rule expression metaItem.
		 * @return {Boolean} If metaItem is valid, returns true.
		 */
		isExpressionMetaItem: function(expression) {
			return this.isObjectOfClasses(expression, this.expressionTypeMap);
		},

		/**
		 * Converts business rule column expression metaItem to old business rule expression config.
		 * @private
		 * @param {Terrasoft.ColumnBusinessRuleExpression} expression Business rule column expression metaItem.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		convertFromColumnExpressionMetaItem: function(expression, callback, scope) {
			var columnMetaPath = expression.columnMetaPath;
			const modelName = expression.dataModelName;
			if (!Terrasoft.contains(columnMetaPath, ".")) {
				callback.call(scope, {
					attribute: this._getAttributeName(columnMetaPath, modelName)
				});
				return;
			}
			const columnIdArray = columnMetaPath.split(".");
			const columnId = columnIdArray[0];
			const attribute = this._getAttributeName(columnId, modelName);
			this.getEntitySchemaColumnPathByMetaPath(columnMetaPath, modelName, function(columnPath) {
				const columnPathArray = columnPath.split(".");
				const attributePath = columnPathArray.splice(1).join(".");
				callback.call(scope, {
					attribute: attribute,
					attributePath: attributePath
				});
			}, this);
		},

		/**
		 * @private
		 */
		_convertFromParameterExpressionMetaItem: function(expression, callback, scope) {
			if (Terrasoft.contains(expression.columnMetaPath, ".")) {
				this._getParameterColumnPathByMetaPath(expression, callback, scope);
			} else {
				callback.call(scope, {attribute: expression.attributeName});
			}
		},

		/**
		 * Converts business rule expression metaItem to old business rule expression config.
		 * @private
		 * @param {Terrasoft.BaseBusinessRuleExpression} expression Business rule expression metaItem.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		convertFromExpressionMetaItem: function(expression, callback, scope) {
			if (!this.isExpressionMetaItem(expression)) {
				throw new Terrasoft.UnsupportedTypeException();
			}
			var enumType = this.getEnumTypeByObject("expressionTypeMap", expression);
			var convertedExpression = {type: enumType};
			Terrasoft.chain(
				function(next) {
					switch (enumType) {
						case BusinessRuleModule.enums.ValueType.CONSTANT:
							convertedExpression.value = expression.value;
							convertedExpression.dataValueType = expression.dataValueType;
							next();
							break;
						case BusinessRuleModule.enums.ValueType.SYSVALUE:
							convertedExpression.value = expression.sysValueType;
							convertedExpression.dataValueType = expression.dataValueType;
							next();
							break;
						case BusinessRuleModule.enums.ValueType.SYSSETTING:
							convertedExpression.value = expression.sysSettingCode;
							convertedExpression.dataValueType = expression.dataValueType;
							next();
							break;
						case BusinessRuleModule.enums.ValueType.PARAMETER:
							this._convertFromParameterExpressionMetaItem(expression, function(convertedExpressionPart) {
								Ext.apply(convertedExpression, convertedExpressionPart);
								next();
							}, this);
							break;
						case BusinessRuleModule.enums.ValueType.ATTRIBUTE:
							if (this.isObjectOfClass(expression, "AttributeBusinessRuleExpression")) {
								convertedExpression.attribute = expression.attributeName;
								next();
							} else {
								this.convertFromColumnExpressionMetaItem(expression, function(convertedExpressionPart) {
									Ext.apply(convertedExpression, convertedExpressionPart);
									next();
								}, this);
							}
							break;
						default:
							throw new Terrasoft.UnsupportedTypeException();
					}
				},
				function() {
					callback.call(scope, convertedExpression);
				},
				this
			);
		},

		/**
		 * Validates business rule right expression metaItem.
		 * @private
		 * @param {Object} rightExpression Business rule right expression metaItem.
		 * @param {Terrasoft.ComparisonType} comparisonType Comparison type.
		 * @return {Boolean} If metaItem is valid, returns true.
		 */
		isRightExpressionMetaItem: function(rightExpression, comparisonType) {
			var nullableComparisonTypes = [
				Terrasoft.ComparisonType.IS_NULL,
				Terrasoft.ComparisonType.IS_NOT_NULL
			];
			return Ext.isObject(rightExpression) || Terrasoft.contains(nullableComparisonTypes, comparisonType);
		},

		/**
		 * Validates business rule comparison condition metaItem.
		 * @private
		 * @param {Terrasoft.ComparisonBusinessRuleCondition} condition Business rule comparison condition metaItem.
		 * @return {Boolean} If metaItem is valid, returns true.
		 */
		isComparisonConditionMetaItem: function(condition) {
			return this.isObjectOfClass(condition, "ComparisonBusinessRuleCondition") &&
				Ext.isNumber(condition.comparisonType) &&
				Ext.isObject(condition.leftExpression) &&
				this.isRightExpressionMetaItem(condition.rightExpression, condition.comparisonType);
		},

		/**
		 * Converts business rule comparison condition metaItem to old business rule condition config.
		 * @private
		 * @param {Terrasoft.BusinessRuleConditionGroup} condition Business rule comparison condition metaItem.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		convertFromComparisonCondiotionMetaItem: function(condition, callback, scope) {
			if (!this.isComparisonConditionMetaItem(condition)) {
				throw new Terrasoft.UnsupportedTypeException();
			}
			var convertedCondition = {comparisonType: condition.comparisonType};
			Terrasoft.chain(
				function(next) {
					this.convertFromExpressionMetaItem(condition.leftExpression, function(convertedExpression) {
						convertedCondition.leftExpression = convertedExpression;
						next();
					}, this);
				},
				function(next) {
					if (!Ext.isEmpty(condition.rightExpression)) {
						this.convertFromExpressionMetaItem(condition.rightExpression, function(convertedExpression) {
							convertedCondition.rightExpression = convertedExpression;
							next();
						}, this);
					} else {
						next();
					}
				},
				function() {
					callback.call(scope, convertedCondition);
				},
				this
			);
		},

		/**
		 * Validates business rule condition group metaItem.
		 * @private
		 * @param {Terrasoft.BusinessRuleConditionGroup} conditionGroup Business rule condition group metaItem.
		 * @return {Boolean} If metaItem is valid, returns true.
		 */
		isConditionGroupMetaItem: function(conditionGroup) {
			return this.isObjectOfClass(conditionGroup, "BusinessRuleConditionGroup") &&
				Ext.isNumber(conditionGroup.operationType) &&
				Ext.isArray(conditionGroup.items);
		},

		/**
		 * Converts business rule condition group metaItem to old business rule condition config.
		 * @private
		 * @param {Terrasoft.BusinessRuleConditionGroup} conditionGroup Business rule condition group metaItem.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		convertFromCondiotionGroupMetaItem: function(conditionGroup, callback, scope) {
			if (!this.isConditionGroupMetaItem(conditionGroup)) {
				throw new Terrasoft.UnsupportedTypeException();
			}
			var items = [];
			var functions = conditionGroup.items.map(function(condition) {
				return function(next) {
					this.convertFromComparisonCondiotionMetaItem(condition, function(result) {
						items.push(result);
						next();
					}, this);
				};
			}, this);
			functions.push(function() {
				callback.call(scope, {
					logical: conditionGroup.operationType,
					conditions: items
				});
			});
			Terrasoft.chain.apply(this, functions);
		},

		/**
		 * Converts business rule filtration action metaItem to old business rule action config.
		 * @private
		 * @param {Terrasoft.FiltrationBusinessRuleAction} action Business rule action metaItem.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		convertFromFiltrationActionMetaItem: function(action, callback, scope) {
			var actionRulePart = {ruleType: BusinessRuleModule.enums.RuleType.FILTRATION};
			this.convertFromComparisonCondiotionMetaItem(action.condition, function(convertedCondition) {
				var actionColumnName = convertedCondition.leftExpression.attribute;
				Ext.apply(actionRulePart, convertedCondition.rightExpression, {
					baseAttributePatch: convertedCondition.leftExpression.attributePath,
					comparisonType: convertedCondition.comparisonType
				});
				callback.call(scope, actionColumnName, actionRulePart);
			}, this);
		},

		/**
		 * @private
		 */
		_convertFromBindParameterAttributeActionMetaItem: function(action) {
			const sourceType = action.getPropertyValue("sourceType");
			const attributeName = action.getPropertyValue("attributeName");
			const dataModelName = action.getPropertyValue("dataModelName");
			return sourceType === Terrasoft.BusinessRuleActionSourceType.COLUMN_SOURCE
				? Terrasoft.BusinessRuleSchemaManager.getAttributeName(attributeName, dataModelName, this.pageSchemaUId)
				: attributeName;
		},

		/**
		 * Converts business rule bindable parameter action metaItem to old business rule action config.
		 * @private
		 * @param {Terrasoft.BaseBusinessRuleAction} action Business rule action metaItem.
		 * @return {Object} Old business rule action config.
		 */
		convertFromBindParameterActionMetaItem: function(action) {
			const actionRulePart = {
				ruleType: BusinessRuleModule.enums.RuleType.BINDPARAMETER,
				property: this.getEnumTypeByObject("actionTypeMap", action)
			};
			let actionColumnName;
			if (this.isObjectOfClasses(action, this.attributeActions)) {
				actionColumnName = this._convertFromBindParameterAttributeActionMetaItem(action);
			} else {
				actionColumnName = this._getAttributeName(action.columnUId);
			}
			return {
				actionRulePart: actionRulePart,
				actionColumnName: actionColumnName
			};
		},

		/**
		 * Validates business rule action metaItem.
		 * @private
		 * @param {Terrasoft.BaseBusinessRuleAction} action Business rule action metaItem.
		 * @return {Boolean} If metaItem is valid, returns true.
		 */
		isActionMetaItem: function(action) {
			return this.isObjectOfClass(action, "FiltrationBusinessRuleAction") ||
				this.isObjectOfClasses(action, this.actionTypeMap);
		},

		/**
		 * Validates business rule action group metaItem.
		 * @private
		 * @param {Terrasoft.BusinessRuleActionGroup} actionGroup Business rule action group metaItem.
		 * @return {Boolean} If metaItem is valid, returns true.
		 */
		isActionGroupMetaItem: function(actionGroup) {
			return this.isObjectOfClass(actionGroup, "BusinessRuleActionGroup") &&
				Ext.isArray(actionGroup.items) &&
				actionGroup.items.length === 1 &&
				this.isActionMetaItem(actionGroup.items[0]);
		},

		/**
		 * Converts business rule action metaItem to old business rule action config.
		 * @private
		 * @param {Terrasoft.BusinessRuleActionGroup} actionGroup Action group metaItem.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		convertFromActionMetaItem: function(actionGroup, callback, scope) {
			if (!this.isActionGroupMetaItem(actionGroup)) {
				throw new Terrasoft.UnsupportedTypeException();
			}
			var action = actionGroup.items[0];
			if (!this.isObjectOfClass(action, "FiltrationBusinessRuleAction")) {
				var actionConfig = this.convertFromBindParameterActionMetaItem(action);
				callback.call(scope, false, actionConfig.actionColumnName, actionConfig.actionRulePart);
			} else {
				this.convertFromFiltrationActionMetaItem(action, function(actionColumnName, actionRulePart) {
					callback.call(scope, true, actionColumnName, actionRulePart);
				}, this);
			}
		},

		/**
		 * Validates business rule case metaItem.
		 * @private
		 * @param {Terrasoft.BusinessRuleCase} ruleCase Business rule case metaItem.
		 * @return {Boolean} If metaItem is valid, returns true.
		 */
		isRuleCaseMetaItem: function(ruleCase) {
			return this.isObjectOfClass(ruleCase, "BusinessRuleCase") &&
				Ext.isObject(ruleCase.condition) &&
				Ext.isObject(ruleCase.action);
		},

		/**
		 * Validates business rule switch metaItem.
		 * @private
		 * @param {Terrasoft.BusinessRuleSwitch} ruleSwitch Business rule switch metaItem.
		 * @return {Boolean} If metaItem is valid, returns true.
		 */
		isRuleSwitchMetaItem: function(ruleSwitch) {
			return this.isObjectOfClass(ruleSwitch, "BusinessRuleSwitch") &&
				Ext.isArray(ruleSwitch.cases) &&
				ruleSwitch.cases.length === 1 &&
				this.isRuleCaseMetaItem(ruleSwitch.cases[0]);
		},

		/**
		 * Validates business rule schema.
		 * @private
		 * @param {Terrasoft.BusinessRuleSchema} rule Business rule schema.
		 * @return {Boolean} If schema is valid, returns true.
		 */
		isRuleSchema: function(rule) {
			return this.isObjectOfClass(rule, "BusinessRuleSchema") && this.isRuleSwitchMetaItem(rule.ruleSwitch);
		},

		/**
		 * Returns true if business rule schema is invalid business rule schema.
		 * @private
		 * @param {Terrasoft.BusinessRuleSchema} rule Business rule schema.
		 * @return {Boolean} True if business rule schema is invalid business rule schema.
		 */
		isInvalidRuleSchema: function(rule) {
			return this.isObjectOfClass(rule, "InvalidBusinessRuleSchema");
		},

		/**
		 * Converts business rule schema to old business rule config.
		 * @private
		 * @param {Terrasoft.BusinessRuleSchema} rule Business rule schema.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		convertFromRuleSchema: function(rule, callback, scope) {
			if (this.isInvalidRuleSchema(rule)) {
				callback.call(scope, {uId: rule.uId, removed: rule.removed}, rule.name, rule.actionColumnName);
				return;
			}
			if (!this.isRuleSchema(rule)) {
				throw new Terrasoft.UnsupportedTypeException();
			}
			var convertedRule = {
				uId: rule.uId,
				enabled: rule.enabled,
				removed: rule.removed
			};
			var columnName;
			var ruleCase = rule.ruleSwitch.cases[0];
			Terrasoft.chain(
				function(next) {
					this.convertFromActionMetaItem(ruleCase.action,
						function(isFiltrationAction, actionColumnName, actionRulePart) {
							Ext.apply(convertedRule, actionRulePart);
							columnName = actionColumnName;
							next(isFiltrationAction);
						}, this);
				},
				function(next, isFiltrationAction) {
					if (!isFiltrationAction) {
						this.convertFromCondiotionGroupMetaItem(ruleCase.condition, function(conditionRulePart) {
							Ext.apply(convertedRule, conditionRulePart);
							next();
						}, this);
					} else {
						next();
					}
				},
				function() {
					callback.call(scope, convertedRule, rule.name, columnName);
				},
				this
			);
		},

		// endregion

		// region Methods: Public

		/**
		 * Converts metaItems to old business rule config.
		 * @param {Terrasoft.BusinessRuleSchema[]} rules Rules.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function scope.
		 */
		convertFromMetaItems: function(rules, callback, scope) {
			var result = {};
			var functions = rules.map(function(rule) {
				return function(next) {
					this.convertFromRuleSchema(rule, function(convertedRule, ruleName, actionColumnName) {
						if (!Ext.isObject(result[actionColumnName])) {
							result[actionColumnName] = {};
						}
						result[actionColumnName][ruleName] = convertedRule;
						Terrasoft.defer(next);
					}, this);
				};
			}, this);
			functions.push(function() {
				callback.call(scope, result);
			});
			Terrasoft.chain.apply(this, functions);
		}

		// endregion

	});
	return Terrasoft.FromMetaItemBusinessRuleConverter;
});


