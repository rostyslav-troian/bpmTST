Terrasoft.configuration.Structures["SspPageDesignerModule"] = {innerHierarchyStack: ["SspPageDesignerModule"]};
define("SspPageDesignerModule", ["PageDesignerModule", "SspPageDesignerBuilder",
		"css!ViewModelSchemaDesignerModule", "css!MainHeaderCSS",
		"css!PageDesignerModule"], function() {

	Ext.define("Terrasoft.configuration.SspPageDesignerModule", {
		extend: "Terrasoft.configuration.PageDesignerModule",
		alternateClassName: "Terrasoft.SspPageDesignerModule",

		/**
		 * @inheritDoc Terrasoft.PageDesignerModule#createSchemaBuilder
		 * @override
		 */
		createSchemaBuilder: function() {
			return new Terrasoft.SspPageDesignerBuilder({isReadOnly: this.isReadOnly});
		}
	});

	return Terrasoft.SspPageDesignerModule;
});


