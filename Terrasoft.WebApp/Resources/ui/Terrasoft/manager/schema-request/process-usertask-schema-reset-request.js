/**
 */
Ext.define("Terrasoft.data.queries.ProcessUserTaskSchemaResetRequest", {
	extend: "Terrasoft.ProcessUserTaskSchemaRequest",
	alternateClassName: "Terrasoft.ProcessUserTaskSchemaResetRequest",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessUserTaskSchemaRequest#contractName.
	 * @protected
	 * @override
	 */
	contractName: "ProcessUserTaskSchemaResetRequest",

	/**
	 * @inheritdoc Terrasoft.ProcessUserTaskSchemaRequest#responseClassName.
	 * @protected
	 * @override
	 */
	responseClassName: "Terrasoft.BaseSchemaResponse"

	//endregion

});
