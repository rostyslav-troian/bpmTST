define("SectionWizardResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NewSectionWizardCaption: "New",
		CurrentPackageIdIsEmpty: "\u0027Current package\u0027 system setting not installed",
		MainSettingsStepCaption: "Section",
		PageDesignerStepCaption: "Page",
		CurrentPackageNotFound: "\u0027Current package\u0027 system setting not found",
		RightsErrorMessage: "Insufficient rights to perform this action. Contact your system administrator.",
		SetPackageNameInfo: "\u0022Current package\u0022 system package not installed. All changes will be saved into package \u0022{0}\u0022. Configure system settings to change the package.",
		SectionRegistrationMessage: "Section registration",
		SaveMessage: "All changes will be saved. Continue?",
		CasesStepCaption: "Cases",
		CasesRegistrationMessage: "Cases registration",
		EntityConnectionRegistrationMessage: "Registration entity connections",
		BusinessRulesStepCaption: "Business rules",
		BusinessProcessesCaption: "Business processes",
		WizardSysModuleEntityAbsentMessage: "There are invalid data in the system database. It blocks editing of current section. \u0027SysModule\u0027 table record with \u0027Code\u0027 = \u0027{0}\u0027 has empty value in column \u0027SysModuleEntityId\u0027.",
		WizardSysModuleEditAbsentMessage: "There are invalid data in the system database. It blocks editing of current section. Table \u0027SysModuleEdit\u0027 must contain records about pages in current section.",
		SspMainSettingsStepCaption: "Portal",
		NewSspSectionCaptionTemplate: "Portal {0}"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});