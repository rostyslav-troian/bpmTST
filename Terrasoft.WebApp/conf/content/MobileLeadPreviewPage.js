Terrasoft.configuration.Structures["MobileLeadPreviewPage"] = {innerHierarchyStack: ["MobileLeadPreviewPage"]};
/* globals Lead: false */
Terrasoft.LastLoadedPageData = {
	controllerName: "LeadPreviewPage.Controller",
	viewXType: "leadpreviewpageview"
};

Ext.define("LeadPreviewPage.View", {
	extend: "Terrasoft.view.BasePreviewPage",
	xtype: "leadpreviewpageview",
	config: {
		id: "LeadPreviewPage"
	}
});

Ext.define("LeadPreviewPage.Controller", {
	extend: "Terrasoft.controller.BasePreviewPage",

	statics: {
		Model: Lead
	},

	config: {
		refs: {
			view: "#LeadPreviewPage"
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
			activityLinkColumnNames: "Lead",
			record: this.record
		});
	}

});


