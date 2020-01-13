define("QuickSearchModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SearchStringPlaceHolder: "\u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u043F\u043E\u0438\u0441\u043A",
		SearchLineHint: "\u0421\u0442\u0440\u043E\u043A\u0430 \u043F\u043E\u0438\u0441\u043A\u0430 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432",
		ApplyFilterButtonHint: "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u0424\u0438\u043B\u044C\u0442\u0440",
		ResetFilterButtonHint: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440"
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