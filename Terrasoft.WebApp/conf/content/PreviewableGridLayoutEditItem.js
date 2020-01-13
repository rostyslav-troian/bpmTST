Terrasoft.configuration.Structures["PreviewableGridLayoutEditItem"] = {innerHierarchyStack: ["PreviewableGridLayoutEditItem"]};
define("PreviewableGridLayoutEditItem", ["PreviewableGridLayoutEditItemResources", "css!PreviewableGridLayoutEditItem"],
		function() {

	Ext.define("Terrasoft.controls.PreviewableGridLayoutEditItem", {
		alternateClassName: "Terrasoft.PreviewableGridLayoutEditItem",
		extend: "Terrasoft.GridLayoutEditItem",

		tplConfig: {
			classes: {
				wrapClasses: ["grid-layout-edit-item-wrap"],
				moduleClasses: ["previewable-grid-layout-edit-item-module"],
				elClasses: ["grid-layout-edit-item-el", "previewable-grid-layout-edit-item-el"],
				contentWrapClasses: ["grid-layout-edit-item-content-wrap"],
				textWrapClasses: ["grid-layout-edit-item-content-text-wrap"],
				imageWrapClasses: ["grid-layout-edit-item-content-image-wrap"],
				imageClasses: ["grid-layout-edit-item-content-image"],
				actionsWrapClasses: ["grid-layout-edit-item-actions-wrap"]
			},
			selectorSuffixes: {
				wrap: "grid-layout-edit-item-wrap",
				gridCell: "grid-layout-edit-cell",
				gridTable: "grid-layout-edit-table"
			},
			styles: {
				width: "0px",
				height: "0px",
				top: "0px",
				left: "0px"
			}
		},

		getPreviewId: function() {
			return Ext.String.format("{0}-preview-area", this.itemId);
		},

		getTplData: function() {
			var tplData = this.callParent(arguments);
			tplData.previewId = this.getPreviewId();
			return tplData;
		},

		previewIdTemplate: "{0}-preview-area",

		tpl: [
			"<div id=\"{id}-grid-layout-edit-item-wrap\" class=\"{wrapClasses}\" data-selected-item=\"{selected}\" ",
			"style=\"{wrapStyles}\">",
			"<div id=\"{id}-grid-layout-edit-item-el\" class=\"{elClasses}\" >",
			"<div id=\"{id}-grid-layout-edit-item-content\" class=\"{contentWrapClasses}\" style=\"display: none\">",
			"<tpl if=\"hasImage\">",
			"<div class=\"{imageWrapClasses}\">",
			"<img class=\"{imageClasses}\" src=\"{imageUrl}\"/>",
			"</div>",
			"</tpl>",
			"<tpl if=\"showContent\">",
			"<div class=\"{textWrapClasses}\">",
			"{content}",
			"</div>",
			"</tpl>",
			"</div>",
			"<tpl if=\"hasActions\">",
			"<div id=\"{id}-grid-layout-edit-item-actions\" class=\"{actionsWrapClasses}\">",
			"{%this.renderItems(out, values)%}",
			"</div>",
			"</tpl>",
			"</div>",
			"<div id=\"{previewId}\" class=\"{moduleClasses}\"></div>",
			"</div>"
		],

		onPreviewReady: function() {
			var gridLayoutEditInstance = this.getGridLayoutEditInstance();
			gridLayoutEditInstance.fireEvent("previewReady", this.getPreviewId(), this.itemId);
		},

		onAfterRender: function() {
			this.callParent(arguments);
			this.onPreviewReady();
		},

		onAfterReRender: function() {
			this.callParent(arguments);
			this.onPreviewReady();
		},

		dragCopy: true,

		b4StartDrag: function() {
			var currentDraggable = Ext.dd.DragDropManager.dragCurrent;
			currentDraggable.resetConstraints(true);
			currentDraggable.clearConstraints();
			this.setDraggableConstraints(currentDraggable);
		}

	});

	return Terrasoft.PreviewableGridLayoutEditItem;

});


