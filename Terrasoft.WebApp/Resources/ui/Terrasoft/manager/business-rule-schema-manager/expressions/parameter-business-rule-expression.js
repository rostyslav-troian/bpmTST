/**
 */
Ext.define("Terrasoft.manager.ParameterBusinessRuleExpression", {
	extend: "Terrasoft.AttributeBusinessRuleExpression",
	alternateClassName: "Terrasoft.ParameterBusinessRuleExpression",

	/**
	 * Column path.
	 * @type {String}
	 */
	columnMetaPath: null,

	// region Methods: Public

	/**
	 * @inheritdoc Terrasoft.AttributeBusinessRuleExpression#setExpressionValue
	 * @override
	 */
	setExpressionValue: function(attribute) {
		this.attributeName = attribute.name;
		this.columnMetaPath = attribute.value;
	},

	/**
	 * @inheritdoc Terrasoft.BaseBusinessRuleExpression#getExpressionValue
	 * @override
	 */
	getExpressionValue: function() {
		return {
			attributeName: this.attributeName,
			columnMetaPath: this.columnMetaPath
		};
	}

	// endregion

});
