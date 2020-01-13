define("GlobalDuplicateModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DuplicateAccountHeader: "Account duplicates",
		DuplicateContactHeader: "Contact duplicates",
		StatusNeverMask: "Duplicates search by {0} section has not been performed. You can perform duplicates search now or schedule it for a later time.",
		StatusNeverAccount: "Accounts",
		StatusNeverContact: "Contacts",
		StatusPercentMask: "Duplicates search is in progress {0}%. You can terminate the search.",
		StatusStopedMask: "Duplicates search is {0}% complete and was stopped {1}, at {2}. You can start a new search.",
		StatusEndMask: "Last duplicates search was performed on {0}, at {1}. You can perform another search."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});