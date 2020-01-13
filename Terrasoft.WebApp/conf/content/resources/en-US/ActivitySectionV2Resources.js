define("ActivitySectionV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SchedulerHeader: "Calendar",
		PeriodFilterCaption: "Period",
		OwnerFilterCaption: "Employee",
		OpenButtonCaption: "Open",
		DeleteButtonCaption: "Delete",
		CopyButtonCaption: "Copy",
		SynchronizeWithGoogleCalendarAction: "Synchronize with Google Calendar",
		OpenGoogleSettingsPage: "Set up Google synchronization",
		LoadImapEmailsAction: "Receive emails",
		SettingsNotSet: "Synchronization settings are not set. Add new account for synchronization?",
		SyncProcessFail: "Error when trying to synchronize",
		CallbackFailed: "Error occurred when trying to synchronize. Error details are saved to the system log",
		SynchronizeWithGoogleSyncResult: "Synchronization completed.{NewLine}In Creatio:{NewLine} - {0} records added{NewLine} - {1} records updated{NewLine} - {2} records removed from the synchronization folder{NewLine}In Google Calendars:{NewLine} - {3} records added{NewLine} - {4} records updated{NewLine} - {5} records removed from the synchronization folder",
		MailboxSettingsEmpty: "Set up the mailbox synchronization to receive emails",
		LoadImapEmailsResult: "Messages loaded",
		SendEmailAction: "Send",
		ReplyActionCaption: "Reply",
		ReplyAllActionCaption: "Reply all",
		ForwardActionCaption: "Forward",
		IntervalFormat: "{0} minutes",
		SyncProcessTimedOut: "Synchronization process timeout. Synchronization is still in progress.",
		SyncAuthenticationError: "Unable to authenticate Google service. Set up Creatio synchronization with Google again.",
		SynchronizeWithExchangeStart: "Synchronization is started. We will notify you when it is completed.",
		GoogleModificationDateLiesTooFarInThePastError: "Period of exporting data from Google is too long. Specify a shorter period (15-20 days)",
		SyncWithExchangeCaption: "Synchronize with tasks and meetings in Exchange",
		GoogleAccessNotConfigured: "Access to Google API service has been disabled. To enable access, use Google API Console.",
		LoadingMessagesComplete: "Emails received",
		SchedulerDataViewCaption: "Open calendar",
		LoadMoreDataTemplate: "{0} records have been loaded. Load {0} more?",
		CalendarDataViewHint: "Calendar",
		SetUpSynchronization: "Set up activity synchronization",
		SyncSettingsSetTipCaption: "Now your meetings and tasks will always be up-to-date!\u003Cbr\u003EIf needed, \u003Ca href=\u0022#\u0022\u003Echange the settings\u003C\/a\u003E",
		SynchronizeNowCaption: "Synchronize now",
		AddNewSynchronizationAccountCaption: "Add new account for synchronization",
		SynchronizeSubmenuCaption: "Synchronize activities",
		AddEmployeeFilterCaption: "Add employee",
		SelectEmployeeFilterHint: "Select employee"
	};
	var localizableImages = {
		GridDataViewIcon: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "GridDataViewIcon",
				hash: "12f77829d9767e323f3647457abf613a",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataViewIcon: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "AnalyticsDataViewIcon",
				hash: "58d3027ef6c189ae1dd2c620dd8fd5aa",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		SchedulerDataViewIcon: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "SchedulerDataViewIcon",
				hash: "0d0c4c5e0f3c0ef501e10eca944d372e",
				resourceItemExtension: ".svg"
			}
		},
		SettingsButtonImage: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "SettingsButtonImage",
				hash: "a5df3ed1d5e5511e3e23dc1875cc8769",
				resourceItemExtension: ".png"
			}
		},
		scrollTopImage: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "scrollTopImage",
				hash: "2e74084b2581060d190bc92231e7bc12",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		EmptyInfoImage: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "EmptyInfoImage",
				hash: "84410c143d7a4e3bfdbeda3db0408fca",
				resourceItemExtension: ".png"
			}
		},
		EmptyFilterImage: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "EmptyFilterImage",
				hash: "7bf68ba9d5b686f7e46b0e23e89821bb",
				resourceItemExtension: ".png"
			}
		},
		EmptyGroupImage: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "EmptyGroupImage",
				hash: "be776f867efb6ad7e233612d77f19c12",
				resourceItemExtension: ".png"
			}
		},
		EmptyDynamicGroupImage: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "EmptyDynamicGroupImage",
				hash: "3d0048d99789c16848dbee2239555758",
				resourceItemExtension: ".png"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		ToggleSectionButton: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "ToggleSectionButton",
				hash: "7e47411934e85e6cf9834ebc72cff3e6",
				resourceItemExtension: ".svg"
			}
		},
		ExportToExcelBtnImage: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "ExportToExcelBtnImage",
				hash: "1883b16fe86f1acadfc158894338fc09",
				resourceItemExtension: ".svg"
			}
		},
		SortIcon: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "SortIcon",
				hash: "c0d8dfe7b1416f4c916f1d82523355ae",
				resourceItemExtension: ".svg"
			}
		},
		SummariesIcon: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "SummariesIcon",
				hash: "f1f5f60ee306afca15aa461aac0fdad8",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		DataLoadFailedImage: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "DataLoadFailedImage",
				hash: "addbd12b1b53bcb56b1580c71598f4e6",
				resourceItemExtension: ".svg"
			}
		},
		AddTagsButtonImage: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "AddTagsButtonImage",
				hash: "c4683cf6e3fd3e28b391ff180a9c9c3d",
				resourceItemExtension: ".svg"
			}
		},
		ShowDuplicatesBtnImage: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
				resourceItemName: "ShowDuplicatesBtnImage",
				hash: "fa120a8db42142879bc508b69c6a5993",
				resourceItemExtension: ".svg"
			}
		},
		ObjectChangeLogSettingsBtnImage: {
			source: 3,
			params: {
				schemaName: "ActivitySectionV2",
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