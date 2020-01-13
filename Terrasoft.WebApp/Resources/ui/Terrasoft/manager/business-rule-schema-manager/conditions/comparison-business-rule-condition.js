/**
 */
Ext.define("Terrasoft.manager.ComparisonBusinessRuleCondition", {
	extend: "Terrasoft.BaseBusinessRuleCondition",
	alternateClassName: "Terrasoft.ComparisonBusinessRuleCondition",

	// region Properties: Private

	/**
	 * Business rule condition left expression.
	 * @private
	 * @type {Terrasoft.BaseBusinessRuleExpression}
	 */
	leftExpression: null,

	/**
	 * Business rule condition expression comparison type.
	 * @private
	 * @type {Terrasoft.core.enums.ComparisonType}
	 */
	comparisonType: null,

	/**
	 * Business rule condition right expression array.
	 * @private
	 * @type {Terrasoft.BaseBusinessRuleExpression}
	 */
	rightExpression: null,

	// endregion

	// region Constructors: Protected

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		this.callParent(arguments);
		config = config || {};
		if (!Ext.isEmpty(config.leftExpression)) {
			this.leftExpression = this.createItem(config.leftExpression);
		}
		if (!Ext.isEmpty(config.rightExpression)) {
			this.rightExpression = this.createItem(config.rightExpression);
		}
	}

	// endregion

});
