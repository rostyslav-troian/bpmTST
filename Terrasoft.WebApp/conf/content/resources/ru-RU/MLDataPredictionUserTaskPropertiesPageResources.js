define("MLDataPredictionUserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MLModelCaption: "\u041C\u043E\u0434\u0435\u043B\u044C \u043C\u0430\u0448\u0438\u043D\u043D\u043E\u0433\u043E \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F",
		DataPredictModeCaption: "\u041A\u0430\u043A\u043E\u0439 \u0440\u0435\u0436\u0438\u043C \u043F\u0440\u043E\u0433\u043D\u043E\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C?",
		ProcessInformationText: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0434\u043B\u044F \u043F\u0440\u043E\u0433\u043D\u043E\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445. \u0427\u0442\u043E\u0431\u044B \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u043D\u043E\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435, \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 [\u041C\u043E\u0434\u0435\u043B\u0438 \u043C\u0430\u0448\u0438\u043D\u043D\u043E\u0433\u043E \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u044F] \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u0430 \u0438 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0431\u0443\u0447\u0435\u043D\u0430 \u043C\u043E\u0434\u0435\u043B\u044C. \u003Ca href=\u0022#\u0022 data-context-help-id=\u00227150\u0022\u003ERead more...\u003C\/a\u003E",
		EntityRecordCaption: "\u041F\u043E \u043A\u0430\u043A\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u043D\u043E\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435?",
		PredictSingleItemCaption: "\u041F\u0440\u043E\u0433\u043D\u043E\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0434\u043B\u044F \u043E\u0434\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438",
		PredictCollectionCaption: "\u041F\u0440\u043E\u0433\u043D\u043E\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0434\u043B\u044F \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u0438 \u0437\u0430\u043F\u0438\u0441\u0435\u0439",
		PredictFilterDataCaption: "\u041F\u043E \u043A\u0430\u043A\u0438\u043C \u0437\u0430\u043F\u0438\u0441\u044F\u043C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u043D\u043E\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435?"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "MLDataPredictionUserTaskPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "MLDataPredictionUserTaskPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "MLDataPredictionUserTaskPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "MLDataPredictionUserTaskPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "MLDataPredictionUserTaskPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "MLDataPredictionUserTaskPropertiesPage",
				resourceItemName: "ParameterEditToolsButtonImage",
				hash: "df03c3177a972b7f3b6987430f988ca3",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});