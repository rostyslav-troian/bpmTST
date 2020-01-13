﻿define("BaseOpportunityPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "\u0414\u0430\u043D\u043D\u044B\u0435 \u043E \u043F\u0440\u043E\u0434\u0430\u0436\u0435",
		Client: "\u041A\u043B\u0438\u0435\u043D\u0442",
		ClientTip: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \u0438\u043B\u0438 \u0447\u0430\u0441\u0442\u043D\u043E\u0435 \u043B\u0438\u0446\u043E, \u0441 \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u0437\u0430\u043A\u043B\u044E\u0447\u0430\u0435\u0442\u0441\u044F \u0441\u0434\u0435\u043B\u043A\u0430. \u0412 \u043F\u043E\u043B\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430 \u0437\u0430\u043F\u0438\u0441\u0438 \u0438\u0437 \u0440\u0430\u0437\u0434\u0435\u043B\u043E\u0432 [\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u044B] \u0438 [\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B]. \u003Ca href=\u0022#\u0022 data-context-help-id=\u00221571\u0022 \u003E\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435\u2026\u003C\/a\u003E",
		DecisionMakerCaption: "\u041B\u041F\u0420",
		TacticAndCompetitorTabCaption: "\u0422\u0430\u043A\u0442\u0438\u043A\u0430 \u0438 \u043A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442\u044B",
		ProductsTabCaption: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442\u044B",
		HistoryTabCaption: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u043F\u0440\u043E\u0434\u0430\u0436\u0438",
		NotesTabCaption: "\u0424\u0430\u0439\u043B\u044B \u0438 \u043F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u044F",
		MoodListCaption: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430",
		MoodTip: "\u0412\u0430\u0448\u0430 \u044D\u043C\u043E\u0446\u0438\u044F \u043F\u043E \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044E \u043A \u0442\u0435\u043A\u0443\u0449\u0435\u043C\u0443 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044E \u0441\u0434\u0435\u043B\u043A\u0438. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u044D\u043C\u043E\u0442\u0438\u043A\u043E\u043D, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u0440\u044B\u043B\u043E\u0441\u044C \u043E\u043A\u043D\u043E \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430 \u043D\u0443\u0436\u043D\u043E\u0433\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u0438\u044F",
		MoodCaption: "\u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u0438\u0435 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440\u0430",
		DaysInFunnelCaption: "\u0434\u043D\u0435\u0439 \u0432 \u0432\u043E\u0440\u043E\u043D\u043A\u0435",
		DescriptionGroupCaption: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
		FirstOpportunityCaption: "\u041F\u0435\u0440\u0432\u0430\u044F \u043F\u0440\u043E\u0434\u0430\u0436\u0430 \u0434\u0430\u043D\u043D\u043E\u043C\u0443 \u043A\u043B\u0438\u0435\u043D\u0442\u0443",
		SecondOpportunityCaption: "\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043F\u0440\u043E\u0434\u0430\u0436\u0430",
		ProbabilityTip: "\u041F\u0440\u043E\u0433\u043D\u043E\u0437\u0438\u0440\u0443\u0435\u043C\u0430\u044F \u0443\u0441\u043F\u0435\u0448\u043D\u043E\u0441\u0442\u044C \u0441\u0434\u0435\u043B\u043A\u0438. \u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0441\u0442\u0430\u0434\u0438\u0438 \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0438 \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0432 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0435 [\u0421\u0442\u0430\u0434\u0438\u0438 \u043F\u0440\u043E\u0434\u0430\u0436]",
		OwnerTip: "\u0424\u0418\u041E \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430. \u0412\u044B\u0431\u043E\u0440 \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432, \u043F\u043E \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u044B",
		DaysAtStageCaption: "\u0414\u043D\u0435\u0439 \u043D\u0430 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0441\u0442\u0430\u0434\u0438\u0438:",
		DueDateTip: "\u041F\u043B\u0430\u043D\u043E\u0432\u0430\u044F \u0438\u043B\u0438 \u0444\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0434\u0430\u0442\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F \u0441\u0434\u0435\u043B\u043A\u0438. \u041F\u0440\u0438 \u043F\u0435\u0440\u0435\u0432\u043E\u0434\u0435 \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u043D\u0430 \u043A\u043E\u043D\u0435\u0447\u043D\u0443\u044E \u0441\u0442\u0430\u0434\u0438\u044E \u043F\u043E\u043B\u0435 \u0431\u0443\u0434\u0435\u0442 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0438 \u0441\u0442\u0430\u043D\u0435\u0442 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u043C \u0434\u043B\u044F \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F",
		ProbabilityMetricHint: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u0435\u0440\u043E\u044F\u0442\u043D\u043E\u0441\u0442\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432 \u043F\u043E\u043B\u0435 \u0022\u0412\u0435\u0440\u043E\u044F\u0442\u043D\u043E\u0441\u0442\u044C, %\u0022 \u043D\u0430 \u0432\u043A\u043B\u0430\u0434\u043A\u0435 \u0022\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F\u0022",
		ProbabilityCaption: "\u0432\u0435\u0440\u043E\u044F\u0442\u043D\u043E\u0441\u0442\u044C",
		ChangeActivityOwnerQuestion: "\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C {0} \u043D\u0430 {1} \u0432\u043E \u0432\u0441\u0435\u0445 \u043D\u0435\u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044B\u0445 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044F\u0445?",
		ProbabilityInvalidCaption: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0432\u0432\u0435\u0441\u0442\u0438 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043E\u0442 0 \u0434\u043E 100",
		ProbabilityIsGreaterThenMaxProbabilityByStageMessageCaption: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432\u0435\u0440\u043E\u044F\u0442\u043D\u043E\u0441\u0442\u0438 \u0434\u043B\u044F \u0434\u0430\u043D\u043D\u043E\u0439 \u0441\u0442\u0430\u0434\u0438\u0438 - ",
		VisaTabCaption: "\u0412\u0438\u0437\u044B",
		SendToVisaCaption: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043D\u0430 \u0432\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
		OpportunityBudgetTermsBlockCaption: "\u0411\u044E\u0434\u0436\u0435\u0442 \u0438 \u0441\u0440\u043E\u043A\u0438",
		HistoryCustomerTabCaption: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430",
		OpportunityManagementItemCaption: "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0445 \u043F\u0440\u043E\u0434\u0430\u0436",
		CustomerOpportunitiesCaption: "\u041F\u0440\u043E\u0434\u0430\u0436\u0438",
		CustomerActivitiesCaption: "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0438",
		CustomerFilesCaption: "\u0424\u0430\u0439\u043B\u044B \u0438 \u0441\u0441\u044B\u043B\u043A\u0438",
		CustomerNotesCaption: "\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u044F",
		SetOwnerActionCaption: "\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E",
		OwnerLookupCaption: "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439",
		ProcessNotFound: "\u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0445 \u043F\u0440\u043E\u0434\u0430\u0436 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D. \u0414\u043B\u044F \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u0435\u0433\u043E \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u0439 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0435 \u00AB\u041F\u0440\u043E\u0446\u0435\u0441\u0441 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0445 \u043F\u0440\u043E\u0434\u0430\u0436\u00BB",
		CurrentOpportunityNotFound: "\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u043F\u0440\u043E\u0434\u0430\u0436\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",
		ProcessAlreadyRunning: "\u041F\u043E \u044D\u0442\u043E\u0439 \u043F\u0440\u043E\u0434\u0430\u0436\u0435 \u0443\u0436\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u043F\u0440\u043E\u0446\u0435\u0441\u0441 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u043E\u0439 \u043F\u0440\u043E\u0434\u0430\u0436\u0438.",
		CustomerContacts: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \u043A\u043B\u0438\u0435\u043D\u0442\u0430",
		StageTip: "\u042D\u0442\u0430\u043F, \u043D\u0430 \u043A\u043E\u0442\u043E\u0440\u043E\u043C \u043F\u0440\u043E\u0434\u0430\u0436\u0430 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u043D\u0430 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043C\u043E\u043C\u0435\u043D\u0442. \u041F\u0440\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0438 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u044F \u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u0431\u0443\u0434\u0435\u0442 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u043D\u043E\u0432\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C \u043D\u0430 \u0434\u0435\u0442\u0430\u043B\u0438 [\u0421\u0442\u0430\u0434\u0438\u0438]",
		CompletenessHint: "\u0421\u0442\u0435\u043F\u0435\u043D\u044C \u043D\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0434\u0430\u043D\u043D\u044B\u043C\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044F. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0448\u043A\u0430\u043B\u0443, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C, \u043A\u0430\u043A\u0438\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u043D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442 \u0432 \u043F\u0440\u043E\u0444\u0438\u043B\u0435."
	};
	var localizableImages = {
		BantIcon: {
			source: 3,
			params: {
				schemaName: "BaseOpportunityPage",
				resourceItemName: "BantIcon",
				hash: "0547617eeb9a36daf55cedeb815555b9",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseOpportunityPage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseOpportunityPage",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseOpportunityPage",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseOpportunityPage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "BaseOpportunityPage",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "BaseOpportunityPage",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "BaseOpportunityPage",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "BaseOpportunityPage",
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