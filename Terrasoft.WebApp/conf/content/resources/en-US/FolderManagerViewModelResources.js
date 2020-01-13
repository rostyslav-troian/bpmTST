define("FolderManagerViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AllFoldersCaptionV2: "All",
		FavoriteFoldersCaptionV2: "Favorites",
		OnDeleteWarningV2: "Are you sure that you want to delete the selected items?",
		NewSearchFolderInputBoxCaptionV2: "New folder",
		NewGeneralFolderInputBoxCaptionV2: "New static folder",
		AddToFavoriteMenuItemCaptionV2: "Add to favorites",
		RemoveFromFavoriteMenuItemCaptionV2: "Remove from favorites",
		GeneralFolderInputBoxCaptionV2: "Static folder",
		SearchFolderInputBoxCaptionV2: "Folder",
		CopyFolderNameTpl: "{0} - Copy",
		EmptyFiltersGroupData: "Empty filters group",
		AllFoldersCaption: "All",
		FavoriteFoldersCaption: "Favorites",
		OnDeleteWarning: "Are you sure that you want to delete the selected items?",
		NewSearchFolderInputBoxCaption: "New folder",
		NewGeneralFolderInputBoxCaption: "New static folder",
		AddToFavoriteMenuItemCaption: "Add to favorites",
		RemoveFromFavoriteMenuItemCaption: "Remove from favorites",
		GeneralFolderInputBoxCaption: "Static folder",
		SearchFolderInputBoxCaption: "Folder"
	};
	var localizableImages = {
		RemoveFromFavorites: {
			source: 3,
			params: {
				schemaName: "FolderManagerViewModel",
				resourceItemName: "RemoveFromFavorites",
				hash: "f034ac27752239340eef2d3a485910b5",
				resourceItemExtension: ".png"
			}
		},
		AddToFavoritesImage: {
			source: 3,
			params: {
				schemaName: "FolderManagerViewModel",
				resourceItemName: "AddToFavoritesImage",
				hash: "87aea1b3710e76f846508adbff1ca496",
				resourceItemExtension: ".png"
			}
		},
		RemoveFromFavoritesV2: {
			source: 3,
			params: {
				schemaName: "FolderManagerViewModel",
				resourceItemName: "RemoveFromFavoritesV2"
			}
		},
		AddToFavoritesImageV2: {
			source: 3,
			params: {
				schemaName: "FolderManagerViewModel",
				resourceItemName: "AddToFavoritesImageV2"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});