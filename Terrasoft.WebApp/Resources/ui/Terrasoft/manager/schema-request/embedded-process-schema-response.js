/**
 * Process schema response class.
 */
Ext.define("Terrasoft.core.EmbeddedProcessSchemaResponse", {
	extend: "Terrasoft.BaseSchemaResponse",
	alternateClassName: "Terrasoft.EmbeddedProcessSchemaResponse",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaResponse#schemaClassName
	 * @override
	 */
	schemaClassName: "Terrasoft.EmbeddedProcessSchema",

	/**
	 * @inheritdoc Terrasoft.BaseRequest#contractName
	 * @override
	 */
	contractName: "EmbeddedProcessSchemaResponse",

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaResponse#createSchemaInstance
	 * @override
	 */
	createSchemaInstance: function(config) {
		const schema = Terrasoft.SchemaDesignerUtilities.createInstanceByMetaData({
			metaData: config.metaData,
			lazyProperties: config.lazyProperties,
			schemaClassName: this.schemaClassName,
			resources: config.resources
		});
		schema.realUId = config.realUId;
		schema.packageUId = config.packageUId;
		schema.parentOwnerSchemaUId = config.parentOwnerSchemaUId;
		schema.ownerSchemaName = config.ownerSchemaName;
		let initialUserDefinedCode = config.hasOwnSchemaMethods ? null : config.userDefinedCode;
		schema.setInitialUserDefinedCode(initialUserDefinedCode);
		if (!schema.userDefinedCode) {
			schema.userDefinedCode = config.userDefinedCode;
		}
		Terrasoft.EmbeddedProcessSchemaManager.initSchema(schema);
		return schema;
	}

	//endregion

});
