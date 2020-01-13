/**
 * Entity schema request class.
 */
Ext.define("Terrasoft.data.queries.EntitySchemaRequest", {
	extend: "Terrasoft.BaseSchemaRequest",
	alternateClassName: "Terrasoft.EntitySchemaRequest",

	/**
  * The name of the contract object on the server.
  * @type {String}
  */
	contractName: "EntitySchemaRequest",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaRequest#responseClassName.
	 * @protected
	 * @override
	 */
	responseClassName: "Terrasoft.EntitySchemaResponse"

});