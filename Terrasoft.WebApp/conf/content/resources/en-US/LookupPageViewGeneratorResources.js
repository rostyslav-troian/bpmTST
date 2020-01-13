define("LookupPageViewGeneratorResources", ["terrasoft"], function(Terrasoft) {
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
		StartProcessButtonCaption: "Run",
		ShowProcessLogButtonCaption: "Process log",
		UnSelectAllActionCaption: "Deselect all",
		RunButtonCaption: "Run",
		SelectAllActionButtonCaption: "Select all"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "LookupPageViewGenerator",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});