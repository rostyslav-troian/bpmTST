define("MLPredictionExplanationResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ScoreServiceErrorMessage: "Action has been finished with failure. You can find details in the application log",
		PredictedValueCaption: "Predicted value",
		FeatureCaption: "Predictor",
		WeightCaption: "Weight"
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