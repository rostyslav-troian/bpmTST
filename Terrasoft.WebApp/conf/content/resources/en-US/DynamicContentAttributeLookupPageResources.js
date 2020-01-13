define("DynamicContentAttributeLookupPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectDCAttributeCaption: "Select the rule for a dynamic content variant",
		NoRuleAvailableCaption: "",
		CancelCaption: "Cancel",
		OkCaption: "Select"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "DynamicContentAttributeLookupPage",
				resourceItemName: "CloseIcon",
				hash: "91236d2465874e8e2cece2164d8e6bf2",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});