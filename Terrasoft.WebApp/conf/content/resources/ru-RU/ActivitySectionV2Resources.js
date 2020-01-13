define("ActivitySectionV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SchedulerHeader: "\u0420\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
		PeriodFilterCaption: "\u041F\u0435\u0440\u0438\u043E\u0434",
		OwnerFilterCaption: "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A",
		OpenButtonCaption: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C",
		DeleteButtonCaption: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
		CopyButtonCaption: "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		SynchronizeWithGoogleCalendarAction: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441 \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u0435\u043C Google",
		OpenGoogleSettingsPage: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044E \u0441 Google",
		LoadImapEmailsAction: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u043E\u0447\u0442\u043E\u0432\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F",
		SettingsNotSet: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u043D\u0435 \u0437\u0430\u0434\u0430\u043D\u044B. \u0425\u043E\u0442\u0438\u0442\u0435 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u0434\u043B\u044F \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438?",
		SyncProcessFail: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043F\u044B\u0442\u043A\u0435 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438",
		CallbackFailed: "\u041F\u0440\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0432\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E\u0431 \u043E\u0448\u0438\u0431\u043A\u0435 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u0430 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439 \u043B\u043E\u0433",
		SynchronizeWithGoogleSyncResult: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430.{NewLine}\u0412 Creatio:{NewLine} - \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E {0} \u0437\u0430\u043F\u0438\u0441\u0435\u0439{NewLine} - \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E {1} \u0437\u0430\u043F\u0438\u0441\u0435\u0439{NewLine} - \u0438\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u0438\u0437 \u0433\u0440\u0443\u043F\u043F\u044B \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 {2} \u0437\u0430\u043F\u0438\u0441\u0435\u0439{NewLine}\u0412 Google Calendars:{NewLine} - \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E {3} \u0437\u0430\u043F\u0438\u0441\u0435\u0439{NewLine} - \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E {4} \u0437\u0430\u043F\u0438\u0441\u0435\u0439{NewLine} - \u0438\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u0438\u0437 \u0433\u0440\u0443\u043F\u043F\u044B \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438 {5} \u0437\u0430\u043F\u0438\u0441\u0435\u0439",
		MailboxSettingsEmpty: "\u0414\u043B\u044F \u043F\u0440\u0438\u043D\u044F\u0442\u0438\u044F \u043F\u043E\u0447\u0442\u044B \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044E \u0441 \u043F\u043E\u0447\u0442\u043E\u0432\u044B\u043C \u044F\u0449\u0438\u043A\u043E\u043C",
		LoadImapEmailsResult: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430",
		SendEmailAction: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C",
		ReplyActionCaption: "\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C",
		ReplyAllActionCaption: "\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C \u0432\u0441\u0435\u043C",
		ForwardActionCaption: "\u041F\u0435\u0440\u0435\u0441\u043B\u0430\u0442\u044C",
		IntervalFormat: "{0} \u043C\u0438\u043D\u0443\u0442",
		SyncProcessTimedOut: "\u041F\u0440\u0435\u0432\u044B\u0448\u0435\u043D\u043E \u0432\u0440\u0435\u043C\u044F \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438. \u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0435\u0449\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u0442\u0441\u044F.",
		SyncAuthenticationError: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0432 \u0441\u0435\u0440\u0432\u0438\u0441\u0435 Google. \u041F\u0440\u043E\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0443 \u0443\u0447\u0435\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 Google \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438 Creatio \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E.",
		SynchronizeWithExchangeStart: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u043D\u0430\u0447\u0430\u0442\u0430. \u041C\u044B \u043F\u043E\u043A\u0430\u0436\u0435\u043C \u0432\u0430\u043C \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435, \u043A\u043E\u0433\u0434\u0430 \u043E\u043D\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0441\u044F.",
		GoogleModificationDateLiesTooFarInThePastError: "\u041F\u0435\u0440\u0438\u043E\u0434 \u0432\u044B\u0433\u0440\u0443\u0437\u043A\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438\u0437 Google \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0432\u0435\u043B\u0438\u043A. \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0434\u0430\u0442\u0443 \u0432\u044B\u0433\u0440\u0443\u0437\u043A\u0438 \u0431\u043B\u0438\u0436\u0435 \u043A \u0442\u0435\u043A\u0443\u0449\u0435\u043C\u0443 \u0434\u043D\u044E (\u043E\u0440\u0438\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u043E\u0447\u043D\u043E 15-20 \u0434\u043D\u0435\u0439)",
		SyncWithExchangeCaption: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441 \u0437\u0430\u0434\u0430\u0447\u0430\u043C\u0438 \u0438 \u0432\u0441\u0442\u0440\u0435\u0447\u0430\u043C\u0438 Exchange",
		GoogleAccessNotConfigured: "\u0414\u043E\u0441\u0442\u0443\u043F \u043A \u0441\u043B\u0443\u0436\u0431\u0435 Google API \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D. \u0414\u043B\u044F \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 Google APIs Console.",
		LoadingMessagesComplete: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043F\u0438\u0441\u0435\u043C \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430",
		SchedulerDataViewCaption: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
		LoadMoreDataTemplate: "\u0417\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E {0} \u0437\u0430\u043F\u0438\u0441\u0435\u0439. \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0435 {0}?",
		CalendarDataViewHint: "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C",
		SetUpSynchronization: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044E \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0435\u0439",
		SyncSettingsSetTipCaption: "\u041F\u043E\u0437\u0434\u0440\u0430\u0432\u043B\u044F\u0435\u043C! \u0422\u0435\u043F\u0435\u0440\u044C \u0432\u0430\u0448\u0438 \u0432\u0441\u0442\u0440\u0435\u0447\u0438 \u0438 \u0437\u0430\u0434\u0430\u0447\u0438 \u0432\u0441\u0435\u0433\u0434\u0430 \u0431\u0443\u0434\u0443\u0442 \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u043C\u0438.\u003Cbr\u003E\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u003Ca href=\u0022#\u0022\u003E\u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438\u003C\/a\u003E, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u044B \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u043B\u0438 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E.",
		SynchronizeNowCaption: "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044E",
		AddNewSynchronizationAccountCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u0434\u043B\u044F \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u0438",
		SynchronizeSubmenuCaption: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0438",
		AddEmployeeFilterCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430",
		SelectEmployeeFilterHint: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430"
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