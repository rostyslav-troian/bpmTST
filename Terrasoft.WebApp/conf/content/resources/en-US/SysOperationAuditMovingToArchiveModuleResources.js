define("SysOperationAuditMovingToArchiveModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		BtnOKCaption: "OK",
		BtnCancelCaption: "Cancel",
		WindowCaption: "Archive parameters",
		LblDateFromCaption: "Period from",
		LblDateToCaption: "till",
		LblOperationTypeCaption: "Event type",
		StartDateValidationMessage: "Start date must be earlier than the end date",
		DueDateValidationMessage: "End date must be later than the start date",
		NoRecordToArchive: "No records to archive",
		ArchiveRecordCountCaption: "Archived {0} record(s)"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});