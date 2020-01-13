/**
 */
Ext.define("Terrasoft.manager.BusinessRuleCase", {
	extend: "Terrasoft.BaseBusinessRuleElement",
	alternateClassName: "Terrasoft.BusinessRuleCase",

	// region Properties: Private

	/**
	 * Business rule condition.
	 * @private
	 * @type {Terrasoft.BaseBusinessRuleCondition}
	 */
	condition: null,

	/**
	 * Business rule action.
	 * @private
	 * @type {Terrasoft.BaseBusinessRuleAction}
	 */
	action: null,

	// endregion

	// region Constructors: Protected

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		this.callParent(arguments);
		if (Ext.isDefined(config && config.condition)) {
			this.condition = this.createItem(config.condition);
		}
		if (Ext.isDefined(config && config.action)) {
			this.action = this.createItem(config.action);
		}
	}

	// endregion

});
