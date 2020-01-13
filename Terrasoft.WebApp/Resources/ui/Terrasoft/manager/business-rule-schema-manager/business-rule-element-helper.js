/**
 */
Ext.define("BusinessRuleElementHelper", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.BusinessRuleElementHelper",
	singleton: true,

	// region Methods: Private

	/**
	 * Returns business rule element information storage.
	 * @private
	 * @return {Object} Business rule element information storage.
	 */
	getStorage: function() {
		return Terrasoft.BusinessRules.ObjectTypes;
	},

	/**
	 * Returns business rule element information by predicate.
	 * @private
	 * @param {Function} predicate Predicate.
	 * @return {Object} Business rule element information.
	 */
	getBusinessRuleElementByPredicate: function(predicate) {
		var result = null;
		Terrasoft.each(this.getStorage(), function(group) {
			if (result === null) {
				Terrasoft.each(group, function(element) {
					if (predicate(element)) {
						result = element;
						return false;
					}
				}, this);
			} else {
				return false;
			}
		}, this);
		if (result === null) {
			throw new Terrasoft.ItemNotFoundException();
		}
		return result;
	},

	// endregion

	// region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.callParent();
		// TODO #CRM-29629
		Terrasoft.Resources.BusinessRules = Terrasoft.Resources.BusinessRules || {};
		Terrasoft.BusinessRules = Terrasoft.BusinessRules || {};
		Terrasoft.BusinessRules.ObjectTypes = {
			BusinessRules: [
				{
					type: "BusinessRule",
					className: "Terrasoft.manager.BusinessRuleSchema"
				},
				{
					type: "InvalidBusinessRule",
					className: "Terrasoft.manager.InvalidBusinessRuleSchema"
				}
			],
			BusinessRuleSwitches: [
				{
					type: "BusinessRuleSwitch",
					className: "Terrasoft.manager.BusinessRuleSwitch"
				}
			],
			BusinessRuleCases: [
				{
					type: "BusinessRuleCase",
					className: "Terrasoft.manager.BusinessRuleCase"
				}
			],
			BusinessRuleConditionGroups: [
				{
					type: "BusinessRuleConditionGroup",
					className: "Terrasoft.manager.BusinessRuleConditionGroup"
				}
			],
			BusinessRuleConditions: [
				{
					type: "ComparisonBusinessRuleCondition",
					className: "Terrasoft.manager.ComparisonBusinessRuleCondition"
				}
			],
			BusinessRuleActionGroups: [
				{
					type: "BusinessRuleActionGroup",
					className: "Terrasoft.manager.BusinessRuleActionGroup"
				}
			],
			BusinessRuleActions: [
				{
					type: "VisibilityBusinessRuleAction",
					className: "Terrasoft.manager.VisibilityBusinessRuleAction",
					designConfig: {
						controlClassName: "Terrasoft.BusinessRuleBindParameterActionDesignerContainer",
						viewModelClassName: "Terrasoft.BusinessRuleBindParameterActionDesignerViewModel",
						listCaption: Terrasoft.Resources.BusinessRules.VisibilityBusinessRuleActionCaption,
						hint: Terrasoft.Resources.BusinessRules.VisibilityBusinessRuleActionHint,
						captionTpl: Terrasoft.Resources.BusinessRules.VisibilityBusinessRuleActionCaptionTpl
					}
				}, {
					type: "RequiredBusinessRuleAction",
					className: "Terrasoft.manager.RequiredBusinessRuleAction",
					designConfig: {
						controlClassName: "Terrasoft.BusinessRuleBindParameterActionDesignerContainer",
						viewModelClassName: "Terrasoft.BusinessRuleBindParameterActionDesignerViewModel",
						listCaption: Terrasoft.Resources.BusinessRules.RequiredBusinessRuleActionCaption,
						hint: Terrasoft.Resources.BusinessRules.RequiredBusinessRuleActionHint,
						captionTpl: Terrasoft.Resources.BusinessRules.RequiredBusinessRuleActionCaptionTpl
					}
				}, {
					type: "EnabledBusinessRuleAction",
					className: "Terrasoft.manager.EnabledBusinessRuleAction",
					designConfig: {
						controlClassName: "Terrasoft.BusinessRuleBindParameterActionDesignerContainer",
						viewModelClassName: "Terrasoft.BusinessRuleBindParameterActionDesignerViewModel",
						listCaption: Terrasoft.Resources.BusinessRules.EnabledBusinessRuleActionCaption,
						hint: Terrasoft.Resources.BusinessRules.EnabledBusinessRuleActionHint,
						captionTpl: Terrasoft.Resources.BusinessRules.EnabledBusinessRuleActionCaptionTpl
					}
				}, {
					type: "ReadOnlyBusinessRuleAction",
					className: "Terrasoft.manager.ReadOnlyBusinessRuleAction",
					designConfig: {
						canDesign: false,
						controlClassName: "Terrasoft.BusinessRuleBindParameterActionDesignerContainer",
						viewModelClassName: "Terrasoft.BusinessRuleBindParameterActionDesignerViewModel",
						listCaption: Terrasoft.Resources.BusinessRules.ReadOnlyBusinessRuleActionCaption,
						hint: Terrasoft.Resources.BusinessRules.ReadOnlyBusinessRuleActionHint,
						captionTpl: Terrasoft.Resources.BusinessRules.ReadOnlyBusinessRuleActionCaptionTpl
					}
				}, {
					type: "FiltrationBusinessRuleAction",
					className: "Terrasoft.manager.FiltrationBusinessRuleAction",
					designConfig: {
						controlClassName: "Terrasoft.BusinessRuleFilterActionDesignerContainer",
						viewModelClassName: "Terrasoft.BusinessRuleFilterActionDesignerViewModel",
						listCaption: Terrasoft.Resources.BusinessRules.FiltrationBusinessRuleActionCaption,
						captionTpl: Terrasoft.Resources.BusinessRules.FiltrationBusinessRuleActionCaptionTpl
					}
				}
			],
			BusinessRuleExpressions: [
				{
					type: "ConstantBusinessRuleExpression",
					className: "Terrasoft.manager.ConstantBusinessRuleExpression",
					designConfig: {
						listCaption: Terrasoft.Resources.BusinessRules.Expression.Constant
					}
				}, {
					type: "ColumnBusinessRuleExpression",
					className: "Terrasoft.manager.ColumnBusinessRuleExpression",
					designConfig: {
						placeholder: Terrasoft.Resources.BusinessRules.ExpressionPlaceholder.Column,
						listCaption: Terrasoft.Resources.BusinessRules.Expression.Column
					}
				}, {
					type: "AttributeBusinessRuleExpression",
					className: "Terrasoft.manager.AttributeBusinessRuleExpression",
					designConfig: {
						placeholder: Terrasoft.Resources.BusinessRules.ExpressionPlaceholder.Attribute,
						listCaption: Terrasoft.Resources.BusinessRules.Expression.Attribute
					}
				}, {
					type: "ParameterBusinessRuleExpression",
					className: "Terrasoft.manager.ParameterBusinessRuleExpression",
					designConfig: {
						placeholder: Terrasoft.Resources.BusinessRules.ExpressionPlaceholder.Parameter,
						listCaption: Terrasoft.Resources.BusinessRules.Expression.Parameter
					}
				},{
					type: "SysSettingBusinessRuleExpression",
					className: "Terrasoft.manager.SysSettingBusinessRuleExpression",
					designConfig: {
						placeholder: Terrasoft.Resources.BusinessRules.ExpressionPlaceholder.SysSetting,
						listCaption: Terrasoft.Resources.BusinessRules.Expression.SysSetting
					}
				}, {
					type: "SysValueBusinessRuleExpression",
					className: "Terrasoft.manager.SysValueBusinessRuleExpression",
					designConfig: {
						placeholder: Terrasoft.Resources.BusinessRules.ExpressionPlaceholder.SysValue,
						listCaption: Terrasoft.Resources.BusinessRules.Expression.SysValue
					}
				}, {
					type: "DataSourceBusinessRuleExpression",
					className: "Terrasoft.manager.ColumnBusinessRuleExpression",
					designConfig: {
						placeholder: Terrasoft.Resources.BusinessRules.ExpressionPlaceholder.DataSources,
						listCaption: Terrasoft.Resources.BusinessRules.Expression.DataSources
					}
				}
			]
		};
	},

	/**
	 * Returns business rule elements information by group type.
	 * @param {String} groupType Business rule group type.
	 * @return {Object} Business rule elements information.
	 */
	getElementsByGroupType: function(groupType) {
		var storage = this.getStorage();
		if (!Ext.isDefined(storage[groupType])) {
			throw new Terrasoft.ItemNotFoundException();
		}
		return storage[groupType];
	},

	/**
	 * Returns business rule element information by type.
	 * @param {String} type Business rule type of element.
	 * @return {Object} Business rule elements information.
	 */
	getElementByType: function(type) {
		return this.getBusinessRuleElementByPredicate(function(element) {
			return element.type === type;
		});
	},

	/**
	 * Returns business rule element class name by type.
	 * @param {String} type Business rule type of element.
	 * @return {String} Class name.
	 */
	getClassNameByType: function(type) {
		var element = this.getElementByType(type);
		return element.className;
	},

	/**
	 * Returns business rule element by class name.
	 * @param {String} className Business rule class name of element.
	 * @return {Object} Business rule elements information.
	 */
	getElementByClassName: function(className) {
		return this.getBusinessRuleElementByPredicate(function(element) {
			return element.className === className;
		});
	},

	/**
	 * Returns business rule element type by class name.
	 * @param {String} className Class name.
	 * @return {String} Business rule type of element.
	 */
	getTypeByClassName: function(className) {
		var element = this.getElementByClassName(className);
		return element.type;
	}

	// endregion

});
