define("SourceCodeDesignerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ShowFindWindowButtonHint: "\u041F\u043E\u0438\u0441\u043A",
		ShowWhitespacesButtonHint: "\u041E\u0442\u043E\u0431\u0440\u0430\u0437\u0438\u0442\u044C \u0432\u0441\u0435 \u0437\u043D\u0430\u043A\u0438"
	};
	var localizableImages = {
		SearchImage: {
			source: 3,
			params: {
				schemaName: "SourceCodeDesigner",
				resourceItemName: "SearchImage",
				hash: "da3e9f4b62b8b5c641fe96f4f379c007",
				resourceItemExtension: ".png"
			}
		},
		ShowWhitespacesImage: {
			source: 3,
			params: {
				schemaName: "SourceCodeDesigner",
				resourceItemName: "ShowWhitespacesImage",
				hash: "0308425530ae1241a451640f338679ed",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});