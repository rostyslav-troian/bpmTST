Terrasoft.configuration.Structures["MobileAccountPreviewPage"] = {innerHierarchyStack: ["MobileAccountPreviewPage"]};
/* globals Account: false */
Terrasoft.LastLoadedPageData = {
	controllerName: "AccountPreviewPage.Controller",
	viewXType: "accountpreviewpageview"
};

Ext.define("AccountPreviewPage.View", {
	extend: "Terrasoft.view.BasePreviewPage",
	xtype: "accountpreviewpageview",
	config: {
		id: "AccountPreviewPage"
	}
});

Ext.define("AccountPreviewPage.Controller", {
	extend: "Terrasoft.controller.BasePreviewPage",

	statics: {
		Model: Account
	},

	config: {
		refs: {
			view: "#AccountPreviewPage"
		}
	},

	/**
	 * @inheritdoc
	 * @protected
	 * @overridden
	 */
	onCallPhoneStarted: function() {
		this.callParent(arguments);
		Terrasoft.PhoneCallLogUtils.openPage({
			activityLinkColumnNames: "Account",
			record: this.record
		});
	}

});


