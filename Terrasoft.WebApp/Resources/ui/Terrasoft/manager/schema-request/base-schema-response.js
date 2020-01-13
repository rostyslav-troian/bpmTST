/**
 * The query response class is schema.
 */
Ext.define("Terrasoft.core.BaseSchemaResponse", {
	alternateClassName: "Terrasoft.BaseSchemaResponse",
	extend: "Terrasoft.BaseResponse",

	//region Properties: Protected

	schemaClassName: "Terrasoft.BaseSchema",

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseResponse#getResponsePropertyNames.
	 * @protected
	 * @override
	 */
	getResponsePropertyNames: function() {
		var parentResponsePropertyName = this.callParent(arguments);
		parentResponsePropertyName.push("schema");
		return parentResponsePropertyName;
	},

	/**
	 * Creates schema instance.
	 * @param {Object} config Schema instance config.
	 * @protected
	 */
	createSchemaInstance: function(config) {
		return Ext.create(this.schemaClassName, config);
	},

	/**
	 * @inheritdoc Terrasoft.BaseResponse#initPropertyValue.
	 * @protected
	 * @override
	 */
	initPropertyValue: function(propertyName, propertyValue) {
		propertyValue = this.callParent(arguments);
		if ((propertyName === "schema") && propertyValue &&
				!Terrasoft.instanceOfClass(propertyValue, this.schemaClassName)) {
			propertyValue = this.createSchemaInstance(propertyValue);
		}
		return propertyValue;
	},

	/**
	 * @inheritdoc Terrasoft.BaseResponse#destroyPropertyValue.
	 * @protected
	 * @override
	 */
	destroyPropertyValue: function(propertyName) {
		if (propertyName === "schema") {
			this[propertyName].destroy();
		}
		this.callParent(arguments);
	}

	//endregion

});
