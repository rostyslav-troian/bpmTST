define("DCTemplateViewerSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		InsertTemplateFromLookupMenuItemCaption: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0438\u0437 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0430",
		EditTemplateCaption: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		TemplateBlankSlateCaption: "\u0417\u0434\u0435\u0441\u044C \u0431\u0443\u0434\u0435\u0442 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D \u0448\u0430\u0431\u043B\u043E\u043D, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0431\u0443\u0434\u0435\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u0438\u0437 \u044D\u0442\u043E\u0439 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0441\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u0448\u0430\u0431\u043B\u043E\u043D \u043F\u0435\u0440\u0435\u0439\u0434\u044F \u0432 \u0434\u0438\u0437\u0430\u0439\u043D\u0435\u0440 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430",
		LinkSelectTemplate: "\u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439",
		LinkCreateTemplate: "\u043D\u043E\u0432\u044B\u0439 \u0448\u0430\u0431\u043B\u043E\u043D",
		SendTestEmailCaption: "\u0422\u0435\u0441\u0442\u043E\u0432\u043E\u0435 \u043F\u0438\u0441\u044C\u043C\u043E"
	};
	var localizableImages = {
		ToggleListButtonImage: {
			source: 3,
			params: {
				schemaName: "DCTemplateViewerSchema",
				resourceItemName: "ToggleListButtonImage",
				hash: "7bc3932d679a675779c0a19c7b0e2dca",
				resourceItemExtension: ".svg"
			}
		},
		TemplateBlankSlateImage: {
			source: 3,
			params: {
				schemaName: "DCTemplateViewerSchema",
				resourceItemName: "TemplateBlankSlateImage",
				hash: "25e896cdece5a8acfc34cc4ee540b441",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});