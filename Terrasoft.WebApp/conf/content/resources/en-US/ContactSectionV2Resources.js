define("ContactSectionV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ShowOnMapActionCaption: "Show on map",
		DuplicatesActionCaption: "Show duplicate contacts",
		FolderNotSet: "Synchronization settings are not set. Add new account for synchronization?",
		SyncProcessFail: "Error when trying to synchronize",
		SynchronizeWithGoogleSyncResult: "Synchronization completed.{NewLine}In Creatio:{NewLine} - {0} records added{NewLine} - {1} records updated{NewLine} - {2} records removed from the synchronization folder{NewLine}In Google Contacts:{NewLine} - {3} records added{NewLine} - {4} records updated{NewLine} - {5} records removed from the synchronization folder",
		SettingsNotSet: "Synchronization settings are not set",
		CallbackFailed: "Error occurred when trying to synchronize. Error details are saved to the system log",
		SynchronizeWithGoogleContactsActionCaption: "Synchronize with Google Contacts",
		OpenGoogleSettingsPageActionCaption: "Set up Google synchronization",
		OpenContactCardQuestion: "At least one user account in social network must be specified to perform this action. Open card of the selected contact?",
		SyncProcessTimedOut: "Synchronization process timeout. Synchronization is still in progress.",
		SyncAuthenticationError: "Unable to authenticate Google service. Set up Creatio synchronization with Google again.",
		SynchronizeExchangeContactsCaption: "MS Exchange contacts synchronization",
		SyncSettingsNotFoundMessage: "Synchronization settings not specified.",
		ReadSyncSettingsBadResponse: "Error receiving synchronization settings.",
		SynchronizeExchangeSuccessMessage: "Synchronization started",
		ActualizeActionCaption: "Mark all email addresses as valid",
		ActualizeActionMessageCaption: "Mark all email addresses as valid to all email addresses of selected contacts?",
		FillContactWithSocialNetworksDataActionCaption: "Update with social networks data",
		GoogleSyncRightsNotSet: "You don\u2019t have permission to synchronize contacts with Google. Contact your system administrator for more information.",
		SetUpSynchronization: "Set up contact synchronization",
		SyncSettingsSetTipCaption: "Now your contacts will always be up-to-date!\u003Cbr\u003EIf needed, \u003Ca href=\u0022#\u0022\u003Echange the settings\u003C\/a\u003E",
		SynchronizeSubmenuCaption: "Synchronize contacts",
		SynchronizeNowCaption: "Synchronize now",
		AddNewSynchronizationAccountCaption: "Add new account for synchronization",
		GoogleContactTagNotSetMessage: "Synchronization settings are not set. Specify tag for contact synchronization with Google?"
	};
	var localizableImages = {
		DataGridViewIcon: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "DataGridViewIcon",
				hash: "12f77829d9767e323f3647457abf613a",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsViewIcon: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "AnalyticsViewIcon",
				hash: "58d3027ef6c189ae1dd2c620dd8fd5aa",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		SettingsButtonImage: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "SettingsButtonImage",
				hash: "a5df3ed1d5e5511e3e23dc1875cc8769",
				resourceItemExtension: ".png"
			}
		},
		scrollTopImage: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "scrollTopImage",
				hash: "2e74084b2581060d190bc92231e7bc12",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		EmptyInfoImage: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "EmptyInfoImage",
				hash: "84410c143d7a4e3bfdbeda3db0408fca",
				resourceItemExtension: ".png"
			}
		},
		EmptyFilterImage: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "EmptyFilterImage",
				hash: "7bf68ba9d5b686f7e46b0e23e89821bb",
				resourceItemExtension: ".png"
			}
		},
		EmptyGroupImage: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "EmptyGroupImage",
				hash: "be776f867efb6ad7e233612d77f19c12",
				resourceItemExtension: ".png"
			}
		},
		EmptyDynamicGroupImage: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "EmptyDynamicGroupImage",
				hash: "3d0048d99789c16848dbee2239555758",
				resourceItemExtension: ".png"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		ToggleSectionButton: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "ToggleSectionButton",
				hash: "7e47411934e85e6cf9834ebc72cff3e6",
				resourceItemExtension: ".svg"
			}
		},
		ExportToExcelBtnImage: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "ExportToExcelBtnImage",
				hash: "1883b16fe86f1acadfc158894338fc09",
				resourceItemExtension: ".svg"
			}
		},
		SortIcon: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "SortIcon",
				hash: "c0d8dfe7b1416f4c916f1d82523355ae",
				resourceItemExtension: ".svg"
			}
		},
		SummariesIcon: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "SummariesIcon",
				hash: "f1f5f60ee306afca15aa461aac0fdad8",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		DataLoadFailedImage: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "DataLoadFailedImage",
				hash: "addbd12b1b53bcb56b1580c71598f4e6",
				resourceItemExtension: ".svg"
			}
		},
		AddTagsButtonImage: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "AddTagsButtonImage",
				hash: "c4683cf6e3fd3e28b391ff180a9c9c3d",
				resourceItemExtension: ".svg"
			}
		},
		ShowDuplicatesBtnImage: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
				resourceItemName: "ShowDuplicatesBtnImage",
				hash: "fa120a8db42142879bc508b69c6a5993",
				resourceItemExtension: ".svg"
			}
		},
		ObjectChangeLogSettingsBtnImage: {
			source: 3,
			params: {
				schemaName: "ContactSectionV2",
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