define("ProcessElementTraceDataPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ParseTraceResponseErrorText: "Could not load trace data",
		TraceDataParameterCaption: "Parameter",
		TraceDataParameterValueAfterExecCaption: "After execution",
		TraceDataParameterValueBeforeExecCaption: "Before execution",
		TraceDataParameterValueCaption: "Value",
		TraceDataElementCaption: "Element parameters",
		TraceDataProcessCaption: "Process parameters"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "ProcessElementTraceDataPage",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});