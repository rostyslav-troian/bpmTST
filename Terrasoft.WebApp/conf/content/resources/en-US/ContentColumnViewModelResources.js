define("ContentColumnViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ContentColumnPlaceholder: "Drop here",
		Caption: "Column",
		PropertiesPageCaption: "Column",
		PropertiesPageContextHelp: "Column is used as a container for column elements. You can drag \u0026 drop elements into column from left sidebar. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022ContentDesigner\u0022 target=\u0022_blank\u0022\u003ERead more\u003C\/a\u003E"
	};
	var localizableImages = {
		PropertiesPageIcon: {
			source: 3,
			params: {
				schemaName: "ContentColumnViewModel",
				resourceItemName: "PropertiesPageIcon",
				hash: "d004f69069057d2fc64023614a51d602",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});