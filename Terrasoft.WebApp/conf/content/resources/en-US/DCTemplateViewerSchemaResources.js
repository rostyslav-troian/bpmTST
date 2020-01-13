define("DCTemplateViewerSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		InsertTemplateFromLookupMenuItemCaption: "Select from lookup",
		EditTemplateCaption: "Edit",
		TemplateBlankSlateCaption: "This area displays the email template, which will be used for this email. Please proceed to content builder in order to create new template",
		LinkSelectTemplate: "select an existing template",
		LinkCreateTemplate: "create a new custom template",
		SendTestEmailCaption: "Test email"
	};
	var localizableImages = {
		ToggleListButtonImage: {
			source: 3,
			params: {
				schemaName: "DCTemplateViewerSchema",
				resourceItemName: "ToggleListButtonImage",
				hash: "7bc3932d679a675779c0a19c7b0e2dca",
				resourceItemExtension: ".svg"
			}
		},
		TemplateBlankSlateImage: {
			source: 3,
			params: {
				schemaName: "DCTemplateViewerSchema",
				resourceItemName: "TemplateBlankSlateImage",
				hash: "25e896cdece5a8acfc34cc4ee540b441",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});