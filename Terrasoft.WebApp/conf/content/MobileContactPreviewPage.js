Terrasoft.configuration.Structures["MobileContactPreviewPage"] = {innerHierarchyStack: ["MobileContactPreviewPage"]};
/* globals Contact: false */
Terrasoft.LastLoadedPageData = {
	controllerName: "ContactPreviewPage.Controller",
	viewXType: "contactpreviewpageview"
};

Ext.define("ContactPreviewPage.View", {
	extend: "Terrasoft.view.BasePreviewPage",
	xtype: "contactpreviewpageview",
	config: {
		id: "ContactPreviewPage"
	}
});

Ext.define("ContactPreviewPage.Controller", {
	extend: "Terrasoft.controller.BasePreviewPage",

	statics: {
		Model: Contact
	},

	config: {
		refs: {
			view: "#ContactPreviewPage"
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
			activityLinkColumnNames: [
				{
					parentColumnName: "Id",
					activityColumnName: "Contact"
				},
				{
					parentColumnName: "Account",
					activityColumnName: "Account"
				}
			],
			record: this.record
		});
	}

});


