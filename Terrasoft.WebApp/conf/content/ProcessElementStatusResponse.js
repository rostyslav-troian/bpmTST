Terrasoft.configuration.Structures["ProcessElementStatusResponse"] = {innerHierarchyStack: ["ProcessElementStatusResponse"]};
define("ProcessElementStatusResponse", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.data.queries.ProcessElementStatusResponse
	 * Process element running status response.
	 */
	Ext.define("Terrasoft.data.queries.ProcessElementStatusResponse", {
		extend: "Terrasoft.BaseResponse",
		alternateClassName: "Terrasoft.ProcessElementStatusResponse",

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseResponse#getResponsePropertyNames.
		 * @overridden
		 */
		getResponsePropertyNames: function() {
			var parentResponsePropertyName = this.callParent(arguments);
			Ext.Array.push(parentResponsePropertyName, ["status"]);
			return parentResponsePropertyName;
		}

		//endregion

	});

	return Terrasoft.data.queries.ProcessElementStatusResponse;
});


