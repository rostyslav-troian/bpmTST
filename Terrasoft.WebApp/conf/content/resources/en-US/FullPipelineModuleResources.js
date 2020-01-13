define("FullPipelineModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		StageConversionCaption: "Stage conversion rate",
		ToFirstStageConversionCaption: "Pipeline conversion",
		ConversionByCountCaption: "Number of records",
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
		SelectPeriodHint: "Select period",
		RemoveButtonHint: "Remove filter"
	};
	var localizableImages = {
		MonthPeriodButtonImage: {
			source: 3,
			params: {
				schemaName: "FullPipelineModule",
				resourceItemName: "MonthPeriodButtonImage",
				hash: "2402caae5b4f9b135ab281673811c24f",
				resourceItemExtension: ".png"
			}
		},
		WeekPeriodButtonImage: {
			source: 3,
			params: {
				schemaName: "FullPipelineModule",
				resourceItemName: "WeekPeriodButtonImage",
				hash: "903a764689486184aab44be9ad089dd4",
				resourceItemExtension: ".png"
			}
		},
		DayPeriodButtonImage: {
			source: 3,
			params: {
				schemaName: "FullPipelineModule",
				resourceItemName: "DayPeriodButtonImage",
				hash: "60d5bab38f94828a54714d4625d41098",
				resourceItemExtension: ".png"
			}
		},
		RemoveButtonImage: {
			source: 3,
			params: {
				schemaName: "FullPipelineModule",
				resourceItemName: "RemoveButtonImage",
				hash: "42b5b815fe5ef39879666f4595bd892b",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});