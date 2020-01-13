define("BaseCommunicationDetailResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DetailCaption: "Communication options",
		AddButtonCaption: "New",
		PhoneMenuItem: "Phone",
		SocialNetworksMenuItem: "Social",
		ValidationErrorTemplate: "Please, fill in the \u0022{0}\u0022 field",
		ErrorTemplate: "Detail {0}",
		DeleteMenuItemCaption: "Delete",
		NumberValidationErrorTemplate: "Specify a value for the communication option type \u0022{1}\u0022.",
		CommunicationTypeValidationErrorTemplate: "Specify the phone type for the communication option."
	};
	var localizableImages = {
		DeleteIcon: {
			source: 3,
			params: {
				schemaName: "BaseCommunicationDetail",
				resourceItemName: "DeleteIcon",
				hash: "2e4fa1864bb9b72bbd9f737c1bc74a10",
				resourceItemExtension: ".png"
			}
		},
		LookUpIcon: {
			source: 3,
			params: {
				schemaName: "BaseCommunicationDetail",
				resourceItemName: "LookUpIcon",
				hash: "57863da6f1677afa7b6645da0602e9e8",
				resourceItemExtension: ".png"
			}
		},
		CallIcon: {
			source: 3,
			params: {
				schemaName: "BaseCommunicationDetail",
				resourceItemName: "CallIcon",
				hash: "46cfb78a5bd416ce5661b64c2b441c39",
				resourceItemExtension: ".png"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseCommunicationDetail",
				resourceItemName: "AddButtonImage",
				hash: "db1b0d1a50235c598db887d5529030ae",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseCommunicationDetail",
				resourceItemName: "ToolsButtonImage",
				hash: "48d545549ca4ddb13d7a7bb58f60ed5e",
				resourceItemExtension: ".svg"
			}
		},
		FacebookLinkImage: {
			source: 3,
			params: {
				schemaName: "BaseCommunicationDetail",
				resourceItemName: "FacebookLinkImage",
				hash: "bb4854d6e2bd0365da65973850f2672b",
				resourceItemExtension: ".png"
			}
		},
		TwitterLinkImage: {
			source: 3,
			params: {
				schemaName: "BaseCommunicationDetail",
				resourceItemName: "TwitterLinkImage",
				hash: "3f434f54d75c08a2406dff80adbbde30",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});