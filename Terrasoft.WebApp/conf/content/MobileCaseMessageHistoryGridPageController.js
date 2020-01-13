Terrasoft.configuration.Structures["MobileCaseMessageHistoryGridPageController"] = {innerHierarchyStack: ["MobileCaseMessageHistoryGridPageController"]};
/* globals VwMobileCaseMessageHistory: false */
/**
 * @class Terrasoft.configuration.controller.CaseMessageHistoryGridPage
 */
Ext.define("Terrasoft.configuration.controller.CaseMessageHistoryGridPage", {
	alternateClassName: "Terrasoft.configuration.CaseMessageHistoryGridPageController",
	extend: "Terrasoft.controller.BaseGridPage",

	statics: {

		/**
		 * @inheritdoc
		 */
		Model: VwMobileCaseMessageHistory

	},

	config: {

		/**
		 * @inheritdoc
		 */
		refs: {
			view: "#CaseMessageHistoryGridPage"
		}

	}

});

/**
 * @class Terrasoft.configuration.store.CaseMessageHistoryGridPage
 */
Ext.define("Terrasoft.configuration.store.CaseMessageHistoryGridPage", {
	extend: "Terrasoft.store.BaseStore",
	alternateClassName: "Terrasoft.configuration.CaseMessageHistoryGridPageStore",

	config: {

		/**
		 * @inheritdoc
		 */
		model: "VwMobileCaseMessageHistory",

		/**
		 * @inheritdoc
		 */
		controller: "Terrasoft.configuration.CaseMessageHistoryGridPageController"

	}

});


