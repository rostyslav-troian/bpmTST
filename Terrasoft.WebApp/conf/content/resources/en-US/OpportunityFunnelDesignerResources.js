define("OpportunityFunnelDesignerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OpportunityFunnelDesignerCaption: "Pipeline designer",
		OpportunityFunnelCaption: "Sales pipeline",
		DefPeriodCaption: "Period by default",
		PastWeekCaption: "Previous week",
		CurrentWeekCaption: "Current week",
		NextWeekCaption: "Next week",
		PastMonthCaption: "Previous month",
		CurrentMonthCaption: "Current month",
		NextMonthCaption: "Next month"
	};
	var localizableImages = {
		Settings: {
			source: 3,
			params: {
				schemaName: "OpportunityFunnelDesigner",
				resourceItemName: "Settings",
				hash: "a5df3ed1d5e5511e3e23dc1875cc8769",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});