define("ProcessParametersMappingPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmptyInfoTitle: "This process has no parameters",
		ProcessParametersGridCaption: "Process parameters",
		ProcessParametersNoRequiredParameters: "There are no parameters of required type"
	};
	var localizableImages = {
		GridDataViewIcon: {
			source: 3,
			params: {
				schemaName: "ProcessParametersMappingPage",
				resourceItemName: "GridDataViewIcon"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});