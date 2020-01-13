/**
 * Class of container with Drag&Drop features.
 */
Ext.define("Terrasoft.controls.DraggableContainer", {
	extend: "Terrasoft.controls.Container",
	alternateClassName: "Terrasoft.DraggableContainer",

	mixins: {
		draggable: "Terrasoft.Draggable"
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.mixins.draggable.onAfterRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.mixins.draggable.onAfterReRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.component#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.mixins.draggable.onDestroy.apply(this, arguments);
		this.callParent(arguments);
	}

});
