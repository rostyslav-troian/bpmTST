define("SectionVisaSettingsResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		VisaSettingsCaption: "\u0412\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
		AvailableVisaCaption: "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u0432\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435",
		TabVisaCaption: "\u0412\u0438\u0437\u044B",
		SchemaVisaCaption: "\u0412\u0438\u0437\u044B \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 {0}"
	};
	var localizableImages = {
		VisaIcon: {
			source: 3,
			params: {
				schemaName: "SectionVisaSettings",
				resourceItemName: "VisaIcon",
				hash: "6f1dc58a0388df56739e2738d2c19a03",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});