define("CampaignStartSignalSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddAudienceWithoutOutgoingsMessage: "There are elements without outbound connections in your campaign",
		Caption: "Triggered adding"
	};
	var localizableImages = {
		TitleImage: {
			source: 3,
			params: {
				schemaName: "CampaignStartSignalSchema",
				resourceItemName: "TitleImage",
				hash: "8afd000637c51ac9e0500a1c24af5bde",
				resourceItemExtension: ".svg"
			}
		},
		LargeImage: {
			source: 3,
			params: {
				schemaName: "CampaignStartSignalSchema",
				resourceItemName: "LargeImage",
				hash: "1ca0546dd517507896fc5aa040c06c9e",
				resourceItemExtension: ".svg"
			}
		},
		SmallImage: {
			source: 3,
			params: {
				schemaName: "CampaignStartSignalSchema",
				resourceItemName: "SmallImage",
				hash: "b9f24b796faadf7226fe7c1e3c60cc98",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});