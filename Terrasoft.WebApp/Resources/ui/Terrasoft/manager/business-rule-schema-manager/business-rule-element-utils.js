/**
 */
Ext.define("Terrasoft.manager.BusinessRuleElementUtils", {
	alternateClassName: "Terrasoft.BusinessRuleElementUtils",

	// region Methods: Public

	/**
	 * Creates item instance.
	 * @param {Object} config Business rule item config.
	 */
	createItem: function(config) {
		var itemClassName = Terrasoft.BusinessRuleElementHelper.getClassNameByType(config.type);
		delete config.type;
		return Ext.create(itemClassName, config);
	},

	/**
	 * Creates item instance.
	 * @param {Object} config Business rule item config.
	 */
	createItemGroup: function(config) {
		var result = [];
		var instance;
		Terrasoft.each(config, function(itemConfig) {
			instance = this.createItem(itemConfig);
			result.push(instance);
		}, this);
		return result;
	}

	// endregion

});
