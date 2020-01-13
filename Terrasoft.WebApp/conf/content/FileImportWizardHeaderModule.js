Terrasoft.configuration.Structures["FileImportWizardHeaderModule"] = {innerHierarchyStack: ["FileImportWizardHeaderModule"]};
define("FileImportWizardHeaderModule", ["WizardHeaderModule", "FileImportWizardHeaderViewConfig",
		"FileImportWizardHeaderViewModel", "css!WizardHeaderModule"], function() {
	Ext.define("Terrasoft.configuration.FileImportWizardHeaderModule", {
		extend: "Terrasoft.WizardHeaderModule",
		alternateClassName: "Terrasoft.FileImportWizardHeaderModule",

		//region Properties: Public

		/**
		 * @inheritdoc
		 * @overridden
		 */
		viewConfigClassName: "Terrasoft.FileImportWizardHeaderViewConfig",

		/**
		 * @inheritdoc
		 * @overridden
		 */
		viewModelClassName: "Terrasoft.FileImportWizardHeaderViewModel",

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc
		 * @overridden
		 */
		showLoadingMask: function() {
			if (this.showMask && this.renderToId) {
				this.maskId = Terrasoft.Mask.show();
			}
		}

		//endregion

	});
	return Terrasoft.FileImportWizardHeaderModule;
});


