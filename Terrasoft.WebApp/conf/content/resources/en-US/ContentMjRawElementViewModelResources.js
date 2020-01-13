define("ContentMjRawElementViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Placeholder: "Place for your html",
		Caption: "HTML",
		PropertiesPageCaption: "Element HTML",
		PropertiesPageContextHelp: "Element used to insert custom html into template. In order to use your custom html template, please create single block with html element and paste all content. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022ContentDesigner\u0022 target=\u0022_blank\u0022\u003ERead more\u003C\/a\u003E"
	};
	var localizableImages = {
		PropertiesPageIcon: {
			source: 3,
			params: {
				schemaName: "ContentMjRawElementViewModel",
				resourceItemName: "PropertiesPageIcon",
				hash: "766734280b15105d7e0814f2fb97f12a",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});