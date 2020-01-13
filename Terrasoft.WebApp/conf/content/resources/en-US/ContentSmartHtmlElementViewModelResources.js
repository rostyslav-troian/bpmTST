define("ContentSmartHtmlElementViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Placeholder: "Place for your html",
		Caption: "Smart block",
		PropertiesPageCaption: "Element smart block",
		PropertiesPageContextHelp: "Allows to insert custom HTML code into template. Macro functionality allows to insert custom values without HTML codding. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022ContentDesigner\u0022 target=\u0022_blank\u0022\u003ERead more\u003C\/a\u003E"
	};
	var localizableImages = {
		PropertiesPageIcon: {
			source: 3,
			params: {
				schemaName: "ContentSmartHtmlElementViewModel",
				resourceItemName: "PropertiesPageIcon",
				hash: "aef65f30a49e8a1757105f85599d69e7",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});