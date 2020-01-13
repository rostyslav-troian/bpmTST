define("ContentMjImageElementViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PropertiesPageCaption: "Element image",
		PropertiesPageContextHelp: "Image element used for image display. Jpeg and gif formats are recommended for use. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022ContentDesigner\u0022 target=\u0022_blank\u0022\u003ERead more\u003C\/a\u003E",
		Placeholder: "Pick image"
	};
	var localizableImages = {
		PropertiesPageIcon: {
			source: 3,
			params: {
				schemaName: "ContentMjImageElementViewModel",
				resourceItemName: "PropertiesPageIcon",
				hash: "a1fb06b3550fd68cec7d3cdf613e702e",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});