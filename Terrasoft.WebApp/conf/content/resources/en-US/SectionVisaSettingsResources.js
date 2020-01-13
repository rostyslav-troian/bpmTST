define("SectionVisaSettingsResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		VisaSettingsCaption: "Approval",
		AvailableVisaCaption: "Enable approval in section",
		TabVisaCaption: "Approvals",
		SchemaVisaCaption: "Approvals in section {0}"
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