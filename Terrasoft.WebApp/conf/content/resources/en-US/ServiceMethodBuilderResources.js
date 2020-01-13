define("ServiceMethodBuilderResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		NextButtonCaption: "Next",
		DoneButtonCaption: "Done",
		BackButtonCaption: "Back",
		CloseButtonCaption: "Close",
		ParseFailedInfo: "Failed to form the parameters list.",
		SaveSuccessInfo: "{0} parameters were successfully added.\nNow You can clarify their names, data types, default values and other settings.",
		Title: "",
		ParseFailedInfoPart2: "Please check that the entered data is correct and try again."
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "ServiceMethodBuilder",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		SetupResultImageSuccess: {
			source: 3,
			params: {
				schemaName: "ServiceMethodBuilder",
				resourceItemName: "SetupResultImageSuccess",
				hash: "1b17b350024ba47e8baa44fbe38860b6",
				resourceItemExtension: ".svg"
			}
		},
		SetupResultImageFail: {
			source: 3,
			params: {
				schemaName: "ServiceMethodBuilder",
				resourceItemName: "SetupResultImageFail",
				hash: "addbd12b1b53bcb56b1580c71598f4e6",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});