define("FolderManagerViewConfigGeneratorResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		FolderMenuSeparatorCaption: "FOLDER",
		CreateStaticMenuItemCaption: "New static folder",
		CopyMenuItemCaption: "Copy",
		CreateDynamicMenuItemCaption: "New dynamic folder",
		RenameMenuItemCaption: "Rename",
		DeleteMenuItemCaption: "Delete",
		MoveMenuItemCaption: "Move",
		EditRightsMenuItemCaption: "Set up access rights",
		FoldersHeaderCaption: "Folders",
		SelectFolderMenuItemCaption: "Select folder",
		SelectFoldersMenuItemCaption: "Select multiple folders",
		ActionButtonCaption: "Actions",
		EditFolderFilters: "Set up filter",
		CloseButtonCaption: "Close",
		FavouritesButtonHint: "Add to favourites",
		ConfigurationButton: "Actions",
		CloseButtonHint: "Close folder setup",
		ConvertFolder: "Convert folder"
	};
	var localizableImages = {
		ClosePanelImage: {
			source: 3,
			params: {
				schemaName: "FolderManagerViewConfigGenerator",
				resourceItemName: "ClosePanelImage",
				hash: "42b5b815fe5ef39879666f4595bd892b",
				resourceItemExtension: ".png"
			}
		},
		FastFilterImage: {
			source: 3,
			params: {
				schemaName: "FolderManagerViewConfigGenerator",
				resourceItemName: "FastFilterImage",
				hash: "47402479a84962528c2a8f69e5e40ecd",
				resourceItemExtension: ".svg"
			}
		},
		SettingsImage: {
			source: 3,
			params: {
				schemaName: "FolderManagerViewConfigGenerator",
				resourceItemName: "SettingsImage",
				hash: "47746d40580dfbb675744525fc2e03b1",
				resourceItemExtension: ".svg"
			}
		},
		AddToFavoritesImage: {
			source: 3,
			params: {
				schemaName: "FolderManagerViewConfigGenerator",
				resourceItemName: "AddToFavoritesImage",
				hash: "54b2337f4191281125d3b9d675c6a371",
				resourceItemExtension: ".svg"
			}
		},
		RemoveFromFavorites: {
			source: 3,
			params: {
				schemaName: "FolderManagerViewConfigGenerator",
				resourceItemName: "RemoveFromFavorites",
				hash: "ef3bc70aba9f628cd98a4678aad25d9a",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});