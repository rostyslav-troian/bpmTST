define("SetRightsInfoSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Header: "Warning! Objects used by lookup fields on this section page are not secure. According to the current access permissions, all records from the objects listed below are fully available to any portal user:",
		ActionDescription: "To set proper access permissions, select the \u0022Managed by records\u0022 checkbox for these  objects in the \u0022Objects permissions\u0022 section of the System designer. ",
		ActionCaption: "Update object permissions now",
		Footer: "Note: You may need to set access permissions for existing records individually, so that other users could work with them.",
		ChangeRightsConfirmationDialogMessage: "Are you sure that you want to change object permissions?",
		ChangeRightsSuccessfulMessage: "Object permissions changed successfully",
		ChangeRightsErrorMessage: "Failed to change object permissions"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});