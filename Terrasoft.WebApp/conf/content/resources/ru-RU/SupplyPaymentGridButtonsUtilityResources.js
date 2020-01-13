define("SupplyPaymentGridButtonsUtilityResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GridButtonAdd: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
		GridButtonOneProduct: "{0} \u043F\u0440\u043E\u0434\u0443\u043A\u0442",
		GridButtonLessThanFiveProducts: "{0} \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430",
		GridButtonFiveAndMoreProducts: "{0} \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432",
		GridButtonCreateInvoice: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C",
		ClearProductsButtonHint: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u044B"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentGridButtonsUtility",
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