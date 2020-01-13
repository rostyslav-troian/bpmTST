define("SendTestEmailContentMixinResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MaskMessage: "Sending",
		DemoDataMessage: "You cannot send emails in Creatio marketing demo version. If you want to send your bulk emails, get a free 30 day trial version.",
		TryTrialButtonCaption: "Get a trial version",
		SendTestBulkMessageSuccessMessage: "Test sending performed successfully.",
		SendTestBulkMessageFailMessage: "Could not perform test sending.Try once again or contact your system administrator to check integration settings."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});