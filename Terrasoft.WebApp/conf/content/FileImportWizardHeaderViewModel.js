Terrasoft.configuration.Structures["FileImportWizardHeaderViewModel"] = {innerHierarchyStack: ["FileImportWizardHeaderViewModel"]};
define("FileImportWizardHeaderViewModel", ["FileImportWizardHeaderViewModelResources", "WizardHeaderModule"],
		function(resources) {
	Ext.define("Terrasoft.configuration.FileImportWizardHeaderViewModel", {
		extend: "Terrasoft.WizardHeaderViewModel",
		alternateClassName: "Terrasoft.FileImportWizardHeaderViewModel",

		/**
		 * @inheritdoc
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initResourcesValues(resources);
		},

		/**
		 * Handles close button click.
		 */
		closeButtonClick: function() {
			this.cancelButtonClick();
		},

		/**
		 * Handles previous step button click.
		 */
		previousStepButtonClick: function() {
			this.previous();
		},

		/**
		 * Handles next step button click.
		 */
		nextStepButtonClick: function() {
			this.next();
		},

		/**
		 * Gets wizard header container marker value.
		 * @return {String}
		 */
		getWizardHeaderContainerMakerValue: function() {
			return this.get("currentStep");
		}
	});
});


