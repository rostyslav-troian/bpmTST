define("PreviewContentBuilderResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PreviewCaption: "Preview",
		DesktopButtonCaption: "Desktop",
		MobileButtonCaption: "Mobile",
		NewTabButtonCaption: "Open in new window",
		ContentDesigner: "Content Designer"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "PreviewContentBuilder",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		ExpandIcon: {
			source: 3,
			params: {
				schemaName: "PreviewContentBuilder",
				resourceItemName: "ExpandIcon",
				hash: "d12ba2dcc89318c4b1647a1942c45b0e",
				resourceItemExtension: ".svg"
			}
		},
		BackIcon: {
			source: 3,
			params: {
				schemaName: "PreviewContentBuilder",
				resourceItemName: "BackIcon",
				hash: "6143f8f0bd6c2b027dc3ae5c825c9e2a",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});