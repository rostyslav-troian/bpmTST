define("CampaignBaseCommunicationSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CommunicationElementCaption: "\u041A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u0438",
		BaseCommunicationCaption: "\u041A\u043E\u043C\u043C\u0443\u043D\u0438\u043A\u0430\u0446\u0438\u0438"
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
				hash: "8a71d02c627f73f15dd295c6c1ce158b",
				resourceItemExtension: ".svg"
			}
		},
		TitleImage: {
			source: 3,
			params: {
				schemaName: "CampaignBaseCommunicationSchema",
				resourceItemName: "TitleImage",
				hash: "e372024f970be5e37d08516770b5a6c1",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});