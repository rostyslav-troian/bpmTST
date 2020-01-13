define("ViewModelSchemaDesignerDetailModalBoxResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DetailModalBoxSaveButtonCaption: "Save",
		DetailModalBoxCancelButtonCaption: "Cancel",
		WrongDetailCaptionLengthMessage: "Field group title cannot be longer than {0} characters",
		DetailModalBoxHeader: "Detail settings",
		DetailNameCaption: "Detail",
		DetailEntitySchemaColumnCaption: "Detail column",
		MasterEntitySchemaTitle: "Object column",
		DetailCaptionOnThePage: "Caption on the page"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "ViewModelSchemaDesignerDetailModalBox",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ViewModelSchemaDesignerDetailModalBox",
				resourceItemName: "CloseButtonImage",
				hash: "bcf2d4125a9751584d37cd8d0be121ca",
				resourceItemExtension: ".svg"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "ViewModelSchemaDesignerDetailModalBox",
				resourceItemName: "ProcessButtonImage",
				hash: "9903e902413ee697cc93f90b0ba60b42",
				resourceItemExtension: ".png"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "ViewModelSchemaDesignerDetailModalBox",
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