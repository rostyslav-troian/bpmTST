define("GridUtilitiesV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AscendingDirectionCaption: "ascending order",
		DescendingDirectionCaption: "descending order",
		DependencyWarningMessage: "Selected items cannot be deleted because they are used in other objects.",
		RightLevelWarningMessage: "You do not have permission to delete these items.",
		RecordsAddedToStaticFolder: "{1} records added in folder {0}",
		AddRecordsToStaticFolderErrorMessage: "Error while adding records to the folder, Please, contact your system administrator.",
		LicenceNotFound: "A license to perform this action is missing. A system administrator can use the license manager or the user page to redistribute available licenses"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});