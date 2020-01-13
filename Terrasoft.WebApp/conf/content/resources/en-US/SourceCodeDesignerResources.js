define("SourceCodeDesignerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ShowFindWindowButtonHint: "Search",
		ShowWhitespacesButtonHint: "Show white space"
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