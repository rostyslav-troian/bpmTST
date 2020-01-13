define("BulkEmailSplitPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "General information",
		RecipientPercentCaption: "% of recipients to be added to test:",
		StartDateCaption: "Test start date",
		StartManualCaption: "Run test manually",
		SelectAudienceCaption: "Select the audience to participate in the split test",
		StartDateGroupCaption: "When should the test start",
		StartDateRadioCaption: "Start test at the specified time",
		StartManualRadioCaption: "Run test manually",
		StartTestUpdateTargetMessage: "Start error: Audience is being added",
		StartTestEmptyTargetMessage: "Start error: Add an audience",
		StartTestTestRunningTargetMessage: "Start error: Test is already started",
		StartTestDateEmptyMessage: "Start error: Specify test start date",
		StartTestSuccessfulMessage: "Split test has been scheduled for the specified time",
		TestParametersCaption: "Bulk emails",
		AudienceTestCaption: "Audience",
		RunTestCaption: "Start",
		TestResultsCaption: "Results",
		EmailIndicatorsControlGroupCaption: "Unique by test summary",
		RunSplitTestCaption: "Run test",
		AbandonSplitTestCaption: "Stop test",
		StartDateHeadersCaption: "Send time",
		RecipientPercentTooltip: "For example, if you set 20% and add 100 persons in the test audience, then each test audience of each bulk email will include 10 randomly selected contacts. You can only modify the percentage prior to adding groups to the split test audience.",
		StartDateValidationError: "Specify the value",
		StartDateValidationMessage: "To start the test at the scheduled time, enter the test start date and time",
		IncorrectRecipientPercentMessage: "Enter a value in the range of 0.1 - 100",
		IndicatorCaptionForOpens: "Opens",
		IndicatorCaptionForClicks: "Clicks",
		IndicatorCaptionForSoftBounce: "Soft Bounce",
		IndicatorCaptionForHardBounce: "Hard Bounce",
		IndicatorCaptionForUnsubscribe: "Unsubscribes",
		IndicatorCaptionForSpam: "Spam complaints",
		ConfirmationRunTestMessage: "Start split test?",
		StartDateActualValidationMessage: "The planned date of the split test has already passed.",
		StartDateActualValidationAsk: "Run the test now?",
		DetermineWinnerGroupCaption: "Which email wins the test",
		DetermineWinnerLabel: "When the split test is started, the bulk emails included in it will be sent automatically. \u003Cbr\u003ETo find which bulk email has better conversion, analyze the feedback after sending the bulk email (2 to 72 hours depending on the bulk email type).\u003Cbr\u003E\u003Cbr\u003EIf you want to send the bulk email to contacts from your target segment that have not been included in the test bulk email recipients list:\u003Cbr\u003E1) copy the bulk email from the test with best conversion;\u003Cbr\u003E2) use the dynamic folders in the Contacts section to select the bulk email audience.",
		StartTesteEmailAlreadyRunMessage: "Unable to start the split test: bulk emails have already been started.",
		AbandonTesteEmailAlreadyRunMessage: "Unable to cancel the split test: bulk emails have already been started.",
		BulkEmailDetailCaption: "Email stats comparison",
		TryTrialButtonCaption: "Get a trial version",
		DemoDataMessage: "You cannot send emails in Creatio marketing demo version. If you want to use split tests for your bulk emails, get a free 14 day trial version.",
		BulkSplitTestStartErrorDefaultMessage: "Could start split test.\n\nTry once again or contact your system administrator to check integration settings."
	};
	var localizableImages = {
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailSplitPageV2",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailSplitPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailSplitPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailSplitPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailSplitPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailSplitPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailSplitPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailSplitPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailSplitPageV2",
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