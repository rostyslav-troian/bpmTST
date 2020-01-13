define("SectionPageWizardResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WizardSysModuleEntityAbsentMessage: "There are invalid data in the system database. It blocks editing of current section. \u0027SysModule\u0027 table record with \u0027Code\u0027 = \u0027{0}\u0027 has empty value in column \u0027SysModuleEntityId\u0027.",
		WizardSysModuleEditAbsentMessage: "There are invalid data in the system database. It blocks editing of current section. Table \u0027SysModuleEdit\u0027 must contain records about pages in current section.",
		CancelButtonClickCaption: "Changes will not be applied. Exit the wizard?",
		PageDesignerStepCaption: "Page",
		NewPageWizardCaption: "Page",
		BusinessRulesStepCaption: "Business rules",
		SourceCodeStepCaption: "Source code"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});