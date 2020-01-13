define("MarketingEmailSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "Marketing email",
		AsyncWithoutIncomingsMessage: "There are elements without inbound connections in your campaign"
	};
	var localizableImages = {
		TitleImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailSchema",
				resourceItemName: "TitleImage",
				hash: "e372024f970be5e37d08516770b5a6c1",
				resourceItemExtension: ".svg"
			}
		},
		LargeImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailSchema",
				resourceItemName: "LargeImage",
				hash: "8a71d02c627f73f15dd295c6c1ce158b",
				resourceItemExtension: ".svg"
			}
		},
		SmallImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailSchema",
				resourceItemName: "SmallImage",
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