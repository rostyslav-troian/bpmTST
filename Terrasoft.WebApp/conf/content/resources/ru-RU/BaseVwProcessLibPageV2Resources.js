define("BaseVwProcessLibPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ShowExtendedPropertiesActionCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430",
		ShouldActivateProcessMessage: "\u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u043D\u0435 \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D. \u0410\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441?",
		RunProcessActionCaption: "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441",
		CancelRunningProcessesActionCaption: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043D\u044B\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B",
		CancelRunningProcessesConfirmationMessage: "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432 \u0431\u0443\u0434\u0435\u0442 \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u043E. \u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0430\u043F\u0443\u0449\u0435\u043D\u043D\u044B\u0445 {0}. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C?",
		RunningProcessesTabCaption: "\u0417\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430",
		AddToRunButtonCaption: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0432 \u0433\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u043E\u0439 \u043A\u043D\u043E\u043F\u043A\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430",
		OpenInDesignerButtonCaption: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0432 \u0434\u0438\u0437\u0430\u0439\u043D\u0435\u0440\u0435",
		VersionsTabCaption: "\u0412\u0435\u0440\u0441\u0438\u0438 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430",
		SubProcessTabCaption: "\u041F\u043E\u0434\u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B",
		SubProcessDetailCaption: "\u041F\u043E\u0434\u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B",
		SubProcessInProcessDetailCaption: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u043A\u0430\u043A \u043F\u043E\u0434\u043F\u0440\u043E\u0446\u0435\u0441\u0441 \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430\u0445",
		ProcessInDetailsDetailCaption: "\u0417\u0430\u043F\u0443\u0441\u043A \u0438\u0437 \u0434\u0435\u0442\u0430\u043B\u0435\u0439",
		ProcessInModulesDetailCaption: "\u0417\u0430\u043F\u0443\u0441\u043A \u0438\u0437 \u0440\u0430\u0437\u0434\u0435\u043B\u043E\u0432",
		ProcessPropertiesDisableProcess: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441",
		ProcessPropertiesEnableProcess: "\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u043C",
		ProcessStartEventCaption: "\u0417\u0430\u043F\u0443\u0441\u043A \u043F\u043E \u0441\u0438\u0433\u043D\u0430\u043B\u0430\u043C",
		IsTracingCaption: "\u0412\u043A\u043B\u044E\u0447\u0435\u043D\u0430 \u0442\u0440\u0430\u0441\u0441\u0438\u0440\u043E\u0432\u043A\u0430",
		TracingInitException: "\u041F\u0440\u0438 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0432\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443",
		TracingSaveException: "\u041F\u0440\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0438 \u0437\u0430\u043F\u0438\u0441\u0438 \u043F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443 \u0435\u0449\u0435 \u0440\u0430\u0437",
		IsTracingInfo: "\u041F\u0440\u0438 \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0438 \u0442\u0440\u0430\u0441\u0441\u0438\u0440\u043E\u0432\u043A\u0438 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u043C\u043E\u0436\u0435\u0442 \u0437\u0430\u043C\u0435\u0434\u043B\u044F\u0442\u044C\u0441\u044F \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "BaseVwProcessLibPageV2",
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