/**
 */
Ext.define("Terrasoft.manager.InvalidBusinessRuleSchema", {
	extend: "Terrasoft.BusinessRuleSchema",
	alternateClassName: "Terrasoft.InvalidBusinessRuleSchema",

	// region Properties: Private

	/**
	 * Business rule action column name.
	 * @private
	 * @type {String}
	 */
	actionColumnName: null,

	// endregion

	// region Properties: Private

	/**
	 * @inheritdoc Terrasoft.BusinessRuleSchema#invalid
	 * @override
	 */
	invalid: true

	// endregion

});
