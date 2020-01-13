Terrasoft.configuration.Structures["DcmSchemaRequest"] = {innerHierarchyStack: ["DcmSchemaRequest"]};
define("DcmSchemaRequest", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.data.queries.DcmSchemaRequest
	 * Dcm schema request class.
	 */
	Ext.define("Terrasoft.data.queries.DcmSchemaRequest", {
		extend: "Terrasoft.BaseSchemaRequest",
		alternateClassName: "Terrasoft.DcmSchemaRequest",

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.BaseRequest#contractName
		 * @overridden
		 */
		contractName: "DcmSchemaRequest",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaRequest#responseClassName
		 * @overridden
		 */
		responseClassName: "Terrasoft.DcmSchemaResponse"

		//endregion
	});

	return Terrasoft.data.queries.DcmSchemaRequest;
});


