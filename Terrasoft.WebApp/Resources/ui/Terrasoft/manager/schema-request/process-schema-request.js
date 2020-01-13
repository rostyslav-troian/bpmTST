/**
 */
Ext.define("Terrasoft.data.queries.ProcessSchemaRequest", {
	extend: "Terrasoft.BaseSchemaRequest",
	alternateClassName: "Terrasoft.ProcessSchemaRequest",

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseRequest#contractName
	 * @override
	 */
	contractName: "ProcessSchemaRequest",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaRequest#responseClassName
	 * @override
	 */
	responseClassName: "Terrasoft.ProcessSchemaResponse",

	/**
	 * Flag that indicates convert localizable strings to parameter for old process or not.
	 * @type {Boolean}
	 */
	convertLocalizableStringToParameter: true,

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.convertLocalizableStringToParameter = this.convertLocalizableStringToParameter;
	}

	//endregion

});
