define("BaseEnrichmentSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MaskLoadingCaption: "Data search is in process. It can take several seconds.",
		CloseButtonCaption: "Close",
		SaveButtonCaption: "Save",
		SaveButtonHint: "Add all selected data to the account profile",
		RefreshButtonHint: "Search new data for enrichment",
		EnricmentServiceBadRequest: "Could not connect to Creatio cloud services.\nMake sure that system setting \u201CCreatio cloud services API key\u201D is filled in or contact Creatio support."
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "BaseEnrichmentSchema",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		RefreshIcon: {
			source: 3,
			params: {
				schemaName: "BaseEnrichmentSchema",
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