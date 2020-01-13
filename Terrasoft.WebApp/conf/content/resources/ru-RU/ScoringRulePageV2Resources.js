define("ScoringRulePageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DurationValidationErrorMessage: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0022\u0412\u0440\u0435\u043C\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F\u0022 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 0",
		ScoringCountValidationErrorMessage: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0022\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0439\u0022 \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 0",
		ConditionsGroupCaption: "\u0423\u0441\u043B\u043E\u0432\u0438\u0435 \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0431\u0430\u043B\u043B\u0430",
		ScoringCountGroupCaption: "\u041A\u0430\u043A\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0440\u0430\u0437 \u043D\u0430\u0447\u0438\u0441\u043B\u044F\u0442\u044C?",
		PointsGroupCaption: "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0431\u0430\u043B\u043B\u043E\u0432 \u043D\u0430\u0447\u0438\u0441\u043B\u044F\u0442\u044C?",
		DurationGroupCaption: "\u041A\u0430\u043A \u0434\u043E\u043B\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u0431\u0430\u043B\u043B?",
		DurationInfiniteCaption: "\u0412\u0441\u0435\u0433\u0434\u0430",
		DurationLimitToCaption: "\u0434\u043D\u0435\u0439",
		ScoringCountInfiniteCaption: "\u041A\u0430\u0436\u0434\u044B\u0439 \u0440\u0430\u0437",
		ScoringCountLimitToCaption: "\u041A\u0430\u0436\u0434\u044B\u0439 \u0440\u0430\u0437, \u043D\u043E \u043D\u0435 \u0431\u043E\u043B\u0435\u0435",
		ScoringCountLimitToCaption2: "\u0440\u0430\u0437",
		PointsCaption: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0431\u0430\u043B\u043B\u043E\u0432"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "ScoringRulePageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ScoringRulePageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "ScoringRulePageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "ScoringRulePageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "ScoringRulePageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "ScoringRulePageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "ScoringRulePageV2",
				resourceItemName: "OpenChangeLogBtnImage",
				hash: "cbebcb32589828e1055caf62150ff717",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});