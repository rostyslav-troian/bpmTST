define("ContentButtonElementViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Placeholder: "Add image",
		SetLinkInputBoxCaption: "Enter image URL"
	};
	var localizableImages = {
		UploadIcon: {
			source: 3,
			params: {
				schemaName: "ContentButtonElementViewModel",
				resourceItemName: "UploadIcon",
				hash: "5b77f0baff088fc67cfb77aeba8626d5",
				resourceItemExtension: ".svg"
			}
		},
		LinkIcon: {
			source: 3,
			params: {
				schemaName: "ContentButtonElementViewModel",
				resourceItemName: "LinkIcon",
				hash: "fc6346f465ad1a54e0b074011b92257a",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});