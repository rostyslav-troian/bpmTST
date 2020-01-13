define("ContactInternalRatePageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PeriodExists: "The employee\u0027s fee for the selected period is already specified",
		Rate: "Rate, {0}",
		BaseCurrency: "base currency",
		WarningRateLessZero: "The value in the Rate field must be more than \u00220\u0022",
		dueDateLessStartDate: "Completion date can not be earlier than the start date"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});