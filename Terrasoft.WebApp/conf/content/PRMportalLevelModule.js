Terrasoft.configuration.Structures["PRMportalLevelModule"] = {innerHierarchyStack: ["PRMportalLevelModule"]};
define("PRMportalLevelModule", ["BaseSchemaModuleV2"], function() {

	Ext.define("Terrasoft.configuration.PRMportalLevelModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.PRMportalLevelModule",


		useHistoryState: false,


		initSchemaName: function() {
			this.schemaName = "PRMportalLevelSchema";
		}
	});
	return Terrasoft.PRMportalLevelModule;
});


