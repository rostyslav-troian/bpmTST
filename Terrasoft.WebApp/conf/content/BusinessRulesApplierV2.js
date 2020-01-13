Terrasoft.configuration.Structures["BusinessRulesApplierV2"] = {innerHierarchyStack: ["BusinessRulesApplierV2"]};
define("BusinessRulesApplierV2", ["ext-base", "terrasoft", "BusinessRuleModule", "BusinessRulesApplierV2Resources"],
	function(Ext, Terrasoft, BusinessRuleModule, resources) {
		/**
		 * @class Terrasoft.configuration.BusinessRulesApplier
		 * #####, ####### ######### ######-####### # ############# # ###### ############# #####
		 */
		var businessRulesApplier = Ext.define("Terrasoft.configuration.BusinessRulesApplier", {
			alternateClassName: "Terrasoft.BusinessRulesApplier",
			extend: "Terrasoft.BaseObject",

			//region Properties: Private

			/**
			 * ViewModel schema class.
			 * @private
			 * @type {Object}
			 */
			viewModelClass: null,

			/**
			 * Schema view config.
			 * @private
			 * @type {Object[]}
			 */
			viewConfig: null,

			/**
			 * Visible property name.
			 * @private
			 * @type {String}
			 */
			visiblePropertyName: "visible",

			/**
			 * ######## ######## ###########
			 * @private
			 * @type {String}
			 */
			enabledPropertyName: "enabled",

			/**
			 * ######## ######## ############## ##########
			 * @private
			 * @type {String}
			 */
			isRequiredPropertyName: "isRequired",

			/**
			 * ######## ######## ########### # ###### ######
			 * @private
			 * @type {String}
			 */
			readonlyPropertyName: "readonly",

			/**
			 * ####### ####### ######## ##########
			 * @private
			 * @type {String}
			 */
			labelSuffix: "Label",

			/**
			 * ######## ##### ####### ############# ### ########## ######## ##########
			 * @private
			 * @type {String}
			 */
			requiredStyleName: "required-caption",

			/**
			 * ####### ###### ############# ######
			 * @private
			 * @type {String}
			 */
			viewModelMethodPrefix: "Is",

			/**
			 * ####### ###### ############## ########### ######## # ####
			 * @private
			 * @type {String}
			 */
			autoCompleteMethodPrefix: "AutoComplete",

			/**
			 * ####### ###### ############# ####### ####
			 * @private
			 * @type {String}
			 */
			autoCleanMethodPrefix: "AutoClean",

			/**
			 * ########### ####### #### #######
			 * @private
			 * @type {String}
			 */
			metaPathSeparator: ".",

			/**
			 * ####### ######## #######
			 * @private
			 * @type {String}
			 */
			filterSuffix: "Filter",

			//endregion

			//region Methods: Private

			/**
			 * @private
			 */
			_addColumnToLookupListConfig: function(column, columnName) {
				var lookupListConfig = column.lookupListConfig = column.lookupListConfig || {};
				var columns = lookupListConfig.columns = lookupListConfig.columns || [];
				Terrasoft.appendIf(columns, columnName);
			},

			/**
			 * @private
			 */
			_checkFiltrationRuleComparisonType: function(rule, ruleName) {
				if (Ext.isEmpty(rule.comparisonType)) {
					var template = resources.localizableStrings.InvalidRuleFormatExceptionException;
					var message = Ext.String.format(template, ruleName);
					throw new Terrasoft.InvalidFormatException({message: message});
				}
			},

			/**
			 * @private
			 */
			_setLookupListConfigColumns: function(expression) {
				const viewModel = this.viewModelClass.prototype;
				const columns = viewModel.columns;
				if (expression && expression.attribute && expression.attributePath) {
					const conditionColumn = columns[expression.attribute];
					if (!conditionColumn.lookupListConfig) {
						conditionColumn.lookupListConfig = {};
					}
					const lookupListConfig = conditionColumn.lookupListConfig;
					if (!lookupListConfig.columns) {
						lookupListConfig.columns = [];
					}
					const lookupColumns = lookupListConfig.columns;
					if (!Ext.Array.contains(lookupColumns, expression.attributePath)) {
						lookupColumns.push(expression.attributePath);
					}
				}
			},

			//endregion

			/**
			 * Applies business rules to schema.
			 * @param {Object} viewModelClass View model class.
			 * @param {Object[]} viewConfig View config.
			 */
			applyRules: function(viewModelClass, viewConfig) {
				this.viewModelClass = viewModelClass;
				this.viewConfig = viewConfig;
				var viewModelClassPrototype = viewModelClass.prototype;
				var rules = this.mergeRules(viewModelClassPrototype.rules, viewModelClassPrototype.businessRules);
				viewModelClassPrototype.rules = rules;
				Terrasoft.each(rules, function(columnRules, columnName) {
					this.applyColumnRules(columnRules, columnName);
				}, this);
			},

			/**
			 * Merges rule and business rule blocks.
			 * @param {Object} rules Rule block.
			 * @param {Object} businessRules Business rule block.
			 * @return {Object} Merged rules.
			 */
			mergeRules: function(rules, businessRules) {
				rules = rules || {};
				businessRules = businessRules || {};
				var result = {};
				var columnNames = Ext.Array.merge(Ext.Object.getKeys(rules), Ext.Object.getKeys(businessRules));
				Terrasoft.each(columnNames, function(columnName) {
					result[columnName] = this.mergeColumnRules(rules[columnName], businessRules[columnName]);
				}, this);
				return result;
			},

			/**
			 * Merges column rules and column business rules.
			 * @protected
			 * @param {Object} columnRules Column rules.
			 * @param {Object} columnBusinessRules Column business rules.
			 * @return {Object} Merged column rules.
			 */
			mergeColumnRules: function(columnRules, columnBusinessRules) {
				columnRules = columnRules || {};
				columnBusinessRules = columnBusinessRules || {};
				var result = {};
				var ruleNames = Ext.Array.merge(
					Ext.Object.getKeys(columnRules),
					Ext.Object.getKeys(columnBusinessRules));
				Terrasoft.each(ruleNames, function(ruleName) {
					result[ruleName] = Ext.apply(columnRules[ruleName] || {}, columnBusinessRules[ruleName]);
				}, this);
				return result;
			},

			/**
			 * Returns ability of execution of rule.
			 * @protected
			 * @param {Object} rule Rule.
			 * @return {Boolean} Ability of execution of rule.
			 */
			canExecuteBusinessRule: function(rule) {
				return rule.removed !== true && rule.enabled !== false;
			},

			/**
			 * ######### ######-####### # ####### #####.
			 * @protected
			 * @param {Object} columnRules ######-####### #######.
			 * @param {String} columnName ######## #######.
			 */
			applyColumnRules: function(columnRules, columnName) {
				Terrasoft.each(columnRules, function(rule, ruleName) {
					if (this.canExecuteBusinessRule(rule)) {
						rule.columnName = columnName;
						this.applyRule(rule, ruleName);
					}
				}, this);
			},

			/**
			 * ######### ######-####### # ####### #####.
			 * @protected
			 * @param {Object} rule ######-#######.
			 * @param {String} ruleName ######## ######-#######.
			 */
			applyRule: function(rule, ruleName) {
				var ruleType = rule.ruleType;
				if (Ext.isEmpty(ruleType) || Ext.isEmpty(ruleName)) {
					throw new Terrasoft.InvalidFormatException({
						message: Ext.String.format(resources.localizableStrings.InvalidRuleFormatExceptionException,
							ruleName)
					});
				}
				switch (ruleType) {
					case BusinessRuleModule.enums.RuleType.BINDPARAMETER:
						this.applyBindParameterRule(rule, ruleName);
						break;
					case BusinessRuleModule.enums.RuleType.FILTRATION:
						this.applyFiltrationRule(rule, ruleName);
						break;
					case BusinessRuleModule.enums.RuleType.AUTOCOMPLETE:
						this.applyAutoCompleteRule(rule, ruleName);
						break;
					case BusinessRuleModule.enums.RuleType.DISABLED:
						break;
					default:
						break;
				}
			},

			/**
			 * ######### ######-####### ## ########## ######## # ###########.
			 * @protected
			 * @param {Object} rule ######-#######.
			 * @param {String} ruleName ######## ######-#######.
			 */
			applyFiltrationRule: function(rule, ruleName) {
				this._checkFiltrationRuleComparisonType(rule, ruleName);
				if (rule.autocomplete) {
					this.applyAutoCompleteRule(rule, ruleName);
				}
				var columns = this.viewModelClass.prototype.columns;
				var column = columns[rule.columnName];
				if (!column) {
					return;
				}
				var filterColumn = columns[rule.attribute];
				var relatedFilterColumnName = rule.attributePath;
				if (filterColumn && relatedFilterColumnName) {
					this._addColumnToLookupListConfig(filterColumn, relatedFilterColumnName);
				}
				var lookupListConfig = column.lookupListConfig = column.lookupListConfig || {};
				var filters = lookupListConfig.filters = lookupListConfig.filters || [];
				var ruleApplier = this;
				filters.push({
					argument: rule,
					method: function(_rule) {
						var filterGroup = Terrasoft.createFilterGroup();
						var ruleValue = ruleApplier.getRuleValue(_rule, this);
						if (!Ext.isEmpty(ruleValue)) {
							if (Terrasoft.isDateDataValueType(_rule.dataValueType)) {
								ruleValue = new Date(ruleValue);
							}
							var filterName = _rule.baseAttributePatch + ruleApplier.filterSuffix;
							var filterWithParameter = Terrasoft.createColumnFilterWithParameter(
								_rule.comparisonType, _rule.baseAttributePatch, ruleValue);
							filterGroup.add(filterName, filterWithParameter);
						}
						return filterGroup;
					}
				});
			},

			/**
			 * ######### ######-####### ## ############### ######## # ####.
			 * @protected
			 * @param {Object} rule ######-#######.
			 * @param {String} ruleName ######## ######-#######.
			 */
			applyAutoCompleteRule: function(rule, ruleName) {
				if (!ruleName) {
					return;
				}
				var viewModel = this.viewModelClass.prototype;
				var columnName = rule.columnName;
				var ruleAttribute = rule.attribute;
				var baseAttributePatch = rule.baseAttributePatch;
				var autoCompleteMethodName = this.autoCompleteMethodPrefix + columnName + ruleAttribute;
				var autoCompleteDependencies = [];
				if (rule.ruleType === BusinessRuleModule.enums.RuleType.AUTOCOMPLETE) {
					autoCompleteDependencies.push(rule.attribute);
				} else {
					autoCompleteDependencies.push(columnName);
				}
				var columns = viewModel.columns;
				var column = columns[columnName];
				if (!column.lookupListConfig) {
					column.lookupListConfig = {};
				}
				var lookupListConfig = column.lookupListConfig;
				if (!lookupListConfig.columns) {
					lookupListConfig.columns = [];
				}
				var lookupColumns = lookupListConfig.columns;
				if (lookupColumns.indexOf(baseAttributePatch) < 0) {
					lookupColumns.push(baseAttributePatch);
				}
				var modifyRule = Terrasoft.deepClone(rule);
				if (rule.ruleType === BusinessRuleModule.enums.RuleType.AUTOCOMPLETE) {
					modifyRule.attribute = rule.columnName;
					modifyRule.columnName = rule.attribute;
					rule = modifyRule;
				}
				if (!column.dependencies) {
					column.dependencies = [];
				}
				var dependencies = column.dependencies;
				var dependency = {
					columns: [columnName],
					methodName: autoCompleteMethodName,
					argument: rule
				};
				if (dependencies.indexOf(dependency) < 0) {
					dependencies.push(dependency);
				}
				viewModel[autoCompleteMethodName] = function(currentRule) {
					var argAttribute = currentRule.attribute;
					var lookupValue = this.get(currentRule.columnName);
					var setValue = function(argAttribute, value) {
						if (this.get(argAttribute) !== value) {
							this.set(argAttribute, value);
						}
					};
					if (!Ext.isEmpty(lookupValue)) {
						var dependentValue = (!Ext.isEmpty(currentRule.baseAttributePatch)) ?
							lookupValue[currentRule.baseAttributePatch] : lookupValue;
						if (!Ext.isEmpty(dependentValue)) {
							switch (currentRule.autocompleteType) {
								case BusinessRuleModule.enums.AutocompleteType.DISPLAYVALUE:
									if (!Ext.isEmpty(dependentValue.displayValue)) {
										setValue.call(this, argAttribute, dependentValue.displayValue);
									}
									break;
								case BusinessRuleModule.enums.AutocompleteType.VALUE:
									if (!Ext.isEmpty(dependentValue.value)) {
										setValue.call(this, argAttribute, dependentValue.value);
									}
									break;
								default:
									setValue.call(this, argAttribute, dependentValue);
									break;
							}
						}
					}
				};
				if (rule.autoClean) {
					this.applyAutoCleanRule(rule);
				}
			},

			/**
			 * ######### ######-####### ## ############## ####### ######## # ####.
			 * @protected
			 * @param {Object} rule ######-#######.
			 */
			applyAutoCleanRule: function(rule) {
				var columnName = rule.columnName;
				var ruleAttribute = rule.attribute;
				var autoCleanMethodName = this.autoCleanMethodPrefix + columnName + ruleAttribute;
				var viewModel = this.viewModelClass.prototype;
				var columns = viewModel.columns;
				var column = columns[columnName];
				var dependencies = column.dependencies = column.dependencies || [];
				var dependency = {
					columns: [ruleAttribute],
					methodName: autoCleanMethodName,
					argument: rule
				};
				if (dependencies.indexOf(dependency) === -1) {
					dependencies.push(dependency);
				}
				viewModel[autoCleanMethodName] = function() {
					var base = this.get(ruleAttribute);
					var dependent = this.get(columnName);
					if (!Ext.isEmpty(base) && !Ext.isEmpty(dependent)) {
						var dependentValue = dependent[rule.baseAttributePatch];
						var dependentValueIsEmpty = Ext.isEmpty(dependentValue);
						if ((!dependentValueIsEmpty && (base.value !== dependentValue.value)) ||
							(dependentValueIsEmpty && Ext.isFunction(this.canAutoCleanDependentColumns) &&
								this.canAutoCleanDependentColumns())) {
							this.set(columnName, null);
						}
					}
				};
			},

			/**
			 * Apply model dependencies.
			 * @param {Object} viewModel View model.
			 */
			applyDependencies: function(viewModel) {
				var columns = viewModel.columns;
				Terrasoft.each(columns, function(column, columnName) {
					if (!Ext.isEmpty(column.multiLookupColumns)) {
						column.dependencies = column.dependencies || [];
						column.dependencies.push({
							columns: [columnName],
							methodName: "onSetMultiLookup"
						});
					}
					if (column.dependencies) {
						var dependencies = column.dependencies;
						Terrasoft.each(dependencies, function(dependency) {
							var dependentColumns = dependency.columns;
							Terrasoft.each(dependentColumns, function(dependentColumn) {
								viewModel.on("change:" + dependentColumn, function() {
									if (this.get("IsEntityInitialized") === false) {
										return;
									}
									try {
										this[dependency.methodName](dependency.argument, dependentColumn);
									} catch (e) {
										this.warning(Ext.String.format(resources.localizableStrings.ThrownException, 
											dependency.methodName, e.message));
									}
								}, viewModel);
							}, this);
						}, this);
					}
				}, this);
			},

			/**
			 * Applies business rule by binding view properties.
			 * @protected
			 * @param {Object} rule Business rule.
			 * @param {String} ruleName Business rule name.
			 */
			applyBindParameterRule: function(rule, ruleName) {
				if (Ext.isEmpty(rule.conditions) || Ext.isEmpty(rule.property)) {
					throw new Terrasoft.InvalidFormatException({
						message: Ext.String.format(resources.localizableStrings.InvalidRuleFormatExceptionException,
							ruleName)
					});
				}
				this.applyViewBindParameter(rule, this.viewConfig);
				this.applyViewModelBindParameter(rule);
			},

			/**
			 * Applies view property to view model methods.
			 * @protected
			 * @param {Object} rule Business rule.
			 * @param {Array} viewConfig Schema view configuration array.
			 */
			applyViewBindParameter: function(rule, viewConfig) {
				Terrasoft.each(viewConfig, function(viewItem) {
					var viewItems = viewItem.items ? viewItem.items : viewItem.tabs;
					if (viewItems && Ext.isArray(viewItems)) {
						this.applyViewBindParameter(rule, viewItems);
					} else {
						var ruleColumnName = rule.columnName;
						var viewItemColumnName = viewItem.bindTo ? viewItem.bindTo : viewItem.name;
						var viewRuleConfig = viewItem.ruleConfig;
						var ruleConfig = viewRuleConfig ? viewRuleConfig[rule.columnName] : null;
						if ((ruleColumnName !== viewItemColumnName) && (!ruleConfig)) {
							return;
						}
						const propertyName = ruleColumnName === viewItemColumnName
							? this.getBindPropertyName(rule.property)
							: ruleConfig.propertyName;
						const methodName = this.getMethodName(rule.property, ruleColumnName);
						const config = {
							propertyName: propertyName,
							methodName: methodName
						};
						this._applyControlConfig(viewItem, config);
						this._applyLabelConfig(viewItem, config);
					}
				}, this);
			},

			/**
			 * @private
			 */
			_applyControlConfig: function(viewItem, config) {
				const propertyName = config.propertyName;
				const methodName = config.methodName;
				if (!viewItem.controlConfig) {
					viewItem.controlConfig = {};
				}
				viewItem.controlConfig[propertyName] = {bindTo: methodName};
			},

			/**
			 * @private
			 */
			_applyLabelConfig: function(viewItem, config) {
				const propertyName = config.propertyName;
				const methodName = config.methodName;
				const readOnlyPropertyName = this.getBindPropertyName(BusinessRuleModule.enums.Property.READONLY);
				const visibilityPropertyName = this.getBindPropertyName(BusinessRuleModule.enums.Property.VISIBLE);
				if (propertyName === readOnlyPropertyName) {
					return;
				}
				if (!viewItem.labelConfig) {
					viewItem.labelConfig = {};
				}
				if (propertyName === visibilityPropertyName && viewItem.labelConfig[propertyName] === false) {
					return;
				}
				viewItem.labelConfig[propertyName] = {bindTo: methodName};
			},

			/**
			 * Returns bind property name.
			 * @protected
			 * @param {Number} property Business rule property code.
			 * @return {String} Returns bind property name.
			 */
			getBindPropertyName: function(property) {
				var propertyName = this.visiblePropertyName;
				switch (property) {
					case BusinessRuleModule.enums.Property.VISIBLE:
						propertyName = this.visiblePropertyName;
						break;
					case BusinessRuleModule.enums.Property.ENABLED:
						propertyName = this.enabledPropertyName;
						break;
					case BusinessRuleModule.enums.Property.REQUIRED:
						propertyName = this.isRequiredPropertyName;
						break;
					case BusinessRuleModule.enums.Property.READONLY:
						propertyName = this.readonlyPropertyName;
						break;
					default:
						break;
				}
				return propertyName;
			},

			/**
			 * Returns method name by applying business rule.
			 * @protected
			 * @param {Number} property Business rule property code.
			 * @param {Object} columnName Column name.
			 * @return {String} Returns method name.
			 */
			getMethodName: function(property, columnName) {
				var rulePropertyName = this.getBindPropertyName(property);
				return this.viewModelMethodPrefix + columnName + rulePropertyName;
			},

			/**
			 * Creates viewModel methods to which the view properties will be attached.
			 * @protected
			 * @param {Object} rule Business rule.
			 */
			applyViewModelBindParameter: function(rule) {
				var viewModel = this.viewModelClass.prototype;
				var scope = this;
				var columnName = rule.columnName;
				Terrasoft.each(rule.conditions, function(condition) {
					this._setLookupListConfigColumns(condition.leftExpression);
					this._setLookupListConfigColumns(condition.rightExpression);
				}, this);
				var methodName = this.getMethodName(rule.property, columnName);
				viewModel[methodName] = function() {
					var result = (rule.logical === Terrasoft.LogicalOperatorType.AND);
					Terrasoft.each(rule.conditions, function(condition) {
						var leftValue = scope.getRuleValue(condition.leftExpression, this);
						var rightValue = scope.getRuleValue(condition.rightExpression, this);
						var conditionResult = scope.getConditionResult(leftValue, condition.comparisonType, rightValue);
						if (rule.logical === Terrasoft.LogicalOperatorType.AND) {
							result = result && conditionResult;
						} else {
							result = result || conditionResult;
						}
						var column = this.columns[rule.columnName];
						if (column && rule.property === BusinessRuleModule.enums.Property.REQUIRED) {
							column.isRequired = result;
						}
					}, this);
					return result;
				};
			},

			/**
			 * Returns calculated business rule value.
			 * @protected
			 * @param {Object} item Business rule expression.
			 * @param {Object} scope Function scope.
			 * @return {Object} Calculated business rule value.
			 */
			getRuleValue: function(item, scope) {
				var returnValue;
				if (Ext.isEmpty(item)) {
					return null;
				}
				switch (item.type) {
					case BusinessRuleModule.enums.ValueType.CONSTANT:
						returnValue = item.value;
						break;
					case BusinessRuleModule.enums.ValueType.SYSSETTING:
						returnValue = Terrasoft.SysSettings.cachedSettings[item.value];
						break;
					case BusinessRuleModule.enums.ValueType.PARAMETER:
					case BusinessRuleModule.enums.ValueType.ATTRIBUTE:
						var itemAttribute = item.attribute;
						var itemAttributePath = item.attributePath;
						if (!Ext.isEmpty(itemAttribute)) {
							returnValue = scope.get(itemAttribute);
							var dataValueType = scope.getColumnDataType(itemAttribute);
							if (!Ext.isEmpty(returnValue) && dataValueType === Terrasoft.DataValueType.LOOKUP) {
								if (Ext.isEmpty(itemAttributePath)) {
									returnValue = returnValue.value;
								} else {
									returnValue = this.getAttributeValueByPath(returnValue, itemAttributePath);
								}
							}
						}
						break;
					case BusinessRuleModule.enums.ValueType.SYSVALUE:
						returnValue = scope.getSysDefaultValue(item.value);
						break;
					case BusinessRuleModule.enums.ValueType.CARDSTATE:
						returnValue = scope.action;
						break;
					default:
						break;
				}
				if (returnValue && returnValue.value) {
					returnValue = returnValue.value;
				}
				var itemDataValueType = item.dataValueType || scope.getColumnDataType(item.attribute);
				if (returnValue && Terrasoft.isDateDataValueType(itemDataValueType)) {
					returnValue = this.getDateTimeValue(returnValue, itemDataValueType);
				}
				if (Terrasoft.isBooleanDataValueType(itemDataValueType)) {
					returnValue = Boolean(returnValue);
				}
				return returnValue;
			},

			/**
			 * Returns the numeric value of the specified date according to data value type.
			 * @param {Object} value Date value.
			 * @param {Number} dataValueType Type of specified date value.
			 * @return {Number} Returns the numeric value of the specified date.
			 */
			getDateTimeValue: function(value, dataValueType) {
				var returnValue;
				var date = new Date(value);
				switch (dataValueType) {
					case Terrasoft.DataValueType.DATE:
						date.setHours(0);
						date.setMinutes(0);
						date.setSeconds(0);
						date.setMilliseconds(0);
						returnValue = date.getTime();
						break;
					case Terrasoft.DataValueType.TIME:
						var currentDate = new Date();
						currentDate.setHours(date.getHours());
						currentDate.setMinutes(date.getMinutes());
						currentDate.setSeconds(date.getSeconds());
						currentDate.setMilliseconds(date.getMilliseconds());
						returnValue = currentDate.getTime();
						break;
					default:
						returnValue = date.getTime();
						break;
				}
				return returnValue;
			},

			/**
			 * Returns condition result.
			 * @protected
			 * @param {Object} left Left part path.
			 * @param {Object} type Comparison type.
			 * @param {Object} right Right part value.
			 * @return {Boolean} Returns condition result.
			 */
			getConditionResult: function(left, type, right) {
				var conditionResult = true;
				switch (type) {
					case Terrasoft.ComparisonType.IS_NULL:
						conditionResult = Ext.isEmpty(left);
						break;
					case Terrasoft.ComparisonType.IS_NOT_NULL:
						conditionResult = !Ext.isEmpty(left);
						break;
					case Terrasoft.ComparisonType.EQUAL:
						conditionResult = (left === right || (Ext.isEmpty(left) && Ext.isEmpty(right)));
						break;
					case Terrasoft.ComparisonType.NOT_EQUAL:
						conditionResult = (left !== right);
						break;
					case Terrasoft.ComparisonType.GREATER:
						conditionResult = (left > right);
						break;
					case Terrasoft.ComparisonType.LESS:
						conditionResult = (left < right);
						break;
					default:
						break;
				}
				return conditionResult;
			},

			/**
			 * ########## ######### ######### ######-#######.
			 * @protected
			 * @param {Object} left #### ####### ###### #####.
			 * @param {Object} type ### #########.
			 * @param {Object} right ############ ######## ###### #####.
			 * @return {Boolean} ########## ######### ######### ######-#######.
			 */
			getRuleComparingResult: function(left, type, right) {
				var rulePropertyCode = true;
				switch (type) {
					case Terrasoft.ComparisonType.IS_NULL:
						rulePropertyCode = Ext.isEmpty(left);
						break;
					case Terrasoft.ComparisonType.IS_NOT_NULL:
						rulePropertyCode = !Ext.isEmpty(left);
						break;
					case Terrasoft.ComparisonType.EQUAL:
						rulePropertyCode = (left === right);
						break;
					case Terrasoft.ComparisonType.NOT_EQUAL:
						rulePropertyCode = (left !== right);
						break;
					default:
						break;
				}
				return rulePropertyCode;
			},

			/**
			 * ########## ######## ######## ## #### #######.
			 * @protected
			 * @param {Object} object #### ####### ###### #####.
			 * @param {String} path ### #########.
			 * @return {String} ########## ######## ######## ## #### #######.
			 */
			getAttributeValueByPath: function(object, path) {
				return object[path];
			},

			/**
			 * ########## ############ #############, ## ###### ####### ##### ########### ######## ##########.
			 * @protected
			 * @param {Object[]} viewConfig ############ #############, ############ ## #### ######## ############
			 * #####.
			 * @return {Object[]} ########## ############### ############# #####.
			 */
			generateView: function(viewConfig) {
				var resultView = [];
				Terrasoft.each(viewConfig, function(item) {
					var itemView = this.generateItemView(item);
					resultView.push(itemView);
				}, this);
				return resultView;
			}
		});

		return Ext.create(businessRulesApplier);
	});


