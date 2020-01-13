define("TriggerEmailPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		TriggeredEmailLaunchedCaption: "Trigger email is now active.\n\nEmails will be sent instantly upon the campaign event.",
		TriggeredEmailStoppedCaption: "Sending of trigger email has been stopped.\n\nIf you want to resume sending the email, click \u0022Start sending\u0022.",
		TriggeredEmailScheduledCaption: "Trigger email is now active.\n\nThe next sending is scheduled for {0}.",
		ScheduledDueDateCaption: "Finishing the last sending",
		StartDateForActiveEmailTooltip: "This trigger email will be daily sent to contacts who have passed to a certain step in campaign.\n\nNext sending is scheduled for {0}.",
		StartDateForDeactivateEmailTooltip: "This trigger email is not active. You can start sending manually or by starting the connected campaign.\n\nTrigger emails will be sent daily to contacts who have passed to a certain step in campaign.\nIf you start sending now, the next sending will be scheduled for {0}.",
		StartDateTooltipWithUnknownDateDeactivate: "This trigger email is not active. You can start sending manually or by starting the connected campaign.\n\nTrigger emails will be sent daily to contacts who have passed to a certain step in campaign.\nIf you start sending now, the next sending will be scheduled for the specified time.",
		ImmediateSendDueDateCaption: "Last sending",
		ScheduledSendStartDateCaption: "Start of last sending",
		CannotStartMailingForNotLaunchedCampaign: "To start sending a trigger email, you need to start the campaign connected to it.\n\nConnect the trigger email to the campaign and start it. The emails will be sent automatically.",
		ImmediateStartDateForActiveEmailTooltip: "This trigger email will be sent to the contact instantly, right after the event connected to the email through campaign (for example, filling in the landing).",
		ImmediateStartDateForDeactivateEmailTooltip: "Trigger email is not active now. You can start sending manually or by starting the connected campaign.\n\nCustomer will receive instant trigger emails right after the event connected to the email through the campaign. ",
		StartDateTooltipWithUnknownDateActivate: "This trigger email will be daily sent to contacts who have passed to a certain step in campaign.",
		ImmediateStartDateForDeactivateEmailFromCampaignTooltip: "Trigger letter is not active. You can start sending campaign-related running. Trigger letters, which manages the launch campaign, sent to contacts that go to the appropriate step in the campaign.",
		ImmediateStartDateForActivateEmailFromCampaignTooltip: "Trigger an active. Trigger letters, which manages the launch campaign, sent to contacts who are moving to the corresponding step in the campaign after the time specified in the elements of the campaign, \u0022Connector\u0022",
		IndicatorCaptionForDuplicateEmail: "Duplicate email",
		IndicatorCaptionForBlankEmail: "Blank email",
		IndicatorCaptionForIncorrectEmail: "Incorrect email",
		IndicatorCaptionForUnreachableEmail: "Unreachable email",
		IndicatorCaptionForCommunicationLimit: "Communication limit",
		IndicatorCaptionForDoNotUseEmail: "Do not use email",
		IndicatorCaptionForTemplateNotFound: "Template not found",
		IndicatorCaptionForDeliveryError: "Delivery error"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "TriggerEmailPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "TriggerEmailPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "TriggerEmailPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "TriggerEmailPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "7b8874b63082d57a3c1afd1367fe9233",
				resourceItemExtension: ".png"
			}
		},
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "TriggerEmailPageV2",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "TriggerEmailPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "TriggerEmailPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "TriggerEmailPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		BpmonlineMacrosIcon: {
			source: 3,
			params: {
				schemaName: "TriggerEmailPageV2",
				resourceItemName: "BpmonlineMacrosIcon",
				hash: "d294aa661f282450a25f9085195b3eae",
				resourceItemExtension: ".png"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "TriggerEmailPageV2",
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