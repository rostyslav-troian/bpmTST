define("CampaignBaseAudienceSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AudienceElementGroupCaption: "Audience",
		BaseAudienceCaption: "Audience from group"
	};
	var localizableImages = {
		SmallImage: {
			source: 3,
			params: {
				schemaName: "CampaignBaseAudienceSchema",
				resourceItemName: "SmallImage",
				hash: "927a6ff24a63fa76fbbba12879842714",
				resourceItemExtension: ".svg"
			}
		},
		LargeImage: {
			source: 3,
			params: {
				schemaName: "CampaignBaseAudienceSchema",
				resourceItemName: "LargeImage",
				hash: "fe8ca668769b6d6974ed2950d2dfba72",
				resourceItemExtension: ".svg"
			}
		},
		TitleImage: {
			source: 3,
			params: {
				schemaName: "CampaignBaseAudienceSchema",
				resourceItemName: "TitleImage",
				hash: "debffd344d5b77b1bf307ea0e2331e60",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});