define("ReminderNotificationsSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmptyResultTitle: "There are no reminders for now. The system will let you know if there are any",
		EmptyResultMessage: "Learn more about the reminders in the {0}Academy{1}.",
		ContextHelpCode: "",
		ContextHelpId: "1577",
		MenuItem5MinCaption: "5 minutes",
		MenuItem10MinCaption: "10 minutes",
		MenuItem30MinCaption: "30 minutes",
		MenuItem1HourCaption: "1 hour",
		MenuItem2HourCaption: "2 hours",
		MenuItem1DayCaption: "1 day",
		PostponeAllNotificationsQuestion: "Postpone all reminders?",
		CancelAllNotificationsQuestion: "Cancel all reminders?",
		ShowMoreThanOneNewNotifications: "Show {0} new reminders",
		ShowNewNotification: "Show 1 new reminder",
		CreatedOnDateFormat: "{0}, at {1}",
		DatesCaption: "dated ",
		Comma: ",",
		MainActionsButtonCaption: "Actions",
		PostponeAllMenuItemCaption: "Postpone all",
		CancelAllMenuItemCaption: "Cancel all",
		PostponeMenuItemCaption: "Postpone",
		CancelMenuItemCaption: "Cancel",
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