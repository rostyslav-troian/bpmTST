define("EventPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",
		EventTypeCaption: "\u0422\u0438\u043F",
		OwnerCaption: "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439",
		EventStatusCaption: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435",
		groupCaption: "",
		StartDateCaption: "\u041D\u0430\u0447\u0430\u043B\u043E",
		EndDateCaption: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u0435",
		GoalCaption: "\u0426\u0435\u043B\u044C",
		TerritoryCaption: "\u0422\u0435\u0440\u0440\u0438\u0442\u043E\u0440\u0438\u044F",
		IndustryCaption: "\u041E\u0442\u0440\u0430\u0441\u043B\u044C",
		ActualResponseCaption: "\u0424\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043E\u0442\u043A\u043B\u0438\u043A",
		group1Caption: "\u0424\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0438",
		PrimaryBudgetedCostCaption: "\u041F\u043B\u0430\u043D\u043E\u0432\u044B\u0439 \u0431\u044E\u0434\u0436\u0435\u0442, \u0431.\u0432.",
		PrimaryExpectedRevenueCaption: "\u041F\u043B\u0430\u043D \u043F\u0440\u043E\u0434\u0430\u0436, \u0431.\u0432.",
		PrimaryActualCostCaption: "\u0424\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0437\u0430\u0442\u0440\u0430\u0442\u044B, \u0431.\u0432.",
		PrimaryActualRevenueCaption: "\u0424\u0430\u043A\u0442 \u043F\u0440\u043E\u0434\u0430\u0436, \u0431.\u0432.",
		EventPage3TabCaption: "\u0410\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F",
		EventPage4TabCaption: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F",
		EventPage5TabCaption: "\u0424\u0430\u0439\u043B\u044B \u0438 \u043F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u044F",
		WarningWrongDate: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0435, \u0442\u0430\u043A \u043A\u0430\u043A \u0434\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430 \u043C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0434\u0430\u0442\u044B \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F.",
		ContactListCaption: "\u0421\u043F\u0438\u0441\u043E\u043A \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432",
		LastUpdateDateCaption: "\u0412\u0440\u0435\u043C\u044F \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F",
		ContactCountCaption: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432",
		UpdateContactListCaption: "\u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "EventPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "EventPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "EventPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "EventPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "EventPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "EventPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "EventPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "EventPageV2",
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