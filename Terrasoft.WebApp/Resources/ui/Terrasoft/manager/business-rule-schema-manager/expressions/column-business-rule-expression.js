/**
 */
Ext.define("Terrasoft.manager.ColumnBusinessRuleExpression", {
	extend: "Terrasoft.BaseBusinessRuleExpression",
	alternateClassName: "Terrasoft.ColumnBusinessRuleExpression",

	// region Properties: Public

	/**
	 * Column path.
	 * @type {String}
	 */
	columnMetaPath: null,

	/**
	 * Data model name.
	 * @type {String}
	 */
	dataModelName: null,

	// endregion

	// region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseBusinessRuleExpression#getExpressionValue
	 * @override
	 */
	getExpressionValue: function() {
		return this.columnMetaPath;
	},

	/**
	 * @inheritdoc Terrasoft.BaseBusinessRuleExpression#setExpressionValue
	 * @override
	 */
	setExpressionValue: function(value) {
		this.columnMetaPath = value;
	}

	// endregion

});
