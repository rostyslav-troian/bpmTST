/**
 * Design time stages view model.
 */
Ext.define("Terrasoft.DTStagesVM", {
	extend: "Terrasoft.BaseViewModel",

	mixins: {
		ReorderableContainerVMMixin: "Terrasoft.ReorderableContainerVMMixin"
	},

	constructor: function() {
		this.callParent(arguments);
		this.mixins.ReorderableContainerVMMixin.preInit.call(this);
	},

	createItem: function() {
		var name = this.get("Name");
		var items = this.get("ViewModelItems");
		var itemId = name + "_" + items.getCount();
		return Ext.create("Terrasoft.DTStageVM", {
			values: {
				Id: itemId,
				Name: itemId
			},
			parentViewModel: this
		});
	},

	insertItem: function(stage, index) {
		var items = this.get("ViewModelItems");
		var itemId = stage.get("Id");
		var insertIndex = (index != null) ? index : items.getCount();
		items.insert(insertIndex, itemId, stage);
	}

});
