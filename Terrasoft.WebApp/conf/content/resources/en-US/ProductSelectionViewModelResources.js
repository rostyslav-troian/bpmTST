define("ProductSelectionViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NameCaption: "Name",
		PriceCaption: "Price{0}",
		AvailableCaption: "Warehouse",
		CountCaption: "Quantity",
		UnitCaption: "Unit of measure",
		AvailableInCaption: "",
		ModuleCaption: "{0} product selection",
		ProductCatalogueRootCaption: "Catalog",
		SearchStringPlaceHolder: "Search by product name or code",
		AvailableInFormatString: "{1} {2} are added to {0}",
		CodeCaption: "Code",
		ProductsListDataViewHint: "Products list",
		CartDataViewHint: "Cart"
	};
	var localizableImages = {
		GridDataViewIcon: {
			source: 3,
			params: {
				schemaName: "ProductSelectionViewModel",
				resourceItemName: "GridDataViewIcon",
				hash: "a7c84fe2f715bd579f6e51a0e0e840f3",
				resourceItemExtension: ".png"
			}
		},
		BasketDataViewIcon: {
			source: 3,
			params: {
				schemaName: "ProductSelectionViewModel",
				resourceItemName: "BasketDataViewIcon",
				hash: "f35ff18b75f126ebfd520c063a28c160",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});