define("GridSettingsViewGeneratorV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		PageCaption: "List setup",
		SetButtonCaption: "Set",
		DeleteButtonCaption: "Delete",
		ExpandButtonCaption: "\u002B",
		NarrowButtonCaption: "-",
		SaveForAllButtonButtonCaption: "Save for all users",
		TiledCaption: "Tile view",
		ListedCaption: "List view",
		VerticalCaption: "Vertical list",
		UpButtonCaption: "\u25B2",
		DownButtonCaption: "\u25BC",
		ExpandLabelCaption: "Change width",
		UpLabelCaption: "Change height",
		ColumnWidthHint: "Column width"
	};
	var localizableImages = {
		PlusButtonImage: {
			source: 3,
			params: {
				schemaName: "GridSettingsViewGeneratorV2",
				resourceItemName: "PlusButtonImage",
				hash: "9ee168d3fcaf3c64db96d9ec9c02647b",
				resourceItemExtension: ".png"
			}
		},
		MinusButtonImage: {
			source: 3,
			params: {
				schemaName: "GridSettingsViewGeneratorV2",
				resourceItemName: "MinusButtonImage",
				hash: "a81ff36d75b9edfdaefe276934eb8c5e",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});