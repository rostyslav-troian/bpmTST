define("EmailMessageEnrichmentMixinResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EnrichContactMenuSeparator: "\u041E\u0411\u041E\u0413\u0410\u0422\u0418\u0422\u042C \u0414\u0410\u041D\u041D\u042B\u0415",
		AddToExistingContactMenuItemCaption: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C \u0441 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u043C \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u043C",
		CreateNewContactMenuItemCaption: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442",
		CreateContactCaptionTemplate: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C {0}",
		EnrichContactCaptionTemplate: "\u041E\u0431\u043E\u0433\u0430\u0442\u0438\u0442\u044C {0}",
		SetCaseContactMessage: "\u0423\u043A\u0430\u0437\u0430\u0442\u044C {0} \u0432 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430 \u0432 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0438?"
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