define("BulkEmailHyperlinkLookupPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectButtonCaption: "Select",
		CancelButtonCaption: "Cancel",
		LookupCaptionText: "Select hyperlinks in Email",
		SelectedRecordsCaption: "Records selected:"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailHyperlinkLookupPage",
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