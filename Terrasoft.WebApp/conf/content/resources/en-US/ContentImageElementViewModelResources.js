define("ContentImageElementViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Placeholder: "Add image",
		SetLinkInputBoxCaption: "Enter image URL",
		Caption: "Image"
	};
	var localizableImages = {
		UploadIcon: {
			source: 3,
			params: {
				schemaName: "ContentImageElementViewModel",
				resourceItemName: "UploadIcon",
				hash: "83de2204df57051bd7022fa0b2e93ccc",
				resourceItemExtension: ".png"
			}
		},
		LinkIcon: {
			source: 3,
			params: {
				schemaName: "ContentImageElementViewModel",
				resourceItemName: "LinkIcon",
				hash: "f1e13d6236c063aba2bd3b40a2b9713f",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});