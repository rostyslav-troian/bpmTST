Terrasoft.configuration.Structures["SchemaColumnDesignToolItem"] = {innerHierarchyStack: ["SchemaColumnDesignToolItem"]};
define("SchemaColumnDesignToolItem", ["SchemaDesignToolItem"], function() {
	Ext.define("Terrasoft.SchemaColumnDesignToolItem", {
		extend: "Terrasoft.SchemaDesignToolItem",

		/**
		 * Design schema column
		 * @type {Terrasoft.EntitySchemaColumn}
		 */
		column: null,

		/**
		 * @inheritdoc Terrasoft.SchemaColumnDesignToolItem#getDesignItemConfg
		 * @override
		 */
		getDesignItemConfg: function() {
			return {
				itemConfig: {
					name: this.column.name,
					layout: {colSpan: 12}
				},
				column: this.column,
				schemaModelItemDesignerName: "SchemaModelItemDesigner",
				parentViewModel: this.parentViewModel
			};
		}
	});
	return Terrasoft.SchemaColumnDesignToolItem;
});


