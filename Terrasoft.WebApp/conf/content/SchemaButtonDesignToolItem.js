Terrasoft.configuration.Structures["SchemaButtonDesignToolItem"] = {innerHierarchyStack: ["SchemaButtonDesignToolItem"]};
define("SchemaButtonDesignToolItem", ["SchemaDesignToolItem"], function() {
	Ext.define("Terrasoft.SchemaButtonDesignToolItem", {
		extend: "Terrasoft.SchemaDesignToolItem",

		/**
		 * Button caption.
		 * @type {String}
		 */
		caption: null,

		/**
		 * @inheritdoc Terrasoft.SchemaColumnDesignToolItem#getDesignItemConfg
		 * @override
		 */
		getDesignItemConfg: function() {
			return {
				itemConfig: {
					name: "Button",
					caption: this.caption
				}
			};
		}
	});
	return Terrasoft.SchemaButtonDesignToolItem;
});


