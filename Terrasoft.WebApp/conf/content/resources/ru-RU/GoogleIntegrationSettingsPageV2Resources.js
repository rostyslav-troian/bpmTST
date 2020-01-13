define("GoogleIntegrationSettingsPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SynchronizationTabCaption: "Google Contacts \u0438 Google Calendar",
		GoogleCalendarCaption: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0441 Google Calendar",
		GoogleContactsCaption: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0441 Google Contacts",
		CalendarSyncDateCaption: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043D\u0430\u0447\u0438\u043D\u0430\u044F \u0441",
		TagListCaption: "\u0418\u0437 Google Contacts \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0442\u044C \u0432 Creatio \u0432\u0441\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \u0441 \u0442\u0435\u0433\u043E\u043C",
		TransferAllCaption: "\u0418\u0437 Google Contacts \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0442\u044C \u0432 Creatio \u0432\u0441\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
		PageCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430",
		OneMinuteCaption: "\u043A\u0430\u0436\u0434\u0443\u044E \u043C\u0438\u043D\u0443\u0442\u0443",
		MultipleMinutesCaption: "\u043A\u0430\u0436\u0434\u044B\u0435 {0} \u043C\u0438\u043D\u0443\u0442",
		ContactsSyncIntervalCaption: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",
		CalendarSyncIntervalCaption: "\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438",
		EmptyValueMessage: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"
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