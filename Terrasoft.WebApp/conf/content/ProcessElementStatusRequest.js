Terrasoft.configuration.Structures["ProcessElementStatusRequest"] = {innerHierarchyStack: ["ProcessElementStatusRequest"]};
define("ProcessElementStatusRequest", [
	"ext-base",
	"terrasoft",
	"ConfigurationServiceRequest",
	"ProcessElementStatusResponse"
],
function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.data.queries.ProcessElementStatusRequest
	 * Process element running status request.
	 */
	Ext.define("Terrasoft.data.queries.ProcessElementStatusRequest", {
		extend: "Terrasoft.ConfigurationServiceRequest",
		alternateClassName: "Terrasoft.ProcessElementStatusRequest",

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
		serviceName: "ProcessEngineService.svc",

		/**
		 * @inheritdoc Terrasoft.BaseRequest#contractName
		 * @overridden
		 */
		contractName: "GetProcessElementStatus",

		/**
		 * @inheritdoc Terrasoft.BaseRequest#responseClassName
		 * @overridden
		 */
		responseClassName: "Terrasoft.ProcessElementStatusResponse",

		/**
		 * Process element unique identifier.
		 * @type {GUID}
		 */
		processElementUId: null,

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseRequest#getSerializableObject
		 * @protected
		 * @overridden
		 */
		getSerializableObject: function(serializableObject) {
			serializableObject.processElementUId = this.processElementUId;
		}

		// endregion

	});

	return Terrasoft.data.queries.ProcessElementStatusRequest;
});


