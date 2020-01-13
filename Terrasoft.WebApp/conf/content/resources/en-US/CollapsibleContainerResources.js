define("CollapsibleContainerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ShowMoreCaption: "Show more",
		ShowLessCaption: "Collapse"
	};
	var localizableImages = {
		ShowMoreLessImage: {
			source: 3,
			params: {
				schemaName: "CollapsibleContainer",
				resourceItemName: "ShowMoreLessImage",
				hash: "02c364663d49378639a251195f58d1ad",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});