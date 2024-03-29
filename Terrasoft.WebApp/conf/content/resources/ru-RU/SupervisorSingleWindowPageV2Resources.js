﻿define("SupervisorSingleWindowPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProcessSchemaUIdCaption: "\u041F\u0440\u043E\u0446\u0435\u0441\u0441",
		EntitySchemaUIdCaption: "\u0422\u0438\u043F \u043E\u0447\u0435\u0440\u0435\u0434\u0438",
		FillingTabCaption: "\u041D\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u043E\u0447\u0435\u0440\u0435\u0434\u0438",
		FillingParametersGroupCaption: "\u0412\u0438\u0434 \u043D\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u043E\u0447\u0435\u0440\u0435\u0434\u0438",
		UpdateQueuesTriggerError: "\u0412\u044B\u0437\u043E\u0432 \u0441\u0435\u0440\u0432\u0438\u0441\u0430 \u0434\u043B\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u0434\u0430\u043D\u0438\u044F \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0449\u0438\u043A\u0430 \u043F\u043E \u043D\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E \u043E\u0447\u0435\u0440\u0435\u0434\u0435\u0439 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043B\u0441\u044F \u043E\u0448\u0438\u0431\u043A\u043E\u0439. \u0421\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043F\u0440\u043E\u0441\u0430: {0}",
		TeamTabCaption: "\u041A\u043E\u043C\u0430\u043D\u0434\u0430",
		LookupPrefixCaption: "\u0412\u044B\u0431\u043E\u0440: ",
		QueueTypeCaption: "\u0422\u0438\u043F \u043E\u0447\u0435\u0440\u0435\u0434\u0438",
		IsAutoFillingQueueCaption: "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043F\u043E \u0444\u0438\u043B\u044C\u0442\u0440\u0443",
		IsManuallyFillingQueueCaption: "\u041D\u0430\u043F\u043E\u043B\u043D\u044F\u0442\u044C \u0432\u0440\u0443\u0447\u043D\u0443\u044E",
		InvalidParametersMessage: "\u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0022{0}\u0022 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D \u0432 \u043E\u0447\u0435\u0440\u0435\u0434\u0438. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043D\u0430\u043B\u0438\u0447\u0438\u0435 \u0438\u043B\u0438 \u0442\u0438\u043F\u044B \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430: {1}. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438",
		ExecuteCheckProcessErrorMessage: "\u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0022{0}\u0022 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D \u0432 \u043E\u0447\u0435\u0440\u0435\u0434\u0438. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438",
		ExecuteCheckProcessErrorDetailMessage: "\u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u0022{0}\u0022 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D \u0432 \u043E\u0447\u0435\u0440\u0435\u0434\u0438. \u0414\u0435\u0442\u0430\u043B\u0438 \u043E\u0448\u0438\u0431\u043A\u0438: \u0022{1}\u0022 \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435 \u0432 \u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "SupervisorSingleWindowPageV2",
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