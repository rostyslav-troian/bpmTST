define("ProfileModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SetupCallCentreParameters: "Call Center parameters setup",
		childSaveButtonCaption: "Save",
		childCancelButtonCaption: "Cancel",
		childHeaderCaption: "User profile: {0}",
		childAccountsCaption: "User accounts",
		childSocialNetworkAccountsCaption: "Accounts in external resources",
		childPostBoxCaption: "Email accounts",
		childCallCenterCaption: "Call center",
		childChangePasswordCaption: "Change password",
		childDefaultSettingsCaption: "Restore default settings",
		childMyCommandsCaption: "Command line settings",
		childLanguageCaption: "Localization",
		childEnLanguageCaption: "English",
		childRuLanguageCaption: "Russian",
		childMailboxesCaption: "Email accounts",
		childFlashSuccessful: "Settings restored",
		childOnFlashError: "Error occurred while restoring",
		childOnFlashWarning: "Restore default settings?",
		childChangeTimeZoneMessage: "The time zone has been changed successfully. The changes will take effect with the next authorization.",
		childDisplayNotificationsCaption: "Display the notifications",
		childDisplayNotificationsAllowCaption: "Notifications display is permitted",
		childDisplayNotificationsDeniedCaption: "Notifications display is forbidden",
		NotificationsSettingsCaption: "Notification settings",
		displayNotificationsCaption: "Display the notifications",
		displayNotificationsAllowCaption: "Notifications display is permitted",
		displayNotificationsDeniedCaption: "Notifications display is forbidden",
		saveButtonCaption: "Save",
		cancelButtonCaption: "Cancel",
		headerCaption: "User profile: {0}",
		accountsCaption: "User accounts",
		socialNetworkAccountsCaption: "Accounts in external resources",
		postBoxCaption: "Email accounts",
		callCenterCaption: "Call center",
		changePasswordCaption: "Change password",
		defaultSettingsCaption: "Restore default settings",
		myCommandsCaption: "Command line settings",
		languageCaption: "Localization",
		enLanguageCaption: "English",
		ruLanguageCaption: "Russian",
		mailboxesCaption: "Email accounts",
		flashSuccessful: "Settings restored",
		onFlashError: "Error occurred while restoring",
		onFlashWarning: "Restore default settings?",
		changeTimeZoneMessage: "The time zone has been changed successfully. The changes will take effect with the next authorization."
	};
	var localizableImages = {
		ImagePhoto: {
			source: 3,
			params: {
				schemaName: "ProfileModule",
				resourceItemName: "ImagePhoto",
				hash: "4b177430ad9dfd06fb56c61bfd4f9b60",
				resourceItemExtension: ".jpg"
			}
		},
		ChildImagePhoto: {
			source: 3,
			params: {
				schemaName: "ProfileModule",
				resourceItemName: "ChildImagePhoto",
				hash: "4b177430ad9dfd06fb56c61bfd4f9b60",
				resourceItemExtension: ".jpg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});