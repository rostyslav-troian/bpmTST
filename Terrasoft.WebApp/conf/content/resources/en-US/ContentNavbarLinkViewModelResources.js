define("ContentNavbarLinkViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "Link",
		PropertiesPageCaption: "Navigation link",
		PropertiesPageContextHelp: "This component should be used to display an individual link in the navbar. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022ContentDesigner\u0022 target=\u0022_blank\u0022\u003ERead more\u003C\/a\u003E"
	};
	var localizableImages = {
		PropertiesPageIcon: {
			source: 3,
			params: {
				schemaName: "ContentNavbarLinkViewModel",
				resourceItemName: "PropertiesPageIcon",
				hash: "9fa2d8be87604780ac859bccdd2ceabd",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});