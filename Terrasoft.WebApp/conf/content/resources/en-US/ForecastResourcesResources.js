define("ForecastResourcesResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SummaryCaption: "Total",
		FormulaNotValidMessage: "This formula cannot be saved because it contains errors. Please correct the formula and try again",
		EmptyBlankSlateTitle: "This forecast has no visible columns.",
		EmptyBlankSlateDescription: " or select existing columns to show via [View] button, to make it look prettier.\n \nLearn more about this section from Academy.",
		EmptyBlankSlateAction: "Add a new column",
		ColumnUsedInFormula: "You can\u0027t delete this column because it used in formula \u0022{0}\u0022.",
		SearchPlaceholder: "Search",
		RecordsLimitExceededCaption: "Record limit exceeded. If you don\u2019t see the needed records, correct your search."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});