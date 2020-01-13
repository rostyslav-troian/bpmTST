/**
 */
Ext.define("Terrasoft.manager.SysSettingBusinessRuleExpression", {
	extend: "Terrasoft.BaseBusinessRuleExpression",
	alternateClassName: "Terrasoft.SysSettingBusinessRuleExpression",

	// region Properties: Private

	/**
	 * System setting code.
	 * @private
	 * @type {String}
	 */
	sysSettingCode: null,

	// endregion

	// region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseBusinessRuleExpression#getExpressionValue
	 * @override
	 */
	getExpressionValue: function() {
		return this.sysSettingCode;
	},

	/**
	 * @inheritdoc Terrasoft.BaseBusinessRuleExpression#setExpressionValue
	 * @override
	 */
	setExpressionValue: function(value) {
		this.sysSettingCode = value;
	}

	// endregion

});
