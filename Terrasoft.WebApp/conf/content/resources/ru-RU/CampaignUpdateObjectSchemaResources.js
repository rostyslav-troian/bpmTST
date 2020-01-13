define("CampaignUpdateObjectSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435"
	};
	var localizableImages = {
		TitleImage: {
			source: 3,
			params: {
				schemaName: "CampaignUpdateObjectSchema",
				resourceItemName: "TitleImage",
				hash: "b717fc34740e725b5f01bd20740e47e4",
				resourceItemExtension: ".svg"
			}
		},
		LargeImage: {
			source: 3,
			params: {
				schemaName: "CampaignUpdateObjectSchema",
				resourceItemName: "LargeImage",
				hash: "f5334933c8980cc7a404e4de0529851b",
				resourceItemExtension: ".svg"
			}
		},
		SmallImage: {
			source: 3,
			params: {
				schemaName: "CampaignUpdateObjectSchema",
				resourceItemName: "SmallImage",
				hash: "0681ebb7d48bf12331c6f229bc59535a",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});