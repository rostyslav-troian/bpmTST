/**
 * @abstract
 * Base query class for obtaining a package hierarchy.
 */
Ext.define("Terrasoft.data.queries.GetAvailablePackagesRequest", {
	extend: "Terrasoft.BaseRequest",
	alternateClassName: "Terrasoft.GetAvailablePackagesRequest",

	/**
	 * @inheritdoc Terrasoft.BaseRequest#responseClassName.
	 * @protected
	 * @override
	 */
	responseClassName: "Terrasoft.GetAvailablePackagesResponse",

	/**
	 * @inheritdoc Terrasoft.BaseRequest#contractName.
	 * @protected
	 * @override
	 */
	contractName: "SchemaDesignerRequest",

	/**
  * Copies the properties for serialization to the serialized object. Implements the mixin interface.
  * {@link Terrasoft.Serializable}
  * @protected
  * @override
  * @param {Object} serializableObject Serialized object.
  */
	getSerializableObject: function(serializableObject) {
		serializableObject.getAvailablePackages = true;
	}

});
