Terrasoft.configuration.Structures["PageDesignerBuilder"] = {innerHierarchyStack: ["PageDesignerBuilder"], structureParent: "SchemaBuilderV2"};
define("PageDesignerBuilder", ["ViewModelSchemaDesignerBuilder", "PageDesignerViewGenerator",
	"PageDesignerViewModelGenerator"
], function() {

	/**
	 * Page designer builder.
	 */
	Ext.define("Terrasoft.configuration.PageDesignerBuilder", {
		extend: "Terrasoft.configuration.ViewModelSchemaDesignerBuilder",
		alternateClassName: "Terrasoft.PageDesignerBuilder",

		// region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.ViewModelSchemaDesignerBuilder#designerSchemaName
		 * @override
		 */
		designerSchemaName: "PageDesignerSchema",

		/**
		 * Flags that indicates whether designer is read only on not.
		 * @Boolean
		 */
		isReadOnly: false,

		// endregion

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.configuration.ViewModelSchemaDesignerBuilder#createDesignViewGenerator
		 * @override
		 */
		createDesignViewGenerator: function() {
			return Ext.create("Terrasoft.PageDesignerViewGenerator", {
				isReadOnly: this.isReadOnly
			});
		},

		/**
		 * @inheritdoc Terrasoft.configuration.ViewModelSchemaDesignerBuilder#createViewModelGenerator
		 * @override
		 */
		createViewModelGenerator: function() {
			return Ext.create("Terrasoft.PageDesignerViewModelGenerator", {
				useCache: false,
				isReadOnly: this.isReadOnly
			});
		},

		/**
		 * @inheritdoc Terrasoft.configuration.ViewModelSchemaDesignerBuilder#buildSchema
		 * @override
		 */
		buildSchema: function(config) {
			const schema = config.schema;
			schema.properties = schema.properties || {};
			schema.properties.isReadOnly = this.isReadOnly;
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.configuration.ViewModelSchemaDesignerBuilder#generateInfoViewConfig
		 * @override
		 */
		generateInfoViewConfig: function() {
			if (!this.isReadOnly) {
				this.callParent(arguments);
			}
		}

		// endregion

	});

	return Terrasoft.PageDesignerBuilder;
});


