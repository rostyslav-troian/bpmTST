define("ReportFilterModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		YesterdayCaption: "Yesterday",
		StartDatePlaceholder: "\u003CStart date\u003E",
		DueDatePlaceholder: "\u003CDue date\u003E",
		BySelectedRecord: "Selected records ({0})",
		ByFilteredLabel: "Filtered records in list",
		ByAllRecord: "All records in list",
		FormingMethod: "Form by",
		FilteringOptions: "Filtering parameters",
		ShowPeriod: "Show for period",
		PeriodToLabelCaption: "till",
		TodayCaption: "Today",
		TomorrowCaption: "Tomorrow",
		PastWeekCaption: "Previous week",
		CurrentWeekCaption: "Current week",
		NextWeekCaption: "Next week",
		PastMonthCaption: "Previous month",
		CurrentMonthCaption: "Current month",
		NextMonthCaption: "Next month"
	};
	var localizableImages = {
		PeriodButtonImage: {
			source: 3,
			params: {
				schemaName: "ReportFilterModule",
				resourceItemName: "PeriodButtonImage",
				hash: "62b7c35bd5ad896ab658d876780cff03",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});