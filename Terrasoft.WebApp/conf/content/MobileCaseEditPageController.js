Terrasoft.configuration.Structures["MobileCaseEditPageController"] = {innerHierarchyStack: ["MobileCaseEditPageController"]};
/* globals Case: false */
/**
 * @class Terrasoft.configuration.controller.CaseEditPage
 */
Ext.define("Terrasoft.configuration.controller.CaseEditPage", {
	alternateClassName: "Terrasoft.configuration.CaseEditPageController",
	extend: "Terrasoft.controller.BaseEditPage",

	statics: {

		/**
		 * @inheritdoc
		 */
		Model: Case

	},

	config: {

		/**
		 * @inheritdoc
		 */
		refs: {
			view: "#CaseEditPage"
		}

	}

});


