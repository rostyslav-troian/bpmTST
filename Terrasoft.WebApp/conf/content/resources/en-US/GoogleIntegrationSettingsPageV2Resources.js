define("GoogleIntegrationSettingsPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SynchronizationTabCaption: "Google Contacts and Google Calendar",
		GoogleCalendarCaption: "Synchronization with Google Calendar",
		GoogleContactsCaption: "Synchronization with Google Contacts",
		CalendarSyncDateCaption: "Synchronize activities starting from",
		TagListCaption: "Export contacts with tag",
		TransferAllCaption: "Contacts from the Creatio group in Google Contacts are being imported to Creatio",
		PageCaption: "Account settings",
		OneMinuteCaption: "every minute",
		MultipleMinutesCaption: "every {0} minutes",
		ContactsSyncIntervalCaption: "Synchronize contacts automatically",
		CalendarSyncIntervalCaption: "Synchronize activities automatically",
		EmptyValueMessage: "Specify the value"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "GoogleIntegrationSettingsPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "GoogleIntegrationSettingsPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "GoogleIntegrationSettingsPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "GoogleIntegrationSettingsPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "GoogleIntegrationSettingsPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "GoogleIntegrationSettingsPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "GoogleIntegrationSettingsPageV2",
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