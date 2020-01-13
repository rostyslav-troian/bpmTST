Terrasoft.configuration.Structures["MobileCaseGridPageController"] = {innerHierarchyStack: ["MobileCaseGridPageController"]};
/* globals Case: false */
/**
 * @class Terrasoft.configuration.controller.CaseGridPage
 */
Ext.define("Terrasoft.configuration.controller.CaseGridPage", {
	alternateClassName: "Terrasoft.configuration.CaseGridPageController",
	extend: "Terrasoft.controller.BaseGridPage",

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
			view: "#CaseGridPage"
		}

	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getActionStoreItem: function(action) {
		if (action.record && !Terrasoft.CaseUtilities.isActionVisible(action)) {
			return null;
		}
		return this.callParent(arguments);
	}

});

/**
 * @class Terrasoft.configuration.store.CaseGridPage
 */
Ext.define("Terrasoft.configuration.store.CaseGridPage", {
	extend: "Terrasoft.store.BaseStore",
	alternateClassName: "Terrasoft.configuration.CaseGridPageStore",

	config: {

		/**
		 * @inheritdoc
		 */
		model: "Case",

		/**
		 * @inheritdoc
		 */
		controller: "Terrasoft.configuration.CaseGridPageController"

	}

});


