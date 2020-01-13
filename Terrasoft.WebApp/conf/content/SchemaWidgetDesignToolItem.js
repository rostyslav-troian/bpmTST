Terrasoft.configuration.Structures["SchemaWidgetDesignToolItem"] = {innerHierarchyStack: ["SchemaWidgetDesignToolItem"]};
define("SchemaWidgetDesignToolItem", ["SchemaDesignToolItem"], function() {
	Ext.define("Terrasoft.SchemaWidgetDesignToolItem", {
		extend: "Terrasoft.SchemaDesignToolItem",

		/**
		 * Widget config.
		 * @type {Object}
		 */
		item: null,

		/**
		 * @inheritdoc Terrasoft.configuration.SchemaDesignToolItem#getDesignItemConfg
		 * @override
		 */
		getDesignItemConfg: function() {
			return {
				itemConfig: {
					name: this.item.type,
					caption: this.item.caption,
					layout: {colSpan: 12}
				},
				widgetType: this.item.type,
				widgetCaption: this.item.caption
			};
		}
	});
	return Terrasoft.SchemaWidgetDesignToolItem;
});


