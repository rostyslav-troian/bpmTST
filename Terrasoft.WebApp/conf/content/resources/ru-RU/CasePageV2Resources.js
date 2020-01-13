define("CasePageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "\u0414\u0435\u0442\u0430\u043B\u0438",
		SubjectCaption: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",
		ContactCaption: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442",
		RightContainerTabCaption: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",
		CaseProfileControlGroupCaption: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",
		FeedbackGroupCaption: "\u041E\u0442\u0437\u044B\u0432",
		ContactTabCaption: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442",
		ProcessingTabCaption: "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430",
		HistoryTabCaption: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F",
		ParametersTabCaption: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B",
		FilesTabCaption: "\u0424\u0430\u0439\u043B\u044B",
		ActualDateGroupCaption: "\u0414\u0430\u0442\u0430, \u0444\u0430\u043A\u0442",
		CreatedOnCaption: "\u0421\u043E\u0437\u0434\u0430\u043D\u043E:",
		OriginCaption: "\u041F\u0440\u043E\u0438\u0441\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435",
		PriorityCaption: "\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442",
		CategoryCaption: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
		AccountTabCaption: "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442",
		OpenCasesControlGroupCaption: "\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F",
		LeftHeaderCaptionSuffix: "\u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C:",
		DelayHeaderCaptionSuffix: "\u0417\u0430\u0434\u0435\u0440\u0436\u043A\u0430:",
		DaysCaptionSuffix: "\u0434.",
		HoursCaptionSuffix: "\u0447.",
		MinutesCaptionSuffix: "\u043C.",
		RequiredContactOrAccountMessage: "\u041F\u043E\u043B\u044F \u0022\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0022 \u0438\u043B\u0438 \u0022\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u0022 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B \u0434\u043B\u044F \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F",
		ResolvedButtonCaption: "Resolved",
		AssignToMeCaption: "\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043C\u043D\u0435",
		EmailTitleCaption: "\u041E\u0442\u0432\u0435\u0442 \u043D\u0430 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435 {0} {1}",
		MessageHistoryGroupCaption: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F",
		ShowSystemMessagesString: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F",
		HideSystemMessagesString: "\u0421\u043A\u0440\u044B\u0442\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "CasePageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		CallButtonImage: {
			source: 3,
			params: {
				schemaName: "CasePageV2",
				resourceItemName: "CallButtonImage",
				hash: "46cfb78a5bd416ce5661b64c2b441c39",
				resourceItemExtension: ".png"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "CasePageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "CasePageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "CasePageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "CasePageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "CasePageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "CasePageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "CasePageV2",
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