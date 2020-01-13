define("ActivitySectionResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PeriodFilterCaption: "Period",
		OwnerFilterCaption: "Owner",
		SectionHeader: "List of activities",
		SchedulerHeader: "Calendar",
		ViewButtonCaption: "View",
		DeleteButtonCaption: "Delete",
		CopyButtonCaption: "Copy",
		EditButtonCaption: "Edit",
		SendButtonCaption: "Send",
		SendEmailForUserQuestion: "Fill in the \u0022From:\u0022 field to send the message",
		RecepientEmailForUserQuestion: "Fill in at least one of the \u0022To:\u0022, \u0022Cc:\u0022 or \u0022Bcc:\u0022 fields in order to send the email",
		EmailWasSent: "This operation is not available: the message has already been sent",
		ThisNotEmail: "This operation is not available in the selected activity type",
		SynchronizeWithGoogleSyncResult: "Synchronization completed.\nIn Creatio:  - {0} records added - {1} records updated - {2} records removed from the synchronization folder\nIn Google Calendar: - {3} records added - {4} records updated - {5} records removed from the synchronization folder",
		CallbackFailed: "Error occurred when trying to synchronize. Error details are saved to the system log",
		SettingsNotSet: "Synchronization settings are not set",
		SyncProcessFail: "Error when trying to synchronize",
		SynchronizeWithGoogleCalendarAction: "Synchronize with Google Calendar",
		OpenGoogleSettingsPage: "Set up Google synchronization",
		IntervalFormat: "#interval# minutes",
		ForwardButtonCaption: "Forward",
		ReplyButtonCaption: "Reply",
		LoadImapEmailsAction: "Receive emails",
		ReplyAllButtonCaption: "Reply all",
		MailboxSettingsEmpty: "Set up the mailbox synchronization to receive emails",
		MailboxSettingsEmptyEx: "Set up the mailbox synchronization to receive emails",
		LoadImapEmailsResult: "Messages loaded",
		LoadImapEmailsResultEx: "Messages loaded"
	};
	var localizableImages = {
		TypePhone: {
			source: 3,
			params: {
				schemaName: "ActivitySection",
				resourceItemName: "TypePhone",
				hash: "025769f0de64a4b471e0bdd2ada210b7",
				resourceItemExtension: ".jpg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});