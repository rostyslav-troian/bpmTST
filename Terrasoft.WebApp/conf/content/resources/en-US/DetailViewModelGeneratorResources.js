define("DetailViewModelGeneratorResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OnDeleteWarning: "Are you sure that you want to delete the selected items?",
		DuplicateExceptionMessage: "Column with name {0} already defined",
		OnDeleteError: "Error when deleting the record",
		ToMultiSelectGridMode: "Select multiple records",
		ToSigleSelectGridMode: "Select one record",
		LoadAllButtonCaptionMask: "Show all ({0})",
		DependencyWarningMessage: "Selected items cannot be deleted because they are used in other objects."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});