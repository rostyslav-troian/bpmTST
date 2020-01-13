define("CampaignLandingSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "\u041B\u0435\u043D\u0434\u0438\u043D\u0433"
	};
	var localizableImages = {
		TitleImage: {
			source: 3,
			params: {
				schemaName: "CampaignLandingSchema",
				resourceItemName: "TitleImage",
				hash: "157585f1385b6a71e7be45d3e4ec2394",
				resourceItemExtension: ".svg"
			}
		},
		LargeImage: {
			source: 3,
			params: {
				schemaName: "CampaignLandingSchema",
				resourceItemName: "LargeImage",
				hash: "34e0ffa499de428d5f41df340cf633da",
				resourceItemExtension: ".svg"
			}
		},
		SmallImage: {
			source: 3,
			params: {
				schemaName: "CampaignLandingSchema",
				resourceItemName: "SmallImage",
				hash: "fd503091b30f455bcd636be7a19849da",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});