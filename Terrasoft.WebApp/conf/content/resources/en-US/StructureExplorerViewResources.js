define("StructureExplorerViewResources", ["terrasoft"], function(Terrasoft) {
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
				schemaName: "StructureExplorerView",
				resourceItemName: "ExpandImage",
				hash: "10f59221e2a3ba90b26c94fa2f720261",
				resourceItemExtension: ".png"
			}
		},
		DeleteImage: {
			source: 3,
			params: {
				schemaName: "StructureExplorerView",
				resourceItemName: "DeleteImage",
				hash: "b8a7008452ec672bd9c284d5e83091c1",
				resourceItemExtension: ".png"
			}
		},
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "StructureExplorerView",
				resourceItemName: "CloseIcon",
				hash: "d83fcc9d4e31559d6f903a11f6d528bd",
				resourceItemExtension: ".png"
			}
		},
		CloseImage: {
			source: 3,
			params: {
				schemaName: "StructureExplorerView",
				resourceItemName: "CloseImage",
				hash: "49bb4ccc176982753926920d03332241",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});