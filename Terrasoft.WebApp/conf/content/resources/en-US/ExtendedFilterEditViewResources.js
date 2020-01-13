define("ExtendedFilterEditViewResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SchemaNameStaticCaptionPart: "Filters setup ",
		SaveButtonCaption: "Save",
		ApplyButtonCaption: "Apply",
		ActionsButtonCaption: "Actions",
		GroupMenuItemCaption: "Group",
		UnGroupMenuItemCaption: "Ungroup",
		MoveUpMenuItemCaption: "Up",
		MoveDownMenuItemCaption: "Down",
		ExtendedFilterSettingsCaption: "Filters setup"
	};
	var localizableImages = {
		ClosePanelImage: {
			source: 3,
			params: {
				schemaName: "ExtendedFilterEditView",
				resourceItemName: "ClosePanelImage",
				hash: "6e9e2411fddcf6d299e6d86597523e4d",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});