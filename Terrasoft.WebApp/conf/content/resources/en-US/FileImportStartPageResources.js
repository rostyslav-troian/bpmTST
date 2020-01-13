define("FileImportStartPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		UploadFileButtonCaption: "Select file",
		DragAndDropContainerCaption: "Drag and drop file here or",
		FileNotSelectedMessage: "No file for import is specified. Select the file and try again.",
		InvalidFileTypeMessage: "Incorrect file format. Please select an Excel file (.xlsx).",
		EmptyHeaderExceptionMessage: "File doesn\u0027t contain column headers. Fill in the first row of the file with column headers and try again.",
		EmptyDataExceptionMessage: "File is empty. Make sure the file contains column captions and values and then try again.",
		EmptyImportObjectMessage: "No object for import is specified. Select an object and try again.",
		SelectImportObject: "Where do you want the data imported to?",
		ExcelFileCaption: "Selected file",
		ContactCaption: "Contact",
		AccountCaption: "Account",
		OtherObjectCaption: "Other",
		InvalidObjectRights: "Insufficient permissions to add record in object \u0022{0}\u0022"
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