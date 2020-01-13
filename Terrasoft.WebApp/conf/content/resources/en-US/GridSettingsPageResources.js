define("GridSettingsPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		TiledCaption: "Tile view",
		ListedCaption: "List view",
		DeleteUserProfilesMessage: "Some users have different column settings in this list. Would you like to reset their settings?",
		PreViewCaption: "Preview",
		SaveForAllButtonButtonCaption: "Save for all users",
		PageCaption: "List setup",
		EmptyGridSettingsMsg: "The list has no displayed fields. Please select fields to display before saving.",
		PreViewTop: "top",
		ColumlLimitExceededMessage: "Column limit exceeded ({0})"
	};
	var localizableImages = {
		AddColumnImg: {
			source: 3,
			params: {
				schemaName: "GridSettingsPage",
				resourceItemName: "AddColumnImg",
				hash: "a3482369679073270ead2927bea2c5ad",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});