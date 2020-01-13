Terrasoft.configuration.Structures["ContentBuilderBlock"] = {innerHierarchyStack: ["ContentBuilderBlock"]};
define("ContentBuilderBlock", ["css!ContentBuilderElement", "ContentBuilderElement",
		"ContentBuilderBlockViewModel"],
	function() {

	/**
	 * @class Terrasoft.controls.ContentBuilderBlock
	 */
	Ext.define("Terrasoft.controls.ContentBuilderBlock", {
		extend: "Terrasoft.ContentBuilderElement",
		alternateClassName: "Terrasoft.ContentBuilderBlock",
		mixins: {
			draggable: "Terrasoft.DraggableContentBlock"
		},

		/**
		 * @inheritdoc Terrasoft.core.mixins.Draggable#showDropZoneHint
		 * @override
		 */
		showDropZoneHint: true

	});

	return Terrasoft.ContentBuilderBlock;
});


