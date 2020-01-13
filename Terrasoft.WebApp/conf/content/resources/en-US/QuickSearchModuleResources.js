define("QuickSearchModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SearchStringPlaceHolder: "Quick search",
		SearchLineHint: "Product search line",
		ApplyFilterButtonHint: "Apply filter",
		ResetFilterButtonHint: "Reset filter"
	};
	var localizableImages = {
		ApplyButtonImage: {
			source: 3,
			params: {
				schemaName: "QuickSearchModule",
				resourceItemName: "ApplyButtonImage",
				hash: "990c2489baa1946eb4c3f44b827803df",
				resourceItemExtension: ".png"
			}
		},
		CancelButtonImage: {
			source: 3,
			params: {
				schemaName: "QuickSearchModule",
				resourceItemName: "CancelButtonImage",
				hash: "42b5b815fe5ef39879666f4595bd892b",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});