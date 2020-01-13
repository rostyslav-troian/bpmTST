define("ContentMjHeroViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ContentColumnPlaceholder: "Drop here",
		Caption: "Banner",
		PropertiesPageCaption: "Banner",
		PropertiesPageContextHelp: "Display a section with a background image and some content inside (text, button, image ...). The height attribute is required for correct work in most clients. For better result we encourage you to use a background image width equal to the hero container width and always specify a fallback background color, in case the user email client does not support background images. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022ContentDesigner\u0022 target=\u0022_blank\u0022\u003ERead more\u003C\/a\u003E"
	};
	var localizableImages = {
		PropertiesPageIcon: {
			source: 3,
			params: {
				schemaName: "ContentMjHeroViewModel",
				resourceItemName: "PropertiesPageIcon",
				hash: "b1b83d55f4e80c031a1406206cce7b92",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});