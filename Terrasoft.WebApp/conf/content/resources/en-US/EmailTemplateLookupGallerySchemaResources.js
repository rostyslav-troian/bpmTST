define("EmailTemplateLookupGallerySchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		BlankSlateDescription: "Your browser is not supported.\nPlease use Chrome, Safari or Firefox in order to work with template library",
		Header: "Lookup: Email Template",
		SearchPlaceholder: "Search",
		CancelButtonCaption: "Cancel",
		SelectButtonCaption: "Select"
	};
	var localizableImages = {
		BlankSlateIcon: {
			source: 3,
			params: {
				schemaName: "EmailTemplateLookupGallerySchema",
				resourceItemName: "BlankSlateIcon",
				hash: "1b81bfab6f136e6c62e7f1bf3fe0e354",
				resourceItemExtension: ".png"
			}
		},
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "EmailTemplateLookupGallerySchema",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});