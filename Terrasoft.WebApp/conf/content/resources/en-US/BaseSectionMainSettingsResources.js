define("BaseSectionMainSettingsResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CaptionLabel: "Title",
		SectionSchemaCaptionTemplate: "Section schema: \u0022{0}\u0022",
		EditPageCaptionTemplate: "Card schema: \u0022{0}\u0022",
		CodeLabel: "Code",
		WorkplaceLabel: "Workplace",
		IconLabel: "Menu icon",
		AddingRecordThroughMinicardSettingLabel: "Add record through minicard",
		SectionManagerItemNotFoundExceptionMessage: "Section manager item not found",
		TopControlGroupSettingsNewSectionLabel: "Select basic properties for new section:",
		TopControlGroupSettingsExistingSectionLabel: "Select basic properties for section:",
		WrongPrefixMessage: "Code of the section must contain prefix \u0022{0}\u0022",
		EmptyFieldValueMessage: "Specify the value",
		WrongCodeMessage: "Invalid value. Use symbols: a-z, A-Z, 0-9. \nSymbol: 0-9 cannot be first.",
		NewSectionCodeMessage: "The following prefix will automatically be added to the name {0}",
		GlobalSearchAvailableLabel: "Indexing for full-text search",
		SectionSettingsLabel: "Section settings",
		IsSystem: "System section"
	};
	var localizableImages = {
		DefaultIcon: {
			source: 3,
			params: {
				schemaName: "BaseSectionMainSettings",
				resourceItemName: "DefaultIcon",
				hash: "4c421e204b17018308c36c5d9105b121",
				resourceItemExtension: ".svg"
			}
		},
		SectionIcon: {
			source: 3,
			params: {
				schemaName: "BaseSectionMainSettings",
				resourceItemName: "SectionIcon",
				hash: "640e80bd309c99f2b2328b669dd276d5",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});