define("DuplicatesDetailViewModelV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectAllCaption: "\u003Ca\u003E(Select all)\u003C\/a\u003E",
		ClearAllCaption: "\u003Ca\u003E(Clear all)\u003C\/a\u003E",
		MergeFinishedMessage: "Merge started successfully :) ",
		SelectMoreThanOneRowErrorMessage: "Select multiple rows",
		MergeButtonCaptionTemplate: "Merge{0}",
		MergeNotificationTitleTemplate: "Duplicates merge",
		MergeContactNotificationBodyTemplate: "{0} contacts will be merged.",
		MergeAccountNotificationBodyTemplate: "{0} accounts will be merged."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});