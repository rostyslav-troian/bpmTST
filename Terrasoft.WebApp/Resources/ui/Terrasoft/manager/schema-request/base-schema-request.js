/**
 * @abstract
 */
Ext.define("Terrasoft.data.queries.BaseSchemaRequest", {
	extend: "Terrasoft.BaseRequest",
	alternateClassName: "Terrasoft.BaseSchemaRequest",

	/**
	 * @inheritdoc Terrasoft.BaseRequest#responseClassName.
	 * @protected
	 * @override
	 */
	responseClassName: "Terrasoft.BaseSchemaResponse",

	/**
	 * Schema identifier.
	 * @type {String}
	 */
	uId: null,

	/**
	 * System package Id.
	 * @type {String}
	 */
	packageUId: null,

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableObject.
	 * @protected
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		serializableObject.uId = this.uId;
		serializableObject.packageUId = this.packageUId;
	}

});
