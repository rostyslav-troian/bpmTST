﻿define("ApplicationStructureItemWizardResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CurrentPackageIdIsEmpty: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u0027\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0430\u043A\u0435\u0442\u0027 \u043D\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430",
		NewApplicationStructureItemWizardCaption: "\u041D\u043E\u0432\u044B\u0439",
		MainSettingsStepCaption: "\u0421\u0445\u0435\u043C\u0430",
		PageDesignerStepCaption: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
		CurrentPackageNotFound: "CurrentPackageNotFound",
		RightsErrorMessage: "\u0423 \u0432\u0430\u0441 \u043D\u0435\u0442 \u043F\u0440\u0430\u0432 \u043D\u0430 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F. \u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u043A \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u043C\u0443 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0443.",
		SetPackageNameInfo: "\u0421\u0438\u0441\u0442\u0435\u043C\u043D\u0430\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u0022\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0430\u043A\u0435\u0442\u0022 \u043D\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u0430. \u0412\u0441\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0431\u0443\u0434\u0443\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B \u0432 \u043F\u0430\u043A\u0435\u0442 \u0022{0}\u0022. \u0414\u043B\u044F \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043F\u0430\u043A\u0435\u0442\u0430 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u0443\u044E \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0443.",
		MainSettingsCaption: "\u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u0430",
		SavingEntitySchemasMessage: "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0441\u0445\u0435\u043C \u043E\u0431\u044A\u0435\u043A\u0442\u043E\u0432",
		UpdatingDBStructureMessage: "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u044B \u0411\u0414",
		CompilingMessage: "\u041A\u043E\u043C\u043F\u0438\u043B\u044F\u0446\u0438\u044F",
		SavingClientUnitSchemasMessage: "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0445 \u0441\u0445\u0435\u043C",
		SchemaRegistrationMessage: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0441\u0445\u0435\u043C",
		PageRegistrationMessage: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446",
		MainSchemaRegistrationMessage: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0441\u0445\u0435\u043C\u044B",
		SavingSuccessMessage: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B",
		RegeneratingClientBundles: "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0445 \u0441\u0445\u0435\u043C",
		ClearCacheMessage: "\u041E\u0447\u0438\u0441\u0442\u043A\u0430 \u043A\u044D\u0448\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430",
		SaveLookupMessage: "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u043E\u0432",
		SaveMessage: "\u0412\u0441\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0431\u0443\u0434\u0443\u0442 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C?",
		SavingBusinessRuleMessage: "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0431\u0438\u0437\u043D\u0435\u0441-\u043F\u0440\u0430\u0432\u0438\u043B",
		LockedElementsWarning: "\u041E\u0434\u0438\u043D \u0438\u043B\u0438 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432, \u0441 \u043A\u043E\u0442\u043E\u0440\u044B\u043C\u0438 \u0441\u0432\u044F\u0437\u0430\u043D \u0440\u0430\u0437\u0434\u0435\u043B \u0438\u043B\u0438 \u0434\u0435\u0442\u0430\u043B\u044C, \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u044B \u0434\u0440\u0443\u0433\u0438\u043C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C. \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043C\u043E\u0436\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0438 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0445 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432:",
		BuildingConfiguration: "\u0421\u0431\u043E\u0440\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438",
		MiniPageDesignerStepCaption: "\u041C\u0438\u043D\u0438-\u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430",
		SaveButtonCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		RequiredSchemasAbsentInHierarchyMessage: "\u041F\u0430\u043A\u0435\u0442 \u0022{0}\u0022 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \u043A\u0430\u043A \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0430\u043A\u0435\u0442. \u0414\u043B\u044F \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0435\u043D\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0435\u0433\u043E \u043D\u0430\u0431\u043E\u0440 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0435\u0439 \u0438\u043B\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u0443\u044E \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0443 \u0022\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0430\u043A\u0435\u0442\u0022 \u0438 \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u044D\u0442\u043E \u043E\u043A\u043D\u043E \u0435\u0449\u0435 \u0440\u0430\u0437. \u0423 \u043D\u0435\u0433\u043E \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0431\u044B\u043B \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u043C \u0441\u0445\u0435\u043C\u0430\u043C:{1}",
		MoreAbsentSchemasMessage: "- \u0438 {0} \u0434\u0440\u0443\u0433\u0438\u0445.",
		SavingWizardMessage: "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435",
		UpdateClientUnitSchemaModuleFiles: "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043A\u043B\u0438\u0435\u043D\u0442\u0441\u043A\u0438\u0445 \u043C\u043E\u0434\u0443\u043B\u0435\u0439 \u0438\u0437 \u0411\u0414",
		DetailRegistrationMessage: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0434\u0435\u0442\u0430\u043B\u0438"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});