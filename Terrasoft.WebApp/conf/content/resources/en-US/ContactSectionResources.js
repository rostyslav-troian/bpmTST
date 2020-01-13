define("ContactSectionResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SynchronizeWithGoogleContactsAction: "Synchronize with Google Contacts",
		SynchronizeWithGoogleSyncResult: "Synchronization completed.{NewLine}In Creatio:{NewLine} - {0} records added{NewLine} - {1} records updated{NewLine} - {2} records removed from the synchronization folder{NewLine}In Google Contacts:{NewLine} - {3} records added{NewLine} - {4} records updated{NewLine} - {5} records removed from the synchronization folder",
		CallbackFailed: "Error occurred when trying to synchronize. \nError details are saved to the system log",
		SettingsNotSet: "Synchronization settings are not set",
		SyncProcessFail: "Error when trying to synchronize",
		OpenGoogleSettingsPage: "Set up Google synchronization",
		DuplicatesAction: "Find duplicates",
		FillContactWithSocialNetworksDataAction: "Fill in with data from social networks",
		OpenContactCardQuestion: "At least one user account in social network must be specified to perform this action. Open card of the selected contact?",
		ShowOnMap: "Show on map",
		FolderNotSet: "Synchronization settings not set. Define folder for synchronization of contacts",
		SynchronizeContactsCaption: "MS Exchange synchronization",
		SyncSettingsNotFoundMessage: "Synchronization settings not specified.",
		ReadSyncSettingsBadResponse: "Error receiving synchronization settings."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});