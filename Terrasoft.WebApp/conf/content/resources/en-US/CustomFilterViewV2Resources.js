define("CustomFilterViewV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddConditionMenuItemCaption: "Add filter",
		ShowFoldersMenuItemCaption: "Show folders",
		ExtendedModeMenuItemCaption: "Switch to advanced mode",
		ClearFilterMenuItemCaption: "Clear",
		SaveAsDynamicFolderMenuItemCaption: "Save as dynamic folder",
		SimpleFilterEmptyColumnEditPlaceHolder: "Column",
		SimpleFilterEmptyValueEditPlaceHolder: "Value",
		FavoriteFoldersMenuItemCaption: "Favorite folders",
		ApplyButtonHint: "Apply filter",
		CancelButtonHint: "Reset filter"
	};
	var localizableImages = {
		ApplyButtonImage: {
			source: 3,
			params: {
				schemaName: "CustomFilterViewV2",
				resourceItemName: "ApplyButtonImage",
				hash: "990c2489baa1946eb4c3f44b827803df",
				resourceItemExtension: ".png"
			}
		},
		CancelButtonImage: {
			source: 3,
			params: {
				schemaName: "CustomFilterViewV2",
				resourceItemName: "CancelButtonImage",
				hash: "42b5b815fe5ef39879666f4595bd892b",
				resourceItemExtension: ".png"
			}
		},
		RemoveButtonImage: {
			source: 3,
			params: {
				schemaName: "CustomFilterViewV2",
				resourceItemName: "RemoveButtonImage",
				hash: "d83fcc9d4e31559d6f903a11f6d528bd",
				resourceItemExtension: ".png"
			}
		},
		CollapseFiltersImage: {
			source: 3,
			params: {
				schemaName: "CustomFilterViewV2",
				resourceItemName: "CollapseFiltersImage",
				hash: "f3a5b8aedee00af61b87ed2c9e021255",
				resourceItemExtension: ".png"
			}
		},
		ImageFilter: {
			source: 3,
			params: {
				schemaName: "CustomFilterViewV2",
				resourceItemName: "ImageFilter",
				hash: "124f910abe91ebe4045613a9c5b379d1",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});