define("EmailMessageEnrichmentMixinResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EnrichContactMenuSeparator: "ENRICH DATA",
		AddToExistingContactMenuItemCaption: "Add to existing contact",
		CreateNewContactMenuItemCaption: "Create contact",
		CreateContactCaptionTemplate: "Create {0}",
		EnrichContactCaptionTemplate: "Enrich {0}",
		SetCaseContactMessage: "Specify {0} as contact in case?"
	};
	var localizableImages = {
		Cloud: {
			source: 3,
			params: {
				schemaName: "EmailMessageEnrichmentMixin",
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