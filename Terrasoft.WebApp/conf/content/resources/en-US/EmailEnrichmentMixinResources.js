define("EmailEnrichmentMixinResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EnrichContactMenuSeparator: "ENRICH DATA",
		CreateContactCaptionTemplate: "Create {0}",
		EnrichContactCaptionTemplate: "Enrich {0}"
	};
	var localizableImages = {
		Cloud: {
			source: 3,
			params: {
				schemaName: "EmailEnrichmentMixin",
				resourceItemName: "Cloud",
				hash: "588f9021245791159b6a98d86790d502",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});