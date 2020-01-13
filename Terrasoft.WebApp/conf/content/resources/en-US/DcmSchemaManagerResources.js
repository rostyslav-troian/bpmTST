define("DcmSchemaManagerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		FilterIsNotCompletedMessage: "The \u0022Case initial condition\u0022 field in the case properties is not filled in",
		FilterIsNotUniqueMessage: "The value in the \u0022Case initial condition\u0022 field coincides with that of the \u0022{0}\u0022 case. Each case must have a unique initial condition",
		FilterColumnIsNotSupportedMessage: "Settings \u0022Case initial condition\u0022 not coincides with section settings",
		StageColumnUsedInFiltersMessage: "The stage column can not be used under the conditions of the case start"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});