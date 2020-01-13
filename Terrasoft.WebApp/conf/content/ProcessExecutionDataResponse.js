Terrasoft.configuration.Structures["ProcessExecutionDataResponse"] = {innerHierarchyStack: ["ProcessExecutionDataResponse"]};
define("ProcessExecutionDataResponse", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.data.queries.ProcessExecutionDataResponse
	 * Process execution data response class.
	 */
	Ext.define("Terrasoft.data.queries.ProcessExecutionDataResponse", {
		extend: "Terrasoft.BaseResponse",
		alternateClassName: "Terrasoft.ProcessExecutionDataResponse",

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseResponse#getResponsePropertyNames.
		 * @protected
		 * @overridden
		 */
		getResponsePropertyNames: function() {
			var parentResponsePropertyName = this.callParent(arguments);
			Ext.Array.push(parentResponsePropertyName, ["batch"]);
			return parentResponsePropertyName;
		}

		//endregion
	});

	return Terrasoft.data.queries.ProcessExecutionDataResponse;
});


