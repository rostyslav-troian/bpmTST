define("CommentsModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ViewMoreCaption: "Show more {0}",
		DeleteMessage: "Are you sure that you want to delete the comment?",
		EditButtonCaption: "Edit",
		DeleteButtonCaption: "Delete",
		AddCommentWatermark: "Add comment",
		InfoDataSeparator: " in "
	};
	var localizableImages = {
		SelectedArrow: {
			source: 3,
			params: {
				schemaName: "CommentsModule",
				resourceItemName: "SelectedArrow",
				hash: "77f1229091425bdf354a5d23151dea0d",
				resourceItemExtension: ".png"
			}
		},
		DeleteIcon: {
			source: 3,
			params: {
				schemaName: "CommentsModule",
				resourceItemName: "DeleteIcon",
				hash: "f46b77d2fbd9e590ac327cead2fb4c2d",
				resourceItemExtension: ".png"
			}
		},
		EditIcon: {
			source: 3,
			params: {
				schemaName: "CommentsModule",
				resourceItemName: "EditIcon",
				hash: "8dee7bcf504a97902c455bb1022d2f70",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});