define("LeadQualificationPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		LeadQualificationPageCaption: "\u041A\u0432\u0430\u043B\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F \u043B\u0438\u0434\u0430",
		AddressCaption: "\u0410\u0434\u0440\u0435\u0441",
		QualifyButtonCaption: "\u041A\u0432\u0430\u043B\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		AssociateWithContactCaption: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C \u0441 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u043C",
		AssociateWithAccountCaption: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C \u0441 \u043A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u043E\u043C",
		ShouldCreateOpportunityCaption: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0440\u043E\u0434\u0430\u0436\u0443",
		AssignOneOfTheFoundCaption: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C \u0441 \u043E\u0434\u043D\u0438\u043C \u0438\u0437 \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0445",
		CreateNewCaption: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0439",
		AssignExistingCaption: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C \u0441 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u043C",
		LeadNameCaption: "\u0424\u0418\u041E",
		NoAssociateWarning: "\u0414\u043B\u044F \u043A\u0432\u0430\u043B\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u043B\u0438\u0434 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0441\u0432\u044F\u0437\u0430\u043D \u0441 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u043C \u0438\u043B\u0438 \u043A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u043E\u043C",
		ShowMoreButtonCaption: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435",
		ContactNameColumnCaption: "\u0424\u0418\u041E",
		AccountNameColumnCaption: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
		AccountColumnCaption: "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442",
		EMailColumnCaption: "Email",
		PhoneColumnCaption: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D",
		CityColumnCaption: "\u0413\u043E\u0440\u043E\u0434",
		NoContactWarning: "\u041D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0434\u043B\u044F \u0441\u0432\u044F\u0437\u044B\u0432\u0430\u043D\u0438\u044F",
		NoAccountWarning: "\u041D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D \u043A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442 \u0434\u043B\u044F \u0441\u0432\u044F\u0437\u044B\u0432\u0430\u043D\u0438\u044F",
		ContactCreatedMessage: "\u0421\u043E\u0437\u0434\u0430\u043D \u043A\u043E\u043D\u0442\u0430\u043A\u0442 {0}",
		AccountCreatedMessage: "\u0421\u043E\u0437\u0434\u0430\u043D \u043A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442 {0}"
	};
	var localizableImages = {
		ShowMoreIcon: {
			source: 3,
			params: {
				schemaName: "LeadQualificationPageV2",
				resourceItemName: "ShowMoreIcon",
				hash: "010a38d79ad1acb4726eb1dae1d7f14c",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadQualificationPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadQualificationPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "LeadQualificationPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "LeadQualificationPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "LeadQualificationPageV2",
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