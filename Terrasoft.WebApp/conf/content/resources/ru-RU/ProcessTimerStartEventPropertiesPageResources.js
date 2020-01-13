define("ProcessTimerStartEventPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MonthPeriodHint: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u043A\u0430\u0436\u0434\u044B\u0435 \u0442\u0440\u0438 \u043C\u0435\u0441\u044F\u0446\u0430: \u044F\u043D\u0432\u0430\u0440\u044C, \u0430\u043F\u0440\u0435\u043B\u044C, \u0438\u044E\u043B\u044C, \u043E\u043A\u0442\u044F\u0431\u0440\u044C",
		ExpressionTypeCustomCronExpressionCaption: "\u0414\u0440\u0443\u0433\u0430\u044F \u043F\u0435\u0440\u0438\u043E\u0434\u0438\u0447\u043D\u043E\u0441\u0442\u044C",
		CronExpressionInfoButtonCaption: "\u043E cron-\u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044F\u0445",
		ProcessInformationText: "\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u043D\u0430\u0447\u0430\u043B\u043E \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430. \u041F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0437\u0430\u043F\u0443\u0441\u043A \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u0441 \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u0439 \u043F\u0435\u0440\u0438\u043E\u0434\u0438\u0447\u043D\u043E\u0441\u0442\u044C\u044E. \u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u043F\u0440\u043E\u0446\u0435\u0441\u0441 \u043C\u043E\u0436\u0435\u0442 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0442\u044C\u0441\u044F \u043A\u0430\u0436\u0434\u044B\u0439 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A \u0432 9 \u0443\u0442\u0440\u0430 \u0438\u043B\u0438 \u0432 \u043A\u0430\u0436\u0434\u044B\u0439 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0434\u0435\u043D\u044C \u043C\u0435\u0441\u044F\u0446\u0430. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022ProcessTimerStartEventPropertiesPage\u0022\u003E\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435...\u003C\/a\u003E",
		MisfireInstructionCaption: "\u041F\u043E\u0432\u0442\u043E\u0440\u044F\u0442\u044C \u043F\u0440\u0438 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0435",
		ReadMoreCaption: "\u0423\u0437\u043D\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435",
		CronExpressionInfoButtonPattern: "\u003Ca href=\u0022http:\/\/www.quartz-scheduler.org\/documentation\/quartz-1.x\/tutorials\/crontrigger\u0022 target=\u0022_blank\u0022\u003E{0}\u003C\/a\u003E {1}.",
		CustomCronExpressionLabel: "Cron-\u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435",
		ExpressionTypeSingleRunCaption: "\u041E\u0434\u043D\u043E\u043A\u0440\u0430\u0442\u043D\u043E",
		SingleRunStartDateTimeLabel: "\u0414\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F \u0437\u0430\u043F\u0443\u0441\u043A\u0430",
		AdditionalSettingsLabel: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
		ExpressionTypeDayCaption: "\u0414\u0435\u043D\u044C",
		DaySectionRunEveryLabel: "\u0417\u0430\u043F\u0443\u0441\u043A\u0430\u0442\u044C \u043A\u0430\u0436\u0434\u044B\u0435",
		DaysPeriodJointCaption: "\u0434\u0435\u043D\u044C \u0432",
		RunOnlyInWorkingDaysCaption: "\u0422\u043E\u043B\u044C\u043A\u043E \u0432 \u0440\u0430\u0431\u043E\u0447\u0438\u0435 \u0434\u043D\u0438",
		OptionalStartTimeLabel: "\u0414\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F \u043D\u0430\u0447\u0430\u043B\u0430",
		OptionalEndTimeLabel: "\u0414\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F",
		ExpressionTypeYearCaption: "\u0413\u043E\u0434",
		YearStartDayLabel: "\u0414\u0435\u043D\u044C \u0437\u0430\u043F\u0443\u0441\u043A\u0430",
		YearRunProcessAtTime: "\u0412\u0440\u0435\u043C\u044F \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430",
		MonthFebruaryCaption: "\u0444\u0435\u0432\u0440\u0430\u043B\u044F",
		MonthJanuaryCaption: "\u044F\u043D\u0432\u0430\u0440\u044F",
		MonthMarchCaption: "\u043C\u0430\u0440\u0442\u0430",
		MonthAprilCaption: "\u0430\u043F\u0440\u0435\u043B\u044F",
		MonthMayCaption: "\u043C\u0430\u044F",
		MonthJuneCaption: "\u0438\u044E\u043D\u044F",
		MonthJulyCaption: "\u0438\u044E\u043B\u044F",
		MonthAugustCaption: "\u0430\u0432\u0433\u0443\u0441\u0442\u0430",
		MonthSpetemberCaption: "\u0441\u0435\u043D\u0442\u044F\u0431\u0440\u044F",
		MonthOctoberCaption: "\u043E\u043A\u0442\u044F\u0431\u0440\u044F",
		MonthNovemberCaption: "\u043D\u043E\u044F\u0431\u0440\u044F",
		MonthDecemberCaption: "\u0434\u0435\u043A\u0430\u0431\u0440\u044F",
		YearDayLabel: "\u0434\u0435\u043D\u044C",
		WeekDayNumberFirst: "\u041F\u0435\u0440\u0432\u044B\u0439",
		WeekDayNumberSecond: "\u0412\u0442\u043E\u0440\u043E\u0439",
		WeekDayNumberThird: "\u0422\u0440\u0435\u0442\u0438\u0439",
		WeekDayNumberFourth: "\u0427\u0435\u0442\u0432\u0435\u0440\u0442\u044B\u0439",
		WeekDayNumberFifth: "\u041F\u044F\u0442\u044B\u0439",
		DayTypeDayCaption: "\u0414\u0435\u043D\u044C",
		DayTypeDayOffCaption: "\u0412\u044B\u0445\u043E\u0434\u043D\u043E\u0439",
		DayTypeWorkDayCaption: "\u0420\u0430\u0431\u043E\u0447\u0438\u0439 \u0434\u0435\u043D\u044C",
		ExpressionTypeMonthCaption: "\u041C\u0435\u0441\u044F\u0446",
		ExpressionTypeWeekCaption: "\u041D\u0435\u0434\u0435\u043B\u044F",
		MonthSectionDaysCaption: "\u0414\u0435\u043D\u044C \u0437\u0430\u043F\u0443\u0441\u043A\u0430",
		MonthSectionDaysJoinCaption: "\u0434\u0435\u043D\u044C \u043A\u0430\u0436\u0434\u043E\u0433\u043E",
		MonthSectionEveryCaption: "\u043A\u0430\u0436\u0434\u043E\u0433\u043E",
		MonthSectionEveryMonthCaption: "\u043C\u0435\u0441\u044F\u0446\u0430",
		WeekSectionRunDaysOfWeekLabel: "\u0412 \u043A\u0430\u043A\u0438\u0435 \u0434\u043D\u0438 \u043D\u0435\u0434\u0435\u043B\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0442\u044C?",
		WeekSectionRunEveryLabel: "\u0412\u0440\u0435\u043C\u044F \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430",
		WeekDayFirstCaption: "\u041F\u0435\u0440\u0432\u044B\u0439",
		WeekDayFourthCaption: "\u0427\u0435\u0442\u0432\u0435\u0440\u0442\u044B\u0439",
		WeekDayLastCaption: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439",
		WeekDaySecondCaption: "\u0412\u0442\u043E\u0440\u043E\u0439",
		WeekDayThirdCaption: "\u0422\u0440\u0435\u0442\u0438\u0439",
		ExpressionTypeCaption: "\u041F\u0435\u0440\u0438\u043E\u0434\u0438\u0447\u043D\u043E\u0441\u0442\u044C \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430",
		ExpressionTypeMinuteHourCaption: "\u041C\u0438\u043D\u0443\u0442\u0430\/\u0427\u0430\u0441",
		MinuteHourRunEveryLabel: "\u0417\u0430\u043F\u0443\u0441\u043A\u0430\u0442\u044C \u043A\u0430\u0436\u0434\u044B\u0435",
		MinuteHourSectionMinuteCaption: "\u043C\u0438\u043D\u0443\u0442\u0430",
		MinuteHourSectionHourCaption: "\u0447\u0430\u0441",
		MinuteHourIntervalFromLabel: "\u0441",
		MinuteHourIntervalToLabel: "\u0434\u043E",
		SingleRunValidationMessage: "\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0434\u0430\u0442\u044B \u0438 \u0432\u0440\u0435\u043C\u0435\u043D\u0438",
		MonthSectionDayOfWeekButtonLabel: "\u0414\u0435\u043D\u044C \u043D\u0435\u0434\u0435\u043B\u0438",
		MonthSectionDayOfMonthButtonLabel: "\u0414\u0435\u043D\u044C \u043C\u0435\u0441\u044F\u0446\u0430",
		MonthSectionWorkDayButtonLabel: "\u041F\u0435\u0440\u0432\u044B\u0439\/\u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0440\u0430\u0431\u043E\u0447\u0438\u0439 \u0434\u0435\u043D\u044C",
		MonthSectionTriggerEveryMonthLabel: "\u0417\u0430\u043F\u0443\u0441\u043A\u0430\u0442\u044C \u043A\u0430\u0436\u0434\u044B\u0439",
		MonthSectionTriggerEveryMonthPeriodLabel: "\u043C\u0435\u0441\u044F\u0446",
		TimerPeriodCaption: "\u041F\u0435\u0440\u0438\u043E\u0434 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0442\u0430\u0439\u043C\u0435\u0440\u0430",
		InvalidTimerPeriodMessage: "\u0412\u0440\u0435\u043C\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C \u0438\u043B\u0438 \u0440\u0430\u0432\u043D\u044F\u0442\u044C\u0441\u044F \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u043D\u0430\u0447\u0430\u043B\u0430"
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