define("DuplicatesModuleViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		StatusNeverMask: "",
		StatusNeverAccount: "Accounts",
		StatusNeverContact: "Contacts",
		StatusInProgressMask: "Duplicates search is in progress {0}%",
		StatusSuspendedMask: "Duplicates search is {0}% complete and was stopped {1}, at {2}",
		StatusFinishedMask: "Last duplicates search was performed on {0}, at {1}"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});