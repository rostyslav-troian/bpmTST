/**
 * @abstract
 * View model attribute business rule action class.
 */
Ext.define("Terrasoft.manager.AttributeBusinessRuleAction", {
	extend: "Terrasoft.manager.BaseBusinessRuleAction",
	alternateClassName: "Terrasoft.AttributeBusinessRuleAction",

	// region Properties: Public

	/**
	 * View model attribute name.
	 * @type {String}
	 */
	attributeName: null,

	/**
	 * Attribute source type.
	 * @type {Terrasoft.BusinessRuleActionSourceType}
	 */
	sourceType: null,

	/**
	 * DataModel name.
	 * @type {String}
	 */
	dataModelName: null

	// endregion

});
