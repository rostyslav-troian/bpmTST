define("InvoiceSectionResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PeriodFilterCaption: "\u0414\u0430\u0442\u0430 \u0432\u044B\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u044F",
		OwnerFilterCaption: "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439",
		PrintButtonCaption: "\u041F\u0435\u0447\u0430\u0442\u044C"
	};
	var localizableImages = {
		PrintButtonImage: {
			source: 3,
			params: {
				schemaName: "InvoiceSection",
				resourceItemName: "PrintButtonImage",
				hash: "ab95a601fcc3859abee40dade28a015b",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});