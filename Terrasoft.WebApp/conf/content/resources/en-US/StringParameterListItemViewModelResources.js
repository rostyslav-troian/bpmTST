define("StringParameterListItemViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ContactName: "Contact name",
		DateTimeMacro: "Date and time macro"
	};
	var localizableImages = {
		ContactIcon: {
			source: 3,
			params: {
				schemaName: "StringParameterListItemViewModel",
				resourceItemName: "ContactIcon",
				hash: "c94851c6b4ce65a0a57664356f13327f",
				resourceItemExtension: ".svg"
			}
		},
		CalendarIcon: {
			source: 3,
			params: {
				schemaName: "StringParameterListItemViewModel",
				resourceItemName: "CalendarIcon",
				hash: "5481353cf2ddce1a12b47cd0f44b7ae6",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});