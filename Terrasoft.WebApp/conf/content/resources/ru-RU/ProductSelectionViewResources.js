define("ProductSelectionViewResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NameCaption: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
		PriceCaption: "",
		CountCaption: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E",
		AvailableCaption: "\u0421\u043A\u043B\u0430\u0434",
		UnitCaption: "\u0415\u0434\u0438\u043D\u0438\u0446\u0430 \u0438\u0437\u043C\u0435\u0440\u0435\u043D\u0438\u044F",
		AvailableInCaption: "",
		SaveButtonCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		LineItemsCaption: "\u041F\u043E\u0437\u0438\u0446\u0438\u0439:",
		TotalAmountCaption: "\u043D\u0430 \u0441\u0443\u043C\u043C\u0443:"
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