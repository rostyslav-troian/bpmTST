Terrasoft.configuration.Structures["SectionPageDesignerHeaderModule"] = {innerHierarchyStack: ["SectionPageDesignerHeaderModule"]};
define("SectionPageDesignerHeaderModule", [
	"PageDesignerHeaderModule",
	"css!WizardHeaderModule",
	"SectionPageDesignerHeaderViewConfig",
	"SectionPageDesignerHeaderViewModel"
], function() {
	/**
	 * Class of SectionPageDesignerHeaderModule.
	 */
	Ext.define("Terrasoft.SectionPageDesignerHeaderModule", {
		extend: "Terrasoft.PageDesignerHeaderModule",

		/**
		 * @inheritdoc Terrasoft.PageDesignerHeaderModule#viewConfigClassName
		 * @override
		 */
		viewConfigClassName: "Terrasoft.SectionPageDesignerHeaderViewConfig",

		/**
		 * @inheritdoc Terrasoft.PageDesignerHeaderModule#designerViewModelClassName
		 * @override
		 */
		viewModelClassName: "Terrasoft.SectionPageDesignerHeaderViewModel"

	});

	return Terrasoft.SectionPageDesignerHeaderModule;
});


