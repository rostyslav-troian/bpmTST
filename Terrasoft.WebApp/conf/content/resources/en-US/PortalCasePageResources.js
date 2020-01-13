define("PortalCasePageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		HeaderCaption: "Case",
		ProcessingTabCaption: "Processing",
		PublishButtonHint: "You can not leave a message because the case is closed",
		DaysCaptionSuffix: "d",
		ServiceRequestSubjectTemplate: "{0} by {1}",
		IncidentSubjectTemplate: "{0} by {1}",
		HeaderTemplate: "Case #{0}: {1}",
		DefaultHeader: "Case",
		MessageHistoryGroupCaption: "History",
		CategoryIsEmptyMessageToUser: "Field \u0022Category\u0022: Enter a value",
		ServiceIsEmptyMessageToUser: "Field \u0022Service\u0022: Enter a value",
		NeedTimeZoneSetUpMessage: "To register a case you need to set Time zone",
		SetButtonCaption: "Set",
		CloseButtonCaption: "Close",
		FeedbackGroupCaption: "Feedback",
		SatisfactionLevelTip: "In order to change satisfaction level you need to have rights on operation \u201CAbility to change case satisfaction level\u201D",
		SatisfactionLevelCommentTip: "In order to change feedback you need to have rights on operation \u201CAbility to change case satisfaction level\u201D",
		ComplainButtonCaption: "Complain",
		CancelCaseActionCaption: "Cancel case",
		CloseCaseActionCaption: "Close case",
		ReopenCaseActionCaption: "Reopen case"
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