/**
 */
Ext.define("Terrasoft.manager.BusinessRuleConditionGroup", {
	extend: "Terrasoft.BaseBusinessRuleCondition",
	alternateClassName: "Terrasoft.BusinessRuleConditionGroup",

	// region Properties: Private

	/**
	 * Business rule condition array.
	 * @private
	 * @type {Terrasoft.ComparisonBusinessRuleCondition[]}
	 */
	items: [],

	/**
	 * Collection comparison operation type.
	 * @private
	 * @type {Terrasoft.core.enums.LogicalOperatorType}
	 */
	operationType: Terrasoft.LogicalOperatorType.AND,

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
