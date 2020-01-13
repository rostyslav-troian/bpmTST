define("ContentSectionViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "Section",
		PropertiesPageCaption: "Section",
		PropertiesPageContextHelp: "Section card allows to configurate column structure and styles. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022ContentDesigner\u0022 target=\u0022_blank\u0022\u003ERead more\u003C\/a\u003E"
	};
	var localizableImages = {
		PropertiesPageIcon: {
			source: 3,
			params: {
				schemaName: "ContentSectionViewModel",
				resourceItemName: "PropertiesPageIcon",
				hash: "9c8d6813bb81ef17afe45722ce82bdce",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});