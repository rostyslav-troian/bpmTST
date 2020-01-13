define("ContentButtonPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		textType: "Text",
		iconType: "Icon",
		TextColor: "Text color",
		ImageUrlPlaceholder: "Enter URL or select file",
		Align: "Align",
		ImageEmbedded: "Image embedded",
		LinkToOpen: "Link to open",
		ButtonType: "It will be text or icon?",
		Width: "Width",
		Height: "Height",
		AltText: "Alternative text",
		Margin: "Margin, px",
		SizeLabel: "Size, px",
		HorizontalAlign: "Horizontal"
	};
	var localizableImages = {
		UploadBackgroundImage: {
			source: 3,
			params: {
				schemaName: "ContentButtonPropertiesPage",
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