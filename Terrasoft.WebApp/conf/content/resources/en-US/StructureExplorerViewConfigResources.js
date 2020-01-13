define("StructureExplorerViewConfigResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		HeaderCaption: "Select column",
		ItemName: "Object",
		ItemsName: "Column",
		ItemsPlaceHolder: "Select column",
		ElementsPlaceHolder: "Select object",
		SelectButtonText: "Select",
		CancelButtonText: "Cancel"
	};
	var localizableImages = {
		ExpandImage: {
			source: 3,
			params: {
				schemaName: "StructureExplorerViewConfig",
				resourceItemName: "ExpandImage",
				hash: "ab6bcb78a6be23a9399c7d1c622e9884",
				resourceItemExtension: ".svg"
			}
		},
		CloseImage: {
			source: 3,
			params: {
				schemaName: "StructureExplorerViewConfig",
				resourceItemName: "CloseImage",
				hash: "49bb4ccc176982753926920d03332241",
				resourceItemExtension: ".svg"
			}
		},
		DeleteImage: {
			source: 3,
			params: {
				schemaName: "StructureExplorerViewConfig",
				resourceItemName: "DeleteImage",
				hash: "b8a7008452ec672bd9c284d5e83091c1",
				resourceItemExtension: ".png"
			}
		},
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "StructureExplorerViewConfig",
				resourceItemName: "CloseIcon",
				hash: "bcf2d4125a9751584d37cd8d0be121ca",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});