define("ContactEnrichmentSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddContactCaption: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442",
		EnrichContactCaption: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439",
		SaveNewContactHint: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u043C\u0438 \u0434\u0430\u043D\u043D\u044B\u043C\u0438",
		UpdateContactHint: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432\u0441\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0432 \u043F\u0440\u043E\u0444\u0438\u043B\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430",
		AccountCaption: "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442",
		AdditionalDataEnrichmentCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "ContactEnrichmentSchema",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		RefreshIcon: {
			source: 3,
			params: {
				schemaName: "ContactEnrichmentSchema",
				resourceItemName: "RefreshIcon",
				hash: "b6db25ca695ff69f5e479a3e2c967918",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});