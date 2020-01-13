/**
 */
Ext.define("Terrasoft.manager.BusinessRuleSchema", {
	extend: "Terrasoft.manager.BaseSchema",
	alternateClassName: "Terrasoft.BusinessRuleSchema",

	mixins: ["Terrasoft.BusinessRuleElementUtils"],

	// region Properties: Private

	/**
	 * Entity schema UId.
	 * @private
	 * @type {String}
	 */
	entitySchemaUId: null,

	/**
	 * Is business rule enabled.
	 * @private
	 * @type {Boolean}
	 */
	enabled: true,

	/**
	 * Is business rule removed.
	 * @private
	 * @type {Boolean}
	 */
	removed: false,

	/**
	 * Business rule trigger.
	 * @private
	 * @type {Terrasoft.BaseBusinessRuleCondition}
	 */
	trigger: null,

	/**
	 * Business rule switch.
	 * @private
	 * @type {Terrasoft.BusinessRuleSwitch}
	 */
	ruleSwitch: null,

	// endregion

	// region Properties: Protected

	/**
	 * Is business rule invalid.
	 * @protected
	 * @type {Boolean}
	 */
	invalid: false,

	// endregion

	// region Properties: Public

	/**
	 * Entity schema.
	 * @type {Terrasoft.EntitySchema}
	 */
	entitySchema: null,

	/**
	 * Page schema UId.
	 * @type {String}
	 */
	pageSchemaUId: null,

	// endregion

	// region Constructors: Protected

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		this.callParent(arguments);
		if (Ext.isDefined(config && config.trigger)) {
			this.trigger = this.createItem(config.trigger);
		}
		if (Ext.isDefined(config && config.ruleSwitch)) {
			this.ruleSwitch = this.createItem(config.ruleSwitch);
		}
	},

	// endregion

	/**
	 * Returns flag that indicates whether business rule schema depends on attribute or not.
	 * @param {String} columnName Column name.
	 * @param {String} [dataModelName] Optional. Data source name
	 * @return {Boolean}
	 */
	hasDependsOnColumn: function(columnName, dataModelName) {
		if (!this.ruleSwitch) {
			return false;
		}
		for (let i = 0; i < this.ruleSwitch.cases.length; i++) {
			const ruleCase = this.ruleSwitch.cases[i];
			const actions = ruleCase.action.items;
			for (let k = 0; k < actions.length; k++) {
				if (actions[k].attributeName === columnName) {
					return true;
				}
			}
			var conditions = ruleCase.condition.items;
			for (let k = 0; k < conditions.length; k++) {
				var expressions = [conditions[k].leftExpression, conditions[k].rightExpression];
				for (let j = 0; j < expressions.length; j++) {
					const expression = expressions[j];
					if ((expression && expression.attributeName) === columnName) {
						return true;
					}
					if (dataModelName && (expression && expression.dataModelName) === dataModelName) {
						return true;
					}
				}
			}
		}
		return false;
	}

});
