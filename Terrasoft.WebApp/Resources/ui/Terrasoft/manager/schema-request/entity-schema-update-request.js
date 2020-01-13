/**
 * The query class for storing an object schema.
 */
Ext.define("Terrasoft.data.queries.EntitySchemaUpdateRequest", {
	extend: "Terrasoft.BaseSchemaUpdateRequest",
	alternateClassName: "Terrasoft.EntitySchemaUpdateRequest",

	// region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.SaveBaseSchemaRequest#contractName.
	 * @protected
	 * @override
	 */
	contractName: "EntitySchema"

	//endregion

});