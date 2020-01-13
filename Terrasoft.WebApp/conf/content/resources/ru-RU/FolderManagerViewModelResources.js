define("FolderManagerViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AllFoldersCaptionV2: "\u0412\u0441\u0435",
		FavoriteFoldersCaptionV2: "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u044B\u0435",
		OnDeleteWarningV2: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B?",
		NewSearchFolderInputBoxCaptionV2: "\u041D\u043E\u0432\u0430\u044F \u0433\u0440\u0443\u043F\u043F\u0430",
		NewGeneralFolderInputBoxCaptionV2: "\u041D\u043E\u0432\u0430\u044F \u0441\u0442\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0433\u0440\u0443\u043F\u043F\u0430",
		AddToFavoriteMenuItemCaptionV2: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u044B\u0435",
		RemoveFromFavoriteMenuItemCaptionV2: "\u0418\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0438\u0437 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u044B\u0445",
		GeneralFolderInputBoxCaptionV2: "\u0421\u0442\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0433\u0440\u0443\u043F\u043F\u0430",
		SearchFolderInputBoxCaptionV2: "\u0413\u0440\u0443\u043F\u043F\u0430",
		CopyFolderNameTpl: "{0} - \u041A\u043E\u043F\u0438\u044F",
		EmptyFiltersGroupData: "\u041F\u0443\u0441\u0442\u0430\u044F \u0433\u0440\u0443\u043F\u043F\u0430 \u0444\u0438\u043B\u044C\u0442\u0440\u043E\u0432",
		AllFoldersCaption: "\u0412\u0441\u0435",
		FavoriteFoldersCaption: "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u044B\u0435",
		OnDeleteWarning: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B?",
		NewSearchFolderInputBoxCaption: "\u041D\u043E\u0432\u0430\u044F \u0433\u0440\u0443\u043F\u043F\u0430",
		NewGeneralFolderInputBoxCaption: "\u041D\u043E\u0432\u0430\u044F \u0441\u0442\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0433\u0440\u0443\u043F\u043F\u0430",
		AddToFavoriteMenuItemCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u044B\u0435",
		RemoveFromFavoriteMenuItemCaption: "\u0418\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0438\u0437 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u044B\u0445",
		GeneralFolderInputBoxCaption: "\u0421\u0442\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0433\u0440\u0443\u043F\u043F\u0430",
		SearchFolderInputBoxCaption: "\u0413\u0440\u0443\u043F\u043F\u0430"
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