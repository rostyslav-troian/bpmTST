define("CampaignConditionalSequenceFlowPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProcessInformationText: "A contact can transition to the next step as soon as all conditions on the current mini-page are fulfilled. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022CampaignConditionalSequenceFlow\u0022 target=\u0022_blank\u0022\u003ELearn more\u003C\/a\u003E",
		SequenceModeDefault: "No, execute after the previous one",
		SequenceModeTimePeriod: "Yes, for specified time period",
		DelayDecisionDaysNumber: "Days",
		DelayDecisionInterval: "During a day",
		SequenceModeCaption: "Enable delay before executing an element? ",
		DelayDecisionCaption: "Delay unit",
		DaysNumberCaption: "Quantity",
		ExecutionTimeCaption: "Timer validity",
		DelayIntervalCaption: "Delay interval",
		MinutesCaption: "minutes",
		HoursCaption: "hours",
		FilterModeCaption: "Which conditions must the contacts meet to transition to the next step {0}?",
		FilterModeDefault: "No additional filtering conditions are needed",
		FilterModeWithFilter: "Set up filtering conditions",
		ActionsButtonCaption: "Actions",
		AddCondition: "Add condition",
		GroupMenuItemCaption: "Group",
		UnGroupMenuItemCaption: "Ungroup",
		MoveUpMenuItemCaption: "Up",
		MoveDownMenuItemCaption: "Down",
		ResponseModeCaption: "What is the result of the {0} step?",
		DelayDecisionHoursNumber: "Hours",
		NegativeDaysNumberErrorText: "Must be positive",
		HasStartTimeCaption: "Exact time"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignConditionalSequenceFlowPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignConditionalSequenceFlowPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignConditionalSequenceFlowPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignConditionalSequenceFlowPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "CampaignConditionalSequenceFlowPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignConditionalSequenceFlowPropertiesPage",
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