define("BulkEmailContentWizardResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SendTestEmailButtonCaption: "\u0422\u0435\u0441\u0442\u043E\u0432\u043E\u0435 \u043F\u0438\u0441\u044C\u043C\u043E",
		SaveButtonCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		CloseButtonCaption: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
		DesignTabCaption: "\u0414\u0438\u0437\u0430\u0439\u043D",
		HeadersTabCaption: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438",
		SelectTemplateFromLookupButtonCaption: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0438\u0437 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0430",
		SavedSuccessFullyMessage: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B",
		SavedWithErrorsMessage: "\u0428\u0430\u0431\u043B\u043E\u043D \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D \u043A\u0430\u043A \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A, \u0442\u0430\u043A \u043A\u0430\u043A \u0438\u043C\u0435\u0435\u0442 \u043E\u0448\u0438\u0431\u043A\u0438 \u0432\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u0438",
		PreviewTabCaption: "\u041F\u0440\u0435\u0434\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440",
		ActionsButtonCaption: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F"
	};
	var localizableImages = {
		CloseButton: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentWizard",
				resourceItemName: "CloseButton",
				hash: "b3a6d35ce6052e61c72a6a0dd5285b51",
				resourceItemExtension: ".svg"
			}
		},
		NotificationError: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentWizard",
				resourceItemName: "NotificationError",
				hash: "ad71c54f24782c5c7d66c61f7bce4d14",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});