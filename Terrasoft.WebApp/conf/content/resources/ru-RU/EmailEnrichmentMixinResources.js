define("EmailEnrichmentMixinResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EnrichContactMenuSeparator: "\u041E\u0411\u041E\u0413\u0410\u0422\u0418\u0422\u042C \u0414\u0410\u041D\u041D\u042B\u0415",
		CreateContactCaptionTemplate: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C {0}",
		EnrichContactCaptionTemplate: "\u041E\u0431\u043E\u0433\u0430\u0442\u0438\u0442\u044C {0}"
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