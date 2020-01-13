define("OpportunitySearchRowSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ClientColumnCaption: "Customer"
	};
	var localizableImages = {
		DefaultSearchImage: {
			source: 3,
			params: {
				schemaName: "OpportunitySearchRowSchema",
				resourceItemName: "DefaultSearchImage",
				hash: "70fea2e411ff6cb982b29ce36dc76835",
				resourceItemExtension: ".svg"
			}
		},
		DefaultMood: {
			source: 3,
			params: {
				schemaName: "OpportunitySearchRowSchema",
				resourceItemName: "DefaultMood",
				hash: "c4cfa03b4fb5255fa0aa352546141efe",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});