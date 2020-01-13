Terrasoft.configuration.Structures["ProcessExecutionDataRequest"] = {innerHierarchyStack: ["ProcessExecutionDataRequest"]};
define("ProcessExecutionDataRequest", [
	"ext-base",
	"terrasoft",
	"ConfigurationServiceRequest",
	"ProcessExecutionDataResponse"
],
function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.data.queries.ProcessExecutionDataRequest
	 * Process execution data batch request class.
	 */
	Ext.define("Terrasoft.data.queries.ProcessExecutionDataRequest", {
		extend: "Terrasoft.ConfigurationServiceRequest",
		alternateClassName: "Terrasoft.ProcessExecutionDataRequest",

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
		contractName: "GetExecutionData",

		/**
		 * @inheritdoc Terrasoft.BaseRequest#responseClassName
		 * @overridden
		 */
		responseClassName: "Terrasoft.ProcessExecutionDataResponse",

		/**
		 * Process elements identifiers.
		 * @type {String[]}
		 */
		elementUIds: null,

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseRequest#getSerializableObject
		 * @protected
		 * @overridden
		 */
		getSerializableObject: function(serializableObject) {
			serializableObject.elementUIds = this.elementUIds;
		}

		// endregion
	});

	return Terrasoft.data.queries.ProcessExecutionDataRequest;
});


