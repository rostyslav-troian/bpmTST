define("StringParameterListItemViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ContactName: "\u0418\u043C\u044F \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430",
		DateTimeMacro: "\u041C\u0430\u043A\u0440\u043E\u0441 \u0434\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F"
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