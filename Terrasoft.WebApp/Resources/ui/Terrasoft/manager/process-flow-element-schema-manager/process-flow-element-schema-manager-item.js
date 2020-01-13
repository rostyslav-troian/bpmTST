/**
 */
Ext.define("Terrasoft.manager.ProcessFlowElementSchemaManagerItem", {
	extend: "Terrasoft.BaseSchemaManagerItem",
	alternateClassName: "Terrasoft.ProcessFlowElementSchemaManagerItem",

	// region Properties: Protected

	/**
	 * The class name of the schema instance.
	 * @protected
	 * {String}
	 */
	instanceClassName: "Terrasoft.ProcessFlowElementSchema",

	/**
	 * The class name for the schema selection.
	 * @protected
	 * {String}
	 */
	requestClassName: "Terrasoft.ProcessFlowElementSchemaRequest",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchemaManagerItem#setInstance
	 */
	setInstance: function() {
		this.callParent(arguments);
		this.uId = this.instance.managerItemUId || this.instance.uId;
	},

	//endregion

	/**
	 * Returns an instance of an element.
	 * @param {Object} config Configures the new element.
	 * @return {Terrasoft.ProcessFlowElementSchema}
	 */
	createInstance: function(config) {
		var instance = this.callParent(arguments);
		Terrasoft.each(config, function(value, key) {
			if (instance[key] instanceof Terrasoft.LocalizableString) {
				if (typeof value === "string") {
					instance[key] = new Terrasoft.LocalizableString(value);
				} else {
					if (value instanceof Terrasoft.LocalizableString) {
						instance[key] = value.clone();
					} else {
						instance[key] = Ext.create("Terrasoft.LocalizableString", {
							cultureValues: value
						});
					}
				}
			}
		}, this);
		return instance;
	}

});
