define("UserCasesListModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ListHeaderCaption: "\u041C\u043E\u0438 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F",
		CreateButtonCaption: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C",
		EmptyInfoTitle: "\u041F\u043E\u0445\u043E\u0436\u0435, \u0447\u0442\u043E \u0443 \u0432\u0430\u0441 \u043D\u0435\u0442 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439",
		EmptyInfoRecommendation: "\u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 {0}\u043D\u043E\u0432\u043E\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435{1}."
	};
	var localizableImages = {
		EmptyInfoImage: {
			source: 3,
			params: {
				schemaName: "UserCasesListModule",
				resourceItemName: "EmptyInfoImage",
				hash: "422274c89a26eb8896da446f9edfac30",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});