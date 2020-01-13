define("QueueProcessUtilitiesResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		QueueItemInFinishedStatusMessage: "Selected queue record has already been processed",
		OtherOperatorWorkingOnElementMessage: "Agent {0} has already taken this record",
		ProcessSchemaNotFoundOperatorMessage: "Object handling process for the queue is not defined",
		ProcessSchemaNotFoundExceptionMessage: "Unable to find process schema for queue element with the following Id - \u0027{0}\u0027",
		QueueItemNotStartedSuccessfullyMessage: "Unfortunately, the process failed to run. Please check the process diagram and process log file or contact your administrator"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});