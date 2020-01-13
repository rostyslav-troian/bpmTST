define("CampaignBaseCommunicationSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CommunicationElementCaption: "Communication",
		BaseCommunicationCaption: "Communication"
	};
	var localizableImages = {
		SmallImage: {
			source: 3,
			params: {
				schemaName: "CampaignBaseCommunicationSchema",
				resourceItemName: "SmallImage",
				hash: "931fade2b900efd0bfb12dd3327be623",
				resourceItemExtension: ".svg"
			}
		},
		LargeImage: {
			source: 3,
			params: {
				schemaName: "CampaignBaseCommunicationSchema",
				resourceItemName: "LargeImage",
				hash: "931fade2b900efd0bfb12dd3327be623",
				resourceItemExtension: ".svg"
			}
		},
		TitleImage: {
			source: 3,
			params: {
				schemaName: "CampaignBaseCommunicationSchema",
				resourceItemName: "TitleImage",
				hash: "931fade2b900efd0bfb12dd3327be623",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});