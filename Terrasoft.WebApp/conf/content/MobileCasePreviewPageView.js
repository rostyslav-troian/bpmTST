Terrasoft.configuration.Structures["MobileCasePreviewPageView"] = {innerHierarchyStack: ["MobileCasePreviewPageView"]};
/**
 * @class Terrasoft.configuration.view.CasePreviewPage
 */
Ext.define("Terrasoft.configuration.view.CasePreviewPage", {
	extend: "Terrasoft.view.BasePreviewPage",
	alternateClassName: "Terrasoft.configuration.CasePreviewPageView",

	config: {

		/**
		 * @inheritdoc
		 */
		id: "CasePreviewPage"

	},

	/**
	 * @private
	 */
	getActionFeedButton: function() {
		var actionsContaner = this.getActionsContainer();
		return actionsContaner.getComponent("actionFeed");
	},

	/**
	 * Adds feed action button.
	 * @param {Object} config Configuration of button.
	 */
	addFeedActionButton: function(config) {
		this.addActionButton("actionFeed", Ext.mergeIf(config, {
			iconCls: "cf-action-feed-main-icon"
		}));
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	onActionsButtonTap: function() {
		this.callParent(arguments);
		var actionFeedButton = this.getActionFeedButton();
		actionFeedButton.hide();
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	onActionsPickerHide: function() {
		this.callParent(arguments);
		var actionFeedButton = this.getActionFeedButton();
		actionFeedButton.show();
	}

});


