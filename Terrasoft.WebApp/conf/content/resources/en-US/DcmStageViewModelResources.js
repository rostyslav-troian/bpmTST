define("DcmStageViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NewDcmStageElementPlaceholder: "Add step",
		RemoveStageDialogText: "Deleting a stage will also delete all steps of the stage. Continue?",
		MoveDcmSchemaElementConfirmationCaption: "The \u0022{0}\u0022 element currently runs after the \u0022{1}\u0022 element is complete. If you move the element, it will be performed right after the stage start.",
		MoveRootDcmSchemaElementConfirmationCaption: "If you move the element \u0022{0}\u0022, element {1} will be performed right after the stage start.",
		MoveDcmSchemaElementQuestion: "Do you wish to move the element?"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});