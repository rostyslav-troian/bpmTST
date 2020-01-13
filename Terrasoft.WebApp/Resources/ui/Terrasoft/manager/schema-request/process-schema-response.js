/**
 * Process schema response class.
 */
Ext.define("Terrasoft.core.ProcessSchemaResponse", {
	extend: "Terrasoft.BaseSchemaResponse",
	alternateClassName: "Terrasoft.ProcessSchemaResponse",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaResponse#schemaClassName
	 * @override
	 */
	schemaClassName: "Terrasoft.ProcessSchema",

	/**
	 * @inheritdoc Terrasoft.BaseRequest#contractName
	 * @override
	 */
	contractName: "ProcessSchemaResponse",

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaResponse#createSchemaInstance
	 * @override
	 */
	createSchemaInstance: function(config) {
		return Terrasoft.SchemaDesignerUtilities.createInstanceByMetaData({
			metaData: config.metaData,
			lazyProperties: config.lazyProperties,
			schemaClassName: this.schemaClassName,
			resources: config.resources
		});
	}

	//endregion

});
