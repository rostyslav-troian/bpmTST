Terrasoft.configuration.Structures["DynamicContentGroupMenu"] = {innerHierarchyStack: ["DynamicContentGroupMenu"]};
define("DynamicContentGroupMenu", [], function() {
	Ext.define("Terrasoft.controls.DynamicContentGroupMenu", {
		extend: "Terrasoft.Menu",
		alternateClassName: "Terrasoft.DynamicContentGroupMenu",

		ulClass: "dynamic-content-group-menu",

		/**
		 * @inheritdoc Terrasoft.Menu#getMenuItemConfig
		 * @override
		 */
		getMenuItemConfig: function(itemModel) {
			var itemConfig = this.callParent(arguments);
			itemConfig.handler = itemModel.$Handler;
			return itemConfig;
		}
	});
});


