define("ContactEnrichmentSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddContactCaption: "Create contact",
		EnrichContactCaption: "Update existing",
		SaveNewContactHint: "Create new contact using selected data",
		UpdateContactHint: "Add all selected data to contact profile",
		AccountCaption: "Account",
		AdditionalDataEnrichmentCaption: "Add new information"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "ContactEnrichmentSchema",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		RefreshIcon: {
			source: 3,
			params: {
				schemaName: "ContactEnrichmentSchema",
				resourceItemName: "RefreshIcon",
				hash: "b6db25ca695ff69f5e479a3e2c967918",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});