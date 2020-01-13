define("ProcessMappingPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		TabParametersMappingCaption: "Process Parameters",
		TabElementsMappingCaption: "Process Elements",
		TabSysSettingsMappingCaption: "System Settings",
		TabValueMappingCaption: "Lookup",
		TabSystemVariablesMappingCaption: "System variables",
		TabFunctionsMappingCaption: "Functions",
		TabDateTimeMappingCaption: "Date and time",
		HeaderCaption: "Formula",
		PlaceholderCaption: "Double-click a parameter or value on one of the tabs below to add it to the formula value",
		ValueMappingLookupSchemaPlaceholder: "Select lookup",
		HeaderCaptionParametersMapping: "Select parameter",
		HeaderCaptionLookupMapping: "Lookup value",
		HeaderSysSettingsMappingCaption: "System settings value",
		ElementParametersMappingCaption: "Element parameters",
		FormulaHelpButtonCaption: "Read more about formula"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "ProcessMappingPage",
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