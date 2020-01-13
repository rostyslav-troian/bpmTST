define("LookupPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectButtonCaption: "Select",
		CancelButtonCaption: "Cancel",
		ActionButtonCaption: "Actions",
		AddButtonCaption: "New",
		DeleteButtonCaption: "Delete",
		EditButtonCaption: "Edit",
		CopyButtonCaption: "Copy",
		SelectedRecordsLabelCaption: "Records selected",
		SettingsColumnButtonCaption: "Columns setup",
		SearchButtonCaption: "Search",
		CountSelectedRecord: "Records selected:",
		CaptionLookupPage: "Select: ",
		OnDeleteWarning: "Are you sure that you want to delete the selected items?",
		DependencyWarningMessage: "Selected items cannot be deleted because they are used in other objects.",
		StartProcessButtonCaption: "Run",
		ShowProcessLogButtonCaption: "Process log"
	};
	var localizableImages = {
		MenuButtonImage: {
			source: 3,
			params: {
				schemaName: "LookupPage",
				resourceItemName: "MenuButtonImage",
				hash: "44a879bb391b7fbfb8031c43bccade79",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});