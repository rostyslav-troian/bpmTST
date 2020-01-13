define("ContactCommunicationDetailV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DetailCaption: "Communication options",
		AddButtonCaption: "New",
		DoNotUseEmail: "Do not use email",
		DoNotUseCall: "Do not use phone",
		DoNotUseSms: "Do not use SMS",
		DoNotUseFax: "Do not use fax",
		DoNotUseMail: "Do not use mail",
		DoNotUseEmailCaption: "Email",
		DoNotUseCallCaption: "Phone",
		DoNotUseSmsCaption: "SMS",
		DoNotUseFaxCaption: "Fax",
		DoNotUseMailCaption: "Mail",
		DoNotUseCommunicationCaption: "Do not use",
		PhoneMenuItem: "Phone",
		SocialNetworksMenuItem: "Social",
		ValidationErrorTemplate: "The {0} detail is invalid"
	};
	var localizableImages = {
		DeleteIcon: {
			source: 3,
			params: {
				schemaName: "ContactCommunicationDetailV2",
				resourceItemName: "DeleteIcon",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		LookUpIcon: {
			source: 3,
			params: {
				schemaName: "ContactCommunicationDetailV2",
				resourceItemName: "LookUpIcon",
				hash: "57863da6f1677afa7b6645da0602e9e8",
				resourceItemExtension: ".png"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "ContactCommunicationDetailV2",
				resourceItemName: "AddButtonImage",
				hash: "db1b0d1a50235c598db887d5529030ae",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ContactCommunicationDetailV2",
				resourceItemName: "ToolsButtonImage",
				hash: "48d545549ca4ddb13d7a7bb58f60ed5e",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});