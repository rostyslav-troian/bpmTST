define("CampaignPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ESNTabCaption: "Feed",
		SubscribeCaption: "Follow the feed",
		UnsubscribeCaption: "Unfollow the feed",
		SubscribedInformationDialog: "You are now following feed: {0}",
		UnsubscribedInformationDialog: "You have stopped following feed: {0}",
		TagButtonHint: "Tags",
		TabControlScrollLeftHint: "Scroll left",
		TabControlScrollRightHint: "Scroll right",
		FieldsGroupCollapseButtonHint: "Collapse\/expand",
		FieldLockHint: "Non-editable field",
		ClearButtonHint: "Clear value",
		PageHeaderTemplate: "{0} \/ {1}",
		OpenNewSectionDesignerButtonCaption: "Open new page designer",
		HeaderTipCaption: "Page appearance has been improved in Creatio 7.8",
		HeaderTipContent: "The page field layout has changed. Only the fields that you configured for the previous version are displayed here. For your convenience, you can move these fields to the record profile (on the left) or to the tab array using the Page Designer.",
		HeaderTipDesignerBtnCaption: "Set up now",
		HeaderTipAcademyBtnCaption: "Learn more at the Academy",
		AcademyDesignerUrl: "http:\/\/academy.bpmonline.com\/documents\/docs\/product\/bpm\u0027online%20sales\/enterprise\/7.8.0\/BPMonlineHelp\/chapter_section_wizard\/section_wizard_page_fields_setup.htm#XREF_49522",
		HeaderTipNotShowBtnCaption: "Do not show this message again",
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		ActionButtonCaption: "Actions",
		ColumnFilterInvalidFormatException: "Filtering by the {0} column is configured incorrectly",
		RequiredFieldIsEmptyCaption: "Fill in the required {0} field to save the record",
		NewRecordPageCaptionSuffix: ": New record",
		IncrementNumberSuffix: "LastNumber",
		IncrementMaskSuffix: "CodeMask",
		DelayExecutionButtonCaption: "Perform later",
		ProcessEntryPointButtonCaption: "Move down the process",
		CloseButtonCaption: "Close",
		ViewOptionsButtonCaption: "View",
		OpenSectionDesignerButtonCaption: "Open page designer",
		FieldValidationError: "Field \u0022{0}\u0022: {1}",
		PrintButtonCaption: "Print",
		OpenListSettingsCaption: "List setup",
		ProsessButtonCaption: "Run process",
		BeginProcessButtonMenuItemCaption: "Start process",
		ContinueProcessButtonMenuItemCaption: "Continue process",
		QuickAddButtonHint: "Add related activity",
		PageContainsUnsavedChanges: "This page contains unsaved changes. Do you still wish to leave the page?",
		OpenCampaignDesignerCaption: "Open campaign designer",
		CampaignPropertiesTabCaption: "Properties",
		CreatedDateCaption: "Created on",
		StartDateCaption: "Started on",
		EndDateCaption: "End date",
		CampaignParticipantTabCaption: "Audience",
		CanCustomizeWarning: "Define {0} attribute instead of overriding function {1} to empty",
		StartCampaignButtonCaption: "Start campaign",
		StopCampaignButtonCaption: "Stop campaign",
		CampaignStartConfirmationMessage: "Are you sure you want to start the campaign?",
		CampaignCompleteConfirmationMessage: "Are you sure you want to stop the campaign?",
		CampaignErrorMessageboxCaption: "Unfortunately, campaign can not be launched. Please see errors details below.",
		TabVisaCaption: "Approvals",
		CampaignWarningMessageboxCaption: "We recommend to fix issues below for correct work of all elements and integrations. Campaign still can be launched.",
		CampaignWarningMessageTitleCaption: "Warnings:",
		CampaignErrorMessageTitleCaption: "Campaign elements set up errors and other errors:",
		ScheduledStartModeCaption: "When to start",
		ScheduledStopModeCaption: "When to stop",
		ScheduledStartCampaignButtonCaption: "Schedule campaign",
		ScheduledStartDateValidationMessage: "Specify campaign start date and time",
		ScheduledStopDateValidationMessage: "Specify campaign stop date and time",
		ScheduledStopLessStartValidationMessage: "Campaign stopping time is before its starting time. Please set correct values",
		ScheduledStopLessNextFireTimeValidationMessage: "Campaign stopping time is before scheduled campaign run. To set this stopping time correctly, please stop campaign manually, set desired time and start campaign again.",
		TimelineTabCaption: "Timeline",
		CampaignScheduleConfirmationMessage: "Are you sure you want to schedule the campaign?",
		EmptyPageCaption: "Your campaign flow diagram and analytics will be here.",
		CampaignAnalyticsTabCaption: "Campaign flow",
		CreateCampaignFlowCaption: "Create campaign flow",
		CampaignLinkedEntitiesTabCaption: "Linked Entities",
		GoToCampaignLogButtonCaption: "Go to campaign log",
		ScheduledStopDateLessThenNowErrorMessage: "Campaign end date has already passed. Please, set another scheduled end date to start campaign.",
		EditCampaignFlowButtonCaption: "Edit",
		CreateCampaignFlowButtonCaption: "Create",
		ScheduledStartLessNowValidationMessage: "Campaign scheduled time is before current time. Please set correct value"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "CampaignPage",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignPage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignPage",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignPage",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "CampaignPage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "CampaignPage",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "CampaignPage",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "CampaignPage",
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