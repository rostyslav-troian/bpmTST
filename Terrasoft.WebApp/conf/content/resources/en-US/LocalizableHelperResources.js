define("LocalizableHelperResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Delete: "Delete",
		Hide: "Hide",
		DownButtonHint: "Move down",
		UpButtonHint: "Move up"
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