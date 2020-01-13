define("BulkEmailSectionV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MandrillSettingsActionCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 Mandrill",
		SendButtonCaption: "\u041D\u0430\u0447\u0430\u0442\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0443",
		MandrillInteractionTargetNotFound: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435. \u0426\u0435\u043B\u0435\u0432\u0430\u044F \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F \u043D\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u0435\u0439 \u0441 \u043E\u0442\u043A\u043B\u0438\u043A\u0430\u043C\u0438: \u00AB\u0412 \u043F\u043B\u0430\u043D\u0430\u0445\u00BB, \u00AB\u041E\u0431\u0449\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u00BB, \u00AB\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u043E\u00BB",
		MandrillMassMailingSuccessMessage: "\u0417\u0430\u043F\u0443\u0441\u043A \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D \u0443\u0441\u043F\u0435\u0448\u043D\u043E",
		MandrillMassMailingFailsMessage: "\u0417\u0430\u043F\u0443\u0441\u043A \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043B\u0441\u044F \u043D\u0435\u0443\u0434\u0430\u0447\u0435\u0439",
		SendTestEmailActionCaption: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0442\u0435\u0441\u0442\u043E\u0432\u043E\u0435 \u043F\u0438\u0441\u044C\u043C\u043E",
		CantDeleteMessageCaption: "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u0430\u044F, \u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u043A \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0438\u043B\u0438 \u0430\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0443\u0434\u0430\u043B\u0435\u043D\u0430.",
		GoToSplitTestsCaption: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0441\u043F\u0438\u0441\u043A\u0443 \u0441\u043F\u043B\u0438\u0442-\u0442\u0435\u0441\u0442\u043E\u0432",
		BreakButtonCaption: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0443",
		SendMailingActionHint: "\u0427\u0442\u043E\u0431\u044B \u0442\u0440\u0438\u0433\u0433\u0435\u0440\u043D\u043E\u0435 \u043F\u0438\u0441\u044C\u043C\u043E \u043D\u0430\u0447\u0430\u043B\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C\u0441\u044F, \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u0443\u044E \u0441 \u043D\u0438\u043C \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u044E.\n\u0421\u0432\u044F\u0436\u0438\u0442\u0435 \u0442\u0440\u0438\u0433\u0433\u0435\u0440\u043D\u043E\u0435 \u043F\u0438\u0441\u044C\u043C\u043E \u0441 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0435\u0439 \u0438 \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0435\u0435. \u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u043F\u0438\u0441\u0435\u043C \u043D\u0430\u0447\u043D\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438.",
		GoToBpmonlineCloudIntegrationCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u0434\u043E\u043C\u0435\u043D\u0430 \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043E\u0442\u043A\u043B\u0438\u043A\u043E\u0432",
		GoToBpmonlineCloudIntegrationCaptionV2: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 email-\u0440\u0430\u0441\u0441\u044B\u043B\u043E\u043A",
		OpenBulkEmailEventLogCaption: "\u0416\u0443\u0440\u043D\u0430\u043B \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 email-\u0440\u0430\u0441\u0441\u044B\u043B\u043E\u043A"
	};
	var localizableImages = {
		BulkEmailImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailSectionV2",
				resourceItemName: "BulkEmailImage"
			}
		},
		TriggerEmailImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailSectionV2",
				resourceItemName: "TriggerEmailImage"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailSectionV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		ToggleSectionButton: {
			source: 3,
			params: {
				schemaName: "BulkEmailSectionV2",
				resourceItemName: "ToggleSectionButton",
				hash: "7e47411934e85e6cf9834ebc72cff3e6",
				resourceItemExtension: ".svg"
			}
		},
		ExportToExcelBtnImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailSectionV2",
				resourceItemName: "ExportToExcelBtnImage",
				hash: "1883b16fe86f1acadfc158894338fc09",
				resourceItemExtension: ".svg"
			}
		},
		SortIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailSectionV2",
				resourceItemName: "SortIcon",
				hash: "c0d8dfe7b1416f4c916f1d82523355ae",
				resourceItemExtension: ".svg"
			}
		},
		SummariesIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailSectionV2",
				resourceItemName: "SummariesIcon",
				hash: "f1f5f60ee306afca15aa461aac0fdad8",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailSectionV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailSectionV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		DataLoadFailedImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailSectionV2",
				resourceItemName: "DataLoadFailedImage",
				hash: "addbd12b1b53bcb56b1580c71598f4e6",
				resourceItemExtension: ".svg"
			}
		},
		AddTagsButtonImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailSectionV2",
				resourceItemName: "AddTagsButtonImage",
				hash: "c4683cf6e3fd3e28b391ff180a9c9c3d",
				resourceItemExtension: ".svg"
			}
		},
		ShowDuplicatesBtnImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailSectionV2",
				resourceItemName: "ShowDuplicatesBtnImage",
				hash: "fa120a8db42142879bc508b69c6a5993",
				resourceItemExtension: ".svg"
			}
		},
		ObjectChangeLogSettingsBtnImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailSectionV2",
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