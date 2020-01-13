define("DefaultValueWebLeadFormModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddColumnButtonCaption: "New field",
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		MainHeaderCaption: "Fill in columns by default",
		SettingsHintMessage: "Specify fields of the object and the default values for them",
		DefaultValuesNotSetHintMessage: "Default values are not specified for filling in the landing page",
		EditButtonCaption: "Edit"
	};
	var localizableImages = {
		DeleteIcon: {
			source: 3,
			params: {
				schemaName: "DefaultValueWebLeadFormModule",
				resourceItemName: "DeleteIcon",
				hash: "d83fcc9d4e31559d6f903a11f6d528bd",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});