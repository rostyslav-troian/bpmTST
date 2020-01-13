Terrasoft.configuration.Structures["DcmReorderableContainer"] = {innerHierarchyStack: ["DcmReorderableContainer"]};
define("DcmReorderableContainer", ["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	/**
	 * Dcm reorderable container class.
	 */
	Ext.define("Terrasoft.Designers.DcmReorderableContainer", {
		extend: "Terrasoft.ReorderableContainer",
		alternateClassName: "Terrasoft.DcmReorderableContainer",

		/**
		 * @inheritdoc Terrasoft.core.mixins.Reorderable#createZeroElement
		 * @override
		 */
		createZeroElement: Terrasoft.emptyFn,

		/**
		 * @inheritdoc Terrasoft.controls.ReorderableContainer#init
		 * @protected
		 * @override
		 */
		init: function() {
			this.callParent(arguments);
			this.addEvents(
				"elementSelected",
				"elementDblClick",
				"elementRemoveBtnClick",
				"onStageSelected",
				"elementDragDrop"
			);
		},

		/**
		 * @inheritdoc Terrasoft.Droppable#getDropZones
		 * @override
		 */
		getDropZones: function() {
			var dropZones = this.callParent(arguments);
			var ownerCt = this.ownerCt;
			if (ownerCt) {
				dropZones.push(ownerCt.getRenderToEl(this));
			}
			return dropZones;
		},

		/**
		 * @inheritdoc Terrasoft.ReorderableContainer#onDrag
		 * @override
		 */
		onDrag: function(dragItemId, dragRegion, dragOverItems, eventName) {
			if (this.ownerCt) {
				dragOverItems.push(this);
			}
			this.callParent([dragItemId, dragRegion, dragOverItems, eventName]);
		},

		/**
		 * @inheritdoc Terrasoft.ReorderableContainer#getDragOverRegion
		 * @override
		 */
		getDragOverRegion: function(dragOverItem) {
			var dragOverRegion;
			if (dragOverItem === this) {
				var ownerElement = this.ownerCt.getRenderToEl(this);
				var innerElement = this.getRenderToEl(this);
				var ownerRegion = Ext.util.Region.getRegion(ownerElement);
				var innerRegion = Ext.util.Region.getRegion(innerElement);
				var top, left;
				var right = ownerRegion.right;
				var bottom = ownerRegion.bottom;
				switch (this.align) {
					case Terrasoft.enums.ReorderableContainer.Align.HORIZONTAL:
						top = ownerRegion.top;
						left = innerRegion.right;
						break;
					case Terrasoft.enums.ReorderableContainer.Align.VERTICAL:
						top = innerRegion.bottom;
						left = ownerRegion.left;
						break;
					default:
						break;
				}
				dragOverRegion = new Ext.util.Region(top, right, bottom, left);
			} else {
				dragOverRegion = this.callParent(arguments);
			}
			return dragOverRegion;
		}
	});

	return Terrasoft.Designers.DcmReorderableContainer;
});


