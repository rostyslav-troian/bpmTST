define("ProcessModuleUtilitiesResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DisableInDemoMessage: "This action is not available in demo version",
		ErrorStartBusinessProcess: "Error starting business process {0}. {1} server response.",
		CustomPackageName: "Custom",
		PublishMaskCaption: "Publishing...",
		HasRunningProcessMessage: "Number of process running instances {0}found: {1}. Cancel them?",
		CopiedSchemaPostfixCaption: " - Copy",
		OpenSchemaDesignerConfirmationMessage: "Schema \u0022{0}\u0022 has several running instances. Changes for this item may result in errors of the running process instances. Continue?",
		PopupBlockedMessage: "Pop-up windows are blocked in browser. Enable pop-up windows in your browser for correct operation of application.",
		ProcessSchemaNotFound: "Process schema with ID \u0027{0}\u0027 not found.",
		ProcessCaption: "Process"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});