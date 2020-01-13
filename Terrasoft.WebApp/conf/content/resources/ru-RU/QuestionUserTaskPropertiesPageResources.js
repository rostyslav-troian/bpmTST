define("QuestionUserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		RecommendationCaption: "\u041A\u0430\u043A\u043E\u0439 \u0432\u043E\u043F\u0440\u043E\u0441 \u0443\u0432\u0438\u0434\u0438\u0442 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C?",
		QuestionCaption: "\u0412\u043E\u043F\u0440\u043E\u0441",
		ProcessInformationText: "\u041F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u0442 \u0434\u0438\u0430\u043B\u043E\u0433\u043E\u0432\u043E\u0435 \u043E\u043A\u043D\u043E, \u0432 \u043A\u043E\u0442\u043E\u0440\u043E\u043C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043C\u043E\u0436\u0435\u0442 \u043E\u0442\u0432\u0435\u0442\u0438\u0442\u044C \u043D\u0430 \u0437\u0430\u0434\u0430\u043D\u043D\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441, \u0432\u044B\u0431\u0440\u0430\u0432 \u043E\u0434\u0438\u043D \u0438\u043B\u0438 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432. \u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u043E\u0442\u0432\u0435\u0442\u0430 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u044E\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442, \u0441 \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0441\u044F \u044D\u043B\u0435\u043C\u0435\u043D\u0442, \u0438 \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u044B \u0434\u043B\u044F \u0432\u0435\u0442\u0432\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430.\n\n\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0432 \u0442\u0435\u0445 \u0441\u043B\u0443\u0447\u0430\u044F\u0445, \u043A\u043E\u0433\u0434\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441\u0430\u043C \u0434\u043E\u043B\u0436\u0435\u043D \u0432\u044B\u0431\u0440\u0430\u0442\u044C, \u043F\u043E \u043A\u0430\u043A\u043E\u043C\u0443 \u043F\u0443\u0442\u0438 \u0431\u0443\u0434\u0435\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0442\u044C\u0441\u044F \u043F\u0440\u043E\u0446\u0435\u0441\u0441. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022QuestionUserTaskPropertiesPage\u0022\u003E\u041F\u0435\u0440\u0435\u0439\u0442\u0438...\u003C\/a\u003E\n",
		ResponseModeCaption: "\u041A\u0430\u043A\u043E\u0439 \u0440\u0435\u0436\u0438\u043C \u043E\u0442\u0432\u0435\u0442\u0430 \u0443 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F?",
		QuestionsLabelCaption: "\u0412\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u043E\u0442\u0432\u0435\u0442\u043E\u0432",
		WhoAnswerCaption: "\u041A\u0442\u043E \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442 \u043D\u0430 \u0432\u043E\u043F\u0440\u043E\u0441?",
		IsDecisionRequiredCaption: "\u041E\u0442\u0432\u0435\u0442 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439",
		DecisionModeSingle: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u043E\u0434\u0438\u043D \u0432\u0430\u0440\u0438\u0430\u043D\u0442",
		DecisionModeMulti: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432",
		SetDefCheckedCaption: "\u041E\u0442\u0432\u0435\u0442 \u0432\u044B\u0431\u0440\u0430\u043D \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E",
		MoveDownCaption: "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u043D\u0438\u0437",
		MoveUpCaption: "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u0432\u0435\u0440\u0445",
		DeleteCaption: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
		AddRecordButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0432\u0435\u0442",
		AnswerItemPlaceholder: "\u041E\u0442\u0432\u0435\u0442 ",
		RecordAnswerValuesInvalidMessage: "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u044B \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u043E\u0442\u0432\u0435\u0442\u043E\u0432",
		AnswerOptionsInformationText: "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u0432\u0430\u0440\u0438\u0430\u043D\u0442 \u043E\u0442\u0432\u0435\u0442\u0430",
		DefCheckedButtonHint: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "QuestionUserTaskPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		TaskParameters: {
			source: 3,
			params: {
				schemaName: "QuestionUserTaskPropertiesPage",
				resourceItemName: "TaskParameters",
				hash: "19d7d306baa80e789137978ca4233569",
				resourceItemExtension: ".png"
			}
		},
		TaskParameterssSelected: {
			source: 3,
			params: {
				schemaName: "QuestionUserTaskPropertiesPage",
				resourceItemName: "TaskParameterssSelected",
				hash: "19d7d306baa80e789137978ca4233569",
				resourceItemExtension: ".png"
			}
		},
		Main: {
			source: 3,
			params: {
				schemaName: "QuestionUserTaskPropertiesPage",
				resourceItemName: "Main",
				hash: "a725a4237d24f3d9d5343be3d6717477",
				resourceItemExtension: ".png"
			}
		},
		MainSelected: {
			source: 3,
			params: {
				schemaName: "QuestionUserTaskPropertiesPage",
				resourceItemName: "MainSelected",
				hash: "a725a4237d24f3d9d5343be3d6717477",
				resourceItemExtension: ".png"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "QuestionUserTaskPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "QuestionUserTaskPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		DefCheckedIcon: {
			source: 3,
			params: {
				schemaName: "QuestionUserTaskPropertiesPage",
				resourceItemName: "DefCheckedIcon",
				hash: "9a21d1ab5aa2a3978114388b36818369",
				resourceItemExtension: ".png"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "QuestionUserTaskPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "QuestionUserTaskPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "QuestionUserTaskPropertiesPage",
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