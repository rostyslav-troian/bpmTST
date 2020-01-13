define("CampaignTargetPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		ActionButtonCaption: "Actions",
		ColumnFilterInvalidFormatException: "Filtering by the {0} column is configured incorrectly",
		NewRecordPageCaptionSuffix: ": New record",
		IncrementNumberSuffix: "LastNumber",
		DelayExecutionButtonCaption: "Perform later",
		ProcessEntryPointButtonCaption: "Move down the process",
		CloseButtonCaption: "Close",
		ViewOptionsButtonCaption: "View",
		OpenSectionDesignerButtonCaption: "Open page designer",
		EditRightsCaption: "",
		FieldValidationError: "Field \u0022{0}\u0022: {1}",
		PrintButtonCaption: "Print",
		WarningExistsContact: "Unable to save the record because the contact with similar email has been added to the recipients of bulk email",
		WarningChangeList: "Unable to save the record because the bulk email does not have the status \u0022Planned\u0022 or \u0022Aborted\u0022",
		IncorrectEmailMessage: "Invalid email is specified",
		EmailNonActual: "Email {0} is not valid.",
		OpenListSettingsCaption: "List setup",
		ContactUnsubscribeMessage: "Unable to save the record because the contact has unsubscribed from bulk email with the type \u0022{0}\u0022",
		ProsessButtonCaption: "Run process",
		BeginProcessButtonMenuItemCaption: "Start process",
		ContinueProcessButtonMenuItemCaption: "Continue process"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});