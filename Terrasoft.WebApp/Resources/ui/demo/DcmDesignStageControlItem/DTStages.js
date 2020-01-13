Ext.define("Terrasoft.controls.DTStages", {
	alternateClassName: "Terrasoft.DTStages",
	extend: "Terrasoft.ReorderableContainer",

	/**
	 * @inheritdoc Terrasoft.controls.ReorderableContainer#itemClassName
	 */
	itemClassName: "Terrasoft.DraggableContainer",

	/**
	 * @inheritdoc Terrasoft.controls.ReorderableContainer#align
	 */
	align: Terrasoft.enums.ReorderableContainer.Align.HORIZONTAL
});
