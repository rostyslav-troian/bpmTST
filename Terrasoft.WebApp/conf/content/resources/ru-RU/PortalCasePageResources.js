define("PortalCasePageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		HeaderCaption: "\u041E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435",
		ProcessingTabCaption: "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430",
		PublishButtonHint: "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435, \u0442\u0430\u043A \u043A\u0430\u043A \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0440\u044B\u0442\u043E",
		DaysCaptionSuffix: "\u0434",
		ServiceRequestSubjectTemplate: "{0} \u043D\u0430 {1}",
		IncidentSubjectTemplate: "{0} \u043F\u043E {1}",
		HeaderTemplate: "\u041E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435 \u2116{0}: {1}",
		DefaultHeader: "\u041E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435",
		MessageHistoryGroupCaption: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F",
		CategoryIsEmptyMessageToUser: "\u041F\u043E\u043B\u0435 \u0022\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F\u0022: \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435",
		ServiceIsEmptyMessageToUser: "\u041F\u043E\u043B\u0435 \u0022\u0421\u0435\u0440\u0432\u0438\u0441\u0022: \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435",
		NeedTimeZoneSetUpMessage: "\u0414\u043B\u044F \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0430\u0448 \u0427\u0430\u0441\u043E\u0432\u043E\u0439 \u043F\u043E\u044F\u0441",
		SetButtonCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C",
		CloseButtonCaption: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
		FeedbackGroupCaption: "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C",
		SatisfactionLevelTip: "\u0427\u0442\u043E\u0431\u044B \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043E\u0446\u0435\u043D\u043A\u0443 \u0443 \u0432\u0430\u0441 \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u044E \u00AB\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u044F\u0442\u044C \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0443\u0434\u043E\u0432\u043B\u0435\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u043F\u043E \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044E\u00BB",
		SatisfactionLevelCommentTip: "\u0427\u0442\u043E\u0431\u044B \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043F\u043E \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044E \u0443 \u0432\u0430\u0441 \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u044E \u00AB\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u044F\u0442\u044C \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0443\u0434\u043E\u0432\u043B\u0435\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u043F\u043E \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044E\u00BB",
		ComplainButtonCaption: "\u041F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C\u0441\u044F",
		CancelCaseActionCaption: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435",
		CloseCaseActionCaption: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435",
		ReopenCaseActionCaption: "\u041F\u0435\u0440\u0435\u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "PortalCasePage",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		Complain: {
			source: 3,
			params: {
				schemaName: "PortalCasePage",
				resourceItemName: "Complain",
				hash: "0644893dc259fe124119e2a49e46e61a",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "PortalCasePage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "PortalCasePage",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "PortalCasePage",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "PortalCasePage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "PortalCasePage",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "PortalCasePage",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "PortalCasePage",
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