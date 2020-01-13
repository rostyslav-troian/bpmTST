/**
 */
Ext.define("Terrasoft.manager.BusinessRuleSwitch", {
	extend: "Terrasoft.manager.BaseBusinessRuleExecutable",
	alternateClassName: "Terrasoft.BusinessRuleSwitch",

	// region Properties: Private

	/**
	 * Business rule cases array.
	 * @private
	 * @type {Terrasoft.BusinessRuleCase[]}
	 */
	cases: null,

	/**
	 * Default business rule case.
	 * @private
	 * @type {Terrasoft.BaseBusinessRuleAction}
	 */
	defaultCase: null,

	// endregion

	// region Constructors: Protected

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		this.callParent(arguments);
		config = config || {};
		if (!Ext.isEmpty(config.cases)) {
			this.cases = this.createItemGroup(config.cases);
		}
		if (!Ext.isEmpty(config.defaultCase)) {
			this.defaultCase = this.createItem(config.defaultCase);
		}
	}

	// endregion

});
