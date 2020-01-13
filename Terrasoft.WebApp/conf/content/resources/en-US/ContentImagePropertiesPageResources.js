define("ContentImagePropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ImageEmbedded: "Image embedded",
		ImageUrlPlaceholder: "Enter URL or select file",
		ImageOptionsLabel: "Image options",
		ImageHrefLabel: "Link to open",
		ImageWidth: "Width",
		ImageHeight: "Height",
		ImageAltText: "Alternative text",
		ImageAlign: "Align",
		UseMobileImage: "Use other image on mobile",
		ImageTitleText: "Title"
	};
	var localizableImages = {
		UploadBackgroundImage: {
			source: 3,
			params: {
				schemaName: "ContentImagePropertiesPage",
				resourceItemName: "UploadBackgroundImage",
				hash: "da75d6ef5ad6358e274fc9acc115bded",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});