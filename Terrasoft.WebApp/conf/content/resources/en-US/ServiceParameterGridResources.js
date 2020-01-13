define("ServiceParameterGridResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddCaption: "Add parameter",
		AddToRoot: "Add parameter to root",
		AddNested: "Add nested parameter",
		RemoveCaption: "Delete",
		DenyAccess: "The package of the web service cannot be modified or you do not have permission to edit this web service. Modify the \u0022Current package\u0022 system setting or obtain corresponding permissions.",
		RemoveConfirmationMessage: "Are you sure that you want to delete the selected parameter?",
		ParameterDefaultCaption: "Parameter",
		CopyCaption: "Copy",
		CopyCaptionSufix: " - Copy",
		RemoveMultipleConfirmationMessage: "Are you sure that you want to delete the selected parameters?"
	};
	var localizableImages = {
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ServiceParameterGrid",
				resourceItemName: "ToolsButtonImage",
				hash: "48d545549ca4ddb13d7a7bb58f60ed5e",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});