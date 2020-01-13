define("CampaignStartSignalPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProcessInformationText: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0430 \u0432 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044E \u043F\u0440\u0438 \u043F\u043E\u044F\u0432\u043B\u0435\u043D\u0438\u0438 \u0437\u0430\u043F\u0438\u0441\u0438, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u0443\u0434\u043E\u0432\u043B\u0435\u0442\u0432\u043E\u0440\u044F\u0435\u0442 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u0438. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022CampaignSignalElement\u0022 target=\u0022_blank\u0022\u003E\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0435\u0435\u003C\/a\u003E",
		EntityChangeTypeCaption: "\u041A\u0430\u043A\u043E\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u043F\u0440\u043E\u0438\u0437\u043E\u0439\u0442\u0438?",
		ExpectChangesCaption: "\u0422\u0440\u0438\u0433\u0433\u0435\u0440 \u0441\u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043F\u0440\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0438 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0445 \u043A\u043E\u043B\u043E\u043D\u043E\u043A:",
		FilterInformationText: "\u0424\u0438\u043B\u044C\u0442\u0440 \u043F\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u0443 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D. \u0422\u0440\u0438\u0433\u0433\u0435\u0440 \u0431\u0443\u0434\u0435\u0442 \u0441\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0442\u044C \u043F\u043E \u0432\u0441\u0435\u043C \u0437\u0430\u043F\u0438\u0441\u044F\u043C \u044D\u0442\u043E\u0433\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u0430",
		ObjectEntityCaption: "\u0414\u043E\u0431\u0430\u0432\u043B\u044F\u0442\u044C \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432 \u043F\u0440\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0438\/\u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0438 \u043E\u0431\u044A\u0435\u043A\u0442\u0430",
		EntityColumnsInformationText: "\u041A\u043E\u043B\u043E\u043D\u043A\u0438 \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u044B. \u0422\u0440\u0438\u0433\u0433\u0435\u0440 \u0431\u0443\u0434\u0435\u0442 \u0441\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0442\u044C \u043F\u0440\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0438 \u043B\u044E\u0431\u043E\u0439 \u043A\u043E\u043B\u043E\u043D\u043A\u0438"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignStartSignalPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignStartSignalPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignStartSignalPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignStartSignalPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "CampaignStartSignalPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignStartSignalPage",
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