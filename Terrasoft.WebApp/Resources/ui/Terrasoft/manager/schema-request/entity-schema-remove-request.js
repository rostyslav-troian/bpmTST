/**
 * Class of the request to delete the schema of the entity.
 */
Ext.define("Terrasoft.data.queries.EntitySchemaRemoveRequest", {
	extend: "Terrasoft.EntitySchemaRequest",
	alternateClassName: "Terrasoft.EntitySchemaRemoveRequest",

	/**
  * The name of the contract object on the server.
  * @type {String}
  */
	contractName: "RemoveEntitySchemaRequest"

});