define("LocalDuplicateSearchPageViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PageHeaderMask: "Duplicates search {0}",
		PageHeaderAccount: "account",
		PageHeaderContact: "contact",
		DuplicateRecordsMessageTemplate: "{0} similar records found.",
		NotEnoughAccessMessage: "If you cannot view some of the records, it is due to lack of reading rights. Please, contact the system administrator."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});