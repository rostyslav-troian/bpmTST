Terrasoft.configuration.Structures["DcmSchemaResponse"] = {innerHierarchyStack: ["DcmSchemaResponse"]};
define("DcmSchemaResponse", ["ext-base", "terrasoft", "DcmSchema"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.data.queries.DcmSchemaResponse
	 * Dcm schema response class.
	 */
	Ext.define("Terrasoft.data.queries.DcmSchemaResponse", {
		extend: "Terrasoft.BaseSchemaResponse",
		alternateClassName: "Terrasoft.DcmSchemaResponse",

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.BaseSchemaResponse#schemaClassName
		 * @overridden
		 */
		schemaClassName: "Terrasoft.DcmSchema",

		/**
		 * @inheritdoc Terrasoft.BaseRequest#contractName
		 * @overridden
		 */
		contractName: "DcmSchemaResponse",

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseSchemaResponse#createSchemaInstance
		 * @overridden
		 */
		createSchemaInstance: function(config) {
			return Terrasoft.SchemaDesignerUtilities.createInstanceByMetaData({
				metaData: config.metaData,
				schemaClassName: this.schemaClassName,
				resources: config.resources
			});
		}

		//endregion
	});

	return Terrasoft.data.queries.DcmSchemaResponse;
});


