define("CustomFilterViewModelV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		FiltersCaption: "Filters\/folders",
		EditFolderFiltersMenuItem: "Set up filter for the \u00AB{0}\u00BB folder",
		AddConditionMenuItemCaption: "Add filter",
		ShowFoldersMenuItemCaption: "Show folders",
		ExtendedModeMenuItemCaption: "Switch to advanced mode",
		FavoriteFoldersMenuItemCaption: "Favorite folders",
		EqualComparisonLabel: "=",
		ContainComparisonLabel: "Contains",
		StartWithComparisonLabel: "Starts with"
	};
	var localizableImages = {
		ImageListSchemaItem1: {
			source: 3,
			params: {
				schemaName: "CustomFilterViewModelV2",
				resourceItemName: "ImageListSchemaItem1",
				hash: "868ae9b89316011f70e5a56a1067b9ce",
				resourceItemExtension: ".png"
			}
		},
		AddConditionIcon: {
			source: 3,
			params: {
				schemaName: "CustomFilterViewModelV2",
				resourceItemName: "AddConditionIcon",
				hash: "ef37ab38ddacefd3ba86c6bbcf4e7501",
				resourceItemExtension: ".svg"
			}
		},
		ShowFoldersIcon: {
			source: 3,
			params: {
				schemaName: "CustomFilterViewModelV2",
				resourceItemName: "ShowFoldersIcon",
				hash: "835eec11a05a836b85fb67494ca1e454",
				resourceItemExtension: ".svg"
			}
		},
		ExtendedModeMenuIcon: {
			source: 3,
			params: {
				schemaName: "CustomFilterViewModelV2",
				resourceItemName: "ExtendedModeMenuIcon",
				hash: "d9382afbfe8d7bbb555a8590be99feb8",
				resourceItemExtension: ".svg"
			}
		},
		ImageFilter: {
			source: 3,
			params: {
				schemaName: "CustomFilterViewModelV2",
				resourceItemName: "ImageFilter",
				hash: "471a9f6f205efd9d7d853fa9da3351b3",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});