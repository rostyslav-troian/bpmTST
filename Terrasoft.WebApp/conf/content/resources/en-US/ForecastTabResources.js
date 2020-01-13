define("ForecastTabResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Add: "Add",
		Actions: "Actions",
		ViewOptions: "View",
		CalculateFactPotentialCaption: "Calculate \u0022Closed\u0022 and \u0022Pipeline\u0022 columns",
		CalculateFactPotentialCompleteMessage: "\u0022Closed\u0022 and \u0022Pipeline\u0022 columns calculation in progress. You will be notified on completion.",
		EditRightsMenuItemCaption: "Set up access rights",
		SetPeriod: "Set up time periods",
		Summary: "Total",
		Reload: "Refresh",
		ConfigurationButtonHint: "Configuration button",
		CalculateFactPotentialCaptionUIV2: "Recalculate forecast columns",
		CalculateFactPotentialCompleteMessageUIV2: "Forecast columns calculation in progress. You will be notified on completion.",
		ColumnsListMenuItem: "List of columns",
		PeriodsExceededErrorCaption: "Too many periods for calculation. Please reduce the number of periods to 24 and re-run calculation."
	};
	var localizableImages = {
		SettingsImage: {
			source: 3,
			params: {
				schemaName: "ForecastTab",
				resourceItemName: "SettingsImage",
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