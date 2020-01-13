Terrasoft.configuration.Structures["SetEnabledDcmSchemaRequest"] = {innerHierarchyStack: ["SetEnabledDcmSchemaRequest"]};
define("SetEnabledDcmSchemaRequest", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.data.queries.SetEnabledDcmSchemaRequest
	 * Dcm schema set enabled request class.
	 */
	Ext.define("Terrasoft.data.queries.SetEnabledDcmSchemaRequest", {
		extend: "Terrasoft.BaseSchemaRequest",
		alternateClassName: "Terrasoft.SetEnabledDcmSchemaRequest",

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.BaseRequest#contractName
		 * @overridden
		 */
		contractName: "SetEnabledDcmSchemaRequest",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaRequest#responseClassName
		 * @overridden
		 */
		responseClassName: "Terrasoft.BaseResponse",

		/**
		 * Dcm schemas identifiers to enable
		 * @type {Array}
		 */
		items: null,

		/**
		 * Dcm schema enable flag state.
		 * @type {Boolean}
		 */
		enabled: null,

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseRequest#getSerializableObject.
		 * @protected
		 * @overridden
		 */
		getSerializableObject: function(serializableObject) {
			serializableObject.items = this.items;
			serializableObject.enabled = this.enabled;
		}

		//endregion
	});

	return Terrasoft.data.queries.SetEnabledDcmSchemaRequest;

});


