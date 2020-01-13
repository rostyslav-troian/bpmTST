Terrasoft.configuration.Structures["PageTemplateModule"] = {innerHierarchyStack: ["PageTemplateModule"], structureParent: "BaseSchemaModuleV2"};
define("PageTemplateModule", ["MaskHelper", "BaseSchemaModuleV2"], function(MaskHelper) {
	Ext.define("Terrasoft.PageTemplateModule", {
		extend: "Terrasoft.BaseSchemaModule",

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#useHistoryState
		 * @override
		 */
		useHistoryState: false,

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#showMask
		 * @override
		 */
		showMask: true,

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @override
		 */
		initSchemaName: function() {
			this.schemaName = "PageTemplateLookupPage";
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#getWrapClassNames
		 * @override
		 */
		getWrapClassNames: function() {
			var classes = this.callParent();
			classes.push("page-template-lookup");
			return classes;
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#render
		 * @override
		 */
		render: function() {
			this.callParent(arguments);
			MaskHelper.HideBodyMask();
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#init
		 * @override
		 */
		init: function() {
			MaskHelper.ShowBodyMask();
			this.callParent(arguments);
		}
	});

	return Terrasoft.PageTemplateModule;
});


