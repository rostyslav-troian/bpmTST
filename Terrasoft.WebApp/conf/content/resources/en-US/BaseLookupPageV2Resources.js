define("BaseLookupPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectButtonCaption: "Select",
		CancelButtonCaption: "Cancel",
		ActionButtonCaption: "Actions",
		AddButtonCaption: "New",
		DeleteButtonCaption: "Delete",
		EditButtonCaption: "Edit",
		CopyButtonCaption: "Copy",
		SelectedRecordsLabelCaption: "Records selected",
		SearchButtonCaption: "Search",
		CountSelectedRecord: "Records selected:",
		CaptionLookupPage: "Select: ",
		ViewButtonCaption: "View",
		SortMenuCaption: "Sort by",
		SetupGridMenuCaption: "Columns setup",
		DeleteConfirmationMessage: "Are you sure that you want to delete the selected items?"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "BaseLookupPageV2",
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