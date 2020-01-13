Terrasoft.configuration.Structures["MiniPageDesignerModule"] = {innerHierarchyStack: ["MiniPageDesignerModule"]};
define("MiniPageDesignerModule", ["ViewModelSchemaDesignerModule", "MiniPageDesignerBuilder",
	"css!ViewModelSchemaDesignerModule"
], function() {

	/**
	 * Mini page designer module.
	 */
	Ext.define("Terrasoft.configuration.MiniPageDesignerModule", {
		extend: "Terrasoft.configuration.ViewModelSchemaDesignerModule",
		alternateClassName: "Terrasoft.MiniPageDesignerModule",

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.ViewModelSchemaDesignerModule#createSchemaBuilder
		 * @override
		 */
		createSchemaBuilder: function() {
			return new Terrasoft.MiniPageDesignerBuilder();
		},

		/**
		 * @inheritdoc Terrasoft.ViewModelSchemaDesignerModule#getRootSchemaItem
		 * @override
		 */
		getRootSchemaItem: function() {
			return "AlignableMiniPageContainer";
		}

		// endregion

	});

	return Terrasoft.MiniPageDesignerModule;
});


