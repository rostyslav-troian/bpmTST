define("SummaryViewResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OpenSettingPageCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0438\u0442\u043E\u0433\u0438",
		OpenGridSettingsPageCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043A\u043E\u043B\u043E\u043D\u043A\u0438"
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