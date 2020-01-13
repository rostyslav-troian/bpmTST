define("ProductSelectionViewResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NameCaption: "Name",
		PriceCaption: "",
		CountCaption: "Quantity",
		AvailableCaption: "Warehouse",
		UnitCaption: "Unit of measure",
		AvailableInCaption: "",
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		LineItemsCaption: "Items:",
		TotalAmountCaption: "Total:"
	};
	var localizableImages = {
		Warning: {
			source: 3,
			params: {
				schemaName: "ProductSelectionView",
				resourceItemName: "Warning"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});