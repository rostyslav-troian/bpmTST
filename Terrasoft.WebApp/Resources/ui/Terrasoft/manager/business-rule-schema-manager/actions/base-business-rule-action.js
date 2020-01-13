/**
 * @abstract
 */
Ext.define("Terrasoft.manager.BaseBusinessRuleAction", {
	extend: "Terrasoft.manager.BaseBusinessRuleExecutable",
	alternateClassName: "Terrasoft.BaseBusinessRuleAction",

	// region Properties: Private

	/**
	 * Is business rule action enabled.
	 * @private
	 * @type {Boolean}
	 */
	enabled: true,

	/**
	 * Business rule action description.
	 * @private
	 * @type {Terrasoft.LocalizableString}
	 */
	description: null,

	// endregion

	// region Constructors: Protected

	/**
	 * @inheritdoc Terrasoft.BaseObject#constructor
	 * @override
	 */
	constructor: function(config) {
		this.callParent(arguments);
		if (config && config.description) {
			this.initLocalizableStringValue("description", config.description);
		}
	}

	// endregion
});
