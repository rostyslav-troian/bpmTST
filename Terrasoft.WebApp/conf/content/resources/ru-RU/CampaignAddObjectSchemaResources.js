define("CampaignAddObjectSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435"
	};
	var localizableImages = {
		TitleImage: {
			source: 3,
			params: {
				schemaName: "CampaignAddObjectSchema",
				resourceItemName: "TitleImage",
				hash: "6b442b634570979fec1c488e133b7727",
				resourceItemExtension: ".svg"
			}
		},
		LargeImage: {
			source: 3,
			params: {
				schemaName: "CampaignAddObjectSchema",
				resourceItemName: "LargeImage",
				hash: "a7077f15b9cc0b8d0c4a785fba62ed53",
				resourceItemExtension: ".svg"
			}
		},
		SmallImage: {
			source: 3,
			params: {
				schemaName: "CampaignAddObjectSchema",
				resourceItemName: "SmallImage",
				hash: "e1b5aa118b786a6bbc517e8c17674add",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});