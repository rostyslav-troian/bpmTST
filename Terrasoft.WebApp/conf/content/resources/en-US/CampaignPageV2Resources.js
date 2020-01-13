define("CampaignPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "General information",
		CampaignStatusCaption: "Campaign status",
		CampaignTargetTabCaption: "Participants",
		CampaignSchemaTabCaption: "Campaign workflow",
		StartCaption: "Start",
		EndCaption: "End",
		TargetPercentCaption: "I want",
		TargetDescriptionCaption: "% of participants",
		IndicatorCaptionForTargetTotal: "Participants",
		IndicatorCaptionForTargetAchieve: "Reached the goal",
		IndicatorCaptionForTargetRemain: "Remaining",
		IndicatorCaptionForTargetAchieved: "Goal reached!",
		StartCampaignButtonCaption: "Start campaign",
		StopCampaignButtonCaption: "Stop campaign",
		CampaignPropertiesTabCaption: "Properties",
		groupCaption: "",
		OwnerCaption: "Owner",
		StartDateCaption: "Started on",
		EndDateCaption: "End date",
		CreatedDateCaption: "Created on",
		ToolsCaption: "Tools",
		ToolsEmailLabel: "Bulk email",
		ToolsEventLabel: "Event",
		TargetDescriptionDefaultValue: "to reach the goal",
		CampaignTargetIsEmptyMessage: "Failed to start the campaign, as there was not a single participant added.\n\nAdd contacts on the \u0022Participants\u0022 tab.",
		CampaignCompleteConfirmationMessage: "Are you sure you want to stop the campaign?",
		DiagramElementNotAddedMessage: "You cannot add two start steps to the campaign workflow.You can start multiple campaigns and select start steps for each campaign individually.",
		SaveCampaignDiagramErrorConfirmationMessage: "Campaign data contains errors or is insufficient. Please correct any errors before starting the campaign.\n\nSave the campaign?",
		CampaignStartConfirmationMessage: "Are you sure you want to start the campaign? You will not be able to edit workflow once campaign is started.",
		DemoDataMessage: "You cannot start campaigns in Creatio marketing demo version. To start your first campaign with Creatio get a free 30 day trial version.",
		TryTrialButtonCaption: "Get a trial version",
		DiagramDisabledMessage: "You cannot edit the workflow once campaign has been started.",
		TargetPercentValidationEroorMessage: "The value of the Goal field should be in the range from 0 to 100",
		OpenCampaignDesignerCaption: "Open campaign designer",
		TargetPercentValidationErrorMessage: "The value of the Goal field should be in the range from 0 to 100"
	};
	var localizableImages = {
		IndicatorTargetAchievedImage: {
			source: 3,
			params: {
				schemaName: "CampaignPageV2",
				resourceItemName: "IndicatorTargetAchievedImage",
				hash: "a931c61b6c5a2515965e280a3e3137bb",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "CampaignPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "CampaignPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "CampaignPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "CampaignPageV2",
				resourceItemName: "OpenChangeLogBtnImage",
				hash: "cbebcb32589828e1055caf62150ff717",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});