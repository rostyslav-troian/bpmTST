define("BusinessRuleSectionResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DeleteButtonCaption: "Delete",
		AddNewRuleButtonCaption: "Add business rule",
		OpenButtonCaption: "Open",
		BusinessRuleGridNameCaption: "Name",
		BusinessRuleGridDescriptionCaption: "Description",
		BusinessRuleGridPageCaption: "Page",
		DisableButtonCaption: "Disable",
		EnableButtonCaption: "Enable",
		ConfirmRemoveBusinessRuleMessage: "Business rule will be removed. Continue?",
		BusinessRuleGridEnabledCaption: "State",
		BusinessRuleGridEnabledText: "Enabled",
		BusinessRuleGridDisabledText: "Disabled",
		InvalidRulePrefix: "(Invalid rule)",
		EmptyInfoTitle: "This section has no records.",
		EmptyInfoRecommendation: "Learn more about this section from the \u003Ca target=\u0022_blank\u0022 href=\u0022{0}\u0022\u003EAcademy\u003C\/a\u003E.",
		EmptyInfoDescription: "Add a new record to make it look prettier."
	};
	var localizableImages = {
		EmptyInfoImage: {
			source: 3,
			params: {
				schemaName: "BusinessRuleSection",
				resourceItemName: "EmptyInfoImage",
				hash: "f7367adb83003fc8600e74023d24be5c",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});