define("AddCampaignParticipantSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0438\u0437 \u0433\u0440\u0443\u043F\u043F\u044B",
		AddAudienceWithoutOutgoingsMessage: "\u0412 \u0441\u0445\u0435\u043C\u0435 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u0435\u0441\u0442\u044C \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B \u0431\u0435\u0437 \u0438\u0441\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u0441\u0442\u0440\u0435\u043B\u043E\u043A"
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