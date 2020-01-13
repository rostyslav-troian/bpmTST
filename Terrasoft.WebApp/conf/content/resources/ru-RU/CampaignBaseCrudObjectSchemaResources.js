define("CampaignBaseCrudObjectSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "\u0411\u0430\u0437\u043E\u0432\u044B\u0439 CRUD \u044D\u043B\u0435\u043C\u0435\u043D\u0442",
		SystemActionsGroupCaption: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F"
	};
	var localizableImages = {
		TitleImage: {
			source: 3,
			params: {
				schemaName: "CampaignBaseCrudObjectSchema",
				resourceItemName: "TitleImage",
				hash: "1f374a49c38ead044d75308a2dd49a6b",
				resourceItemExtension: ".svg"
			}
		},
		SmallImage: {
			source: 3,
			params: {
				schemaName: "CampaignBaseCrudObjectSchema",
				resourceItemName: "SmallImage",
				hash: "1f374a49c38ead044d75308a2dd49a6b",
				resourceItemExtension: ".svg"
			}
		},
		LargeImage: {
			source: 3,
			params: {
				schemaName: "CampaignBaseCrudObjectSchema",
				resourceItemName: "LargeImage",
				hash: "1f374a49c38ead044d75308a2dd49a6b",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});