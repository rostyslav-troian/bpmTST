define("ReminderNotificationsSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmptyResultTitle: "\u041F\u043E\u0445\u043E\u0436\u0435, \u0443 \u0432\u0430\u0441 \u0435\u0449\u0435 \u043D\u0435\u0442 \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0439. \u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0443\u0432\u0435\u0434\u043E\u043C\u0438\u0442 \u0432\u0430\u0441, \u0435\u0441\u043B\u0438 \u043E\u043D\u0438 \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F",
		EmptyResultMessage: "\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043E\u0431 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F\u0445 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u043E\u0439 \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0439 \u0441\u0435\u0442\u0438 \u0432 {0}\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438{1}.",
		ContextHelpCode: "",
		ContextHelpId: "1577",
		MenuItem5MinCaption: "5 \u043C\u0438\u043D\u0443\u0442",
		MenuItem10MinCaption: "10 \u043C\u0438\u043D\u0443\u0442",
		MenuItem30MinCaption: "30 \u043C\u0438\u043D\u0443\u0442",
		MenuItem1HourCaption: "1 \u0447\u0430\u0441",
		MenuItem2HourCaption: "2 \u0447\u0430\u0441\u0430",
		MenuItem1DayCaption: "1 \u0434\u0435\u043D\u044C",
		PostponeAllNotificationsQuestion: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0442\u043B\u043E\u0436\u0438\u0442\u044C \u0432\u0441\u0435 \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F?",
		CancelAllNotificationsQuestion: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u0441\u0435 \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F?",
		ShowMoreThanOneNewNotifications: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C {0} \u043D\u043E\u0432\u044B\u0445 \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0439",
		ShowNewNotification: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C 1 \u043D\u043E\u0432\u043E\u0435 \u043D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0435",
		CreatedOnDateFormat: "{0}, \u043E\u0442 {1}",
		DatesCaption: "\u043E\u0442 ",
		Comma: ",",
		MainActionsButtonCaption: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
		PostponeAllMenuItemCaption: "\u041E\u0442\u043B\u043E\u0436\u0438\u0442\u044C \u0432\u0441\u0435",
		CancelAllMenuItemCaption: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u0441\u0435",
		PostponeMenuItemCaption: "\u041E\u0442\u043B\u043E\u0436\u0438\u0442\u044C",
		CancelMenuItemCaption: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",
		InvoiceCaption: ""
	};
	var localizableImages = {
		More: {
			source: 3,
			params: {
				schemaName: "ReminderNotificationsSchema",
				resourceItemName: "More"
			}
		},
		PaperWorkActivityImage: {
			source: 3,
			params: {
				schemaName: "ReminderNotificationsSchema",
				resourceItemName: "PaperWorkActivityImage",
				hash: "7ab1596a980f0d2bcf0546d85465c1d7",
				resourceItemExtension: ".svg"
			}
		},
		CallActivityImage: {
			source: 3,
			params: {
				schemaName: "ReminderNotificationsSchema",
				resourceItemName: "CallActivityImage",
				hash: "dea59ccef92aa8fd931b2a5670479b35",
				resourceItemExtension: ".svg"
			}
		},
		MeetingActivityImage: {
			source: 3,
			params: {
				schemaName: "ReminderNotificationsSchema",
				resourceItemName: "MeetingActivityImage",
				hash: "2cddd8a6b1ef4e4801130bbfaa1b5715",
				resourceItemExtension: ".svg"
			}
		},
		EmptyResultImage: {
			source: 3,
			params: {
				schemaName: "ReminderNotificationsSchema",
				resourceItemName: "EmptyResultImage",
				hash: "3ad136a227883ca0232623d81f4dc2c9",
				resourceItemExtension: ".svg"
			}
		},
		DefaultActivityImage: {
			source: 3,
			params: {
				schemaName: "ReminderNotificationsSchema",
				resourceItemName: "DefaultActivityImage",
				hash: "5430f1253a940616c01084eb17ab6459",
				resourceItemExtension: ".svg"
			}
		},
		DefaultRemindingIcon: {
			source: 3,
			params: {
				schemaName: "ReminderNotificationsSchema",
				resourceItemName: "DefaultRemindingIcon",
				hash: "fc25e15a25188b310d43e0d790d71956",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});