define("CampaignBaseAudienceSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AudienceElementGroupCaption: "\u0410\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F",
		BaseAudienceCaption: "\u0410\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F \u0438\u0437 \u0433\u0440\u0443\u043F\u043F\u044B"
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