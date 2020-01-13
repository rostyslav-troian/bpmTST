define("PageTypeSettingsPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		TypeColumnCaption: "Which field will determine the page layout?",
		TypeValueCaption: "Select the value of the \u0022{0}\u0022 field for which the new page will be used",
		HeaderCaption: "New page",
		ContinueButtonCaption: "Continue",
		SchemaCaptionColumnCaption: "Page name"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "PageTypeSettingsPage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "PageTypeSettingsPage",
				resourceItemName: "CloseButtonImage",
				hash: "bcf2d4125a9751584d37cd8d0be121ca",
				resourceItemExtension: ".svg"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "PageTypeSettingsPage",
				resourceItemName: "ProcessButtonImage",
				hash: "9903e902413ee697cc93f90b0ba60b42",
				resourceItemExtension: ".png"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "PageTypeSettingsPage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});