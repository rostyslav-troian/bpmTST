﻿define("BaseProjectPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",
		LinksControlGroupCaption: "\u0421\u0432\u044F\u0437\u0438",
		StructureTabCaption: "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430",
		MinuteMask: "{0} \u043C\u0438\u043D.",
		HourMask: "{0} \u0447.",
		StartDateGreaterDueDate: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u041D\u0430\u0447\u0430\u043B\u043E \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u044F \u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u0435",
		BindToSelfWarningMessage: "\u041D\u0435\u043B\u044C\u0437\u044F \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u043A \u0441\u0430\u043C\u043E\u043C\u0443 \u0441\u0435\u0431\u0435.",
		HistoryTabCaption: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F",
		DurationByMask: "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
		EndDateLessStartDate: "\u0414\u0430\u0442\u0430 \u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C \u0434\u0430\u0442\u0443 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F",
		ContactAccountRequire: "\u0417\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u043E\u0434\u043D\u043E\u0433\u043E \u0438\u0437 \u043F\u043E\u043B\u0435\u0439 \u0022\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u0022 \u0438\u043B\u0438 \u0022\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0022 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C",
		ActualCompletionTip: "\u0424\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u0440\u043E\u0446\u0435\u043D\u0442 \u0433\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u043D\u0430 \u0434\u0430\u043D\u043D\u044B\u0439 \u043C\u043E\u043C\u0435\u043D\u0442. \u0415\u0441\u043B\u0438 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \u043F\u0440\u0438\u0437\u043D\u0430\u043A [\u0420\u0430\u0441\u0441\u0447\u0438\u0442\u044B\u0432\u0430\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438], \u0442\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u0434\u043B\u044F \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0438 \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u0438 \u0434\u0435\u0442\u0430\u043B\u0438 [\u041B\u0438\u0441\u0442 \u0440\u0435\u0441\u0443\u0440\u0441\u043E\u0432]. \u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435, \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u043D\u043D\u043E\u0435 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438, \u0440\u0430\u0432\u043D\u043E \u043F\u0440\u043E\u0446\u0435\u043D\u0442\u043D\u043E\u043C\u0443 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044E \u0441\u0443\u043C\u043C\u0430\u0440\u043D\u044B\u0445 \u0444\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u0442\u0440\u0443\u0434\u043E\u0437\u0430\u0442\u0440\u0430\u0442 \u043A \u0441\u0443\u043C\u043C\u0430\u0440\u043D\u044B\u043C \u043F\u043B\u0430\u043D\u043E\u0432\u044B\u043C \u0442\u0440\u0443\u0434\u043E\u0437\u0430\u0442\u0440\u0430\u0442\u0430\u043C",
		OwnerTip: "\u0424\u0418\u041E \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430. \u0412\u044B\u0431\u043E\u0440 \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432, \u043F\u043E \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u044B"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "BaseProjectPageV2",
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