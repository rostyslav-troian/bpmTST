Terrasoft.configuration.Structures["SchemaParameterDesignToolItem"] = {innerHierarchyStack: ["SchemaParameterDesignToolItem"]};
define("SchemaParameterDesignToolItem", [
	"SchemaColumnDesignToolItem",
	"SchemaDesignToolItemResources"
], function(module, resources) {
	Ext.define("Terrasoft.SchemaParameterDesignToolItem", {
		extend: "Terrasoft.SchemaColumnDesignToolItem",

		/**
		 * @inheritdoc Terrasoft.configuration.SchemaDesignToolItem#columns
		 */
		columns: {
			ToolsMenuItems: {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.COLLECTION
			},
			EnableRightIcon: {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				dataValueType: Terrasoft.DataValueType.BOOLEAN,
				value: true
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initToolsMenuItems();
		},

		/**
		 * @protected
		 */
		initToolsMenuItems: function() {
			const menuItems = new Terrasoft.BaseViewModelCollection();
			const removeMenuItem = new Terrasoft.BaseViewModel({
				values: {
					Caption: resources.localizableStrings.RemoveColumnDesignItemMenuItemCaption,
					Click: {"bindTo": "onRemoveMenuItemClick"}
				}
			});
			menuItems.addItem(removeMenuItem);
			this.set("ToolsMenuItems", menuItems);
		},

		/**
		 * @inheritdoc Terrasoft.SchemaColumnDesignToolItem#getDesignItemConfg
		 * @override
		 */
		getDesignItemConfg: function() {
			return Ext.apply({}, {
				schemaModelItemDesignerName: "ClientUnitSchemaModelItemDesigner"
			}, this.callParent(arguments));
		}
	});
	return Terrasoft.SchemaParameterDesignToolItem;
});


