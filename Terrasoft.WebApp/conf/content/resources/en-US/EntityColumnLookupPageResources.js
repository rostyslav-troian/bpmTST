define("EntityColumnLookupPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		NameCaption: "Name",
		SearchButtonCaption: "Search",
		TotalSelectedItemsCounterCaption: "Records selected:",
		SelectAllButtonCaption: "Select all",
		DeselectAllButtonCaption: "Select none"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "EntityColumnLookupPage",
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