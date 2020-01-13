Terrasoft.configuration.Structures["BusinessRuleCaptionGenerator"] = {innerHierarchyStack: ["BusinessRuleCaptionGenerator"]};
define("BusinessRuleCaptionGenerator", ["BusinessRuleSchemaManager", "ExpressionEnums", "BusinessRuleSchemaManager"],
function() {
	Ext.define("Terrasoft.manager.BusinessRuleCaptionGenerator", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.BusinessRuleCaptionGenerator",

		//region Method: Private

		/**
		 * Returns if expression is instance of class by type.
		 * @private
		 * @param {Terrasoft.ExpressionEdit} expression Expression.
		 * @param {String} type Expression type.
		 * @return {Boolean} Is instance of class by type.
		 */
		isInstanceOfClassByType: function(expression, type) {
			var className = Terrasoft.BusinessRuleElementHelper.getClassNameByType(type);
			return Terrasoft.isInstanceOfClass(expression, className);
		},

		//endregion

		//region Method: Protected

		/**
		 * Generates unique bind action caption.
		 * @protected
		 * @param {Object} config Configuration object.
		 * @param {Terrasoft.manager.BusinessRuleSchema} config.schema Business rule schema.
		 * @param {Object} config.element Action element.
		 * @param {Terrasoft.BaseBusinessRuleAction} config.action Action.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		generateUniqueBindActionCaption: function(config, callback, scope) {
			var element = config.element;
			var action = config.action;
			var tpl = element.designConfig.captionTpl;
			var listCaption = element.designConfig.listCaption;
			var attributeName = action.attributeName;
			var entitySchema = config.schema.entitySchema;
			var pageSchemaUId = config.schema.pageSchemaUId;
			Terrasoft.chain(
				function(next) {
					var caption;
					if (entitySchema) {
						if (action.columnUId) {
							caption = entitySchema.getColumnByUId(action.columnUId).caption.getValue();
						} else {
							var column = entitySchema.columns.findByPath("name", attributeName);
							if (column) {
								caption = column.caption.getValue();
							}
						}
					}
					next(caption);
				},
				function(next, caption) {
					if (!caption && pageSchemaUId) {
						Terrasoft.ClientUnitSchemaManager.getInstanceByUId(pageSchemaUId, function(schema) {
							var parameter = schema.parameters.findByPath("name", attributeName);
							next(parameter && parameter.caption.getValue());
						}, this);
					} else {
						next(caption);
					}
				},
				function(next, caption) {
					var formatedCaption = Ext.String.format(tpl, caption || attributeName, listCaption);
					Ext.callback(callback, scope, [formatedCaption]);
				}, this
			);
		},

		/**
		 * Generates unique filtration action caption.
		 * @protected
		 * @param {Object} config Configuration object.
		 * @param {Terrasoft.BusinessRuleSchema} config.schema Business rule schema.
		 * @param {Terrasoft.BaseBusinessRuleAction} config.action Action.
		 * @param {Object} config.element Action element.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		generateUniqueFiltrationCaption: function(config, callback, scope) {
			let leftExpressionCaption;
			Terrasoft.chain(
				function(next) {
					const leftExpression = config.action.condition.leftExpression;
					if (leftExpression.dataModelName) {
						this.getColumnExpressionCaption(config.schema, leftExpression, next, this);
					} else {
						this.getParameterExpressionCaption(config.schema, leftExpression.columnMetaPath, next, this);
					}
				},
				function(next, captionPath) {
					leftExpressionCaption = captionPath.split(".")[0];
					this.getRightExpressionCaption(config.schema, config.action.condition, next, this);
				},
				function(next, captionPath) {
					const rightExpressionCaption = captionPath;
					const caption = Ext.String.format(config.element.designConfig.captionTpl,
						leftExpressionCaption, rightExpressionCaption);
					callback.call(scope, caption);
				},
				this
			);
		},

		/**
		 * Returns expression caption.
		 * @protected
		 * @param {Terrasoft.manager.BusinessRuleSchema} schema Business rule schema.
		 * @param {String} metaPath Column path.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		getParameterExpressionCaption: function(schema, metaPath, callback, scope) {
			var paths = metaPath.split(".");
			var parameterUId = paths[0];
			var columnMetaPath = paths.splice(1);
			var captionPath = "";
			Terrasoft.chain(
				function(next) {
					Terrasoft.ClientUnitSchemaManager.findParameterByUId({
						schemaUId: schema.pageSchemaUId,
						parameterUId: parameterUId
					}, next, this);
				},
				function(next, parameter) {
					if (!parameter) {
						Ext.callback(callback, scope, [""]);
						return;
					}
					captionPath = parameter.caption.toString();
					Terrasoft.EntitySchemaManager.getSchemaInstance(parameter.referenceSchemaUId, next, this);
				},
				function(next, entitySchema) {
					entitySchema.getColumnCaptionPathByMetaPath(columnMetaPath, next, this);
				},
				function(next, columnCaptionPath) {
					captionPath += "." + columnCaptionPath;
					Ext.callback(callback, scope, [captionPath]);
				}, this
			);
		},

		/**
		 * Returns expression caption.
		 * @protected
		 * @param {Terrasoft.manager.BusinessRuleSchema} schema Business rule schema.
		 * @param {Terrasoft.control.ExpressionEdit} expression Expression.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		getColumnExpressionCaption: function(schema, expression, callback, scope) {
			const entitySchema = Terrasoft.BusinessRuleSchemaManager
				.getEntitySchemaByDataModel(expression.dataModelName, this.pageSchemaUId);
			const metaPath = entitySchema.uId + "." + expression.columnMetaPath;
			Terrasoft.SchemaDesignerUtilities.getColumnCaptionPathByMetaPath(metaPath, callback, scope);
		},

		/**
		 * Returns right expression caption.
		 * @protected
		 * @param {Terrasoft.manager.BusinessRuleSchema} schema Business rule schema.
		 * @param {Terrasoft.manager.ComparisonBusinessRuleCondition} condition Condition.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		getRightExpressionCaption: function(schema, condition, callback, scope) {
			const expressionTypeEnum = Terrasoft.ExpressionEnums.ExpressionType;
			const rightExpression = condition.rightExpression;
			const leftExpression = condition.leftExpression;
			Terrasoft.chain(
				function(next) {
					if (this.isInstanceOfClassByType(rightExpression, expressionTypeEnum.COLUMN)) {
						this.getColumnExpressionCaption(schema, rightExpression, callback, scope);
					} else if (this.isInstanceOfClassByType(rightExpression, expressionTypeEnum.CONSTANT)) {
						if (leftExpression.dataModelName) {
							this.getRightExpressionConstantCaption(schema, condition, next, this);
						} else {
							this.getRightExpressionParameterConstantCaption(schema, condition, next, this);
						}
					} else {
						next();
					}
				},
				function(next, caption) {
					callback.call(scope, caption || rightExpression.getExpressionValue());
				}, this
			);
		},

		/**
		 * Returns right expression caption for constant.
		 * @protected
		 * @param {Terrasoft.manager.BusinessRuleSchema} schema Business rule schema.
		 * @param {Terrasoft.manager.ComparisonBusinessRuleCondition} condition Condition.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		getRightExpressionConstantCaption: function(schema, condition, callback, scope) {
			const leftExpression = condition.leftExpression;
			const entitySchema = Terrasoft.BusinessRuleSchemaManager
				.getEntitySchemaByDataModel(leftExpression.dataModelName, this.pageSchemaUId);
			const expressionValue = condition.rightExpression && condition.rightExpression.getExpressionValue();
			const config = {
				entitySchemaUId: entitySchema.extendParent ? entitySchema.parentUId : entitySchema.uId,
				metaPath: condition.leftExpression && condition.leftExpression.columnMetaPath,
				lookupId: expressionValue
			};
			this.getEntitySchemaLookupValue(config, function(lookupDisplayValue) {
				callback.call(scope, lookupDisplayValue || expressionValue);
			}, this);
		},

		/**
		 * Returns right expression parameter caption for constant.
		 * @protected
		 * @param {Terrasoft.manager.BusinessRuleSchema} schema Business rule schema.
		 * @param {Terrasoft.manager.ComparisonBusinessRuleCondition} condition Condition.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		getRightExpressionParameterConstantCaption: function(schema, condition, callback, scope) {
			var paths = condition.leftExpression.columnMetaPath.split(".");
			var parameterUId = paths[0];
			Terrasoft.chain(
				function(next) {
					Terrasoft.ClientUnitSchemaManager.findParameterByUId({
						schemaUId: schema.pageSchemaUId,
						parameterUId: parameterUId
					}, next, this);
				},
				function(next, parameter) {
					var schemaUId = parameter.referenceSchemaUId;
					if (!schemaUId) {
						callback.call(scope, null);
						return;
					}
					var config = {
						entitySchemaUId: schemaUId,
						metaPath: paths.slice(1).join("."),
						lookupId: condition.rightExpression.getExpressionValue()
					};
					this.getEntitySchemaLookupValue(config, callback, scope);
				}, this
			);
		},

		/**
		 * Returns lookup display value of entity schema by UId and path.
		 * @protected
		 * @param {Object} config Configuration object.
		 * @param {String} config.entitySchemaUId Entity schema UId.
		 * @param {String} config.metaPath Column meta path,
		 * @param {String} config.lookupId Lookup id.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		getEntitySchemaLookupValue: function(config, callback, scope) {
			Terrasoft.chain(
				function(next) {
					Terrasoft.SchemaDesignerUtilities.getEntitySchemaColumnPathByMetaPath({
						entitySchemaUId: config.entitySchemaUId,
						schemaColumnMetaPath: config.metaPath
					}, next, this);
				},
				function(next, response) {
					const schemaUId = response.referenceSchemaUId;
					if (!schemaUId) {
						callback.call(scope, null);
						return;
					}
					Terrasoft.EntitySchemaManager.getCurrentPackageSchemaByUId(schemaUId, next, this);
				},
				function(next, instance) {
					if (!instance) {
						callback.call(scope, null);
						return;
					}
					const lookupConfig = {
						schemaName: instance.getName(),
						entitySchema: instance,
						lookupId: config.lookupId
					};
					this.getLookupDisplayValue(lookupConfig, callback, scope);
				}, this
			);
		},

		/**
		 * Returns lookup display value.
		 * @protected
		 * @param {Object} config Configuration object.
		 * @param {String} config.schemaName Root schema name.
		 * @param {Terrasoft.EntitySchema} config.entitySchema Lookup entity schema.
		 * @param {String} config.lookupId Lookup id.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		getLookupDisplayValue: function(config, callback, scope) {
			var displayColumnName = config.entitySchema.primaryDisplayColumn.name;
			var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
				"rootSchemaName": config.schemaName
			});
			esq.addColumn(displayColumnName);
			esq.getEntity(config.lookupId, function(response) {
				if (response.success && response.entity) {
					var caption = response.entity.get(displayColumnName);
					callback.call(scope, caption);
				} else {
					callback.call(scope, config.lookupId);
				}
			});
		},

		//endregion

		//region Method: Public

		/**
		 * Generate unique caption.
		 * @param {Terrasoft.BusinessRuleSchema} schema Business rule schema.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback scope.
		 */
		generateUniqueCaption: function(schema, callback, scope) {
			var ruleSwitch = schema.ruleSwitch;
			var cases = ruleSwitch && ruleSwitch.cases;
			var actions = cases && cases[0] && cases[0].action;
			var action = actions && actions.items[0];
			if (action) {
				var typeInfo = action.getTypeInfo();
				var element = Terrasoft.BusinessRuleElementHelper.getElementByClassName(typeInfo.fullTypeName);
				var config = {
					schema: schema,
					action: action,
					element: element
				};
				if (element.type === "FiltrationBusinessRuleAction") {
					this.generateUniqueFiltrationCaption(config, callback, scope);
				} else {
					this.generateUniqueBindActionCaption(config, callback, scope);
				}
			} else {
				callback.call(scope);
			}
		},

		/**
		 * Updates schema caption.
		 * @param {Terrasoft.BusinessRuleSchema} schema Business rule schema.
		 * @param {String} generatedCaption Generated caption.
		 * @param {Boolean} isNew Is new schema.
		 */
		updateSchemaCaption: function(schema, generatedCaption, isNew) {
			var captionNumbers = [];
			var schemaCaption = schema.getCaption();
			var needChangeCaption = isNew || !(schemaCaption && schemaCaption.indexOf(generatedCaption) === 0);
			if (needChangeCaption) {
				var items = Terrasoft.BusinessRuleSchemaManager.getItems();
				var collection = items.filter(function(item) {
					return !item.getRemoved() && !item.getInvalid();
				});
				collection.each(function(item) {
					var localCaption = item.getCaption();
					var caption = localCaption.getValue();
					if (caption.indexOf(generatedCaption) === 0) {
						var endOfCaption = caption.substring(generatedCaption.length);
						var captionNumber = endOfCaption.length > 0
							? parseInt(endOfCaption.substring(1), 10)
							: 0;
						if (captionNumber === 0) {
							item.instance.initLocalizableStringValue("caption", caption + "_1");
						}
						captionNumbers.push(captionNumber);
					}
				}, this);
				if (captionNumbers.length > 0) {
					var max = Ext.Array.max(captionNumbers);
					generatedCaption += "_" + (max + 1);
				}
				schema.initLocalizableStringValue("caption", generatedCaption);
			}
		},

		/**
		 * Updates duplicate item captions.
		 * @param {Terrasoft.Collection} collection Business rule item collection.
		 * @private
		 */
		updateDuplicateCaptions: function(collection) {
			var groups = {};
			collection.each(function(item) {
				if (!item.getRemoved() && !item.getInvalid()) {
					var caption = item.caption.getValue();
					if (!Ext.isDefined(groups[caption])) {
						groups[caption] = [];
					}
					groups[caption].push(item);
				}
			}, this);
			Terrasoft.each(groups, function(group, caption) {
				if (group.length > 1) {
					Terrasoft.each(group, function(item, index) {
						if (index !== 0) {
							item.instance.initLocalizableStringValue("caption", caption + "_" + (index));
						}
					}, this);
				}
			}, this);
		}

		//endregion

	});
});


