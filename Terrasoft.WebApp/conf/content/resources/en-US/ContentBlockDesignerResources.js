define("ContentBlockDesignerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "Ok",
		CancelButtonCaption: "Cancel",
		BlockElementsCaption: "Block elements",
		DesignerCaption: "Block designer",
		GroupButtonCaption: "Group",
		UngroupButtonCaption: "Ungroup",
		GroupButtonInfoText: "Group the elements to correctly display the message in your mobile application. The interconnected pieces of content should belong to separate columns, e.g., make two columns with images and their descriptions. The elements that have not been grouped will be displayed line-by-line. Select multiple elements using the Ctrl key."
	};
	var localizableImages = {
		BlockElementsImage: {
			source: 3,
			params: {
				schemaName: "ContentBlockDesigner",
				resourceItemName: "BlockElementsImage",
				hash: "a465b42219ca05e901f1a7700ddb346e",
				resourceItemExtension: ".svg"
			}
		},
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "ContentBlockDesigner",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		GroupElements: {
			source: 3,
			params: {
				schemaName: "ContentBlockDesigner",
				resourceItemName: "GroupElements",
				hash: "bfbae4c8619edda52f38bf8eb33fd13a",
				resourceItemExtension: ".svg"
			}
		},
		UngroupElements: {
			source: 3,
			params: {
				schemaName: "ContentBlockDesigner",
				resourceItemName: "UngroupElements",
				hash: "2b6d7d696cbcbf5b2ce439624f1f6910",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});