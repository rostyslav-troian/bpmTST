define("ContentItemStylesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		BackgroundColorLabelCaption: "Background color",
		BackgroundLabelCaption: "Background",
		BordersLabelCaption: "Borders",
		BorderWidthLabelCaption: "Width, px",
		BorderColorLabelCaption: "Color",
		BorderStyleLabelCaption: "Style",
		BorderTopLabelCaption: "Top",
		BorderBottomLabelCaption: "Bottom",
		BorderLeftLabelCaption: "Left",
		BorderRightLabelCaption: "Right",
		BorderRadiusLabelCaption: "Corner radius, px",
		CustomStylesLabelCaption: "Custom styles",
		InvalidStylesJson: "Please specify valid CSS attributes in JSON format",
		PaddingTopCaption: "Top",
		PaddingBottomCaption: "Bottom",
		PaddingLeftCaption: "Left",
		PaddingRightCaption: "Right",
		PaddingCaption: "Padding, px",
		BackgroundImageUrlPlaceholder: "Enter URL",
		ImageEmbedded: "Image embedded",
		UseBackgroundMobileImage: "Use other image on mobile",
		BackgroundInfo: "Background image doesn\u0027t work in some email clients, for example, Outlook desktop. Please select suitable background color that will be displayed instead of the image."
	};
	var localizableImages = {
		UploadBackgroundImage: {
			source: 3,
			params: {
				schemaName: "ContentItemStylesPage",
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