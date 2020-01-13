define("LeadSectionV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		QualifyLeadCaption: "\u041A\u0432\u0430\u043B\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		DisqualifyGroupCaption: "\u0414\u0438\u0441\u043A\u0432\u0430\u043B\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		DisqualifyLeadLost: "\u0423\u0442\u0440\u0430\u0447\u0435\u043D",
		DisqualifyLeadNoConnection: "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0441\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F",
		DisqualifyLeadNotInterested: "\u0411\u043E\u043B\u0435\u0435 \u043D\u0435 \u0437\u0430\u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043E\u0432\u0430\u043D",
		ShowOnMap: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435",
		ManageWebForms: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0444\u043E\u0440\u043C\u0430\u043C\u0438 \u0434\u043B\u044F \u0432\u043D\u0435\u0448\u043D\u0438\u0445 \u0440\u0435\u0441\u0443\u0440\u0441\u043E\u0432",
		QualifyLeadProcessUId: "3B3E3806-A913-4BE0-9AFD-FCDF681C0DFF",
		QualifyStatusQualificationCaption: "\u041A\u0432\u0430\u043B\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		QualifyStatusDistributionCaption: "\u0420\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C",
		QualifyStatusTranslationForSaleCaption: "\u041F\u0435\u0440\u0435\u0432\u0435\u0441\u0442\u0438 \u0432 \u043F\u0440\u043E\u0434\u0430\u0436\u0443",
		ConfigureLeadTypes: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0442\u0438\u043F\u044B \u043F\u043E\u0442\u0440\u0435\u0431\u043D\u043E\u0441\u0442\u0435\u0439",
		DisqualificationButtonCaption: "\u0414\u0438\u0441\u043A\u0432\u0430\u043B\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		ScoreLeadActionCaption: "\u041E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u043F\u0440\u0435\u0434\u0438\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0440\u0435\u0439\u0442\u0438\u043D\u0433",
		ScoreLeadActionNoModelsErrorMessage: "\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u043F\u0440\u0435\u0434\u0438\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0441\u043A\u043E\u0440\u0438\u043D\u0433\u0430 \u043B\u0438\u0434\u043E\u0432",
		ScoreLeadActionGeneralErrorMessage: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043B\u043E\u0441\u044C \u0441 \u043E\u0448\u0438\u0431\u043A\u043E\u0439. \u041F\u043E\u0434\u0440\u043E\u0431\u043D\u043E\u0441\u0442\u0438 - \u0432 \u0436\u0443\u0440\u043D\u0430\u043B\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F",
		LeadScoredBody: "\u041F\u0440\u0435\u0434\u0438\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u043B\u0438\u0434\u0430 \u0441\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 {0}",
		LeadScoredTitle: "\u041B\u0438\u0434 \u0022{0}\u0022"
	};
	var localizableImages = {
		QualificationProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "QualificationProcessButtonImage",
				hash: "26887aba2ff694652d0458946db6083b",
				resourceItemExtension: ".png"
			}
		},
		QualificationProcessActionImage: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "QualificationProcessActionImage",
				hash: "866879ee69e50f1900d3c42457a00284",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		EmptyInfoImage: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "EmptyInfoImage",
				hash: "84410c143d7a4e3bfdbeda3db0408fca",
				resourceItemExtension: ".png"
			}
		},
		EmptyFilterImage: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "EmptyFilterImage",
				hash: "7bf68ba9d5b686f7e46b0e23e89821bb",
				resourceItemExtension: ".png"
			}
		},
		EmptyGroupImage: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "EmptyGroupImage",
				hash: "be776f867efb6ad7e233612d77f19c12",
				resourceItemExtension: ".png"
			}
		},
		EmptyDynamicGroupImage: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "EmptyDynamicGroupImage",
				hash: "3d0048d99789c16848dbee2239555758",
				resourceItemExtension: ".png"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		ToggleSectionButton: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "ToggleSectionButton",
				hash: "7e47411934e85e6cf9834ebc72cff3e6",
				resourceItemExtension: ".svg"
			}
		},
		ExportToExcelBtnImage: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "ExportToExcelBtnImage",
				hash: "1883b16fe86f1acadfc158894338fc09",
				resourceItemExtension: ".svg"
			}
		},
		SortIcon: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "SortIcon",
				hash: "c0d8dfe7b1416f4c916f1d82523355ae",
				resourceItemExtension: ".svg"
			}
		},
		SummariesIcon: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "SummariesIcon",
				hash: "f1f5f60ee306afca15aa461aac0fdad8",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		MLIcon: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "MLIcon",
				hash: "a6ab3e15cada3b16f8e8fc0fd572e3d4",
				resourceItemExtension: ".png"
			}
		},
		MLIconSvg: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "MLIconSvg",
				hash: "5e9f2e2d41f9dcec78d998245d4afe27",
				resourceItemExtension: ".svg"
			}
		},
		DataLoadFailedImage: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "DataLoadFailedImage",
				hash: "addbd12b1b53bcb56b1580c71598f4e6",
				resourceItemExtension: ".svg"
			}
		},
		AddTagsButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "AddTagsButtonImage",
				hash: "c4683cf6e3fd3e28b391ff180a9c9c3d",
				resourceItemExtension: ".svg"
			}
		},
		ShowDuplicatesBtnImage: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "ShowDuplicatesBtnImage",
				hash: "fa120a8db42142879bc508b69c6a5993",
				resourceItemExtension: ".svg"
			}
		},
		ObjectChangeLogSettingsBtnImage: {
			source: 3,
			params: {
				schemaName: "LeadSectionV2",
				resourceItemName: "ObjectChangeLogSettingsBtnImage",
				hash: "f0169f1a725a65ec76c564d5e9705277",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});