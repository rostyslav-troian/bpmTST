define("CheckedCommunicationViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NonActualCaption: "(invalid)",
		NoSynchronizationAccont: "You do not have the {0} account added. Contact your system administrator.",
		DeleteCaption: "Delete ",
		WrongEmailFormat: "Invalid email format",
		CommunicationTypePlaceholder: "Select type",
		WrongSkypeFormat: "Invalid Skype format",
		WrongPhoneFormat: "Invalid format",
		CommunicationAlreadyExist: "This communication option is already entered"
	};
	var localizableImages = {
		CheckboxIcon: {
			source: 3,
			params: {
				schemaName: "CheckedCommunicationViewModel",
				resourceItemName: "CheckboxIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		CallIcon: {
			source: 3,
			params: {
				schemaName: "CheckedCommunicationViewModel",
				resourceItemName: "CallIcon",
				hash: "46cfb78a5bd416ce5661b64c2b441c39",
				resourceItemExtension: ".png"
			}
		},
		WebIcon: {
			source: 3,
			params: {
				schemaName: "CheckedCommunicationViewModel",
				resourceItemName: "WebIcon",
				hash: "88b3c8aa23dae1d8d33fb0c5946371f2",
				resourceItemExtension: ".png"
			}
		},
		EmailIcon: {
			source: 3,
			params: {
				schemaName: "CheckedCommunicationViewModel",
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