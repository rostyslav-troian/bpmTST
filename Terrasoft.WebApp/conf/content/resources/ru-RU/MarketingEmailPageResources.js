﻿define("MarketingEmailPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SenderNameCaption: "\u0418\u043C\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F",
		SenderEmailCaption: "Email \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044F",
		SubjectCaption: "\u0422\u0435\u043C\u0430",
		MarketingEmailText: "\u041A\u0430\u043A\u043E\u0435 \u0442\u0440\u0438\u0433\u0433\u0435\u0440\u043D\u043E\u0435 \u043F\u0438\u0441\u044C\u043C\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C?",
		ClearOutgoingsQuestion: "\u041F\u0440\u0438 \u0432\u044B\u0431\u043E\u0440\u0435 \u0434\u0440\u0443\u0433\u043E\u0433\u043E email \u0448\u0430\u0431\u043B\u043E\u043D\u0430 \u0431\u0443\u0434\u0435\u0442 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u0443\u0441\u043B\u043E\u0432\u0438\u0435 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435 \u0432 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u0445:\n{0}.",
		ClearOutgoingsQuestionTitle: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0448\u0430\u0431\u043B\u043E\u043D\u0430?",
		HasParticipantsMessage: "\u041D\u0430 \u0434\u0430\u043D\u043D\u043E\u043C \u0448\u0430\u0433\u0435 \u043D\u0430\u0445\u043E\u0434\u044F\u0442\u0441\u044F {0} \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432, \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0448\u0430\u0431\u043B\u043E\u043D\u0430 \u043F\u0440\u0438\u0432\u0435\u0434\u0435\u0442 \u043A \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u044E \u043B\u043E\u0433\u0438\u043A\u0438 \u043E\u0442\u043A\u043B\u0438\u043A\u043E\u0432 \u0432 \u0443\u0441\u043B\u043E\u0432\u043D\u044B\u0445 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430\u0445.",
		ProcessInformationText: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0434\u043B\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 email-\u0440\u0430\u0441\u0441\u044B\u043B\u043E\u043A \u0432 \u0440\u0430\u043C\u043A\u0430\u0445 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438.  \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022CampaignMarketingEmailElement\u0022 target=\u0022_blank\u0022\u003E\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0435\u0435\u003C\/a\u003E"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "MarketingEmailPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailPage",
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