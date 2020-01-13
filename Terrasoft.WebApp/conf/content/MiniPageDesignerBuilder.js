Terrasoft.configuration.Structures["MiniPageDesignerBuilder"] = {innerHierarchyStack: ["MiniPageDesignerBuilder"]};
define("MiniPageDesignerBuilder", ["ViewModelSchemaDesignerBuilder", "MiniPageDesignerViewGenerator",
	"MiniPageDesignerViewModelGenerator"
], function() {

	/**
	 * Mini page designer builder.
	 */
	Ext.define("Terrasoft.configuration.MiniPageDesignerBuilder", {
		extend: "Terrasoft.configuration.ViewModelSchemaDesignerBuilder",
		alternateClassName: "Terrasoft.MiniPageDesignerBuilder",

		// region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.ViewModelSchemaDesignerBuilder#designerSchemaName
		 * @override
		 */
		designerSchemaName: "MiniPageDesignerSchema",

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.configuration.ViewModelSchemaDesignerBuilder#createDesignViewGenerator
		 * @override
		 */
		createDesignViewGenerator: function() {
			return Ext.create("Terrasoft.MiniPageDesignerViewGenerator");
		},

		/**
		 * @inheritdoc Terrasoft.configuration.ViewModelSchemaDesignerBuilder#createViewModelGenerator
		 * @override
		 */
		createViewModelGenerator: function() {
			return Ext.create("Terrasoft.MiniPageDesignerViewModelGenerator", {
				useCache: false
			});
		},

		/**
		 * @inheritdoc Terrasoft.configuration.mixins.ViewModelSchemaValidationMixin#getViewSchemaRootItemName
		 * @override
		 */
		getViewSchemaRootItemName: function() {
			return "AlignableMiniPageContainer";
		},

		/**
		 * @inheritdoc Terrasoft.configuration.ViewModelSchemaDesignerBuilder#buildSchema
		 * @override
		 */
		buildSchema: function(config) {
			config.schema.attributes = config.schema.attributes || {};
			this.callParent(arguments);
		}

		// endregion

	});

	return Terrasoft.MiniPageDesignerBuilder;
});


