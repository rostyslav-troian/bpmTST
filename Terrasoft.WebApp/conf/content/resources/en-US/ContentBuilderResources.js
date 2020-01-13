define("ContentBuilderResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PreviewBlockCaption: "Blocks library",
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		ContentSheetPlaceholder: "Drag block here",
		PreviewButtonCaption: "Preview",
		CancelMessage: "Discard changes",
		WidthIncorrectMinValueValidationMessage: "{0} px minimum",
		DefaultCaption: "Content designer",
		PxLabelCaption: "px",
		WidthIncorrectMaxValueValidationMessage: "{0} px maximum",
		MacroTemplate: "[#{0}#]",
		EmptyMacrosEntityMessage: "There is no entity for column selection.",
		SheetPositionCaption: "Position",
		SheetWidthCaption: "Width",
		SearchPlaceholder: "Search",
		ElementsGroupCaption: "Elements",
		GridElementsLabelCaption: "Grid Elements",
		UserBlocksGroupCaption: "User blocks",
		MigrateButtonCaption: "Migrate",
		ContentBuilderStateErrorMessage: "Save action is blocked. Turn on feature \u0022{0}\u0022 to edit template",
		Caption: "Template",
		SearchUserBlockPlaceholder: "Enter name of block",
		DeleteUserBlockQuestion: "Are you sure that you want to delete the block \u0022{0}\u0022 from the Block Library?",
		PropertiesPageCaption: "Template settings",
		PropertiesPageContextHelp: "Template allows to set basic styles for content. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022ContentDesigner\u0022 target=\u0022_blank\u0022\u003ERead more\u003C\/a\u003E"
	};
	var localizableImages = {
		DefaultBlockImage: {
			source: 3,
			params: {
				schemaName: "ContentBuilder",
				resourceItemName: "DefaultBlockImage",
				hash: "6c304675aa81e38fa1b9ea8a1834b4f4",
				resourceItemExtension: ".png"
			}
		},
		SheetSettingsButton: {
			source: 3,
			params: {
				schemaName: "ContentBuilder",
				resourceItemName: "SheetSettingsButton",
				hash: "339995a317aa2591e4d2909b009a2f99",
				resourceItemExtension: ".png"
			}
		},
		SettingsButtonIcon: {
			source: 3,
			params: {
				schemaName: "ContentBuilder",
				resourceItemName: "SettingsButtonIcon",
				hash: "778171cce61f3693d0a8ea3f3b33f645",
				resourceItemExtension: ".png"
			}
		},
		SearchIcon: {
			source: 3,
			params: {
				schemaName: "ContentBuilder",
				resourceItemName: "SearchIcon",
				hash: "c0960e5d98faf61a2a5532aba9a8ccd0",
				resourceItemExtension: ".svg"
			}
		},
		SearchUserBlockIcon: {
			source: 3,
			params: {
				schemaName: "ContentBuilder",
				resourceItemName: "SearchUserBlockIcon",
				hash: "ef96400dd632c3b0ed257d5c577f05b2",
				resourceItemExtension: ".svg"
			}
		},
		PropertiesPageIcon: {
			source: 3,
			params: {
				schemaName: "ContentBuilder",
				resourceItemName: "PropertiesPageIcon",
				hash: "738d5d03e8b8231882e0338b44d66fbc",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});