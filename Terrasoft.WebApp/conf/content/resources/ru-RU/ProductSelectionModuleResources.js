define("ProductSelectionModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ModuleCaption: "\u041F\u043E\u0434\u0431\u043E\u0440 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432 \u0432 {0}"
	};
	var localizableImages = {
		GridDataViewIcon: {
			source: 3,
			params: {
				schemaName: "ProductSelectionModule",
				resourceItemName: "GridDataViewIcon"
			}
		},
		BasketDataViewIcon: {
			source: 3,
			params: {
				schemaName: "ProductSelectionModule",
				resourceItemName: "BasketDataViewIcon"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});