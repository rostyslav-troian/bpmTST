define("GoogleMapWidgetPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		UnknownAddressErrorCause: "Address is incorrect or relatively new",
		TooManyQueriesErrorCause: "Threshold of queries for the current 24-hour period is exceeded, or too many queries have been sent in a short period of time",
		ServerErrorErrorCause: "Exact cause of failure is unknown",
		MissingQueryErrorCause: "Missing address was specified",
		GeneralErrorCause: "Geolocation error occurred"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});