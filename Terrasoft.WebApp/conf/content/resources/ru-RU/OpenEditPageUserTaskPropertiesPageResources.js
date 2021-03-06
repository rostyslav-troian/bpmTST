﻿define("OpenEditPageUserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		RecommendationCaption: "\u041A\u0430\u043A\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u043E\u0442\u043A\u0440\u044B\u0442\u044C?",
		ProcessInformationText: "\u041E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0434\u043B\u044F \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u043D\u043E\u0432\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u043B\u0438\u0431\u043E \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438.\n\n\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u044D\u0442\u043E\u0442 \u044D\u043B\u0435\u043C\u0435\u043D\u0442, \u0435\u0441\u043B\u0438 \u0432\u0432\u043E\u0434 \u0434\u0430\u043D\u043D\u044B\u0445 \u043F\u0440\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0438 \u043D\u043E\u0432\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u0438\u043B\u0438 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0435\u0439 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0442\u044C \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E.\n\n\u0414\u043B\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0438 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B [\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445] \u0438 [\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445], \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022OpenEditPageUserTaskPropertiesPage\u0022\u003E\u041F\u0435\u0440\u0435\u0439\u0442\u0438...\u003C\/a\u003E",
		EditModeCaption: "\u0420\u0435\u0436\u0438\u043C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F",
		AddNewRecordCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C",
		EditExistingRecordCaption: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C",
		ChangePageSchemaWarningMessage: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u043C\u0435\u043D\u044F\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443? \u0412\u0441\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u0435\u0439 \u0438 \u0444\u0438\u043B\u044C\u0442\u0440\u044B \u0431\u0443\u0434\u0443\u0442 \u043F\u043E\u0442\u0435\u0440\u044F\u043D\u044B.",
		ChangPageSchemaeButtonCaption: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",
		RecommendationForFillPageCaption: "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 \u043F\u043E \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
		WhoFillPageLabelCaption: "\u041A\u0442\u043E \u0437\u0430\u043F\u043E\u043B\u043D\u044F\u0435\u0442 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443?",
		HowElementPerformedLabelCaption: "\u0421\u043F\u0438\u0441\u043E\u043A \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439 \u043A\u043E\u043B\u043E\u043D\u043A\u0438 \u0432\u044B \u0441\u043C\u043E\u0436\u0435\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0434\u043B\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0432\u0435\u0442\u0432\u043B\u0435\u043D\u0438\u044F \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u0443\u0441\u043B\u043E\u0432\u043D\u044B\u0445 \u043F\u043E\u0442\u043E\u043A\u043E\u0432.",
		RecordIdCaption: "\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u043F\u0438\u0441\u0438",
		DefaultValuesLabelCaption: "\u041A\u0430\u043A \u043F\u0440\u0435\u0434\u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043F\u043E\u043B\u044F \u043D\u043E\u0432\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438?",
		GenerateDecisionsFromColumnCaption: "\u0424\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043F\u043E \u043A\u043E\u043B\u043E\u043D\u043A\u0435",
		DecisionalColumnMetaPathCaption: "\u041A\u043E\u043B\u043E\u043D\u043A\u0430",
		ConsiderElementExecutedCaption: "\u041A\u043E\u0433\u0434\u0430 \u0441\u0447\u0438\u0442\u0430\u0442\u044C \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u044B\u043C?",
		ExecutedAfterRecordSavedCaption: "\u0421\u0440\u0430\u0437\u0443 \u043F\u043E\u0441\u043B\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u043F\u0438\u0441\u0438",
		ExecutedIfMatchConditionsCaption: "\u0415\u0441\u043B\u0438 \u0437\u0430\u043F\u0438\u0441\u044C \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0443\u0441\u043B\u043E\u0432\u0438\u044E",
		FilterInformationText: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u0438 \u043D\u0435 \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C\u0438",
		FilterInvalidMessage: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u0438 \u043D\u0435 \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C\u0438",
		RecordIdInvalidMessage: "\u041D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u043F\u043E\u043B\u0435 \u0022\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0442\u043E\u0440 \u0437\u0430\u043F\u0438\u0441\u0438\u0022"
	};
	var localizableImages = {
		TaskParameters: {
			source: 3,
			params: {
				schemaName: "OpenEditPageUserTaskPropertiesPage",
				resourceItemName: "TaskParameters",
				hash: "19d7d306baa80e789137978ca4233569",
				resourceItemExtension: ".png"
			}
		},
		TaskParameterssSelected: {
			source: 3,
			params: {
				schemaName: "OpenEditPageUserTaskPropertiesPage",
				resourceItemName: "TaskParameterssSelected",
				hash: "19d7d306baa80e789137978ca4233569",
				resourceItemExtension: ".png"
			}
		},
		Main: {
			source: 3,
			params: {
				schemaName: "OpenEditPageUserTaskPropertiesPage",
				resourceItemName: "Main",
				hash: "a725a4237d24f3d9d5343be3d6717477",
				resourceItemExtension: ".png"
			}
		},
		MainSelected: {
			source: 3,
			params: {
				schemaName: "OpenEditPageUserTaskPropertiesPage",
				resourceItemName: "MainSelected",
				hash: "a725a4237d24f3d9d5343be3d6717477",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "OpenEditPageUserTaskPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "OpenEditPageUserTaskPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "OpenEditPageUserTaskPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "OpenEditPageUserTaskPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "OpenEditPageUserTaskPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "OpenEditPageUserTaskPropertiesPage",
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