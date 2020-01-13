define("ProductSelectionModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ModuleCaption: "{0} product selection"
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