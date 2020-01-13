define("ChangeProjectDatesResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ChangeSelectedDates: "Change dates of selected items",
		ChangeElementDates: "Edit project task timeframe",
		Save: "Save",
		Cancel: "Cancel",
		DaysCount: "Quantity of days",
		DaysCountValidation: "Enter a positive number",
		TooManyDays: "Project timeframe cannot be put off for more than 30 years.",
		MoveBack: "Back",
		MoveForward: "Next"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});