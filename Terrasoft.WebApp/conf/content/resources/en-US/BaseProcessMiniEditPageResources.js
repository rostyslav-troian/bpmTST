define("BaseProcessMiniEditPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CancelButtonCaption: "Cancel",
		SaveButtonCaption: "Save",
		DuplicateItemCodeMessage: "Item with this code already exists.",
		WrongItemNameMessage: "Invalid value. Use symbols: a-z, A-Z, 0-9. \u003C\/br\u003E Symbol: 0-9 cannot be first.",
		InheritedItemSaveButtonHint: "This record is inherited and can be changed in the parent process."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});