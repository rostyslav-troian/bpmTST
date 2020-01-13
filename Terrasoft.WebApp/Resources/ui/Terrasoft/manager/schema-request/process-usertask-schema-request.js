/**
 * The query class of the user's process action schema.
 */
Ext.define("Terrasoft.data.queries.ProcessUserTaskSchemaRequest", {
	extend: "Terrasoft.BaseSchemaRequest",
	alternateClassName: "Terrasoft.ProcessUserTaskSchemaRequest",

	/**
  * The name of the contract object on the server.
  * @type {String}
  */
	contractName: "ProcessUserTaskSchemaRequest",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaRequest#responseClassName.
	 * @protected
	 * @override
	 */
	responseClassName: "Terrasoft.ProcessUserTaskSchemaResponse",

	/**
  * An array of identifiers for the requested user action schemas.
  * @protected
  * @type {Object[]}
  */
	itemsData: null,

	/**
	 * @inheritdoc Terrasoft.Serializable#getSerializableObject.
	 * @protected
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.itemsData = this.itemsData;
	}

});
