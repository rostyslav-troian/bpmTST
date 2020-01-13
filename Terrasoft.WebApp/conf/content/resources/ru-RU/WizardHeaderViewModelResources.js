define("WizardHeaderViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NextButtonCaption: "\u0414\u0430\u043B\u0435\u0435",
		SaveButtonCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		SaveButtonHint: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C (Ctrl\u002BS)"
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