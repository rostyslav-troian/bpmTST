Terrasoft.configuration.Structures["DcmExecutionDataRequest"] = {innerHierarchyStack: ["DcmExecutionDataRequest"]};
define("DcmExecutionDataRequest", ["ProcessExecutionDataRequest"], function() {
	/**
	 * @class Terrasoft.data.queries.DcmExecutionDataRequest
	 * Dcm execution data batch request class.
	 */
	Ext.define("Terrasoft.data.queries.DcmExecutionDataRequest", {
		extend: "Terrasoft.ProcessExecutionDataRequest",
		alternateClassName: "Terrasoft.DcmExecutionDataRequest",

		// region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.ProcessExecutionDataRequest#contractName
		 * @overridden
		 */
		contractName: "GetDcmExecutionData"

		// endregion

	});

	return Terrasoft.data.queries.DcmExecutionDataRequest;
});


