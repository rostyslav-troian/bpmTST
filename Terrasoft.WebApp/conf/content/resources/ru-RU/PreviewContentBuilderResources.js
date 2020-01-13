define("PreviewContentBuilderResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PreviewCaption: "\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440",
		DesktopButtonCaption: "Desktop",
		MobileButtonCaption: "Mobile",
		NewTabButtonCaption: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0432 \u043D\u043E\u0432\u043E\u043C \u043E\u043A\u043D\u0435",
		ContentDesigner: "\u0414\u0438\u0437\u0430\u0439\u043D\u0435\u0440 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430"
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