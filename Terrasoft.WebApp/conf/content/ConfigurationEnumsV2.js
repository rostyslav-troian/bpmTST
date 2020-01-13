Terrasoft.configuration.Structures["ConfigurationEnumsV2"] = {innerHierarchyStack: ["ConfigurationEnumsV2"]};
define("ConfigurationEnumsV2", ["ConfigurationEnumsV2Resources"], function(resources) {
	Ext.ns("Terrasoft.ConfigurationEnums");

	Terrasoft.ConfigurationEnums.CardOperation = {
		VIEW: "view",
		ADD: "add",
		EDIT: "edit",
		COPY: "copy"
	};

	Ext.ns("Terrasoft.RightsEnums");

	Terrasoft.RightsEnums.operationTypes = {
		"read": 0,
		"edit": 1,
		"delete": 2
	};
	Terrasoft.RightsEnums.rightLevels = {
		allow: {
			Value: 1,
			Name: resources.localizableStrings.AllowRightCaption
		},
		allowAndGrant: {
			Value: 2,
			Name: resources.localizableStrings.AllowAndGrantRightCaption
		},
		deny: {
			Value: 0,
			Name: resources.localizableStrings.DenyRightCaption
		}
	};
	Terrasoft.RightsEnums.sysAdminUnitType = {
		"0": "DF93DCB9-6BD7-DF11-9B2A-001D60E938C6",
		"1": "B659F1C0-6BD7-DF11-9B2A-001D60E938C6",
		"2": "B759F1C0-6BD7-DF11-9B2A-001D60E938C6",
		"3": "462E97C7-6BD7-DF11-9B2A-001D60E938C6",
		"4": "472E97C7-6BD7-DF11-9B2A-001D60E938C6",
		"5": "F4044C41-DF2B-E111-851E-00155D04C01D"
	};

	/** @enum
	 * Schema body template.
	 */
	Ext.ns("Terrasoft.ClientUnitSchemaBodyTemplate");
	Terrasoft.ClientUnitSchemaBodyTemplate[Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA] =
		"define(\"{0}\", [], function() {\r\n" +
		"\treturn {\r\n" +
		"\t\tentitySchemaName: \"{1}\",\r\n" +
		"\t\tattributes: {},\r\n" +
		"\t\tmodules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,\r\n" +
		"\t\tdetails: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,\r\n" +
		"\t\tbusinessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,\r\n" +
		"\t\tmethods: {},\r\n" +
		"\t\tdiff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/\r\n" +
		"\t};\r\n" +
		"});\r\n";
	Terrasoft.ClientUnitSchemaBodyTemplate[Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA] =
	Terrasoft.ClientUnitSchemaBodyTemplate[Terrasoft.SchemaType.DETAIL_VIEW_MODEL_SCHEMA] =
	Terrasoft.ClientUnitSchemaBodyTemplate[Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA] =
		"define(\"{0}\", [], function() {\r\n" +
		"\treturn {\r\n" +
		"\t\tentitySchemaName: \"{1}\",\r\n" +
		"\t\tdetails: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,\r\n" +
		"\t\tdiff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,\r\n" +
		"\t\tmethods: {}\r\n" +
		"\t};\r\n" +
		"});\r\n";

	/**
	 * Optimization types.
	 * @enum
	 */
	Ext.ns("Terrasoft.Folder");
	Terrasoft.Folder.OptimizationType = {
		NotApplied: -1,
		TryOptimize: 0,
		Count: 1,
		Data: 2,
		CountAndData: 3,
		AppliedDataTryCount: 4,
		NotAppliedDataTryCount: 5,
		AppliedCountTryData: 6,
		NotAppliedCountTryData: 7,
		CountOver: 8
	};
});


