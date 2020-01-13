/**
 */
Ext.define("Terrasoft.manager.ConstantBusinessRuleExpression", {
	extend: "Terrasoft.BaseBusinessRuleExpression",
	alternateClassName: "Terrasoft.ConstantBusinessRuleExpression",

	// region Properties: Private

	/**
	 * Value.
	 * @private
	 * @type {Object}
	 */
	value: null,

	// endregion

	// region Methods: Public

	/**
	 * @inheritdoc Terrasoft.BaseBusinessRuleExpression#getExpressionValue
	 * @override
	 */
	getExpressionValue: function() {
		return this.value;
	},

	/**
	 * @inheritdoc Terrasoft.BaseBusinessRuleExpression#setExpressionValue
	 * @override
	 */
	setExpressionValue: function(value) {
		this.value = value;
	},

	// endregion

	// region Method: Public

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		this.callParent(arguments);
		if (config && config.value && Terrasoft.isDateDataValueType(config.dataValueType)) {
			this.value = new Date(config.value);
		}
	}

	// endregion

});
