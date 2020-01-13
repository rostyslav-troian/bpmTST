/**
 */
Ext.define("Terrasoft.mixins.ReorderableItemVMMixin", {
	alternateClassName: "Terrasoft.ReorderableItemVMMixin",

	/**
	 * Initializes mixin.
	 * @protected
	 */
	preInit: function() {
		this.initAttribute();
	},

	/**
	 * Inits attributes of view model.
	 * @protected
	 */
	initAttribute: function() {
		var columns = this.columns;
		columns.ReorderableModel = columns.ReorderableModel || {
			type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
			caption: "ReorderableModel",
			dataValueType: Terrasoft.core.enums.DataValueType.CUSTOM_OBJECT
		};
		columns.Name = columns.Name || {
			type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
			caption: "Name",
			dataValueType: Terrasoft.core.enums.DataValueType.TEXT
		};
		columns.Id =  columns.Id || {
			type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
			caption: "Id",
			dataValueType: Terrasoft.core.enums.DataValueType.TEXT
		};
	}
});
