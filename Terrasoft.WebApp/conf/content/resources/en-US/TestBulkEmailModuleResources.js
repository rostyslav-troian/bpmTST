define("TestBulkEmailModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SendButtonCaption: "Send",
		CancelButtonCaption: "Cancel",
		BulkEmailCaption: "Bulk email",
		ContactCaption: "Contact",
		EmailCaption: "Email",
		PageCaption: "Test sending",
		IncorrectEmailMessage: "Invalid email",
		FieldValidationError: "Field \u0022{0}\u0022: {1}",
		SendTestBulkMessageFailMessage: "Could not perform test sending.\n\nTry once again or contact your system administrator to check integration settings.",
		SendTestBulkMessageSuccessMessage: "Test sending performed successfully.",
		MaskMessage: "Sending",
		DemoDataMessage: "You cannot send emails in Creatio marketing demo version. If you want to send your bulk emails, get a free 30 day trial version.",
		TryTrialButtonCaption: "Get a trial version"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "TestBulkEmailModule",
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