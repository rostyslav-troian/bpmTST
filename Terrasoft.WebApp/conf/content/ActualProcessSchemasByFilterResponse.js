Terrasoft.configuration.Structures["ActualProcessSchemasByFilterResponse"] = {innerHierarchyStack: ["ActualProcessSchemasByFilterResponse"]};
define("ActualProcessSchemasByFilterResponse", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	/**
	 * @class Terrasoft.data.queries.ActualProcessSchemasByFilterResponse
	 * Process execution data response class.
	 */
	Ext.define("Terrasoft.data.queries.ActualProcessSchemasByFilterResponse", {
		extend: "Terrasoft.BaseResponse",
		alternateClassName: "Terrasoft.ActualProcessSchemasByFilterResponse",

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.BaseResponse#getResponsePropertyNames.
		 * @overridden
		 */
		getResponsePropertyNames: function() {
			var parentResponsePropertyName = this.callParent(arguments);
			Ext.Array.push(parentResponsePropertyName, ["schemas"]);
			return parentResponsePropertyName;
		}

		//endregion
	});

	return Terrasoft.data.queries.ActualProcessSchemasByFilterResponse;
});


