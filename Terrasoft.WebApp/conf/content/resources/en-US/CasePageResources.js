define("CasePageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "Details",
		NumberCaption: "Number",
		SymptomsCaption: "Description",
		StatusCaption: "Status",
		OwnerCaption: "Assignee",
		RegisteredOnCaption: "Registration date",
		SolutionDateCaption: "Scheduled resolution time",
		CurrentStatusGroupCaption: "Current status",
		TermsGroupCaption: "Timeframe",
		ResponseDateCaption: "Scheduled response time",
		NotesFilesTabCaption: "Attachments",
		SubjectCaption: "Subject",
		PriorityCaption: "Priority",
		AccountCaption: "Account",
		OriginCaption: "Source",
		ContactCaption: "Contact",
		SupportLevelCaption: "Support line",
		GroupCaption: "Assigned team",
		IndicatorsGroupCaption: "Indicators",
		RespondedOnCaption: "Actual response time",
		SolutionProvidedOnCaption: "Actual resolution time",
		SolutionTabCaption: "Closure and feedback",
		SolutionMainGroupCaption: "",
		ClosureCodeCaption: "Reason for closing",
		SolvedOnSupportLevelCaption: "Resolved by",
		SolutionCaption: "Resolution",
		SatisfactionLevelCaption: "Rating",
		ClosureDateCaption: "Closed on",
		RequiredContactOrAccountMessage: "Please, fill in either the \u0022Account\u0022 or \u0022Contact\u0022 field",
		RelationsTabCaption: "Closure and feedback",
		ParentCaseCaption: "Parent case",
		SolutionGroupCaption: "Resolution",
		RatingGroupCaption: "Rating",
		SatisfactionLevelCommentCaption: "User comment",
		LeftHeaderCaptionSuffix: "Remaining:",
		DelayHeaderCaptionSuffix: "Delay:",
		DaysCaptionSuffix: "d",
		HoursCaptionSuffix: "h",
		MinutesCaptionSuffix: "m",
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
		FeedbackGroupCaption: "Feedback",
		ActualDateGroupCaption: "Processing time frame",
		ParametersTabCaption: "Case profile",
		ProcessingTabCaption: "Processing",
		MessageHistoryGroupCaption: "History",
		ShowSystemMessagesString: "Show system messages",
		HideSystemMessagesString: "Hide system messages",
		OpenNewSectionDesignerButtonCaption: "Open new page designer",
		AssignToMeCaption: "Assign to me",
		CreatedOnCaption: "Created:",
		EmailTitleCaption: "Case response {0} {1}",
		DefaultHeader: "Case #{0}",
		HeaderTemplate: "Case #{0}: {1}",
		TermsControlGroupCaption: "Terms",
		CaseInformationTabCaption: "Case information",
		HeaderTipCaption: "Page appearance has been improved in Creatio 7.8",
		HeaderTipContent: "The page field layout has changed. Only the fields that you configured for the previous version are displayed here. For your convenience, you can move these fields to the record profile (on the left) or to the tab array using the Page Designer.",
		HeaderTipDesignerBtnCaption: "Set up now",
		HeaderTipAcademyBtnCaption: "Learn more at the Academy",
		AcademyDesignerUrl: "http:\/\/academy.bpmonline.com\/documents\/docs\/product\/bpm\u0027online%20sales\/enterprise\/7.8.0\/BPMonlineHelp\/chapter_section_wizard\/section_wizard_page_fields_setup.htm#XREF_49522",
		HeaderTipNotShowBtnCaption: "Do not show this message again",
		TimeZoneSysSettingMessage: "\u003Cp\u003EThe following time zone is used for displaying dates:\u003C\/p\u003E\u003Col\u003E\u003Cli\u003EThe time zone specified in your \u003Ca href=\u0022..\/Nui\/ViewModule.aspx#UserProfile\u0022\u003EUser profile.\u003C\/a\u003E\u003C\/li\u003E\u003Cli\u003EIf the profile time zone is not set, the default time zone will be used (specified in the \u003Ca href=\u0022..\/Nui\/ViewModule.aspx#CardModuleV2\/SysSettingPage\/edit\/12fef2c9-8baa-4b07-88e4-464169a44775\u0022\u003E\u0022Time zone by default\u0022\u003C\/a\u003E system setting).\u003C\/li\u003E\u003C\/ol\u003E",
		TimeZoneUserProfileMessage: "\u003Cp\u003ETime zones can be displayed in three different ways:\u003C\/p\u003E\n\u003Col\u003E\n\u003Cli\u003EThe time zone specified in your profile,\u003C\/li\u003E\n\u003Cli\u003ESystem setting \u201CTime zone by default\u201D,\u003C\/li\u003E\n\u003Cli\u003ETime zone \u201CTime in UTC\u201D.\u003C\/li\u003E\n\u003C\/ol\u003E\n\u003Cp\u003EYou can configure time zone inside your \u003Ca href=\u0022..\/Nui\/ViewModule.aspx#UserProfile\u0022\u003E\u0022User profile \u0022\u003C\/a\u003E  or contact system administrator.\u003C\/p\u003E",
		PageContainsUnsavedChanges: "This page contains unsaved changes. Do you still wish to leave the page?",
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
		ServiceItemTipMessage: "\u003Cp\u003E Services determine case categories as well as default response and resolution deadlines. Use the  \u003Ca href=\u0022..\/0\/Nui\/ViewModule.aspx#SectionModuleV2\/ServiceItemSection\/\u0022\u003E\u0022Services\u0022\u003C\/a\u003E  section to configure services \u003C\/p\u003E",
		SatisfactionLevelTip: "In order to change satisfaction level you need to have rights on operation \u201CAbility to change case satisfaction level\u201D",
		SatisfactionLevelCommentTip: "In order to change feedback you need to have rights on operation \u201CAbility to change case satisfaction level\u201D",
		CanCustomizeWarning: "Define {0} attribute instead of overriding function {1} to empty",
		SetCaseContactMessage: "Specify {0} as contact in case?"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "CasePage",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "CasePage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "CasePage",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "CasePage",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "CasePage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "CasePage",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "CasePage",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "CasePage",
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