/**
 * @class Terrasoft.services.ServiceSchemaManagerItem
 */
Ext.define("Terrasoft.services.ServiceSchemaManagerItem", {
	extend: "Terrasoft.manager.BaseSchemaManagerItem",
	alternateClassName: "Terrasoft.ServiceSchemaManagerItem",

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#instanceClassName
	 * @overridden
	 */
	instanceClassName: "Terrasoft.ServiceSchema",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#requestClassName
	 * @overridden
	 */
	requestClassName: "Terrasoft.ServiceSchemaRequest",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#removeRequestClassName
	 * @overridden
	 */
	removeRequestClassName: "Terrasoft.ServiceSchemaRemoveRequest",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManagerItem#updateRequestClassName
	 * @overridden
	 */
	updateRequestClassName: "Terrasoft.ServiceSchemaUpdateRequest"

	//endregion

});
