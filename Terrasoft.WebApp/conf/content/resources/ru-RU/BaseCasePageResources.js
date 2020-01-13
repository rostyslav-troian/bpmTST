define("BaseCasePageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",
		NumberCaption: "\u041D\u043E\u043C\u0435\u0440",
		SymptomsCaption: "\u041F\u0440\u0438\u0437\u043D\u0430\u043A\u0438 (\u0421\u0438\u043C\u043F\u0442\u043E\u043C\u044B)",
		StatusCaption: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435",
		OwnerCaption: "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439",
		RegisteredOnCaption: "\u0414\u0430\u0442\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438",
		SolutionDateCaption: "\u0412\u0440\u0435\u043C\u044F \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u044F",
		CurrentStatusGroupCaption: "\u0422\u0435\u043A\u0443\u0449\u0435\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435",
		TermsGroupCaption: "\u0421\u0440\u043E\u043A\u0438",
		ResponseDateCaption: "\u0412\u0440\u0435\u043C\u044F \u0440\u0435\u0430\u043A\u0446\u0438\u0438",
		NotesFilesTabCaption: "\u0424\u0430\u0439\u043B\u044B \u0438 \u043F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u044F",
		SubjectCaption: "\u0422\u0435\u043C\u0430",
		PriorityCaption: "\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442",
		AccountCaption: "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442",
		OriginCaption: "\u041F\u0440\u043E\u0438\u0441\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435",
		ContactCaption: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442",
		SupportLevelCaption: "\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438",
		GroupCaption: "\u0413\u0440\u0443\u043F\u043F\u0430 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0445",
		IndicatorsGroupCaption: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0438",
		RespondedOnCaption: "\u0424\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0440\u0435\u0430\u043A\u0446\u0438\u044F",
		SolutionProvidedOnCaption: "\u0424\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435",
		SolutionTabCaption: "\u0420\u0435\u0448\u0435\u043D\u0438\u0435",
		SolutionMainGroupCaption: "",
		ClosureCodeCaption: "\u041F\u0440\u0438\u0447\u0438\u043D\u0430 \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u044F",
		SolvedOnSupportLevelCaption: "\u0420\u0435\u0448\u0435\u043D\u043E \u043D\u0430 \u0443\u0440\u043E\u0432\u043D\u0435",
		SolutionCaption: "\u0420\u0435\u0448\u0435\u043D\u0438\u0435",
		SatisfactionLevelCaption: "\u0423\u0440\u043E\u0432\u0435\u043D\u044C \u0443\u0434\u043E\u0432\u043B\u0435\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u043E\u0441\u0442\u0438",
		ClosureDateCaption: "\u0414\u0430\u0442\u0430 \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u044F",
		RequiredContactOrAccountMessage: "\u0417\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u043E\u0434\u043D\u043E\u0433\u043E \u0438\u0437 \u043F\u043E\u043B\u0435\u0439 \u0022\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u0022 \u0438\u043B\u0438 \u0022\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0022 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C",
		RelationsTabCaption: "\u0412\u0437\u0430\u0438\u043C\u043E\u0441\u0432\u044F\u0437\u0438"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "BaseCasePage",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseCasePage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseCasePage",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseCasePage",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseCasePage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "BaseCasePage",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "BaseCasePage",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "BaseCasePage",
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