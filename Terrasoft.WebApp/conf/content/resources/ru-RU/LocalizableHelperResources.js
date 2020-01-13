define("LocalizableHelperResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Delete: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
		Hide: "\u0421\u043A\u0440\u044B\u0442\u044C",
		DownButtonHint: "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u043D\u0438\u0437",
		UpButtonHint: "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u0432\u0435\u0440\u0445"
	};
	var localizableImages = {
		Up: {
			source: 3,
			params: {
				schemaName: "LocalizableHelper",
				resourceItemName: "Up",
				hash: "aac1ec77a411fa5c2ce5163471baa477",
				resourceItemExtension: ".png"
			}
		},
		Down: {
			source: 3,
			params: {
				schemaName: "LocalizableHelper",
				resourceItemName: "Down",
				hash: "a816fcf51356b91d5c02e8c0573788d6",
				resourceItemExtension: ".png"
			}
		},
		ButtonUp: {
			source: 3,
			params: {
				schemaName: "LocalizableHelper",
				resourceItemName: "ButtonUp",
				hash: "510e82625d76cee0b159a72db31a1f0b",
				resourceItemExtension: ".png"
			}
		},
		ButtonDown: {
			source: 3,
			params: {
				schemaName: "LocalizableHelper",
				resourceItemName: "ButtonDown",
				hash: "1292c9b65f1eef3f62166e791b20f53c",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});