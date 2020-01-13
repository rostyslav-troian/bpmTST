define("TimelineFiltersSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ApplyEntityFilterButtonCaption: "Apply",
		AllEntityFilterButtonCaption: "All",
		SearchPlaceHolder: "Search...",
		OwnerFilterCaption: "Owner"
	};
	var localizableImages = {
		FilterImage: {
			source: 3,
			params: {
				schemaName: "TimelineFiltersSchema",
				resourceItemName: "FilterImage",
				hash: "31bd325b9d223868893ac5b0a8617a62",
				resourceItemExtension: ".svg"
			}
		},
		LookUpIcon: {
			source: 3,
			params: {
				schemaName: "TimelineFiltersSchema",
				resourceItemName: "LookUpIcon",
				hash: "f84bb0f3fd1e8cb28d062391ad2ae959",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});