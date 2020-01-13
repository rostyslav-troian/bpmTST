define("LeadManagementDistributionPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DistributionPageCaption: "\u0420\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043B\u0438\u0434\u0430",
		TransferToSaleTabCaption: "\u041F\u0435\u0440\u0435\u0432\u043E\u0434 \u0432 \u043F\u0440\u043E\u0434\u0430\u0436\u0443",
		LeadInFolderTabCaption: "\u0412\u0445\u043E\u0434\u0438\u0442 \u0432 \u0433\u0440\u0443\u043F\u043F\u044B",
		LeadTabCaption: "\u041F\u043E\u0442\u0440\u0435\u0431\u043D\u043E\u0441\u0442\u0438",
		ContactDataGroupCaption: "\u0414\u0430\u043D\u043D\u044B\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430",
		AccountDataGroupCaption: "\u0414\u0430\u043D\u043D\u044B\u0435 \u043A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u0430",
		ContactInFolderTabCaption: "\u0412\u0445\u043E\u0434\u0438\u0442 \u0432 \u0433\u0440\u0443\u043F\u043F\u044B",
		ContactNameCaption: "\u0424\u0418\u041E",
		ContactDepartmentCaption: "\u0414\u0435\u043F\u0430\u0440\u0442\u0430\u043C\u0435\u043D\u0442",
		ContactJobCaption: "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C",
		ContactGenderCaption: "\u041F\u043E\u043B",
		ContactJobTitleCaption: "\u041F\u043E\u043B\u043D\u043E\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u0438",
		ContactDecisionRoleCaption: "\u0420\u043E\u043B\u044C",
		AccountCategoryCaption: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u043A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u0430",
		AccountOwnershipCaption: "\u0424\u043E\u0440\u043C\u0430 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438",
		AccountEmployeesNumberCaption: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432",
		AccountIndustryCaption: "\u041E\u0442\u0440\u0430\u0441\u043B\u044C",
		AccountAnualRevenueCaption: "\u0413\u043E\u0434\u043E\u0432\u043E\u0439 \u043E\u0431\u043E\u0440\u043E\u0442",
		AccountNameCaption: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
		NotInterestingMenuCaption: "\u041F\u043E\u0442\u0440\u0435\u0431\u043D\u043E\u0441\u0442\u044C \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442",
		DistributeLaterMenuCaption: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0432\u0437\u0440\u0430\u0449\u0438\u0432\u0430\u043D\u0438\u0435",
		TransferToSaleMenuCaption: "\u041D\u0430\u0447\u0430\u0442\u044C \u043F\u0435\u0440\u0435\u0432\u043E\u0434 \u0432 \u043F\u0440\u043E\u0434\u0430\u0436\u0443",
		ContactDataBlockCaption: "\u0414\u0430\u043D\u043D\u044B\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430",
		AccountDataBlockCaption: "\u0414\u0430\u043D\u043D\u044B\u0435 \u043A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u0430",
		DistributionInfoTip: "\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u043F\u0435\u0440\u0435\u0432\u043E\u0434 \u0432 \u043F\u0440\u043E\u0434\u0430\u0436\u0443, \u0435\u0441\u043B\u0438 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0441\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u043C \u043F\u043E \u0434\u0430\u043D\u043D\u043E\u043C\u0443 \u043B\u0438\u0434\u0443 \u0434\u043B\u044F \u0443\u0442\u043E\u0447\u043D\u0435\u043D\u0438\u044F \u043F\u043E\u0442\u0440\u0435\u0431\u043D\u043E\u0441\u0442\u0438. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0435 \u0432\u0437\u0440\u0430\u0449\u0438\u0432\u0430\u043D\u0438\u0435 \u043B\u0438\u0434\u0430, \u0435\u0441\u043B\u0438 \u043E\u0431\u0449\u0430\u0442\u044C\u0441\u044F \u0441 \u0446\u0435\u043B\u044C\u044E \u043F\u0440\u043E\u0434\u0430\u0436\u0438 \u043F\u043E \u0434\u0430\u043D\u043D\u043E\u043C\u0443 \u043B\u0438\u0434\u0443 \u043F\u043E\u043A\u0430 \u043D\u0435 \u0446\u0435\u043B\u0435\u0441\u043E\u043E\u0431\u0440\u0430\u0437\u043D\u043E. \u0423\u043A\u0430\u0436\u0438\u0442\u0435, \u0447\u0442\u043E \u043F\u043E\u0442\u0440\u0435\u0431\u043D\u043E\u0441\u0442\u044C \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0442\u043E\u043C \u0441\u043B\u0443\u0447\u0430\u0435, \u0435\u0441\u043B\u0438 \u0432\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0441 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u043C \u043D\u0435 \u043D\u0443\u0436\u043D\u043E \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0442\u044C \u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043F\u043E \u0434\u0430\u043D\u043D\u043E\u0439 \u043F\u043E\u0442\u0440\u0435\u0431\u043D\u043E\u0441\u0442\u0438.",
		DistributeButtonCaption: "\u0420\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C",
		AccountCaption: "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442",
		ContactCaption: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442",
		ContactLeadDetailCaption: "\u041F\u043E\u0442\u0440\u0435\u0431\u043D\u043E\u0441\u0442\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadManagementDistributionPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadManagementDistributionPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "LeadManagementDistributionPageV2",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		},
		TransferToSaleImage: {
			source: 3,
			params: {
				schemaName: "LeadManagementDistributionPageV2",
				resourceItemName: "TransferToSaleImage",
				hash: "779a26d94ba17ad966285d56b11d758f",
				resourceItemExtension: ".png"
			}
		},
		NotInterestingImage: {
			source: 3,
			params: {
				schemaName: "LeadManagementDistributionPageV2",
				resourceItemName: "NotInterestingImage",
				hash: "614e89c18fcd31ed2d9f9dc7b7a9ba9a",
				resourceItemExtension: ".png"
			}
		},
		DistributeLaterImage: {
			source: 3,
			params: {
				schemaName: "LeadManagementDistributionPageV2",
				resourceItemName: "DistributeLaterImage",
				hash: "c1bbf1ffd83f88dc51cc169affabcd61",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadManagementDistributionPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "LeadManagementDistributionPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "LeadManagementDistributionPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "LeadManagementDistributionPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "LeadManagementDistributionPageV2",
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