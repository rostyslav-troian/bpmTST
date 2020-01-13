Terrasoft.configuration.Structures["ActualProcessSchemasByFilterRequest"] = {innerHierarchyStack: ["ActualProcessSchemasByFilterRequest"]};
define("ActualProcessSchemasByFilterRequest", [
	"ext-base",
	"terrasoft",
	"ConfigurationServiceRequest",
	"ActualProcessSchemasByFilterResponse"
],
function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.data.queries.ActualProcessSchemasByFilterRequest
	 * Actual schemas list by specified filters request class.
	 */
	Ext.define("Terrasoft.data.queries.ActualProcessSchemasByFilterRequest", {
		extend: "Terrasoft.ConfigurationServiceRequest",
		alternateClassName: "Terrasoft.ActualProcessSchemasByFilterRequest",

		// region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.ConfigurationServiceRequest#serviceUrl
		 * @overridden
		 */
		serviceUrl: "../ServiceModel",

		/**
		 * @inheritdoc Terrasoft.ConfigurationServiceRequest#serviceName
		 * @overridden
		 */
		serviceName: "ProcessSchemaManagerService.svc",

		/**
		 * @inheritdoc Terrasoft.BaseRequest#contractName
		 * @overridden
		 */
		contractName: "GetActualProcessSchemasByFilter",

		/**
		 * @inheritdoc Terrasoft.BaseRequest#responseClassName
		 * @overridden
		 */
		responseClassName: "Terrasoft.ActualProcessSchemasByFilterResponse",

		/**
		 * Process package unique identifier.
		 * @type {GUID}
		 */
		packageUId: null,

		/**
		 * Select enabled process schemas only.
		 * @type {Boolean}
		 */
		enabledOnly: false,

		/**
		 * Excluded from result process schema identifiers list.
		 * @type {String[]}
		 */
		excludedSchemas: [],

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseRequest#getSerializableObject
		 * @protected
		 * @overridden
		 */
		getSerializableObject: function(serializableObject) {
			serializableObject.packageUId = this.packageUId;
			serializableObject.enabledOnly = this.enabledOnly;
			serializableObject.excludedSchemas = this.excludedSchemas;
		}

		// endregion
	});

	return Terrasoft.data.queries.ActualProcessSchemasByFilterRequest;
});


