define("TimelineFiltersSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ApplyEntityFilterButtonCaption: "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",
		AllEntityFilterButtonCaption: "\u0412\u0441\u0435",
		SearchPlaceHolder: "\u041F\u043E\u0438\u0441\u043A...",
		OwnerFilterCaption: "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439"
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