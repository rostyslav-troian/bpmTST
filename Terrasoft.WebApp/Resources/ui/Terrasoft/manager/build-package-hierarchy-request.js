/**
 * @abstract
 * Base query class for obtaining a package hierarchy.
 */
Ext.define("Terrasoft.data.queries.BuildPackageHierarchyRequest", {
	extend: "Terrasoft.BaseRequest",
	alternateClassName: "Terrasoft.BuildPackageHierarchyRequest",

	/**
	 * @inheritdoc Terrasoft.BaseRequest#responseClassName.
	 * @protected
	 * @override
	 */
	responseClassName: "Terrasoft.BuildPackageHierarchyResponse",

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
		serializableObject.buildPackageHierarchy = true;
	}

});
