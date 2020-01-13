Terrasoft.configuration.Structures["BusinessRuleFilterActionConditionDesignerViewModel"] = {innerHierarchyStack: ["BusinessRuleFilterActionConditionDesignerViewModel"]};
define("BusinessRuleFilterActionConditionDesignerViewModel",
	["BusinessRuleFilterActionConditionDesignerViewModelResources", "BusinessRuleConditionDesignerViewModel",
	"ExpressionEnums", "css!BusinessRuleFilterActionConditionDesignerViewModel"], function(resources) {

	/**
	 * @class Terrasoft.Designers.BusinessRuleFilterActionConditionDesignerViewModel
	 */
	Ext.define("Terrasoft.Designers.BusinessRuleFilterActionConditionDesignerViewModel", {
		extend: "Terrasoft.BusinessRuleConditionDesignerViewModel",
		alternateClassName: "Terrasoft.BusinessRuleFilterActionConditionDesignerViewModel",

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BusinessRuleConditionDesignerViewModel#getAvailableComparisonTypeNames
		 * @overridden
		 */
		getAvailableComparisonTypeNames: function() {
			return ["EQUAL", "NOT_EQUAL", "GREATER", "GREATER_OR_EQUAL", "LESS", "LESS_OR_EQUAL"];
		},

		/**
		 * @inheritdoc Terrasoft.BusinessRuleConditionDesignerViewModel#getViewConfig
		 * @overridden
		 */
		getViewConfig: function() {
			var config = this.callParent(arguments);
			var classes = config.classes = (config.classes || {});
			var wrapClassName = classes.wrapClassName = (classes.wrapClassName || []);
			wrapClassName.push("business-rules-filter-action-condition");
			return config;
		},

		/**
		 * Left expression sync validator
		 * @protected
		 * @param {Mixed} value Left expression value.
		 * @return {Object} Validation info.
		 */
		validateLeftExpressionValue: function(value) {
			return this.validateColumnPathCodeSymbolValue(value && value.name, {
				"minPartCount": 2,
				"invalidMessage": resources.localizableStrings.InvalidLeftExpressionFormatMessage
			});
		},

		/**
		 * @inheritdoc Terrasoft.BusinessRuleConditionDesignerViewModel#onLeftExpressionTypeChanged
		 * @overridden
		 */
		onLeftExpressionTypeChanged: function(model, expressionType) {
			if (expressionType === Terrasoft.ExpressionEnums.ExpressionType.PARAMETER) {
				this.loadLeftExpressionEntitySchemaColumnVocabulary();
			}
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.BusinessRuleConditionDesignerViewModel#getAsyncValidateLeftExpressionConfig
		 * @overridden
		 */
		getAsyncValidateLeftExpressionConfig: function() {
			var config = this.callParent(arguments);
			return Ext.apply(config, {
				"columnCaption": this.get("DefaultExpressionCaption"),
				"minPartCount": 2,
				"invalidFormatMessage": resources.localizableStrings.InvalidLeftExpressionFormatMessage
			});
		},

		/**
		 * @inheritdoc Terrasoft.BusinessRuleConditionDesignerViewModel#getAsyncValidateRightExpressionConfig
		 * @overridden
		 */
		getAsyncValidateRightExpressionConfig: function() {
			var config = this.callParent(arguments);
			return Ext.apply(config, {
				"columnCaption": this.get("DefaultExpressionCaption"),
				"maxPartCount": 1
			});
		},

		/**
		 * @inheritdoc Terrasoft.BusinessRuleConditionDesignerViewModel#getLeftExpressionControlConfig
		 * @overridden
		 */
		getLeftExpressionControlConfig: function() {
			var config = this.callParent(arguments);
			return Ext.apply(config, {
				"placeholder": resources.localizableStrings.LeftExpressionPlaceholder,
				"typeVisible": !this.isEntitySchemaBased(),
				"wrapClass": "filter-left-expression",
				"contentType": Terrasoft.ContentType.LOOKUP
			});
		},

		/**
		 * @inheritdoc Terrasoft.BusinessRuleConditionDesignerViewModel#getRightExpressionControlConfig
		 * @overridden
		 */
		getRightExpressionControlConfig: function() {
			var config = this.callParent(arguments);
			return Ext.apply(config, {
				"placeholder": resources.localizableStrings.RightExpressionPlaceholder,
				"wrapClass": "filter-right-expression"
			});
		},

		/**
		 * @inheritdoc Terrasoft.BusinessRuleConditionDesignerViewModel#getLeftExpressionTypeList
		 * @overridden
		 */
		getLeftExpressionTypeList: function() {
			const Type = Terrasoft.ExpressionEnums.ExpressionType;
			const types = [];
			if (this.isEntitySchemaBased()) {
				types.push(Type.COLUMN);
			} else {
				types.push(Type.PARAMETER);
				const dataSource = Terrasoft.BusinessRuleSchemaManager.getDataSourcesConfig(this.pageSchemaUId);
				if (!Terrasoft.isEmptyObject(dataSource)) {
					types.push(Type.DATASOURCE);
				}
			}
			return types;
		},

		// endregion

		// region Methods: Public

		/**
		 * @inheritdoc Terrasoft.BaseObject#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.validationConfig.LeftExpressionValue = [this.validateLeftExpressionValue];
		}

		// endregion
	});
});


