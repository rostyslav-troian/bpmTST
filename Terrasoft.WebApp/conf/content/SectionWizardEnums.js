Terrasoft.configuration.Structures["SectionWizardEnums"] = {innerHierarchyStack: ["SectionWizardEnums"]};
define("SectionWizardEnums", ["ext-base", "terrasoft", "SectionWizardEnumsResources"],
	function() {
		Ext.ns("Terrasoft.SectionWizardEnums");

		/**
		 * @enum
		 * Section wizard page names
		 */
		Terrasoft.SectionWizardEnums.PageName = {
			/**
			 * Main settings page name.
			 */
			MAIN_SETTINGS: "MainSettings",
			/**
			 * Page designer page name.
			 */
			PAGE_DESIGNER: "PageDesigner",
			/**
			 * Page DCM cases.
			 */
			PAGE_CASES: "Cases"
		};
	}
);


