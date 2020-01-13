define("BulkEmailHyperlinkLookupPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectButtonCaption: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		LookupCaptionText: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0438 \u0432 Email",
		SelectedRecordsCaption: "\u0412\u044B\u0431\u0440\u0430\u043D\u043E \u0437\u0430\u043F\u0438\u0441\u0435\u0439:"
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