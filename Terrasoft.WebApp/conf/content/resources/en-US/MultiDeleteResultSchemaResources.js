define("MultiDeleteResultSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MessageWithFailedItems: "{0} of {1} records have been deleted.{2} records could not be deleted",
		DetailResult: "View details",
		AllFieldItems: "Unable to delete selected records",
		EmptyConfig: "Empty config object",
		MaskCaptionTemplate: "{0} of {1} records processed",
		ErrorTimeoutMessage: "Error occurred during the deletion of data. Please contact system administrator.",
		PreparingData: "Preparing data for deletion"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});