define("SupplyPaymentProductDetailModalBoxResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OKButtonCaption: "OK",
		CancelButtonCaption: "Cancel",
		TotalAmountCaption: "Total",
		HeaderCaption: "Products distribution",
		CloseButtonHint: "Close product distribution window",
		AvailableFieldHint: "Non-editable field.  Quantity can be changed on the order page",
		HeaderTip: "Specify the quantity for those products that need to be delivered and paid for at the current step. For more details about product distribution visit Creatio \u003Ca href=\u0022#\u0022 data-context-help-id=\u00221337\u0022\u003EAcademy\u003C\/a\u003E."
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentProductDetailModalBox",
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