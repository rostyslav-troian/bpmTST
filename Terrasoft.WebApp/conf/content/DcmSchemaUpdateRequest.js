Terrasoft.configuration.Structures["DcmSchemaUpdateRequest"] = {innerHierarchyStack: ["DcmSchemaUpdateRequest"]};
define("DcmSchemaUpdateRequest", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.data.queries.DcmSchemaUpdateRequest
	 * Dcm schema update request class.
	 */
	Ext.define("Terrasoft.data.queries.DcmSchemaUpdateRequest", {
		extend: "Terrasoft.BaseSchemaUpdateRequest",
		alternateClassName: "Terrasoft.DcmSchemaUpdateRequest",

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.BaseRequest#contractName
		 * @overridden
		 */
		contractName: "ContractDcmSchema",

		//endregion

		//region Methods: Private

		/**
		 * @inheritdoc Terrasoft.BaseSchemaUpdateRequest#getData
		 * @overridden
		 */
		getData: function() {
			var resources = {};
			var schema = this.schema;
			schema.getLocalizableValues(resources);
			return {
				metaData: schema.serialize(),
				resources: resources,
				uId: schema.uId,
				requestTimeout: this.requestTimeout
			};
		}

		//endregion
	});

	return Terrasoft.data.queries.DcmSchemaUpdateRequest;
});


