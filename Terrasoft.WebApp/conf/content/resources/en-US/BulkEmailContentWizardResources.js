define("BulkEmailContentWizardResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SendTestEmailButtonCaption: "Test email",
		SaveButtonCaption: "Save",
		CloseButtonCaption: "Close",
		DesignTabCaption: "Design",
		HeadersTabCaption: "Headers",
		SelectTemplateFromLookupButtonCaption: "Select from lookup",
		SavedSuccessFullyMessage: "Changes saved successfully",
		SavedWithErrorsMessage: "Template saved as draft due to validation errors",
		PreviewTabCaption: "Preview",
		ActionsButtonCaption: "Actions"
	};
	var localizableImages = {
		CloseButton: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentWizard",
				resourceItemName: "CloseButton",
				hash: "b3a6d35ce6052e61c72a6a0dd5285b51",
				resourceItemExtension: ".svg"
			}
		},
		NotificationError: {
			source: 3,
			params: {
				schemaName: "BulkEmailContentWizard",
				resourceItemName: "NotificationError",
				hash: "ad71c54f24782c5c7d66c61f7bce4d14",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});