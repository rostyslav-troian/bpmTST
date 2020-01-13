define("ApplicationStructureItemWizardResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CurrentPackageIdIsEmpty: "\u0027Current package\u0027 system setting is not set",
		NewApplicationStructureItemWizardCaption: "New",
		MainSettingsStepCaption: "Schema",
		PageDesignerStepCaption: "Page",
		CurrentPackageNotFound: "\u0027Current package\u0027 system setting not found",
		RightsErrorMessage: "Insufficient rights to perform this action. Contact your system administrator.",
		SetPackageNameInfo: "\u0027Current package\u0027 system setting is not set. All changes will be saved into package \u0022{0}\u0022. Configure system settings to change the package.",
		MainSettingsCaption: "General properties",
		SavingEntitySchemasMessage: "Saving object schemas",
		UpdatingDBStructureMessage: "Updating DB structure",
		CompilingMessage: "Compilation",
		SavingClientUnitSchemasMessage: "Saving client schemas",
		SchemaRegistrationMessage: "Schema registration",
		PageRegistrationMessage: "Page registration",
		MainSchemaRegistrationMessage: "Main schema registration",
		SavingSuccessMessage: "Changes applied successfully",
		RegeneratingClientBundles: "Updating client schemas",
		ClearCacheMessage: "Clearing server cache",
		SaveLookupMessage: "Saving lookup data",
		SaveMessage: "All changes will be saved. Continue?",
		SavingBusinessRuleMessage: "Saving business rules",
		LockedElementsWarning: "One or more elements connected to this section or detail is locked by another user. Please unlock the following elements to save changes:",
		BuildingConfiguration: "Building configuration",
		MiniPageDesignerStepCaption: "Mini page",
		SaveButtonCaption: "Save",
		RequiredSchemasAbsentInHierarchyMessage: "Package \u0022{0}\u0022 is set as the current package. To continue editing, please complete its dependencies or change the system setting \u0022Current package\u0022 and open this window once again. This package must have access to the following schemas:{1}",
		MoreAbsentSchemasMessage: "- and {0} others.",
		SavingWizardMessage: "Saving",
		UpdateClientUnitSchemaModuleFiles: "Updating client modules from DB",
		DetailRegistrationMessage: "Detail registration"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});