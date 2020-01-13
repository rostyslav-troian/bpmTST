define("DCClickHeatmapSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		UnsubscribeUrlMacros: "[#\u041E\u0442\u043F\u0438\u0441\u043A\u0430.URL#]",
		UnsubscribeLinkMacros: "[#\u041E\u0442\u043F\u0438\u0441\u043A\u0430.\u0421\u0441\u044B\u043B\u043A\u0430#]",
		CalculateRecipientsButtonCaption: "\u041F\u043E\u0434\u0441\u0447\u0438\u0442\u0430\u0442\u044C \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u0435\u0439",
		Title: "\u041A\u0430\u0440\u0442\u0430 \u043A\u043B\u0438\u043A\u043E\u0432"
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