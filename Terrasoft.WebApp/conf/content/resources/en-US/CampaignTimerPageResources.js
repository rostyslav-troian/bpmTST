define("CampaignTimerPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProcessInformationText: "Use Timer for setting time, period or timezone for the campaign elements execution, e.g. to send marketing email only on work days from 9:00 AM to 06:00 PM. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022CampaignTimerElement\u0022 target=\u0022_blank\u0022\u003ELearn more\u003C\/a\u003E",
		OptionalStartTimeLabel: "Start date and time",
		OptionalEndTimeLabel: "End date and time",
		ExpressionTypeCaption: "Frequency of timer start",
		ExpressionTypeSingleRunCaption: "Once",
		ExpressionTypeDayCaption: "Every day",
		ExpressionTypeWeekCaption: "Week",
		ExpressionTypeMonthCaption: "Month",
		ExpressionTypeCustomCronExpressionCaption: "Other frequency",
		SingleRunValidationMessage: "Selected value can not be before present date and time",
		InvalidTimerPeriodMessage: "End time should not be greater or equal to start time",
		SingleRunStartDateTimeLabel: "Start date time",
		TimerPeriodCaption: "Timer validity",
		TimePeriodEndCaption: "to",
		TimePeriodStartCaption: "from",
		TimePeriodOptionCaption: "Period",
		ExactTimeOptionCaption: "Exact time",
		ExecutionTimeLabel: "Execution time",
		OptionalTimeZoneLabel: "Set time zone",
		UseCustomTimeZoneHint: "You can set time zone for this Timer. When time zone is not set, Timer works according to the campaign time zone"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignTimerPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignTimerPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignTimerPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignTimerPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "CampaignTimerPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignTimerPage",
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