define("DashboardManagerItemResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CopyCaptionFormat: "{0} - Copy",
		InvalidJSONMessage: "Error while initializing dashboard \u0022{0}\u0022: \u0022{1}\u0022",
		CantShowDashboard: "Cannot display dashboard",
		CantShowDashboardHint: "Contact your system administrator"
	};
	var localizableImages = {
		InfoImage: {
			source: 3,
			params: {
				schemaName: "DashboardManagerItem",
				resourceItemName: "InfoImage",
				hash: "84410c143d7a4e3bfdbeda3db0408fca",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});