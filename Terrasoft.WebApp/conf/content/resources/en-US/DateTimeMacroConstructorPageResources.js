define("DateTimeMacroConstructorPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DateTimeMode: "Date and time",
		TimeMode: "Time",
		DateMode: "Date",
		CurrentDateMacro: "Current date",
		DaysBeforeMacro: "N days before",
		DaysAfterMacro: "N days after",
		CurrentTimeMacro: "Current time",
		ExactTimeMacro: "Exact time",
		HoursBeforeMacro: "N hours before",
		HoursAfterMacro: "N hours after",
		DaysNumberCaption: "Quantity",
		DateMacroCaption: "Date",
		MacroModeCaption: "Type of macro",
		TimeMacroCaption: "Time",
		HoursNumberCaption: "Quantity",
		ExactTimeCaption: "Specify exact time",
		LookupCaptionText: "Specify macro value",
		SelectButtonCaption: "Select",
		CancelButtonCaption: "Cancel",
		NegativeNumberErrorText: "Must be positive"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "DateTimeMacroConstructorPage",
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