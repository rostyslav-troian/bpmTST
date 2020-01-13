define("MLPredictionExplanationResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ScoreServiceErrorMessage: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043B\u043E\u0441\u044C \u0441 \u043E\u0448\u0438\u0431\u043A\u043E\u0439. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u0438 - \u0432 \u0436\u0443\u0440\u043D\u0430\u043B\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F",
		PredictedValueCaption: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u043F\u0440\u043E\u0433\u043D\u043E\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F:",
		FeatureCaption: "\u0424\u0430\u043A\u0442\u043E\u0440 \u043F\u0440\u043E\u0433\u043D\u043E\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F",
		WeightCaption: "\u0412\u0435\u0441"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "MLPredictionExplanation",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});