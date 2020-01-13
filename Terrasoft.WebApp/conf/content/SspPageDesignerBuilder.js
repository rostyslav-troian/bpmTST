Terrasoft.configuration.Structures["SspPageDesignerBuilder"] = {innerHierarchyStack: ["SspPageDesignerBuilder"]};
define("SspPageDesignerBuilder", ["PageDesignerBuilder"], function() {

	Ext.define("Terrasoft.configuration.SspPageDesignerBuilder", {
		extend: "Terrasoft.configuration.PageDesignerBuilder",
		alternateClassName: "Terrasoft.SspPageDesignerBuilder",

		/**
		 * @inheritdoc Terrasoft.ViewModelSchemaDesignerBuilder#designerSchemaName
		 * @override
		 */
		designerSchemaName: "SspPageDesignerSchema"

	});

	return Terrasoft.SspPageDesignerBuilder;
});


