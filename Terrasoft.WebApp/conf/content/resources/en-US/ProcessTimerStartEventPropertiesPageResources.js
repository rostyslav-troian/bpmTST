define("ProcessTimerStartEventPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MonthPeriodHint: "For example, every three months: January, April, July, October",
		ExpressionTypeCustomCronExpressionCaption: "Other frequency",
		CronExpressionInfoButtonCaption: "about cron expressions",
		ProcessInformationText: "Element displays the process start. Configure automatic process start with specified frequency. For example, the process can be started each Monday at 9:00 AM or each last day of the month. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022ProcessTimerStartEventPropertiesPage\u0022\u003ERead more...\u003C\/a\u003E",
		MisfireInstructionCaption: "Repeat on misfire",
		ReadMoreCaption: "Read more",
		CronExpressionInfoButtonPattern: "\u003Ca href=\u0022http:\/\/www.quartz-scheduler.org\/documentation\/quartz-1.x\/tutorials\/crontrigger\u0022 target=\u0022_blank\u0022\u003E{0}\u003C\/a\u003E {1}.",
		CustomCronExpressionLabel: "Cron expression",
		ExpressionTypeSingleRunCaption: "Once",
		SingleRunStartDateTimeLabel: "Start date and time",
		AdditionalSettingsLabel: "Additional settings",
		ExpressionTypeDayCaption: "Day",
		DaySectionRunEveryLabel: "Run every",
		DaysPeriodJointCaption: "day in",
		RunOnlyInWorkingDaysCaption: "Only in working days",
		OptionalStartTimeLabel: "Start date and time",
		OptionalEndTimeLabel: "End date and time",
		ExpressionTypeYearCaption: "Year",
		YearStartDayLabel: "Start day",
		YearRunProcessAtTime: "Run process time",
		MonthFebruaryCaption: "of February",
		MonthJanuaryCaption: "of January",
		MonthMarchCaption: "of March",
		MonthAprilCaption: "of April",
		MonthMayCaption: "of May",
		MonthJuneCaption: "of June",
		MonthJulyCaption: "of July",
		MonthAugustCaption: "of August",
		MonthSpetemberCaption: "of September",
		MonthOctoberCaption: "of October",
		MonthNovemberCaption: "of November",
		MonthDecemberCaption: "of Decamber",
		YearDayLabel: "day",
		WeekDayNumberFirst: "First",
		WeekDayNumberSecond: "Second",
		WeekDayNumberThird: "Third",
		WeekDayNumberFourth: "Fourth",
		WeekDayNumberFifth: "Fifth",
		DayTypeDayCaption: "Day",
		DayTypeDayOffCaption: "Day off",
		DayTypeWorkDayCaption: "Work day",
		ExpressionTypeMonthCaption: "Month",
		ExpressionTypeWeekCaption: "Week",
		MonthSectionDaysCaption: "Start day",
		MonthSectionDaysJoinCaption: "day every",
		MonthSectionEveryCaption: "every",
		MonthSectionEveryMonthCaption: "month",
		WeekSectionRunDaysOfWeekLabel: "Which days of the week to run?",
		WeekSectionRunEveryLabel: "Process start time",
		WeekDayFirstCaption: "First",
		WeekDayFourthCaption: "Fourth",
		WeekDayLastCaption: "Last",
		WeekDaySecondCaption: "Second",
		WeekDayThirdCaption: "Third",
		ExpressionTypeCaption: "Frequency of process start",
		ExpressionTypeMinuteHourCaption: "Minute\/Hour",
		MinuteHourRunEveryLabel: "Run every",
		MinuteHourSectionMinuteCaption: "minute",
		MinuteHourSectionHourCaption: "hour",
		MinuteHourIntervalFromLabel: "from",
		MinuteHourIntervalToLabel: "to",
		SingleRunValidationMessage: "Selected value can not be before present date and time",
		MonthSectionDayOfWeekButtonLabel: "Day of the week",
		MonthSectionDayOfMonthButtonLabel: "Day of the month",
		MonthSectionWorkDayButtonLabel: "First\/last work day",
		MonthSectionTriggerEveryMonthLabel: "Run every",
		MonthSectionTriggerEveryMonthPeriodLabel: "month",
		TimerPeriodCaption: "Timer validity",
		InvalidTimerPeriodMessage: "End time should not be greater or equal to start time"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessTimerStartEventPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessTimerStartEventPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessTimerStartEventPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessTimerStartEventPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "ProcessTimerStartEventPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessTimerStartEventPropertiesPage",
				resourceItemName: "ParameterEditToolsButtonImage",
				hash: "df03c3177a972b7f3b6987430f988ca3",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});