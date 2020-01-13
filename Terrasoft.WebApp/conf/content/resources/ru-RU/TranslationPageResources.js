define("TranslationPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		FieldLockHint: "\u041D\u0435\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u043E\u0435 \u043F\u043E\u043B\u0435",
		ClearButtonHint: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u043E\u043B\u0435",
		BackButtonCaption: "\u041D\u0430\u0437\u0430\u0434",
		NextButtonCaption: "\u0414\u0430\u043B\u0435\u0435",
		HeaderCaption: "\u041F\u0435\u0440\u0435\u0432\u043E\u0434",
		ExpandButton_ExpandCaption: "\u041E\u0442\u043E\u0431\u0440\u0430\u0437\u0438\u0442\u044C \u0432\u0441\u0435 \u044F\u0437\u044B\u043A\u0438",
		ExpandButton_CollapseCaption: "\u0421\u043A\u0440\u044B\u0442\u044C"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "TranslationPage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "TranslationPage",
				resourceItemName: "CloseButtonImage",
				hash: "bcf2d4125a9751584d37cd8d0be121ca",
				resourceItemExtension: ".svg"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "TranslationPage",
				resourceItemName: "ProcessButtonImage",
				hash: "9903e902413ee697cc93f90b0ba60b42",
				resourceItemExtension: ".png"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "TranslationPage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		NavigationButtonImage: {
			source: 3,
			params: {
				schemaName: "TranslationPage",
				resourceItemName: "NavigationButtonImage",
				hash: "4f76d5aca0dfe230aeeda4032d9904b1",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});