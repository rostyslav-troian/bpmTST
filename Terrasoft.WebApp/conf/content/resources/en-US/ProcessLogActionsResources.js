define("ProcessLogActionsResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CancelExecutionConfirmation: "Cancel all selected processes?",
		CanceledProcessStatusCaption: "Canceled",
		SubProcessCancelDeclineMessage: "The process can not be canceled, because it was started as a subprocess",
		SubProcessesCancelDeclineMessage: "Processes cannot be canceled because they were started as subprocesses",
		ProcessesCancelDeclineMessage: "Processes cannot be canceled because they aren\u0027t running"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});