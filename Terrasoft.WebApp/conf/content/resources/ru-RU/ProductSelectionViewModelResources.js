define("ProductSelectionViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NameCaption: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
		PriceCaption: "\u0426\u0435\u043D\u0430{0}",
		AvailableCaption: "\u0421\u043A\u043B\u0430\u0434",
		CountCaption: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E",
		UnitCaption: "\u0415\u0434\u0438\u043D\u0438\u0446\u0430 \u0438\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u044F",
		AvailableInCaption: "",
		ModuleCaption: "\u041F\u043E\u0434\u0431\u043E\u0440 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 \u0432 {0}",
		ProductCatalogueRootCaption: "\u041A\u0430\u0442\u0430\u043B\u043E\u0433",
		SearchStringPlaceHolder: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E \u0438\u043B\u0438 \u043A\u043E\u0434\u0443",
		AvailableInFormatString: "\u041F\u0440\u043E\u0434\u0443\u043A\u0442 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 {0} \u0432 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u0435 {1} {2}",
		CodeCaption: "\u041A\u043E\u0434",
		ProductsListDataViewHint: "\u0421\u043F\u0438\u0441\u043E\u043A \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432",
		CartDataViewHint: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430"
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