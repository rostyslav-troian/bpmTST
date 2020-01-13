define("ProcessSettingsPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ModalBoxCaption: "Business process launch settings",
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		ProcessSelectionLabel: "Which process to run?",
		ParameterSelectionLabel: "Process parameter where the record is passed",
		RunByRecordCaption: "For selected record",
		RunWithoutRecordCaption: "Regardless of record",
		ParameterRecordPlaceholder: "Select parameter",
		ParameterRecordNotFoundPlaceholder: "Parameters not found",
		AddProcessButtonHintCaption: "Add new process",
		OpenProcessButtonHintCaption: "Open process designer"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "ProcessSettingsPage",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessSettingsPage",
				resourceItemName: "AddButtonImage",
				hash: "d30933184bec2d3279aaeda342cc0943",
				resourceItemExtension: ".svg"
			}
		},
		OpenButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessSettingsPage",
				resourceItemName: "OpenButtonImage",
				hash: "aea471c866f7ef37845aa83431c9f2d8",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});