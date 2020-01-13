define("StructureExploreModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		LookupColumnSelectError: "Select lookup value",
		ItemColumnSelectError: "Specify value for selected column",
		CountDisplayValue: "Quantity(#Caption#)"
	};
	var localizableImages = {
		ExpandImage: {
			source: 3,
			params: {
				schemaName: "StructureExploreModule",
				resourceItemName: "ExpandImage",
				hash: "10f59221e2a3ba90b26c94fa2f720261",
				resourceItemExtension: ".png"
			}
		},
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "StructureExploreModule",
				resourceItemName: "CloseIcon",
				hash: "d83fcc9d4e31559d6f903a11f6d528bd",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});