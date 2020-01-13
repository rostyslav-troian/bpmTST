define("EmailTemplateLookupGallerySchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		BlankSlateDescription: "\u0412\u0430\u0448 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F.\n\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 Chrome, Safari \u0438\u043B\u0438 Firefox \u0434\u043B\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0441 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u043E\u0439 \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432",
		Header: "\u041F\u043E\u0438\u0441\u043A: \u0428\u0430\u0431\u043B\u043E\u043D\u044B email ",
		SearchPlaceholder: "\u041F\u043E\u0438\u0441\u043A",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		SelectButtonCaption: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C"
	};
	var localizableImages = {
		BlankSlateIcon: {
			source: 3,
			params: {
				schemaName: "EmailTemplateLookupGallerySchema",
				resourceItemName: "BlankSlateIcon",
				hash: "1b81bfab6f136e6c62e7f1bf3fe0e354",
				resourceItemExtension: ".png"
			}
		},
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "EmailTemplateLookupGallerySchema",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});