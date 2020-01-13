/**
 */
Ext.define("Terrasoft.manager.BusinessRuleActionGroup", {
	extend: "Terrasoft.BaseBusinessRuleAction",
	alternateClassName: "Terrasoft.BusinessRuleActionGroup",

	// region Properties: Private

	/**
	 * Business rule action array.
	 * @private
	 * @type {Terrasoft.BaseBusinessRuleAction[]}
	 */
	items: [],

	// endregion

	// region Constructors: Protected

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		this.callParent(arguments);
		if (config && config.items) {
			this.items = this.createItemGroup(config.items);
		}
	}

	// endregion

});
