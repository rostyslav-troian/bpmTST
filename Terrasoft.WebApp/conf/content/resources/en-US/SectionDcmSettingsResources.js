define("SectionDcmSettingsResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		StageColumnCaption: "Which column to build the stages by?",
		DefaultSchemaCaption: "Section case by default",
		FilterColumnCaption: "Which column determines which case to use with a record?",
		DeactivateCasesOnChangeStageColumnConfirmMessage: "When you change the stage column, cases with other stage column will be deactivated: {0}",
		DeactivateButtonCaption: "Deactivate",
		DeactivateCasesOnChangeFilterColumnConfirmMessage: "When you change the start condition column, cases with other column will be deactivated: {0}"
	};
	var localizableImages = {
		CasesIcon: {
			source: 3,
			params: {
				schemaName: "SectionDcmSettings",
				resourceItemName: "CasesIcon",
				hash: "5b29215772db23d178e129baa9d39c77",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});