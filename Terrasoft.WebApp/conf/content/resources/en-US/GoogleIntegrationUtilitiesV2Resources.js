define("GoogleIntegrationUtilitiesV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SettingSavedNeedRestart: "New synchronization settings have been saved. Run synchronization again",
		GoogleSyncRightsNotSet: "You don\u2019t have permission to synchronize contacts with Google. Contact your system administrator for more information.",
		ImportRightsNotSet: "Contacts from Creatio will exported to Google Contacts. To import contacts from Google, please contact your system administrator.",
		ExportRightsNotSet: "Contacts from Google Contacts will be imported to Creatio. To export contacts from Creatio, please contact your system administrator.",
		SyncSuccessfullyStartedMessage: "Synchronization is started. We will notify you when it is completed.",
		GoogleContactTagNotSetMessage: "Synchronization settings are not set. Specify tag for contact synchronization with Google?",
		SyncDateLiesTooFarInThePastError: "Period of exporting data from Google is too long. Specify a shorter period (15-20 days)?",
		InternalErrorResultMessage: "Internal exception. Contact your system administrator. "
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});