define("RelationshipDiagramViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		RemoveRelationshipConfirmationDialogMessage: "Are you sure want to delete connection to the parent account?",
		GotoAccountConfirmationDialogMessage: "There is a parent account already specified for the selected one. Go to the selected record?",
		AddParentAccountLabel: "New holding company",
		AddChildAccountLabel: "New subordinate company",
		ColumnFilterInvalidFormatException: "Filtering by the {0} column is configured incorrectly"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});