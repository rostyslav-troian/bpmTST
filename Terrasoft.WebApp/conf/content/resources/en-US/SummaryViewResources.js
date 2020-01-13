define("SummaryViewResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OpenSettingPageCaption: "Set up summaries",
		OpenGridSettingsPageCaption: "Select fields to display"
	};
	var localizableImages = {
		ImageDeleteButton: {
			source: 3,
			params: {
				schemaName: "SummaryView",
				resourceItemName: "ImageDeleteButton",
				hash: "b8a7008452ec672bd9c284d5e83091c1",
				resourceItemExtension: ".png"
			}
		},
		ImageOpenButton: {
			source: 3,
			params: {
				schemaName: "SummaryView",
				resourceItemName: "ImageOpenButton",
				hash: "44a879bb391b7fbfb8031c43bccade79",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});