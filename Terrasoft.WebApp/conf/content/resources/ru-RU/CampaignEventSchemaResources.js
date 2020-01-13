define("CampaignEventSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "\u041C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0435"
	};
	var localizableImages = {
		TitleImage: {
			source: 3,
			params: {
				schemaName: "CampaignEventSchema",
				resourceItemName: "TitleImage",
				hash: "1ca80d760219cbd658631dbb91ab1852",
				resourceItemExtension: ".svg"
			}
		},
		LargeImage: {
			source: 3,
			params: {
				schemaName: "CampaignEventSchema",
				resourceItemName: "LargeImage",
				hash: "c38d8194a29f50bc53abd01f539f89b7",
				resourceItemExtension: ".svg"
			}
		},
		SmallImage: {
			source: 3,
			params: {
				schemaName: "CampaignEventSchema",
				resourceItemName: "SmallImage",
				hash: "0b298f2347adb37c45e1b2b9a2373cb8",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});