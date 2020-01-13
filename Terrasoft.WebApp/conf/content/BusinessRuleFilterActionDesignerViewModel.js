Terrasoft.configuration.Structures["BusinessRuleFilterActionDesignerViewModel"] = {innerHierarchyStack: ["BusinessRuleFilterActionDesignerViewModel"]};
define("BusinessRuleFilterActionDesignerViewModel", ["BusinessRuleFilterActionDesignerViewModelResources",
		"BusinessRuleActionDesignerViewModel", "ExpressionEdit", "ExpressionEnums",
		"BusinessRuleFilterActionConditionDesignerViewModel"], function(resources) {

		/**
		 * @class Terrasoft.Designers.BusinessRuleBindParameterActionDesignerViewModel
		 */
		Ext.define("Terrasoft.Designers.BusinessRuleFilterActionDesignerViewModel", {
			extend: "Terrasoft.BusinessRuleActionDesignerViewModel",
			alternateClassName: "Terrasoft.BusinessRuleFilterActionDesignerViewModel",

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseModel#getModelColumns
			 * @overridden
			 */
			getModelColumns: function() {
				var baseColumns = this.callParent(arguments);
				return this.Ext.apply(baseColumns, {
					"Condition": {
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"dataValueType": Terrasoft.DataValueType.CUSTOM_OBJECT
					}
				});
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.prepareCondition();
			},

			/**
			 * @inheritdoc Terrasoft.BusinessRuleElementDesignerViewModel#getConfigForEmptyMetaItem
			 * @overridden
			 */
			getConfigForEmptyMetaItem: function() {
				var config = this.callParent(arguments);
				const Type = Terrasoft.ExpressionEnums.ExpressionType;
				var expressionType = this.entitySchemaUId ? Type.COLUMN : Type.PARAMETER;
				Ext.apply(config, {
					"condition": {
						"type": "ComparisonBusinessRuleCondition",
						"comparisonType": Terrasoft.ComparisonType.EQUAL,
						"leftExpression": {
							"type": expressionType,
							"columnMetaPath": null
						},
						"rightExpression": {
							"type": expressionType
						}
					}
				});
				if (this.entitySchemaUId) {
					config.condition.leftExpression.dataModelName = this.getFirstEntitySchemaName();
				}
				return config;
			},

			/**
			 * Prepare filter condition.
			 * @protected
			 */
			prepareCondition: function() {
				var metaItem = this.getMetaItem();
				var conditionClassName = "Terrasoft.BusinessRuleFilterActionConditionDesignerViewModel";
				var conditionViewModel = this.createItemViewModel(conditionClassName, {
					"MetaItemType": "ComparisonBusinessRuleCondition",
					"MetaItem": metaItem.condition,
					"DefaultExpressionCaption": this.get("DefaultExpressionCaption")
				});
				conditionViewModel.on("pullChanges", this.onPullChanges, this);
				this.set("Condition", conditionViewModel);
			},

			/**
			 * @inheritdoc Terrasoft.BusinessRuleActionDesignerViewModel#getActionTitle
			 * @overridden
			 */
			getActionTitle: function() {
				return resources.localizableStrings.ActionTitle;
			},

			/**
			 * @inheritdoc Terrasoft.BusinessRuleElementDesignerViewModel#getActionTitle
			 * @overridden
			 */
			getAsyncValidators: function() {
				var validators = this.callParent(arguments);
				validators.push(this.validateCondition);
				return validators;
			},

			/**
			 * Validate action condition.
			 * @protected
			 * @param  {Function} next Callback method.
			 * @param  {Object} validationInfo Validation info.
			 */
			validateCondition: function(next, validationInfo) {
				var condition = this.get("Condition");
				condition.asyncValidate(function(responseValidationInfo) {
					this.applyValidationInfo(validationInfo, responseValidationInfo);
					next(validationInfo);
				}, this);
			},

			/**
			 * @inheritdoc Terrasoft.BusinessRuleElementDesignerViewModel#getMetaItemUpdaters
			 * @overridden
			 */
			getMetaItemUpdaters: function() {
				var updaters = this.callParent(arguments);
				updaters.push(this.updateConditionMetaItem);
				return updaters;
			},

			/**
			 * Async update condition.
			 * @protected
			 * @param {Function} next Callback method.
			 */
			updateConditionMetaItem: function(next) {
				var condition = this.get("Condition");
				condition.updateMetaItem(function() {
					next();
				}, this);
			},

			/**
			 * Returns condition view property items config.
			 * @protected
			 * @return {Object} Condition view property items config.
			 */
			getConditionItemsViewConfig: function() {
				var conditionViewModel = this.get("Condition");
				var config = conditionViewModel.getViewConfig();
				Ext.apply(config, {
					"bindingContext": "Condition"
				});
				return config;
			},

			/**
			 * @inheritdoc Terrasoft.BusinessRuleElementDesignerViewModel#unsubscribePullChangesEvent
			 * @overridden
			 */
			unsubscribePullChangesEvent: function() {
				this.$Condition.un("pullChanges", this.onPullChanges, this);
				this.callParent(arguments);
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BusinessRuleActionDesignerViewModel#enrichViewConfig
			 * @overridden
			 */
			enrichViewConfig: function(config) {
				this.callParent(arguments);
				this.Ext.apply(config, {
					"conditionItems": [this.getConditionItemsViewConfig()],
					"conditionTitleItems": [{
						"className": "Terrasoft.Container",
						"classes": {
							"wrapClassName": ["business-rule-case-action-header-item"]
						},
						"items": [{
							"className": "Terrasoft.Label",
							"caption": resources.localizableStrings.LeftExpressionGroupCaption
						}]
					}, {
						"className": "Terrasoft.Container",
						"classes": {
							"wrapClassName": ["business-rule-case-action-header-item"]
						},
						"items": [{
							"className": "Terrasoft.Label",
							"caption": resources.localizableStrings.RightExpressionGroupCaption
						}]
					}]
				});
			}

			//endregion

		});
	});


