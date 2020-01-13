define("SocialCommunicationViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ChoosePhoneTypeCaption: "Select phone type",
		NoSynchronizationAccont: "You do not have the {0} account added. Contact your system administrator.",
		DeleteCaption: "Delete ",
		WrongEmailFormat: "Invalid email format",
		CommunicationTypePlaceholder: "Select type",
		WrongSkypeFormat: "Invalid Skype format",
		WrongPhoneFormat: "Invalid format",
		CommunicationAlreadyExist: "This communication option is already entered"
	};
	var localizableImages = {
		CallIcon: {
			source: 3,
			params: {
				schemaName: "SocialCommunicationViewModel",
				resourceItemName: "CallIcon",
				hash: "46cfb78a5bd416ce5661b64c2b441c39",
				resourceItemExtension: ".png"
			}
		},
		WebIcon: {
			source: 3,
			params: {
				schemaName: "SocialCommunicationViewModel",
				resourceItemName: "WebIcon",
				hash: "88b3c8aa23dae1d8d33fb0c5946371f2",
				resourceItemExtension: ".png"
			}
		},
		EmailIcon: {
			source: 3,
			params: {
				schemaName: "SocialCommunicationViewModel",
				resourceItemName: "EmailIcon",
				hash: "a6211f1892ba40a5dd9cc375b9d09cf3",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});