define("WizardHeaderViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NextButtonCaption: "Next",
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		SaveButtonHint: "Save (Ctrl\u002BS)"
	};
	var localizableImages = {
		ArrowRight: {
			source: 3,
			params: {
				schemaName: "WizardHeaderViewModel",
				resourceItemName: "ArrowRight",
				hash: "897976db869a6051d3177faa783f9fad",
				resourceItemExtension: ".png"
			}
		},
		ArrowLeft: {
			source: 3,
			params: {
				schemaName: "WizardHeaderViewModel",
				resourceItemName: "ArrowLeft",
				hash: "2afc8fba865571c7720aa7f6dc691c6a",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});