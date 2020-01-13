Terrasoft.configuration.Structures["DcmSchemaRemoveRequest"] = {innerHierarchyStack: ["DcmSchemaRemoveRequest"]};
define("DcmSchemaRemoveRequest", ["ext-base", "terrasoft", "DcmSchemaRequest"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.data.queries.DcmSchemaRemoveRequest
	 * Dcm schema remove request class.
	 */
	Ext.define("Terrasoft.data.queries.DcmSchemaRemoveRequest", {
		extend: "Terrasoft.DcmSchemaRequest",
		alternateClassName: "Terrasoft.DcmSchemaRemoveRequest",

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.BaseRequest#contractName
		 * @overridden
		 */
		contractName: "RemoveDcmSchemaRequest"

		//endregion
	});

	return Terrasoft.data.queries.DcmSchemaRemoveRequest;
});


