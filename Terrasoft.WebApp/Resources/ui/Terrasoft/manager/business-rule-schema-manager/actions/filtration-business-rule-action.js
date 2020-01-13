/**
 * Read only business rule action class.
 */
Ext.define("Terrasoft.manager.FiltrationBusinessRuleAction", {
	extend: "Terrasoft.AttributeBusinessRuleAction",
	alternateClassName: "Terrasoft.FiltrationBusinessRuleAction",

	// region Properties: Private

	/**
	 * Business rule condition array.
	 * @private
	 * @type {Terrasoft.ComparisonBusinessRuleCondition}
	 */
	condition: null,

	// endregion

	// region Constructors: Protected

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		this.callParent(arguments);
		var conditionConfig = config && config.condition;
		if (!Ext.isEmpty(conditionConfig)) {
			const types = ["ColumnBusinessRuleExpression", "ParameterBusinessRuleExpression"];
			if (!_.contains(types, conditionConfig.leftExpression.type)) {
				throw new Terrasoft.UnsupportedTypeException({
					message: "leftExpression should be Terrasoft.ColumnBusinessRuleExpression"
				});
			}
			this.condition = this.createItem(conditionConfig);
		}
	}

	// endregion

});

