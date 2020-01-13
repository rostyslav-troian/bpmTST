Terrasoft.configuration.Structures["FileImportWizardStep"] = {innerHierarchyStack: ["FileImportWizardStep"]};
define("FileImportWizardStep", ["terrasoft", "ext-base", "WizardStep"], function(Terrasoft, Ext) {
	/**
	 * @class Terrasoft.configuration.FileImportWizardStep
	 * FileImportWizardStep wizard step view model.
	 */
	Ext.define("Terrasoft.configuration.FileImportWizardStep", {
		extend: "Terrasoft.WizardStep",
		alternateClassName: "Terrasoft.FileImportWizardStep",

		/**
		 * @inheritdoc WizardStep#initCanUseStep
		 * @overridden
		 */
		initCanUseStep: function(callback, scope) {
			this.set(this.canUseStepPropertyName, true);
		}

	});

	return Terrasoft.FileImportWizardStep;
});

