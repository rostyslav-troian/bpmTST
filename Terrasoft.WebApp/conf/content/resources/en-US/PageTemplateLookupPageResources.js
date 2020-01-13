define("PageTemplateLookupPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectButtonCaption: "Select",
		CancelButtonCaption: "Cancel",
		Title: "Select page template",
		SetupTemplatesButtonCaption: "Setup templates",
		SetupTemplatesButtonHint: "Open in the new tab page templates lookup"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "PageTemplateLookupPage",
				resourceItemName: "CloseIcon",
				hash: "563de164682be35ef981066b7287177c",
				resourceItemExtension: ".svg"
			}
		},
		SetupTemplates: {
			source: 3,
			params: {
				schemaName: "PageTemplateLookupPage",
				resourceItemName: "SetupTemplates",
				hash: "80324446348427228e1d24acab5af918",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});