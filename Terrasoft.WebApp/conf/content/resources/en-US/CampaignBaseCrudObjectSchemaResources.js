define("CampaignBaseCrudObjectSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "Base CRUD entity element",
		SystemActionsGroupCaption: "System Actions"
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