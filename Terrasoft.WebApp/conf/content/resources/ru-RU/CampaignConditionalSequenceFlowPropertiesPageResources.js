define("CampaignConditionalSequenceFlowPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProcessInformationText: "\u041F\u0435\u0440\u0435\u0445\u043E\u0434 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430 \u043D\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0448\u0430\u0433 \u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0438\u0442\u0441\u044F \u043A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u043D\u0435\u0433\u043E \u0431\u0443\u0434\u0443\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u044B \u0432\u0441\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F, \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0435 \u0432 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0435. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022CampaignConditionalSequenceFlow\u0022 target=\u0022_blank\u0022\u003E\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0435\u0435...\u003C\/a\u003E",
		SequenceModeDefault: "\u041D\u0435\u0442, \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0441\u0440\u0430\u0437\u0443 \u043F\u043E\u0441\u043B\u0435 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0433\u043E",
		SequenceModeTimePeriod: "\u0414\u0430, \u043D\u0430 \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0439 \u043F\u0440\u043E\u043C\u0435\u0436\u0443\u0442\u043E\u043A \u0432\u0440\u0435\u043C\u0435\u043D\u0438",
		DelayDecisionDaysNumber: "\u0414\u043D\u0438",
		DelayDecisionInterval: "\u0412 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0434\u043D\u044F",
		SequenceModeCaption: "\u041D\u0443\u0436\u043D\u0430 \u043B\u0438 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u0430 \u043F\u0435\u0440\u0435\u0434 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435\u043C \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430?",
		DelayDecisionCaption: "\u0415\u0434\u0438\u043D\u0438\u0446\u044B \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u0438",
		DaysNumberCaption: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E",
		ExecutionTimeCaption: "\u0412\u0440\u0435\u043C\u044F \u0437\u0430\u043F\u0443\u0441\u043A\u0430",
		DelayIntervalCaption: "\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u0438",
		MinutesCaption: "\u043C\u0438\u043D\u0443\u0442",
		HoursCaption: "\u0447\u0430\u0441\u043E\u0432",
		FilterModeCaption: "\u041A\u0430\u043A\u0438\u043C \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C \u0434\u043E\u043B\u0436\u043D\u044B \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430 \u043D\u0430 \u0448\u0430\u0433 {0}?",
		FilterModeDefault: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u0438 \u043D\u0435 \u043D\u0443\u0436\u043D\u044B",
		FilterModeWithFilter: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u0438",
		ActionsButtonCaption: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
		AddCondition: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0441\u043B\u043E\u0432\u0438\u0435",
		GroupMenuItemCaption: "\u0413\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		UnGroupMenuItemCaption: "\u0420\u0430\u0437\u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		MoveUpMenuItemCaption: "\u0412\u0432\u0435\u0440\u0445",
		MoveDownMenuItemCaption: "\u0412\u043D\u0438\u0437",
		ResponseModeCaption: "\u041A\u0430\u043A\u043E\u0439 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0448\u0430\u0433\u0430 {0}?",
		DelayDecisionHoursNumber: "\u0427\u0430\u0441\u044B",
		NegativeDaysNumberErrorText: "\u0414\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C",
		HasStartTimeCaption: "\u0412 \u0442\u043E\u0447\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignConditionalSequenceFlowPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignConditionalSequenceFlowPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignConditionalSequenceFlowPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignConditionalSequenceFlowPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "CampaignConditionalSequenceFlowPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignConditionalSequenceFlowPropertiesPage",
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