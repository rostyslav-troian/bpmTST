/**
 */
Ext.define("Terrasoft.manager.AttributeBusinessRuleExpression", {
	extend: "Terrasoft.BaseBusinessRuleExpression",
	alternateClassName: "Terrasoft.AttributeBusinessRuleExpression",

	// region Properties: Private

	/**
	 * Attribute name.
	 * @private
	 * @type {String}
	 */
	attributeName: null,

	// endregion

	// region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseBusinessRuleExpression#getExpressionValue
	 * @override
	 */
	getExpressionValue: function() {
		return this.attributeName;
	},

	/**
	 * @inheritdoc Terrasoft.BaseBusinessRuleExpression#setExpressionValue
	 * @override
	 */
	setExpressionValue: function(value) {
		this.attributeName = value;
	}

	// endregion

});
