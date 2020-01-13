define("GridUtilitiesResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OpenSettingPageCaption: "Set up summaries",
		OpenGridSettingsPageCaption: "Select fields to display",
		LoadButtonCaption: "Show more",
		SortCaption: "Sort by",
		AscendingDirectionCaption: "ascending order",
		DescendingDirectionCaption: "descending order",
		DependencyWarningMessage: "Selected items cannot be deleted because they are used in other objects.",
		RightLevelWarningMessage: "You do not have permission to delete these items.",
		Deleting: "Executing",
		ActionsButtonCaption: "View"
	};
	var localizableImages = {
		SettingsButtonImage: {
			source: 3,
			params: {
				schemaName: "GridUtilities",
				resourceItemName: "SettingsButtonImage",
				hash: "44a879bb391b7fbfb8031c43bccade79",
				resourceItemExtension: ".png"
			}
		},
		MoreArrowIcon: {
			source: 3,
			params: {
				schemaName: "GridUtilities",
				resourceItemName: "MoreArrowIcon",
				hash: "010a38d79ad1acb4726eb1dae1d7f14c",
				resourceItemExtension: ".png"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "GridUtilities",
				resourceItemName: "AddButtonImage",
				hash: "d2c5e1910dfffa3ee50dd7206f48d25b",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});