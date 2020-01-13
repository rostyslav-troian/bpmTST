define("EmptyPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmptyPageCaption: "No item selected.\n\nPlease select an item to see its properties.",
		AcademyMessage: "Learn more about dynamic case management (DCM) in the {0}Academy{1}."
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "EmptyPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		EmptyImage: {
			source: 3,
			params: {
				schemaName: "EmptyPropertiesPage",
				resourceItemName: "EmptyImage",
				hash: "ca18e353b42622e84a793ee8ffd2b7b8",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});