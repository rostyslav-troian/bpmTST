define("CampaignSchemaPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProcessInformationText: "Specify the campaign name here. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022CampaignDesigner\u0022 target=\u0022_blank\u0022\u003ELearn more\u003C\/a\u003E about campaigns.",
		DefaultCampaignFireTimeCaption: "Default campaign execution frequency",
		HasCriticalExecutionLateness: "Set the period for campaign emergency stop in case of critical delay",
		LatenessDecisionDaysNumber: "Days",
		LatenessDecisionHoursNumber: "Hours",
		LatenessUnitCaption: "Delay unit",
		LatenessUnitQuantity: "Quantity",
		NegativeCriticalExecutionLatenessErrorText: "Must be positive",
		CriticalExecutionLatenessHint: "If the campaign will not run during this period, it will be stopped automatically, and owner will receive a notification.",
		DefaultTimeZoneBeforeSavingMessage: "The field \u0027Time zone\u0027 will be set to default value - UTC (00:00). You can set another value of this field on campaign properties page.",
		DefaultFirePeriodBeforeSavingMessage: "The field \u0027Default campaign execution frequency\u0027 will be set to default value - 1 hour. You can set another value of this field on campaign properties page."
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignSchemaPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignSchemaPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignSchemaPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignSchemaPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "CampaignSchemaPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignSchemaPropertiesPage",
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