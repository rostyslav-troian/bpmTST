define("FolderFilterViewV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		FolderFilterEmptyFolderEditPlaceHolder: "Folder",
		AddConditionMenuItemCaption: "Select folder",
		ShowAllGroupsMenuItemCaption: "Show all folders",
		FavoriteGroupMenuItemCaption: "FAVORITE FOLDERS",
		NewMenuItemCaption: "New",
		CustomersByPaymentMenuItemCaption: "Customers by payments",
		PartnersMenuItemCaption: "Partners"
	};
	var localizableImages = {
		FolderImage: {
			source: 3,
			params: {
				schemaName: "FolderFilterViewV2",
				resourceItemName: "FolderImage",
				hash: "dbaf7655966b4489f66feb5ed5add9a4",
				resourceItemExtension: ".png"
			}
		},
		ApplyButtonImage: {
			source: 3,
			params: {
				schemaName: "FolderFilterViewV2",
				resourceItemName: "ApplyButtonImage"
			}
		},
		CancelButtonImage: {
			source: 3,
			params: {
				schemaName: "FolderFilterViewV2",
				resourceItemName: "CancelButtonImage"
			}
		},
		ShowAllFoldersImage: {
			source: 3,
			params: {
				schemaName: "FolderFilterViewV2",
				resourceItemName: "ShowAllFoldersImage",
				hash: "47fd0154dc5e5c4ef18643719a74b39e",
				resourceItemExtension: ".png"
			}
		},
		SearchFolderImage: {
			source: 3,
			params: {
				schemaName: "FolderFilterViewV2",
				resourceItemName: "SearchFolderImage",
				hash: "08c2cadfe29a1ecb86d164e1a3c5b69b",
				resourceItemExtension: ".png"
			}
		},
		GeneralFolderImage: {
			source: 3,
			params: {
				schemaName: "FolderFilterViewV2",
				resourceItemName: "GeneralFolderImage",
				hash: "c6792a5dd56ff9a38a59185f49d4278b",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});