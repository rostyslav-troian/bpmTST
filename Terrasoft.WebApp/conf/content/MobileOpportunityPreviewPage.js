Terrasoft.configuration.Structures["MobileOpportunityPreviewPage"] = {innerHierarchyStack: ["MobileOpportunityPreviewPage"]};
/* globals Opportunity: false */
Terrasoft.LastLoadedPageData = {
	controllerName: "Terrasoft.configuration.OpportunityPreviewPageController",
	viewXClass: "Terrasoft.configuration.OpportunityPreviewPageView"
};

Ext.define("Terrasoft.configuration.OpportunityPreviewPageView", {
	extend: "Terrasoft.view.BasePreviewPage",
	alternateClassName: "OpportunityPreviewPage.View",
	config: {
		id: "OpportunityPreviewPage"
	}
});

Ext.define("Terrasoft.configuration.OpportunityPreviewPageController", {
	extend: "Terrasoft.controller.BasePreviewPage",
	alternateClassName: "OpportunityPreviewPage.Controller",
	statics: {
		Model: Opportunity
	},
	config: {
		refs: {
			view: "#OpportunityPreviewPage"
		}
	}
});


