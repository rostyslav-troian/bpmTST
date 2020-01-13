Terrasoft.configuration.Structures["SectionMiniPageWizard"] = {innerHierarchyStack: ["SectionMiniPageWizard"], structureParent: "SectionPageWizard"};
define("SectionMiniPageWizard", ["SectionPageWizard", "css!PageWizard"], function() {

	/**
	 * Class of visual module of representation for the page wizard
	 */
	Ext.define("Terrasoft.configuration.SectionMiniPageWizard", {
		extend: "Terrasoft.configuration.SectionPageWizard",
		alternateClassName: "Terrasoft.SectionMiniPageWizard",

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.SectionPageWizard#pageWizardUrl
		 * @override
		 */
		pageWizardUrl: Terrasoft.DesignTimeEnums.WizardUrl.SECTION_MINIPAGE_WIZARD_URL,

		//endregion

		//region Methods: Private

		/**
		 * @inheritdoc Terrasoft.SectionPageWizard#getPageDesignerModuleName
		 * @override
		 */
		getPageDesignerModuleName: function() {
			return "MiniPageDesignerModule";
		}

		//endregion
	});

	return Terrasoft.SectionMiniPageWizard;
});


