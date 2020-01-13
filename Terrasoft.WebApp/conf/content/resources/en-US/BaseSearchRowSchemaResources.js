define("BaseSearchRowSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EntitySchemaLabelCaption: "Object",
		NotFilled: "(not filled in)"
	};
	var localizableImages = {
		DefaultSearchImage: {
			source: 3,
			params: {
				schemaName: "BaseSearchRowSchema",
				resourceItemName: "DefaultSearchImage",
				hash: "70fea2e411ff6cb982b29ce36dc76835",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});