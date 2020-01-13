define("CampaignBaseElementSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {

	};
	var localizableImages = {
		SmallImage: {
			source: 3,
			params: {
				schemaName: "CampaignBaseElementSchema",
				resourceItemName: "SmallImage"
			}
		},
		LargeImage: {
			source: 3,
			params: {
				schemaName: "CampaignBaseElementSchema",
				resourceItemName: "LargeImage"
			}
		},
		TitleImage: {
			source: 3,
			params: {
				schemaName: "CampaignBaseElementSchema",
				resourceItemName: "TitleImage"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});