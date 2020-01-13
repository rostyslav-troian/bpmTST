define("CommunicationDetailResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Phones: "Phone",
		Socials: "Social",
		Restrictions: "Do not use",
		DoNotUseEmail: "Email",
		DoNotUseCall: "Phone",
		DoNotUseSms: "SMS",
		DoNotUseFax: "Fax",
		DoNotUseMail: "Mail"
	};
	var localizableImages = {
		DeleteIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationDetail",
				resourceItemName: "DeleteIcon",
				hash: "d83fcc9d4e31559d6f903a11f6d528bd",
				resourceItemExtension: ".png"
			}
		},
		FacebookIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationDetail",
				resourceItemName: "FacebookIcon",
				hash: "8547a0daaa93b5f195d09054aab951ae",
				resourceItemExtension: ".png"
			}
		},
		TwitterIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationDetail",
				resourceItemName: "TwitterIcon",
				hash: "6c95906087f68befcf0931d821d4d72d",
				resourceItemExtension: ".png"
			}
		},
		LinkedInIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationDetail",
				resourceItemName: "LinkedInIcon",
				hash: "f28fe0b02d1e4ac484828c92df576fca",
				resourceItemExtension: ".png"
			}
		},
		GoogleIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationDetail",
				resourceItemName: "GoogleIcon",
				hash: "5eafd363283b3255983d1408b06dfa68",
				resourceItemExtension: ".png"
			}
		},
		LookUpIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationDetail",
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