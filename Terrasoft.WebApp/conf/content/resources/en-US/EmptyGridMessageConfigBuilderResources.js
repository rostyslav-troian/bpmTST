define("EmptyGridMessageConfigBuilderResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmptyInfoTitle: "This section has no records.",
		EmptyInfoRecommendation: "Learn more about this section from the {0}.",
		EmptyInfoDescription: "Add a new record to make it look prettier.",
		EmptyInfoAcademyUrlCaption: "Academy"
	};
	var localizableImages = {
		InfoIcon: {
			source: 3,
			params: {
				schemaName: "EmptyGridMessageConfigBuilder",
				resourceItemName: "InfoIcon",
				hash: "f7367adb83003fc8600e74023d24be5c",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});