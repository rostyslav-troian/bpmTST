/**
 * The class of the response to the query of the schema of the custom action of the process.
 */
Ext.define("Terrasoft.core.ProcessUserTaskSchemaResponse", {
	alternateClassName: "Terrasoft.ProcessUserTaskSchemaResponse",
	extend: "Terrasoft.BaseSchemaResponse",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaResponse#schemaClassName.
	 * @protected
	 * @override
	 */
	schemaClassName: "Terrasoft.UserTaskSchema",

	/**
  * Data on the schemas of user actions.
  * @type {Object[]}
  * @protected
  */
	schemas: null

	//endregion

});