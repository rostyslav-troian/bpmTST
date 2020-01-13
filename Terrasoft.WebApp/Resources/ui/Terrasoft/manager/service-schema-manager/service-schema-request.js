/**
 * @class Terrasoft.services.ServiceSchemaRequest
 */
Ext.define("Terrasoft.services.ServiceSchemaRequest", {
	extend: "Terrasoft.BaseSchemaRequest",
	alternateClassName: "Terrasoft.ServiceSchemaRequest",

	/**
	 * The name of the contract object on the server.
	 * @type {String}
	 */
	contractName: "ServiceSchemaRequest",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaRequest#responseClassName.
	 * @protected
	 * @overridden
	 */
	responseClassName: "Terrasoft.ServiceSchemaResponse"
});
