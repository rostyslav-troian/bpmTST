define("MultiCurrencyEditResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ApplyButtonCaption: "Apply",
		CancelButtonCaption: "Cancel",
		PrimaryAmountCaption: "Amount",
		CurrencyCaption: "Currency",
		RateCaption: "Exchange rate",
		RateInfoCaption: "{0} for {1} {2}",
		CurrencyRateListNotInitializedError: "Currencies collection was not initialized. Check if the MultiCurrencyEditUtilities mix-in is connected properly",
		FieldLockHint: "Non-editable field"
	};
	var localizableImages = {
		EditIcon: {
			source: 3,
			params: {
				schemaName: "MultiCurrencyEdit",
				resourceItemName: "EditIcon",
				hash: "b43eaf2b32207bff6675b0055ba9bca2",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});