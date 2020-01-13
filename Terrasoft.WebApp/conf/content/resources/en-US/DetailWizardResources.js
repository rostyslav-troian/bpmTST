define("DetailWizardResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		NewDetailWizardCaption: "New detail",
		SavingEntitySchemasMessage: "Saving object schemas",
		UpdatingDBStructureMessage: "DB structure update",
		CompilingMessage: "Compilation",
		SavingClientUnitSchemasMessage: "Saving client schemas",
		SchemaRegistrationMessage: "Schema registration",
		PageRegistrationMessage: "Registering pages",
		SavingSuccessMessage: "Changes applied successfully",
		CurrentPackageIdIsEmpty: "\u0027Current package\u0027 system setting not installed",
		MainSettingsStepCaption: "Detail",
		PageDesignerStepCaption: "Page",
		CurrentPackageNotFound: "\u0027Current package\u0027 system setting not found",
		RightsErrorMessage: "Insufficient rights to perform this action. Contact your system administrator.",
		MainSettingsCaption: "General detail properties",
		SetPackageNameInfo: "\u0022Current package\u0022 system package not installed. All changes will be saved into package \u0022{0}\u0022. Configure system settings to change the package.",
		RegeneratingClientBundles: "Updating client schemas",
		BusinessRulesStepCaption: "Business rules",
		BusinessProcessesCaption: "Business processes",
		DetailSysModuleEntityAbsentMessage: "There are invalid data in the system database. It blocks editing of current detail. Table \u0027SysModuleEntity\u0027 must contain record with \u0027EntitySchemaUId\u0027 = \u0027{0}\u0027 matching this detail in the \u0027SysDetail\u0027 table."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});