/**
 */
Ext.define("Terrasoft.manager.SysValueBusinessRuleExpression", {
	extend: "Terrasoft.BaseBusinessRuleExpression",
	alternateClassName: "Terrasoft.SysValueBusinessRuleExpression",

	// region Properties: Private

	/**
	 * System value type.
	 * @private
	 * @type {String}
	 */
	sysValueType: null,

	// endregion

	// region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseBusinessRuleExpression#getExpressionValue
	 * @override
	 */
	getExpressionValue: function() {
		return this.sysValueType;
	},

	/**
	 * @inheritdoc Terrasoft.BaseBusinessRuleExpression#setExpressionValue
	 * @override
	 */
	setExpressionValue: function(value) {
		this.sysValueType = value;
	}

	// endregion

});
