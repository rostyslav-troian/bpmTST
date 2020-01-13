define("CompletenessPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CompletenessPageCaption: "{0}: \u043F\u043E\u043B\u043D\u043E\u0442\u0430 \u043D\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u043C\u0438",
		ConfirmSaveMessage: "\u041F\u043E\u0441\u043B\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0431\u0443\u0434\u0435\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D \u043F\u0435\u0440\u0435\u0440\u0430\u0441\u0447\u0435\u0442 \u043F\u043E\u043B\u043D\u043E\u0442\u044B \u043D\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u043C\u0438 \u043F\u043E \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u043C \u0437\u0430\u043F\u0438\u0441\u044F\u043C. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C?",
		TotalPercentageNotCorrectMessage: "\u041E\u0431\u0449\u0438\u0439 \u043F\u0440\u043E\u0446\u0435\u043D\u0442 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u043D\u0435 \u0440\u0430\u0432\u0435\u043D 100%. \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0443",
		ScaleCaption: "\u0428\u043A\u0430\u043B\u0430",
		ScaleWarning: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0448\u043A\u0430\u043B\u044B",
		ScaleBoundMoreLessWarning: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435 {0}",
		ScaleBoundMoreGreaterWarning: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0447\u0435\u043C {0}",
		ScaleBoundMoreLessZeroMessage: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435 0"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "f2077670f82cc27d32bfc24e727e430c",
				resourceItemExtension: ".png"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		ScaleIcon: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "ScaleIcon",
				hash: "0554a8df2cd803c93a19be71bcbf842e",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "CompletenessPageV2",
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