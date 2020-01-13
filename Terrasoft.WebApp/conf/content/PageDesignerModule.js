Terrasoft.configuration.Structures["PageDesignerModule"] = {innerHierarchyStack: ["PageDesignerModule"], structureParent: "BaseSchemaModuleV2"};
define("PageDesignerModule", [
	"ViewModelSchemaDesignerModule",
	"PageDesignerBuilder",
	"css!ViewModelSchemaDesignerModule",
	"css!MainHeaderCSS"
], function() {

	Ext.define("Terrasoft.configuration.PageDesignerModule", {
		extend: "Terrasoft.configuration.ViewModelSchemaDesignerModule",
		alternateClassName: "Terrasoft.PageDesignerModule",

		/**
		 * Flag that indicates that the schema is available in read-only mode
		 * @type {Boolean}
		 */
		isReadOnly: false,

		// region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.ViewModelSchemaDesignerModule#createSchemaBuilder
		 * @override
		 */
		createSchemaBuilder: function() {
			return new Terrasoft.PageDesignerBuilder({isReadOnly: this.isReadOnly});
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#render
		 * @override
		 */
		render: function(renderTo) {
			this.callParent(arguments);
			if (this.isReadOnly) {
				const selector = "#" + renderTo.id;
				Terrasoft.Mask.show({
					selector: selector,
					frameVisible: false,
					caption: "",
					opacity: 0,
					showSpinner: false,
					clearMasks: true
				});
			}
		}

		// endregion

	});

	return Terrasoft.PageDesignerModule;
});


