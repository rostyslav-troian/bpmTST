define("SysModuleEntitySelectSinglePageModalBoxResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AcceptButtonCaption: "Save",
		HeaderCaption: "Return to single page layout",
		CancelBoxButtonCaption: "Cancel",
		WarningMessage: "All other page layouts will be deleted. This cannot be undone.",
		DescriptionMessage: "Choose the page layout you want to keep"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "SysModuleEntitySelectSinglePageModalBox",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "SysModuleEntitySelectSinglePageModalBox",
				resourceItemName: "CloseButtonImage",
				hash: "bcf2d4125a9751584d37cd8d0be121ca",
				resourceItemExtension: ".svg"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "SysModuleEntitySelectSinglePageModalBox",
				resourceItemName: "ProcessButtonImage",
				hash: "9903e902413ee697cc93f90b0ba60b42",
				resourceItemExtension: ".png"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "SysModuleEntitySelectSinglePageModalBox",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		InfoIcon: {
			source: 3,
			params: {
				schemaName: "SysModuleEntitySelectSinglePageModalBox",
				resourceItemName: "InfoIcon",
				hash: "4aff29f3659702bd9b174a2b883dcadb",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});