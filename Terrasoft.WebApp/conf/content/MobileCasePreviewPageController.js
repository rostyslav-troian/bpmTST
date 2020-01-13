Terrasoft.configuration.Structures["MobileCasePreviewPageController"] = {innerHierarchyStack: ["MobileCasePreviewPageController"]};
/* globals Case: false */
/**
 * @class Terrasoft.configuration.controller.CasePreviewPage
 */
Ext.define("Terrasoft.configuration.controller.CasePreviewPage", {
	extend: "Terrasoft.controller.BasePreviewPage",
	alternateClassName: "Terrasoft.configuration.CasePreviewPageController",

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
			view: "#CasePreviewPage"
		}

	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	initializeView: function(view) {
		this.callParent(arguments);
		view.addFeedActionButton({
			listeners: {
				tap: this.onFeedActionButtonTap,
				scope: this
			}
		});
	},

	/**
	 * Calls when feed action button has been tapped.
	 * @protected
	 * @virtual
	 */
	onFeedActionButtonTap: function() {
		this.executeAction({
			name: "CaseOpenFeedDetailAction"
		});
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	getActionStoreItem: function(action) {
		if (!Terrasoft.CaseUtilities.isActionVisible(action)) {
			return null;
		}
		return this.callParent(arguments);
	}

});


