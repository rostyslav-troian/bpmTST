define("GoogleIntegrationSettingsModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		BtnOKCaption: "Save",
		BtnCancelCaption: "Cancel",
		UserLoginCaption: "User account",
		TagCaption: "Contacts synchronization tag",
		ContactAutoSyncCaption: "Run synchronization with contacts every",
		ContactLastSyncDateCaption: "Last synchronization of contacts was run {0} at {1}",
		ContactEmptyLastSyncDateCaption: "Contacts have not synchronized yet",
		MinutesCaption: "minutes",
		ActivityLastSyncDateCaption: "Last synchronization of activities was run {0} at {1}",
		ActivityEmptyLastSyncDateCaption: "Activities have not been synchronized yet",
		ActivityAutoSyncCaption: "Run synchronization with calendar every",
		WindowCaption: "Google synchronization setup",
		SyncFromDateCaption: "Synchronize the modified after",
		ImportRightsNotSet: "Contacts from Creatio will be exported to Google Contacts. To import contacts from Google to Creatio, please contact your system administrator.",
		ExportRightsNotSet: "Contacts from Google Contacts will be imported into Creatio. To export contacts from Creatio to Google please contact your system administrator."
	};
	var localizableImages = {
		LookUpIcon: {
			source: 3,
			params: {
				schemaName: "GoogleIntegrationSettingsModule",
				resourceItemName: "LookUpIcon",
				hash: "57863da6f1677afa7b6645da0602e9e8",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});