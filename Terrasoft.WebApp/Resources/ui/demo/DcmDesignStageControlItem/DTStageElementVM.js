/**
 * Design time element view model.
 */
Ext.define("Terrasoft.DTStageElementVM", {
	extend: "Terrasoft.BaseViewModel",

	mixins: {
		ReorderableItemVMMixin: "Terrasoft.ReorderableItemVMMixin"
	},

	/**
	 * Init mixin.
	 * @protected
	 */
	init: function() {
		this.mixins.ReorderableItemVMMixin.init.call(this);
	},

	/**
	 * Returns module view configuration.
	 * @protected
	 * @return {Object} Module view configuration.
	 */
	getViewConfig: function() {
		return {
			className: "Terrasoft.DTStageElement",
			groupName: "dcm-stage-items",
			tag: this.get("Id"),
			id: this.get("Id"),
			items: [
				{
					className: "Terrasoft.Label",
					caption: {
						bindTo: "Name"
					}
				}
			],
			onDragEnter: {
				bindTo: "onDragEnter"
			},
			onDragDrop: {
				bindTo: "onDragDrop"
			},
			onDragOut: {
				bindTo: "onDragOut"
			}
		};
	}
});
