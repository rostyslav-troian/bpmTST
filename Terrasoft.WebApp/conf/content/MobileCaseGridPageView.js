Terrasoft.configuration.Structures["MobileCaseGridPageView"] = {innerHierarchyStack: ["MobileCaseGridPageView"]};
/**
 * @class Terrasoft.configuration.view.CaseGridPage
 */
Ext.define("Terrasoft.configuration.view.CaseGridPage", {
	extend: "Terrasoft.view.BaseGridPage.View",
	alternateClassName: "Terrasoft.configuration.CaseGridPageView",

	config: {

		/**
		 * @inheritdoc
		 */
		id: "CaseGridPage",

		/**
		 * @inheritdoc
		 */
		grid: {
			store: "Terrasoft.configuration.CaseGridPageStore"
		}

	}
});


