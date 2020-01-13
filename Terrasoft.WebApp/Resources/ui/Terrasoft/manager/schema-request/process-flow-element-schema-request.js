/**
 * The query class of the business process item schema.
 */
Ext.define("Terrasoft.data.queries.ProcessFlowElementSchemaRequest", {
	extend: "Terrasoft.BaseSchemaRequest",
	alternateClassName: "Terrasoft.ProcessFlowElementSchemaRequest",

	/**
  * The name of the contract object on the server.
  * @type {String}
  */
	contractName: "ProcessFlowElementSchemaRequest",

	/**
	 * @inheritdoc Terrasoft.BaseSchemaRequest#responseClassName.
	 * @protected
	 * @override
	 */
	responseClassName: "Terrasoft.ProcessFlowElementSchemaResponse"

});
