define("BaseSyncSettingsEditResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MailboxExist: "This account already created by user {0}. Change the email or request access to an existing account.",
		Other: " Unable to add an account . Contact your system administrator",
		LoginError: "Invalid email or password.",
		SelectMailService: "Select mail service",
		AddNewServer: "Add New Server",
		Cancel: "Cancel",
		AuthorizationTo: "Authorization to",
		TypeEmailAddress: "email@domain.com",
		TypeUserName: "User name",
		TypePassword: "Password",
		SignIn: "Sign In",
		BackToServerList: "Choose another service",
		AddToCommunicationDetail: "Add email to contact communication detail ?",
		CheckGoogleSettingsMessage: "Make sure that your Google account allows less secure apps access.",
		ChangeSettingsButtonCaption: "CHANGE SETTINGS",
		ChangeSettingsMessage: "The email account {0} has been successfully added. Do you wish to download all emails for the last week?",
		EnterEmail: "New email account",
		Next: "Next",
		ChangeExistingSettingsMessage: "The {0} email account credentials has been successfully updated. Do you wish to download all emails for the last week?"
	};
	var localizableImages = {
		DefaultIcon: {
			source: 3,
			params: {
				schemaName: "BaseSyncSettingsEdit",
				resourceItemName: "DefaultIcon",
				hash: "6d7c8e1aa1605996771b79307f848376",
				resourceItemExtension: ".png"
			}
		},
		CloseModal: {
			source: 3,
			params: {
				schemaName: "BaseSyncSettingsEdit",
				resourceItemName: "CloseModal",
				hash: "42b5b815fe5ef39879666f4595bd892b",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});