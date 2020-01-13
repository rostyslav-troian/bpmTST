Terrasoft.configuration.Structures["MarketingCampaignMobileContactModuleConfig"] = {innerHierarchyStack: ["MarketingCampaignMobileContactModuleConfig"]};
Terrasoft.sdk.RecordPage.configureEmbeddedDetail("Contact", "ContactCommunicationDetailEmbeddedDetail", {
	filters: {
		property: "NonActual",
		value: false
	}
});

Terrasoft.sdk.RecordPage.addQueryConfigColumns("Contact", ["NonActual"], "ContactCommunicationDetailEmbeddedDetail");

Terrasoft.sdk.Model.setDefaultValuesFunc("ContactCommunication", function(config) {
	config.record.set("NonActual", false);
	Ext.callback(config.success, config.scope);
});


