define("InvoiceSectionResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PeriodFilterCaption: "Date",
		OwnerFilterCaption: "Owner",
		PrintButtonCaption: "Print"
	};
	var localizableImages = {
		PrintButtonImage: {
			source: 3,
			params: {
				schemaName: "InvoiceSection",
				resourceItemName: "PrintButtonImage",
				hash: "ab95a601fcc3859abee40dade28a015b",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});