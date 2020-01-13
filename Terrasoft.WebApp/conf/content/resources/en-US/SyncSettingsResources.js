define("SyncSettingsResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmailSettingsTabCaption: "Email",
		CancelButtonCaption: "Cancel",
		SaveButtonCaption: "Save",
		HeaderCaptionTpl: "{0} settings",
		ActivitySettingsTabCaption: "Meetings and tasks",
		ContactSettingsTabCaption: "Contacts",
		ChangeEmailSettings: "Change email settings",
		CloseButtonCaption: "Close",
		NotSetSendingOrReceivingCheckMessage: "Please, select either the \u0022Enable email receiving\u0022 or \u0022Use mailbox to send messages\u0022 setting.",
		ThisIsNotImapOption: "This settings is for Exchange settings only.",
		SMTPSettingsNotSetMessage: "Email parameters are not configured for the specified email provider",
		AddContactEmailMessage: "Add the specified email address to the list of your communication options?",
		AddToCommunicationDetail: "Add email to contact communication detail ?"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});