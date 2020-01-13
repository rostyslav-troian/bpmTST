Terrasoft.configuration.Structures["ExistingColumnGridLayoutEditItemModel"] = {innerHierarchyStack: ["ExistingColumnGridLayoutEditItemModel"]};
define("ExistingColumnGridLayoutEditItemModel", ["ColumnGridLayoutEditItemModel"], function() {

	/**
	 * Terrasoft.configuration.ExistingColumnGridLayoutEditItemModel
	 */
	Ext.define("Terrasoft.configuration.ExistingColumnGridLayoutEditItemModel", {
		extend: "Terrasoft.ColumnGridLayoutEditItemModel",
		alternateClassName: "Terrasoft.ExistingColumnGridLayoutEditItemModel",

		/**
		 * @inheritdoc Terrasoft.GridLayoutEditItemModel#addToDesignSchema
		 * @overridden
		 */
		addToDesignSchema: function(config) {
			this.addItemToDesignSchemaCollection(config.layoutName);
			var existingModelDraggableItems = this.parentViewModel.get("ExistingModelDraggableItems");
			var columnUId = this.column.getPropertyValue("uId");
			var schemaDesignToolItem = existingModelDraggableItems.get(columnUId);
			schemaDesignToolItem.set("IsUsed", true);
		}
	});

	return Terrasoft.ExistingColumnGridLayoutEditItemModel;
});


