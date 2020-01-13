Terrasoft.configuration.Structures["MobileOpportunityEditPage"] = {innerHierarchyStack: ["MobileOpportunityEditPage"]};
/* globals Opportunity: false */
Terrasoft.LastLoadedPageData = {
	controllerName: "Terrasoft.configuration.OpportunityEditPageController",
	viewXClass: "Terrasoft.configuration.OpportunityEditPageView"
};

Ext.define("Terrasoft.configuration.OpportunityEditPageView", {
	extend: "Terrasoft.view.BaseEditPage",
	alternateClassName: "OpportunityEditPage.View",
	config: {
		id: "OpportunityEditPage"
	}
});

Ext.define("Terrasoft.configuration.OpportunityEditPageController", {
	extend: "Terrasoft.controller.BaseEditPage",
	alternateClassName: "OpportunityEditPage.Controller",
	statics: {
		Model: Opportunity
	},
	config: {
		refs: {
			view: "#OpportunityEditPage"
		}
	}
});


