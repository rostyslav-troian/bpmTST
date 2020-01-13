/**
 * The query response class is schema.
 */
Ext.define("Terrasoft.core.SchemaDesignerUtilitiesResponse", {
	alternateClassName: "Terrasoft.SchemaDesignerUtilitiesResponse",
	extend: "Terrasoft.BaseResponse",

	//region Methods: Protected

	getResponsePropertyNames: function() {
		var parentResponsePropertyName = this.callParent(arguments);
		Ext.Array.push(parentResponsePropertyName, ["messages", "packageHierarchy", "dataValueTypeInfo",
			"schemaHierarchy", "maxEntitySchemaNameLength"]);
		return parentResponsePropertyName;
	}

	//endregion

});