define("PreconfiguredPageUserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WhatPageToOpenLabelCaption: "\u041A\u0430\u043A\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u043E\u0442\u043A\u0440\u044B\u0442\u044C?",
		ToWhomOpenPageLabelCaption: "\u041A\u043E\u043C\u0443 \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443?",
		RecommendationCaption: "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F \u043F\u043E \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
		InformationOnStepCaption: "\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E",
		WhichRecordToConnectThePageToLabelCaption: "\u041A \u043A\u0430\u043A\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443?",
		OwnerCaption: "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439",
		EntitySchemaCaption: "\u041E\u0431\u044A\u0435\u043A\u0442 \u043F\u0440\u0438\u0432\u044F\u0437\u043A\u0438",
		EntityCaption: "\u0417\u0430\u043F\u0438\u0441\u044C \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u043F\u0440\u0438\u0432\u044F\u0437\u043A\u0438",
		PageParametersLabelCaption: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
		PageHasNoParametersLabelCaption: "\u0414\u043B\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043D\u0435 \u0437\u0430\u0434\u0430\u043D\u044B \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B",
		ChangeSchemaWarningMessage: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0441\u0445\u0435\u043C\u0443 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B? \u0412\u0441\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0431\u0443\u0434\u0443\u0442 \u043F\u043E\u0442\u0435\u0440\u044F\u043D\u044B.",
		ProcessInformationText: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u0442 \u043B\u044E\u0431\u0443\u044E \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0434\u043B\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F, \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u0433\u043E \u0432 \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u0430\u0445 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430.\n\n\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u044D\u0442\u043E\u0442 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0434\u043B\u044F \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u043D\u0435\u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0445 \u0441\u0442\u0440\u0430\u043D\u0438\u0446, \u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0445 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 [\u041A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u044F].\n\n\u0414\u043B\u044F \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0445 \u0441\u0442\u0440\u0430\u043D\u0438\u0446 \u0440\u0430\u0437\u0434\u0435\u043B\u043E\u0432 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u044D\u043B\u0435\u043C\u0435\u043D\u0442 [\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F]. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022PreconfiguredPageUserTaskPropertiesPage\u0022\u003E\u041F\u0435\u0440\u0435\u0439\u0442\u0438...\u003C\/a\u003E",
		OpenSchemaButtonHintCaption: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0434\u0438\u0437\u0430\u0439\u043D\u0435\u0440 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
		AddSchemaButtonHintCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "PreconfiguredPageUserTaskPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "PreconfiguredPageUserTaskPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "PreconfiguredPageUserTaskPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "PreconfiguredPageUserTaskPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "PreconfiguredPageUserTaskPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "PreconfiguredPageUserTaskPropertiesPage",
				resourceItemName: "ParameterEditToolsButtonImage",
				hash: "df03c3177a972b7f3b6987430f988ca3",
				resourceItemExtension: ".svg"
			}
		},
		ImageListSchemaItem1: {
			source: 3,
			params: {
				schemaName: "PreconfiguredPageUserTaskPropertiesPage",
				resourceItemName: "ImageListSchemaItem1"
			}
		},
		AddButtonImage32: {
			source: 3,
			params: {
				schemaName: "PreconfiguredPageUserTaskPropertiesPage",
				resourceItemName: "AddButtonImage32",
				hash: "d30933184bec2d3279aaeda342cc0943",
				resourceItemExtension: ".svg"
			}
		},
		OpenButtonImage: {
			source: 3,
			params: {
				schemaName: "PreconfiguredPageUserTaskPropertiesPage",
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