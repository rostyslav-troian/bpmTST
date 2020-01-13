define("ProcessSettingsPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ModalBoxCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u0431\u0438\u0437\u043D\u0435\u0441-\u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430",
		SaveButtonCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		ProcessSelectionLabel: "\u041A\u0430\u043A\u043E\u0439 \u043F\u0440\u043E\u0446\u0435\u0441\u0441 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0442\u044C?",
		ParameterSelectionLabel: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430, \u0432 \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u0435\u0440\u0435\u0434\u0430\u0435\u0442\u0441\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C",
		RunByRecordCaption: "\u0414\u043B\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438",
		RunWithoutRecordCaption: "\u041D\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E \u043E\u0442 \u0437\u0430\u043F\u0438\u0441\u0438",
		ParameterRecordPlaceholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440",
		ParameterRecordNotFoundPlaceholder: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B",
		AddProcessButtonHintCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0446\u0435\u0441\u0441",
		OpenProcessButtonHintCaption: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0434\u0438\u0437\u0430\u0439\u043D\u0435\u0440 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "ProcessSettingsPage",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessSettingsPage",
				resourceItemName: "AddButtonImage",
				hash: "d30933184bec2d3279aaeda342cc0943",
				resourceItemExtension: ".svg"
			}
		},
		OpenButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessSettingsPage",
				resourceItemName: "OpenButtonImage",
				hash: "aea471c866f7ef37845aa83431c9f2d8",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});