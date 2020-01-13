define("DataUtilitiesResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ExportToFileErrorMsg: "Insufficient permissions to perform this operation",
		MaxEntityRowCountExceptionMessage: "The limit of {1} records was exceeded while exporting data from the \u0022{0}\u0022 object.",
		OperationAccessDenied: "Current user does not have sufficient permissions to run \u0022{0}\u0022",
		ExportTimedoutMessage: "You are attempting to export too much data. Please set up a filter to select only the data you need, or increase the value of the \u201CNumber of records in Excel export batch\u201D system setting",
		CheckColumnSettingsMessage: "Creatio was unable to process some of the exported columns. Please modify column settings and retry",
		DefaultExportToExcelMessage: "Creatio was unable to process some of the exported records. Please try modifying the list of exported records by applying a filter, or contact your system administrator"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});