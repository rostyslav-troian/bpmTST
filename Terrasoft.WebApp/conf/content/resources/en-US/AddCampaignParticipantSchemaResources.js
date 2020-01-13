define("AddCampaignParticipantSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "Add from folder",
		AddAudienceWithoutOutgoingsMessage: "There are elements without outbound connections in your campaign"
	};
	var localizableImages = {
		TitleImage: {
			source: 3,
			params: {
				schemaName: "AddCampaignParticipantSchema",
				resourceItemName: "TitleImage",
				hash: "f2664dea0f869e986ee50271010b76e3",
				resourceItemExtension: ".svg"
			}
		},
		SmallImage: {
			source: 3,
			params: {
				schemaName: "AddCampaignParticipantSchema",
				resourceItemName: "SmallImage",
				hash: "69b9cdbf17fbe450d90a27f35b90129d",
				resourceItemExtension: ".svg"
			}
		},
		LargeImage: {
			source: 3,
			params: {
				schemaName: "AddCampaignParticipantSchema",
				resourceItemName: "LargeImage",
				hash: "5513d39da665d77f4e0a3602af372b41",
				resourceItemExtension: ".svg"
			}
		},
		LargeIsRecurringImage: {
			source: 3,
			params: {
				schemaName: "AddCampaignParticipantSchema",
				resourceItemName: "LargeIsRecurringImage",
				hash: "77a8b85842d6e9504d1e4586ad6f59e1",
				resourceItemExtension: ".svg"
			}
		},
		TitleIsRecurringImage: {
			source: 3,
			params: {
				schemaName: "AddCampaignParticipantSchema",
				resourceItemName: "TitleIsRecurringImage",
				hash: "073d0d8cdf4536cc3e1428364e4a19ed",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});