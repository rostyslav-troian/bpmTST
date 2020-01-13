define("CampaignUpdateObjectSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "Modify data"
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