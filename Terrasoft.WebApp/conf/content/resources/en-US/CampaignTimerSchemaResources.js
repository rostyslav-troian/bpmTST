define("CampaignTimerSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		IntermediatesGroupCaption: "Intermediate elements",
		Caption: "Timer"
	};
	var localizableImages = {
		TitleImage: {
			source: 3,
			params: {
				schemaName: "CampaignTimerSchema",
				resourceItemName: "TitleImage",
				hash: "5db6938ef34e8d06a02ef6b0441ae878",
				resourceItemExtension: ".svg"
			}
		},
		LargeImage: {
			source: 3,
			params: {
				schemaName: "CampaignTimerSchema",
				resourceItemName: "LargeImage",
				hash: "bd77372d2bc3e244ebcab74f85f18c77",
				resourceItemExtension: ".svg"
			}
		},
		SmallImage: {
			source: 3,
			params: {
				schemaName: "CampaignTimerSchema",
				resourceItemName: "SmallImage",
				hash: "4a93266baa40d4184dc0c1cee233fdb9",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});