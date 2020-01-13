define("ContentMjTextElementViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Placeholder: "Enter your text here",
		Caption: "Text",
		PropertiesPageCaption: "Element text",
		PropertiesPageContextHelp: "Canvas editor allows to specify text styles, right sidebar controls styles for text container. If no properties set in canvas editor, content builder will use standards. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022ContentDesigner\u0022 target=\u0022_blank\u0022\u003ERead more\u003C\/a\u003E"
	};
	var localizableImages = {
		PropertiesPageIcon: {
			source: 3,
			params: {
				schemaName: "ContentMjTextElementViewModel",
				resourceItemName: "PropertiesPageIcon",
				hash: "e9b7782a101dbe699564750e27b4c2ad",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});