Terrasoft.configuration.Structures["MobileCaseMessageHistoryGridPageView"] = {innerHierarchyStack: ["MobileCaseMessageHistoryGridPageView"]};
/**
 * @class Terrasoft.configuration.view.CaseMessageHistoryGridPage
 */
Ext.define("Terrasoft.configuration.view.CaseMessageHistoryGridPage", {
	extend: "Terrasoft.view.BaseGridPage.View",
	alternateClassName: "Terrasoft.configuration.CaseMessageHistoryGridPageView",

	config: {

		/**
		 * @inheritdoc
		 */
		id: "CaseMessageHistoryGridPage",

		/**
		 * @inheritdoc
		 */
		grid: {
			store: "Terrasoft.configuration.CaseMessageHistoryGridPageStore"
		},

		/**
		 * @inheritdoc
		 */
		cls: "cf-separated-grid-items"

	}
});


