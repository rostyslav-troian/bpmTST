define("FacebookSocialCommunicationViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NoSynchronizationAccont: "You do not have the {0} account added. Contact your system administrator.",
		DeleteCaption: "Delete ",
		WrongEmailFormat: "Invalid email format",
		ChoosePhoneTypeCaption: "Select phone type",
		CommunicationTypePlaceholder: "Select type",
		WrongSkypeFormat: "Invalid Skype format",
		WrongPhoneFormat: "Invalid format",
		CommunicationAlreadyExist: "This communication option is already entered"
	};
	var localizableImages = {
		CallIcon: {
			source: 3,
			params: {
				schemaName: "FacebookSocialCommunicationViewModel",
				resourceItemName: "CallIcon",
				hash: "46cfb78a5bd416ce5661b64c2b441c39",
				resourceItemExtension: ".png"
			}
		},
		WebIcon: {
			source: 3,
			params: {
				schemaName: "FacebookSocialCommunicationViewModel",
				resourceItemName: "WebIcon",
				hash: "88b3c8aa23dae1d8d33fb0c5946371f2",
				resourceItemExtension: ".png"
			}
		},
		EmailIcon: {
			source: 3,
			params: {
				schemaName: "FacebookSocialCommunicationViewModel",
				resourceItemName: "EmailIcon",
				hash: "a6211f1892ba40a5dd9cc375b9d09cf3",
				resourceItemExtension: ".png"
			}
		},
		FacebookIcon: {
			source: 3,
			params: {
				schemaName: "FacebookSocialCommunicationViewModel",
				resourceItemName: "FacebookIcon",
				hash: "98abd6808d6831b32ee9e9cd923c3541",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});