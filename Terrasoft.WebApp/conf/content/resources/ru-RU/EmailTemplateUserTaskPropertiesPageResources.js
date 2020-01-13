define("EmailTemplateUserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProcessInformationText: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0434\u043B\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 email \u043F\u043E \u0448\u0430\u0431\u043B\u043E\u043D\u0443 \u0438\u043B\u0438 \u0434\u043B\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u043B\u044C\u043D\u043E\u0433\u043E \u043F\u0438\u0441\u044C\u043C\u0430. Email \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0438\u043B\u0438 \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022EmailTemplateUserTaskPropertiesPage\u0022\u003E\u041F\u0435\u0440\u0435\u0439\u0442\u0438...\u003C\/a\u003E",
		OwnerRegionCaption: "\u041A\u0442\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 email?",
		RecipientCaption: "\u041A\u043E\u043C\u0443",
		CopyRecipientCaption: "\u041A\u043E\u043F\u0438\u044F",
		BlindCopyRecipientCaption: "\u0421\u043A\u0440\u044B\u0442\u0430\u044F \u043A\u043E\u043F\u0438\u044F",
		TemplateMessageCaption: "\u041F\u0438\u0441\u044C\u043C\u043E \u043F\u043E \u0448\u0430\u0431\u043B\u043E\u043D\u0443",
		UserMessageCaption: "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u043B\u044C\u043D\u043E\u0435 \u043F\u0438\u0441\u044C\u043C\u043E",
		EmailTemplateCaption: "\u041F\u0438\u0441\u044C\u043C\u043E \u043F\u043E \u0448\u0430\u0431\u043B\u043E\u043D\u0443",
		EmailTemplateEntityCaption: "\u0417\u0430\u043F\u0438\u0441\u044C \u0434\u043B\u044F \u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043C\u0430\u043A\u0440\u043E\u0441\u043E\u0432",
		SubjectCaption: "\u0422\u0435\u043C\u0430",
		WhatMessageSendRegionCaption: "\u041A\u0430\u043A\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C?",
		SendEmailAutoCaption: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C email \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",
		SendEmailManualCaption: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C email \u0432\u0440\u0443\u0447\u043D\u0443\u044E",
		HowSendEmailCaption: "\u041A\u0430\u043A \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0430?",
		ImportanceCaption: "\u0412\u0430\u0436\u043D\u043E\u0441\u0442\u044C",
		SenderCaption: "\u041E\u0442 \u043A\u043E\u0433\u043E",
		RecipientRegionCaption: "\u041A\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044C \u043F\u0438\u0441\u044C\u043C\u0430?",
		IgnoreErrorsCaption: "\u0418\u0433\u043D\u043E\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u0448\u0438\u0431\u043A\u0438 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435",
		RecipientTip: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044F. \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0443\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0430\u0434\u0440\u0435\u0441\u0430 \u043B\u0438\u0431\u043E \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0442\u044C \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0434\u0438\u043D\u0430\u043C\u0438\u0447\u0435\u0441\u043A\u0438 \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u0438 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0432 \u0434\u0440\u0443\u0433\u0438\u0445 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u0445 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430.",
		FromCaption: "\u041E\u0442 \u043A\u043E\u0433\u043E",
		EmailBodyEmptyCaption: "\u0422\u0435\u043B\u043E \u043F\u0438\u0441\u044C\u043C\u0430 \u043D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E",
		EmailLinksCaption: "\u0421\u0432\u044F\u0437\u0438 email",
		EmailTemplateAcademyMessageCaption: "\u0412\u044B\u0431\u0440\u0430\u043D \u043C\u0443\u043B\u044C\u0442\u0438\u044F\u0437\u044B\u0447\u043D\u044B\u0439 \u0448\u0430\u0431\u043B\u043E\u043D. \u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435...",
		OpenTemplateButtonHint: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0448\u0430\u0431\u043B\u043E\u043D\u0430 \u043F\u0438\u0441\u044C\u043C\u0430"
	};
	var localizableImages = {
		TaskParameters: {
			source: 3,
			params: {
				schemaName: "EmailTemplateUserTaskPropertiesPage",
				resourceItemName: "TaskParameters",
				hash: "19d7d306baa80e789137978ca4233569",
				resourceItemExtension: ".png"
			}
		},
		TaskParameterssSelected: {
			source: 3,
			params: {
				schemaName: "EmailTemplateUserTaskPropertiesPage",
				resourceItemName: "TaskParameterssSelected",
				hash: "19d7d306baa80e789137978ca4233569",
				resourceItemExtension: ".png"
			}
		},
		Main: {
			source: 3,
			params: {
				schemaName: "EmailTemplateUserTaskPropertiesPage",
				resourceItemName: "Main",
				hash: "a725a4237d24f3d9d5343be3d6717477",
				resourceItemExtension: ".png"
			}
		},
		MainSelected: {
			source: 3,
			params: {
				schemaName: "EmailTemplateUserTaskPropertiesPage",
				resourceItemName: "MainSelected",
				hash: "a725a4237d24f3d9d5343be3d6717477",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailTemplateUserTaskPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailTemplateUserTaskPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailTemplateUserTaskPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailTemplateUserTaskPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "EmailTemplateUserTaskPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailTemplateUserTaskPropertiesPage",
				resourceItemName: "ParameterEditToolsButtonImage",
				hash: "df03c3177a972b7f3b6987430f988ca3",
				resourceItemExtension: ".svg"
			}
		},
		PreviewButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailTemplateUserTaskPropertiesPage",
				resourceItemName: "PreviewButtonImage",
				hash: "11b290e7937f2c99e3485f5364abf7c4",
				resourceItemExtension: ".svg"
			}
		},
		EditButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailTemplateUserTaskPropertiesPage",
				resourceItemName: "EditButtonImage",
				hash: "95072004d8d622dd7b650458b07ef96f",
				resourceItemExtension: ".svg"
			}
		},
		OpenTemplateButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailTemplateUserTaskPropertiesPage",
				resourceItemName: "OpenTemplateButtonImage",
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