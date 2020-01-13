define("SupplyPaymentGridButtonsUtilityResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GridButtonAdd: "Add",
		GridButtonOneProduct: "{0} product",
		GridButtonLessThanFiveProducts: "{0} products",
		GridButtonFiveAndMoreProducts: "{0} products",
		GridButtonCreateInvoice: "Create",
		ClearProductsButtonHint: "Reset products"
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