Terrasoft.configuration.Structures["SectionPageDesignerModule"] = {innerHierarchyStack: ["SectionPageDesignerModule"], structureParent: "PageDesignerModule"};
define("SectionPageDesignerModule", [
	"PageDesignerModule",
	"css!ViewModelSchemaDesignerModule",
	"css!PageDesignerModule",
	"css!SectionPageDesignerModule",
	"css!MainHeaderCSS"
], function() {

	Ext.define("Terrasoft.configuration.SectionPageDesignerModule", {
		extend: "Terrasoft.configuration.PageDesignerModule",
		alternateClassName: "Terrasoft.SectionPageDesignerModule",

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.PageDesignerModule#createSchemaBuilder
		 * @override
		 */
		createSchemaBuilder: function() {
			return new Terrasoft.ViewModelSchemaDesignerBuilder();
		}

		// endregion

	});

	return Terrasoft.SectionPageDesignerModule;
});


