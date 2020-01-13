define("FileImportStartPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		UploadFileButtonCaption: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B",
		DragAndDropContainerCaption: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0441\u044E\u0434\u0430 \u0444\u0430\u0439\u043B \u0438\u043B\u0438",
		FileNotSelectedMessage: "\u041D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D \u0444\u0430\u0439\u043B \u0434\u043B\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0434\u0430\u043D\u043D\u044B\u0445. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443.",
		InvalidFileTypeMessage: "\u0412\u044B \u0432\u044B\u0431\u0440\u0430\u043B\u0438 \u0444\u0430\u0439\u043B, \u0442\u0438\u043F \u043A\u043E\u0442\u043E\u0440\u043E\u0433\u043E \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B Excel (.xlsx).",
		EmptyHeaderExceptionMessage: "\u0424\u0430\u0439\u043B \u043D\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432 \u043A\u043E\u043B\u043E\u043D\u043E\u043A \u0437\u0430\u043F\u0438\u0441\u0435\u0439, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u044E\u0442\u0441\u044F. \u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043F\u0435\u0440\u0432\u0443\u044E \u0441\u0442\u0440\u043E\u043A\u0443 \u0444\u0430\u0439\u043B\u0430 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430\u043C\u0438 \u043A\u043E\u043B\u043E\u043D\u043E\u043A \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443.",
		EmptyDataExceptionMessage: "\u0424\u0430\u0439\u043B \u043F\u0443\u0441\u0442\u043E\u0439. \u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E \u0444\u0430\u0439\u043B \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 \u043A\u043E\u043B\u043E\u043D\u043E\u043A, \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F, \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443.",
		EmptyImportObjectMessage: "\u041D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D \u043E\u0431\u044A\u0435\u043A\u0442 \u0434\u043B\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0434\u0430\u043D\u043D\u044B\u0445. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435, \u043A\u0443\u0434\u0430 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435, \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0443.",
		SelectImportObject: "\u041A\u0443\u0434\u0430 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435?",
		ExcelFileCaption: "\u0412\u044B \u0432\u044B\u0431\u0440\u0430\u043B\u0438 \u0444\u0430\u0439\u043B",
		ContactCaption: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442",
		AccountCaption: "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442",
		OtherObjectCaption: "\u0414\u0440\u0443\u0433\u043E\u0435",
		InvalidObjectRights: "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043F\u0440\u0430\u0432 \u0434\u043B\u044F \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0437\u0430\u043F\u0438\u0441\u0438 \u0432 \u043E\u0431\u044A\u0435\u043A\u0442 \u0022{0}\u0022"
	};
	var localizableImages = {
		EmptyFileImage: {
			source: 3,
			params: {
				schemaName: "FileImportStartPage",
				resourceItemName: "EmptyFileImage",
				hash: "9d99e0183abbfda84ee859aa557b6bef",
				resourceItemExtension: ".png"
			}
		},
		ErrorFileImage: {
			source: 3,
			params: {
				schemaName: "FileImportStartPage",
				resourceItemName: "ErrorFileImage",
				hash: "d4222016d16f215c574962f02d154ca9",
				resourceItemExtension: ".png"
			}
		},
		ExcelFileImage: {
			source: 3,
			params: {
				schemaName: "FileImportStartPage",
				resourceItemName: "ExcelFileImage",
				hash: "7fd8517665afab9560144e04f2482393",
				resourceItemExtension: ".png"
			}
		},
		ExcelFileDeleteImage: {
			source: 3,
			params: {
				schemaName: "FileImportStartPage",
				resourceItemName: "ExcelFileDeleteImage",
				hash: "42b5b815fe5ef39879666f4595bd892b",
				resourceItemExtension: ".png"
			}
		},
		ContactImage: {
			source: 3,
			params: {
				schemaName: "FileImportStartPage",
				resourceItemName: "ContactImage",
				hash: "c28fc3f06e748dd82cec4c20f1509a07",
				resourceItemExtension: ".png"
			}
		},
		ContactImageSelected: {
			source: 3,
			params: {
				schemaName: "FileImportStartPage",
				resourceItemName: "ContactImageSelected",
				hash: "c4d69c9d7247898384ddb95ba6d5910e",
				resourceItemExtension: ".png"
			}
		},
		AccountImage: {
			source: 3,
			params: {
				schemaName: "FileImportStartPage",
				resourceItemName: "AccountImage",
				hash: "5f4915a4688e0bf044895805a91e72c4",
				resourceItemExtension: ".png"
			}
		},
		AccountImageSelected: {
			source: 3,
			params: {
				schemaName: "FileImportStartPage",
				resourceItemName: "AccountImageSelected",
				hash: "d63f58a433cca0ad9454112bc08de107",
				resourceItemExtension: ".png"
			}
		},
		OtherObjectImage: {
			source: 3,
			params: {
				schemaName: "FileImportStartPage",
				resourceItemName: "OtherObjectImage",
				hash: "cbc955d9e777e7c869a425d3ca9d35d0",
				resourceItemExtension: ".png"
			}
		},
		OtherObjectImageSelected: {
			source: 3,
			params: {
				schemaName: "FileImportStartPage",
				resourceItemName: "OtherObjectImageSelected",
				hash: "3159cd9472e57444b96c060c6b0d9c0f",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});