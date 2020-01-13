define("ExtendedFilterEditViewV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SchemaNameStaticCaptionPart: "Filters setup ",
		SaveButtonCaption: "Save",
		ApplyButtonCaption: "Apply",
		ActionsButtonCaption: "Actions",
		GroupMenuItemCaption: "Group",
		UnGroupMenuItemCaption: "Ungroup",
		MoveUpMenuItemCaption: "Up",
		MoveDownMenuItemCaption: "Down",
		ExtendedFilterSettingsCaption: "Filters setup",
		CloseButtonCaption: "Close",
		BackButtonHint: "Go back to folder area",
		CloseButtonHint: "Close folder setup"
	};
	var localizableImages = {
		ClosePanelImage: {
			source: 3,
			params: {
				schemaName: "ExtendedFilterEditViewV2",
				resourceItemName: "ClosePanelImage",
				hash: "42b5b815fe5ef39879666f4595bd892b",
				resourceItemExtension: ".png"
			}
		},
		BackImage: {
			source: 3,
			params: {
				schemaName: "ExtendedFilterEditViewV2",
				resourceItemName: "BackImage",
				hash: "96d05bdc934e78ab86fd88b37ba48fe9",
				resourceItemExtension: ".png"
			}
		},
		SearchFolderIcon: {
			source: 3,
			params: {
				schemaName: "ExtendedFilterEditViewV2",
				resourceItemName: "SearchFolderIcon",
				hash: "5af2275506420a0e3f762a1f2394181b",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});