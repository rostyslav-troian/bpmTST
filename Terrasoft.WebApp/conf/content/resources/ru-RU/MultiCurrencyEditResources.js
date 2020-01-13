define("MultiCurrencyEditResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ApplyButtonCaption: "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		PrimaryAmountCaption: "\u0421\u0443\u043C\u043C\u0430",
		CurrencyCaption: "\u0412\u0430\u043B\u044E\u0442\u0430",
		RateCaption: "\u041A\u0443\u0440\u0441",
		RateInfoCaption: "{0} \u0437\u0430 {1} {2}",
		CurrencyRateListNotInitializedError: "\u041A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044F \u0432\u0430\u043B\u044E\u0442 \u043D\u0435 \u0431\u044B\u043B\u0430 \u043F\u0440\u043E\u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435, \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E \u043B\u0438 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D \u043C\u0438\u043A\u0441\u0438\u043D MultiCurrencyEditUtilities",
		FieldLockHint: "\u041D\u0435\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u043E\u0435 \u043F\u043E\u043B\u0435"
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