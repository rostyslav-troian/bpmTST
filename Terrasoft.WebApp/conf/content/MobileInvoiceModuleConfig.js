Terrasoft.configuration.Structures["MobileInvoiceModuleConfig"] = {innerHierarchyStack: ["MobileInvoiceModuleConfig"]};
Terrasoft.sdk.GridPage.setOrderByColumns("Invoice", {
	column: "DueDate",
	orderType: Terrasoft.OrderTypes.ASC
});

if (Terrasoft.Features.getIsEnabled("UseMobileInvoiceCacheManager")) {
	Terrasoft.ModelCache.registerManagerClassName("Invoice", "Terrasoft.InvoiceDataCacheManager");
	Terrasoft.ModelCache.registerManagerClassName("SocialMessage", "Terrasoft.SocialMessageAssociateModelCacheManager", "Invoice");
}


