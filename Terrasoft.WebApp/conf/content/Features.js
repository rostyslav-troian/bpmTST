Terrasoft.configuration.Structures["Features"] = {innerHierarchyStack: ["Features"]};
define("Features", ["BaseSchemaModuleV2"], function() {

	Ext.define("Terrasoft.configuration.FeaturesModule", {
		alternateClassName: "Terrasoft.FeaturesModule",
		extend: "Terrasoft.BaseSchemaModule",

		useHistoryState: false,

		initSchemaName: function() {
			this.schemaName = "FeaturesPage";
		}

	});

	return Terrasoft.FeaturesModule;
});


