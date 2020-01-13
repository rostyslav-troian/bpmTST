define("BulkEmailSectionV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MandrillSettingsActionCaption: "Mandrill settings",
		SendButtonCaption: "Start sending",
		MandrillInteractionTargetNotFound: "Error while starting. The target audience does not contain recipients whose responses are: \u00ABPlanned\u00BB, \u00ABGeneral request error\u00BB, \u00ABRejected\u00BB",
		MandrillMassMailingSuccessMessage: "Bulk email start completed successfully",
		MandrillMassMailingFailsMessage: "Bulk email start has failed",
		SendTestEmailActionCaption: "Send test email",
		CantDeleteMessageCaption: "Completed, scheduled for sending or active bulk email cannot be deleted.",
		GoToSplitTestsCaption: "Go to Split tests",
		BreakButtonCaption: "Stop sending",
		SendMailingActionHint: "To start sending a trigger email, you need to start the campaign connected to it.\nConnect the trigger email to the campaign and start it. The emails will be sent automatically.",
		GoToBpmonlineCloudIntegrationCaption: "Setup domain to receive email responses",
		GoToBpmonlineCloudIntegrationCaptionV2: "Bulk email settings",
		OpenBulkEmailEventLogCaption: "Mailing log"
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