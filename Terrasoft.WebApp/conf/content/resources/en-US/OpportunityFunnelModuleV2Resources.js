define("OpportunityFunnelModuleV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		YesterdayCaption: "Yesterday",
		TodayCaption: "Today",
		TomorrowCaption: "Tomorrow",
		PastWeekCaption: "Previous week",
		CurrentWeekCaption: "Current week",
		NextWeekCaption: "Next week",
		PastMonthCaption: "Previous month",
		CurrentMonthCaption: "Current month",
		NextMonthCaption: "Next month",
		ClearCaption: "Clear",
		PeriodToLabelCaption: "till",
		EmptyDateDisplayValue: "unlimited",
		StartDatePlaceholder: "\u003CStart date\u003E",
		DueDatePlaceholder: "\u003CDue date\u003E",
		StageConversionCaption: "Stage conversion rate",
		ToFirstStageConversionCaption: "Pipeline conversion",
		ConversionByCountCaption: "Number of opportunities",
		SelectPeriodHint: "Select period",
		RemoveButtonHint: "Remove filter",
		DrillDownCaption: "Drill down the item",
		ShowDataCaption: "Display data",
		ChartChangeTypeCaption: "Change chart type",
		ShowChartCaption: "Display chart",
		SetupGridMenuCaption: "Select fields to display",
		SortMenuCaption: "Sort by",
		LoadMoreButtonCaption: "Show more",
		ExportListToFileButtonCaption: "Export list to file",
		BooleanFieldTrueCaption: "Yes",
		BooleanFieldFalseCaption: "No",
		QueryDataLimitMessage: "Warning!\nWith the current filter conditions, limits exceeded for series: {0} and for category ({1} pc.). The limit is set up in the \u0022Chart data request restriction\u0022.\nDisplay all?",
		SettingsButtonHint: "Options",
		DrillUpButtonHint: "Return to previous view",
		ExportListToExcelFileButtonCaption: "Export to Excel"
	};
	var localizableImages = {
		MonthPeriodButtonImage: {
			source: 3,
			params: {
				schemaName: "OpportunityFunnelModuleV2",
				resourceItemName: "MonthPeriodButtonImage",
				hash: "2402caae5b4f9b135ab281673811c24f",
				resourceItemExtension: ".png"
			}
		},
		WeekPeriodButtonImage: {
			source: 3,
			params: {
				schemaName: "OpportunityFunnelModuleV2",
				resourceItemName: "WeekPeriodButtonImage",
				hash: "903a764689486184aab44be9ad089dd4",
				resourceItemExtension: ".png"
			}
		},
		DayPeriodButtonImage: {
			source: 3,
			params: {
				schemaName: "OpportunityFunnelModuleV2",
				resourceItemName: "DayPeriodButtonImage",
				hash: "60d5bab38f94828a54714d4625d41098",
				resourceItemExtension: ".png"
			}
		},
		RemoveButtonImage: {
			source: 3,
			params: {
				schemaName: "OpportunityFunnelModuleV2",
				resourceItemName: "RemoveButtonImage",
				hash: "42b5b815fe5ef39879666f4595bd892b",
				resourceItemExtension: ".png"
			}
		},
		Settings: {
			source: 3,
			params: {
				schemaName: "OpportunityFunnelModuleV2",
				resourceItemName: "Settings",
				hash: "fe36cfab3b2a4678c406b8e54197a9b3",
				resourceItemExtension: ".svg"
			}
		},
		DrillUp: {
			source: 3,
			params: {
				schemaName: "OpportunityFunnelModuleV2",
				resourceItemName: "DrillUp",
				hash: "3c398f7853f1a36a28482a3080d46c34",
				resourceItemExtension: ".svg"
			}
		},
		DrillHome: {
			source: 3,
			params: {
				schemaName: "OpportunityFunnelModuleV2",
				resourceItemName: "DrillHome",
				hash: "ac7f3e129228702b06183b30b857975f",
				resourceItemExtension: ".png"
			}
		},
		LoadMoreIcon: {
			source: 3,
			params: {
				schemaName: "OpportunityFunnelModuleV2",
				resourceItemName: "LoadMoreIcon",
				hash: "010a38d79ad1acb4726eb1dae1d7f14c",
				resourceItemExtension: ".png"
			}
		},
		QueryDataLimitImage: {
			source: 3,
			params: {
				schemaName: "OpportunityFunnelModuleV2",
				resourceItemName: "QueryDataLimitImage",
				hash: "74e2c33c404b6db5a8f1af7500320c06",
				resourceItemExtension: ".svg"
			}
		},
		FullScreenImg: {
			source: 3,
			params: {
				schemaName: "OpportunityFunnelModuleV2",
				resourceItemName: "FullScreenImg",
				hash: "77c5f8c0e5f06fafa63383a812d8ed93",
				resourceItemExtension: ".svg"
			}
		},
		ExportToExcelBtnImage: {
			source: 3,
			params: {
				schemaName: "OpportunityFunnelModuleV2",
				resourceItemName: "ExportToExcelBtnImage",
				hash: "1883b16fe86f1acadfc158894338fc09",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});