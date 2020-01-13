/**
 * Class of container with the Droppable mixin.
 */
Ext.define("Terrasoft.controls.DroppableContainer", {
	extend: "Terrasoft.controls.Container",
	alternateClassName: "Terrasoft.DroppableContainer",

	mixins: {
		droppable: "Terrasoft.core.mixins.Droppable"
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterRender
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.mixins.droppable.onAfterRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.component#onAfterReRender
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.mixins.droppable.onAfterReRender.apply(this, arguments);
	},

	/**
	 * @inheritdoc Terrasoft.component#onDestroy
	 * @override
	 */
	onDestroy: function() {
		this.mixins.droppable.onDestroy.apply(this, arguments);
		this.callParent(arguments);
	}

});
