define("DateTimeMappingPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectionDateTimeCaption: "Date and Time",
		SelectionDateCaption: "Date",
		SelectionTimeCaption: "Time",
		SelectionBaseCaption: "Selection:",
		SaveButtonCaption: "Select",
		CancelButtonCaption: "Cancel"
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