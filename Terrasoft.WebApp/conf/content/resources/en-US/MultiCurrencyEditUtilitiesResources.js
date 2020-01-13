define("MultiCurrencyEditUtilitiesResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NoCurrenciesMessage: "Unable to get currencies for the selected time period. Please check the \u0022Currencies\u0022 lookup values",
		CurrencyRatesOverlappingMessage: "More than one exchange rate time periods found for the currency \u0022{0}\u0022 in the selected time period. Please check the \u0022Currencies\u0022 lookup values"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});