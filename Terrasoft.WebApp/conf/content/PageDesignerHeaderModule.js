Terrasoft.configuration.Structures["PageDesignerHeaderModule"] = {innerHierarchyStack: ["PageDesignerHeaderModule"]};
define("PageDesignerHeaderModule", [
	"WizardHeaderModule",
	"css!WizardHeaderModule",
	"PageDesignerHeaderViewConfig",
	"PageDesignerHeaderViewModel"
], function() {
	/**
	 * Class of PageDesignerHeaderModule.
	 */
	Ext.define("Terrasoft.PageDesignerHeaderModule", {
		extend: "Terrasoft.WizardHeaderModule",

		/**
		 * @inheritdoc Terrasoft.WizardHeaderModule#viewConfigClassName
		 * @overridden
		 */
		viewConfigClassName: "Terrasoft.PageDesignerHeaderViewConfig",

		/**
		 * @inheritdoc Terrasoft.WizardHeaderModule#designerViewModelClassName
		 * @overridden
		 */
		viewModelClassName: "Terrasoft.PageDesignerHeaderViewModel"

	});
	return Terrasoft.PageDesignerHeaderModule;
});


