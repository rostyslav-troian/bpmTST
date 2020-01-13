define("DateTimeMappingPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectionDateTimeCaption: "\u0414\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F",
		SelectionDateCaption: "\u0414\u0430\u0442\u0430",
		SelectionTimeCaption: "\u0412\u0440\u0435\u043C\u044F",
		SelectionBaseCaption: "\u0412\u044B\u0431\u043E\u0440:",
		SaveButtonCaption: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "DateTimeMappingPage",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});