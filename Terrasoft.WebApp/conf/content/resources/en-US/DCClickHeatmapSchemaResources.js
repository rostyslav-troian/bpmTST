define("DCClickHeatmapSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		UnsubscribeUrlMacros: "[#Unsubscribe.URL#]",
		UnsubscribeLinkMacros: "[#Unsubscribe.Link#]",
		CalculateRecipientsButtonCaption: "Calculate recipients",
		Title: "Click heatmap"
	};
	var localizableImages = {
		ToggleListButtonImage: {
			source: 3,
			params: {
				schemaName: "DCClickHeatmapSchema",
				resourceItemName: "ToggleListButtonImage",
				hash: "7bc3932d679a675779c0a19c7b0e2dca",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});