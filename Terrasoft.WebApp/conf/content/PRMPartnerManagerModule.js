Terrasoft.configuration.Structures["PRMPartnerManagerModule"] = {innerHierarchyStack: ["PRMPartnerManagerModule"]};
define("PRMPartnerManagerModule", ["BaseSchemaModuleV2"], function() {

	Ext.define("Terrasoft.configuration.PRMPartnerManagerModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.PRMPartnerManagerModule",


		useHistoryState: false,


		initSchemaName: function() {
			this.schemaName = "PRMPartnerManagerSchema";
		}
	});
	return Terrasoft.PRMPartnerManagerModule;
});


