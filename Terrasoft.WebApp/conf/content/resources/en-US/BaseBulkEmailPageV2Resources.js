define("BaseBulkEmailPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "Template",
		TypeCaption: "Type",
		MessageSettings: "Message parameters",
		IncorrectEmailMessage: "Could not save bulk email: incorrect sender\u0027s email specified.Enter a valid email.",
		MandrillSettingsActionCaption: "Mandrill settings",
		RunMandrillMassMailingActionCaption: "Start sending",
		SendTestEmailActionCaption: "Send test email",
		AnalyticsTabCaption: "Email totals",
		SettingsTabCaption: "Parameters",
		IndicatorCaptionForSoftBounce: "Soft Bounce",
		IndicatorCaptionForHardBounce: "Hard Bounce",
		IndicatorCaptionForUnsubscribe: "Unsubscribes",
		IndicatorCaptionForSpam: "Spam complaints",
		IndicatorCaptionForClicks: "Clicks",
		IndicatorCaptionForOpens: "Opens",
		OpensClicksChartGroupCaption: "Opens\/clicks chart",
		OpensClicksChartCountLabel: "Quantity",
		OpensClicksChartClicksLabel: "Clicks",
		OpensClicksChartOpensLabel: "Opens",
		HyperlinksClicksChartLinkLabel: "Link",
		HyperlinksClicksChartClicksLabel: "Link performance",
		HyperlinksClicksChartControlGroupCaption: "Link performance",
		ClickHeatmapCaption: "Click heatmap",
		BreakMandrillMassMailingActionCaption: "Stop sending",
		IndicatorCaptionForRejected: "Rejected",
		IndicatorCaptionForCommonError: "Delivery error",
		IndicatorCaptionForInvalidAddressee: "Invalid email address",
		IndicatorCaptionForCanceled: "Canceled",
		ClicksAnalysisTabCaption: "Click stats",
		NotDeliveredChartGroupCaption: "Sending and delivery errors",
		CategotyCaption: "Category",
		SendingTabCaption: "Audience",
		EmailTemplateSubject: "Subject",
		TemplateControlGroupCaption: "Template",
		InsertTemplateFromFileMenuItemCaption: "Select from file",
		InsertTemplateFromLookupMenuItemCaption: "Select from lookup",
		TemplateIsTooBigMessage: "",
		TemplateHtmlCodeModeCaption: "HTML code",
		TemplatePreviewModeCaption: "Preview",
		GAUtmCampaignIncorrectMessage: "Google Analytics campaign filled out incorrectly",
		UtmGroupCaption: "Email-to-website clicks tracking",
		UtmIncorrectMessage: "UTM tracking code filled out incorrectly",
		DurationBulkEmailCaption: "Duration",
		DurationBulkEmailValueFormat: "{0} hrs {1} min",
		DurationBulkEmailLessMinute: "Less than a minute",
		DeliveredDiagramLabel: "Delivered",
		NonDeliveredDiagramLabel: "Not delivered",
		QueuedDiagramLabel: "Queued",
		SendPeriodCaption: "Send time",
		EmptyStartDateMessage: "Specify the start date for email sending.  ",
		GoToSplitTestsCaption: "Go to Split tests",
		CatIconId: "9F60D134-1233-4CCA-BEB6-3F2DA0135D45",
		AnalyticsBlankSlatesCaption: "When sending starts, the analytics will be displayed here showing the bulk email results.\u003CBR\u003E\u003CBR\u003ELearn more about the email analytics in the {0}Academy{1}.",
		AudienceBlankSlatesCaption: "This is a trigger email and its audience can only be filled via a campaign.\u003CBR\u003EWhen the campaign is started, the audience will be included here automatically.\u003CBR\u003E\u003CBR\u003EIf you want to fill the audience manually and send email, use bulk emails for that.",
		ClicksAnalysisBlankSlatesCaption: "When sending starts, the analytics will be displayed here showing the information about the email clicks.\u003CBR\u003E\u003CBR\u003ELearn more about the clicks analytics in the {0}Academy{1}.",
		CannotStartMailingForNotLaunchedCampaign: "This bulk email is connected to a campaign. To start sending the bulk email, start the campaign connected to it.",
		EditTemplateCaption: "Open designer",
		EmptyTemplateBodyMessage: "Unable to start sending the email: email template not specified. Set up the email template and try again.",
		DemoDataMessage: "You cannot send emails in Creatio marketing demo version. If you want to send your bulk emails, get a free 14 day trial version.",
		TryTrialButtonCaption: "Get a trial version",
		DefaultTemplate: "{\u0022ItemType\u0022:\u0022sheet\u0022,\u0022Caption\u0022:\u0022Design your template\u0022,\u0022Items\u0022:[{\u0022ItemType\u0022:\u0022block\u0022,\u0022Items\u0022:[{\u0022ItemType\u0022:\u0022image\u0022,\u0022Column\u0022:0,\u0022Row\u0022:0,\u0022ColSpan\u0022:24,\u0022RowSpan\u0022:1,\u0022ImageConfig\u0022:{\u0022source\u0022:4,\u0022url\u0022:\u0022data:image\/jpeg;base64,\/9j\/4AAQSkZJRgABAgEAAAAAAAD\/7gAOQWRvYmUAZAAAAAAB\/9sAQwARDAwMDQwRDQ0RGRAOEBkdFhERFh0iFxcXFxciIRodHBwdGiEhJigrKCYhNDQ4ODQ0QUFBQUFBQUFBQUFBQUFB\/9sAQwESEBATFRMXFBQXFhIVEhYcFhgYFhwpHBweHBwpNSYhISEhJjUvMisrKzIvOTk1NTk5QUFBQUFBQUFBQUFBQUFB\/8AAEQgAiQLuAwEiAAIRAQMRAf\/EABoAAQADAQEBAAAAAAAAAAAAAAADBAUBAgb\/xAAmEAEBAAEDBAICAwEBAAAAAAAAAQIRUQMhMXEEMhRBgRIiM2Jh\/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP\/EABQRAQAAAAAAAAAAAAAAAAAAAAD\/2gAMAwEAAhEDEQA\/APvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB5yyxwn8suyP7OG1BMIfs4bU\u002BzhtQTCH7OG1Ps4bUEwh\u002BzhtT7OG1BMIfs4bU\u002BzhtQTCH7OG1Ps4bUEwh\u002BzhtT7OG1BMIfs4bU\u002BzhtQTCLH2OPK6dZrulAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABB7XwnlWWfa\u002BE8q07zyBpdjS7NABn6XY0uzQAZ\u002Bl2NLs0AGfpdjS7NABn6XY0uzQAZ\u002Bl2NLs0AGfpdjS7NBD7P\u002Bf7BVX52UF\u002BdgdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABB7XwnlWneeVn2vhPKtO88g0EXLyzjmk65VKp89t5ctQcvNyW\/JJx\u002BxddM\u002Bsv5QANAeOK28eOuz2AAAAAAAh9n\/AD\/aZD7P\u002Bf7BVX52UF\u002BdgdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABB7XwnlWneeVn2vhPKtO88g0EHPxW\/3x638xOAz3vj48s7\/AOfmrlxxveR0HJJJJO0dAAHnLKYzW9oBlljhNcrpFfL2crf69Ij5OS8l1vb8R5BPh7N10znTeLEss1nWKCTi5bx3fH8wFxD7P\u002Bf7S45TKazrEXs\/5\/sFVfnZQX52B0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEHtfCeVad55Wfa\u002BE8q07zyDQAAAAABy2YzW9op8vLeS\/wDM7R79i8mvX4fhCAAAACTi5bx3fG94l9izLilna1Wd1un8fxsDi\/OygvzsDoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIPa\u002BE8q07zys\u002B18J5Vp3nkGgDznnjhNcqD0h5OfHHpj1qHk58s\u002Bk6YowT4\u002BzlPlNU2PLhn2vXZSAX7JlNL1iny8d48v\u002Bb2r1hz549L\/AGib\u002BWHNhcZ32BUAAAAAAX52UF\u002BdgdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABB7XwnlWneLPtfCeVYFnk9iTph1u\/4V7lcrrbrXAAAAAAAAAAAAABfnZQX52B0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEXsY3LDp10uuippdq0AGfpdqaXatABn6Xaml2rQAZ\u002Bl2ppdq0AGfpdqaXatABn6Xaml2rQAZ\u002Bl2ppdq0AGfpdqaXatABQxwyyuki\u002BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP\/\/Z\u0022}}]},{\u0022ItemType\u0022:\u0022block\u0022,\u0022Items\u0022:[{\u0022ItemType\u0022:\u0022text\u0022,\u0022Column\u0022:0,\u0022Row\u0022:0,\u0022ColSpan\u0022:24,\u0022RowSpan\u0022:0,\u0022Content\u0022:\u0022\u003Cp style=\u0027text-align:center\u0027\u003E\u003Cspan style=\u0027color:#D3D3D3\u0027\u003E\u003Cspan style=\u0027font-family:verdana,geneva,sans-serif; font-size:36px\u0027\u003EDesign your template\u003C\/span\u003E\u003C\/span\u003E\u003C\/p\u003E\u0022}]},{\u0022ItemType\u0022:\u0022block\u0022,\u0022Items\u0022:[{\u0022ItemType\u0022:\u0022text\u0022,\u0022Column\u0022:0,\u0022Row\u0022:0,\u0022ColSpan\u0022:24,\u0022RowSpan\u0022:0,\u0022Content\u0022:\u0022\u003Cp\u003E \u003C\/p\u003E\u003Cp\u003E\u003Cspan style=\u0027color:#696969\u0027\u003E\u003Cspan style=\u0027font-family:verdana,geneva,sans-serif\u0027\u003EYou can create your own beautiful email from scratch really easy! Click \u0027Edit template\u0027, and drag elements from the library to design your template structure..\u003C\/span\u003E\u003C\/span\u003E\u003C\/p\u003E\u003Cp\u003E \u003C\/p\u003E\u003Cp\u003E\u003Cspan style=\u0027color:#696969\u0027\u003E\u003Cspan style=\u0027font-family:verdana,geneva,sans-serif\u0027\u003ENeed some ideas? Choose a template from lookup to start with.\u003C\/span\u003E\u003C\/span\u003E\u003C\/p\u003E\u003Cp\u003E \u003C\/p\u003E\u0022}]},{\u0022ItemType\u0022:\u0022block\u0022,\u0022Items\u0022:[{\u0022ItemType\u0022:\u0022text\u0022,\u0022Column\u0022:0,\u0022Row\u0022:0,\u0022ColSpan\u0022:12,\u0022RowSpan\u0022:0,\u0022Content\u0022:\u0022\u003Cp\u003E\u003Cspan style=\u0027color:rgb(102, 102, 102); font-family:verdana,geneva,sans-serif; font-size:11px\u0027\u003EYou\u2019re receiving this email because you signed up for email Company Name. If you don\u0027t want to receive it anymore,  \u003C\/span\u003E\u003Ca href=\u0027[#Unsubscribe.URL#]\u0027 style=\u0027font-family: verdana, geneva, sans-serif; font-size: 11px; line-height: 16.7999992370605px;\u0027\u003E\u003Cu\u003E\u003Cspan style=\u0027color:rgb(46, 108, 184)\u0027\u003Eunsubscribe\u003C\/span\u003E\u003C\/u\u003E\u003C\/a\u003E\u003Cspan style=\u0027color:rgb(102, 102, 102); font-family:verdana,geneva,sans-serif; font-size:11px\u0027\u003E.\u003C\/span\u003E\u003C\/p\u003E\u0022},{\u0022ItemType\u0022:\u0022text\u0022,\u0022Column\u0022:12,\u0022Row\u0022:0,\u0022ColSpan\u0022:12,\u0022RowSpan\u0022:0,\u0022Content\u0022:\u0022\u003Cp\u003E\u003Cspan style=\u0027font-size:11px\u0027\u003E\u003Cspan style=\u0027font-family:verdana,geneva,sans-serif\u0027\u003E\u003Cspan style=\u0027color:rgb(102, 102, 102)\u0027\u003E\u003Cstrong\u003ECompany\u003C\/strong\u003E \u003Cstrong\u003EName\u003C\/strong\u003E\u003C\/span\u003E\u003C\/span\u003E\u003C\/span\u003E\u003C\/p\u003E\u003Cp\u003E\u003Cspan style=\u0027font-size:11px\u0027\u003E\u003Cspan style=\u0027font-family:verdana,geneva,sans-serif\u0027\u003E\u003Cspan style=\u0027color:rgb(102, 102, 102)\u0027\u003EStreet, house, city, country\u003C\/span\u003E\u003C\/span\u003E\u003C\/span\u003E\u003C\/p\u003E\u003Cp\u003E\u003Cspan style=\u0027font-size:11px\u0027\u003E\u003Cspan style=\u0027font-family:verdana,geneva,sans-serif\u0027\u003E\u003Cspan style=\u0027color:rgb(102, 102, 102)\u0027\u003E(222) 222-22-22\u003C\/span\u003E\u003C\/span\u003E\u003C\/span\u003E\u003C\/p\u003E\u003Cp style=\u0027text-align:justify\u0027\u003E\u003Cspan style=\u0027font-size:11px\u0027\u003E\u003Cspan style=\u0027font-family:verdana,geneva,sans-serif\u0027\u003E\u003Ca href=\u0027mailto:info@companyname.info\u0027\u003E\u003Cspan style=\u0027color:rgb(89, 89, 255)\u0027\u003Einfo@companyname\u003C\/span\u003E\u003Cspan style=\u0027color:rgb(89, 89, 255)\u0027\u003E.\u003C\/span\u003E\u003Cspan style=\u0027color:rgb(89, 89, 255)\u0027\u003Einfo\u003C\/span\u003E\u003C\/a\u003E\u003C\/span\u003E\u003C\/span\u003E\u003C\/p\u003E\u0022}]}],\u0022Width\u0022:750,\u0022BackgroundColor\u0022:\u0022#ffffff\u0022}",
		IndicatorHintForOpens: "Number and percentage of unique recipients who opened an email",
		IndicatorHintForClicks: "Number and percentage of unique recipients who followed one or several links within an email. The indicator excludes unsubscribes",
		IndicatorHintForSpam: "Number and percentage of emails marked as spam",
		IndicatorHintForUnsubscribe: "Number and percentage of recipients who unsubscribed from your email",
		IndicatorHintForHardBounce: "Number and percentage of email rejects marked as \u0022Hard\u0022. This can result from an invalid email address",
		IndicatorHintForSoftBounce: "Number and percentage of email rejects marked as \u0022Soft\u0022. This can result from a full inbox or mail server problems",
		SendMailingActionHint: "To start sending a trigger email, you need to start the campaign connected to it.\nConnect the trigger email to the campaign and start it. The emails will be sent automatically.",
		DomainsHint: "For example: yourdomain.com, yourdomain.net, yourseconddomain.com",
		UnsubscribeLinkAppliedMessage: "There was no unsubscribe link in the selected email template. Email service providers will block emails without an unsubscribe link.\nWe inserted an unsubscribe link automatically. ",
		InvalidSenderDomainMessage: "The email domain is not confirmed, which might significantly affect email deliverability. Add domain and get settings to confirm it \u003Ca href=\u0022\u0022\u003Ehere\u003C\/a\u003E.",
		ValidSenderDomainMessage: "Sending domain was successfully verified for sending emails",
		DefaultSenderDomainMessage: "Please enter valid sender email address",
		IndicatorCaptionForRecipient: "Recipients",
		IndicatorCaptionForSent: "Sent",
		IndicatorCaptionForDelivered: "Delivered",
		IndicatorHintForDelivered: "Number of unique recipients who received an email",
		OnSaveTemplateServiceErrorMessage: "An error occurred while saving email template. Please make sure you have enough licensed active contacts. If the error occurs again, please contact support",
		NotDeliveredChartTitle: "Delivery errors",
		CanceledChartTitle: "Sending errors",
		CanceledChartEmptyImageCaption: "Congratulations! You have no sending errors",
		NotDeliveredChartEmptyImageCaption: "Congratulations! You have no delivery errors",
		ChartEmptyDataImageId: "588995DA-2BEF-431E-BB21-A40A59B8CC64",
		EditTemplateConfirmation: "This email is a part of active campaign. Are you sure that you want to edit its template?",
		MacroTemplate: "[#{0}#]",
		ReplaceTemplateConfirmation: "An email template already exists for the current bulk email. If you proceed, all existing data will be lost",
		SendTestEmailCaption: "Test email",
		StatusButtonInfoToolTip: "The \u201CDraft\u201D status is assigned automatically to new emails and email templates saved with errors. Sending bulk or test emails having the \u201CDraft\u201D status is not possible until you fix the errors.",
		FieldEmptyValidationMessage: "Enter a value",
		EmptyOwnerNameOrEmailMessage: "Email sender is specified as a macro. To prepare email for sending, Creatio uses contact information of the email owner: \u0022{0}\u0022. Warning: email is not set for this contact.",
		SenderMacroValidationMessage: "Could not save bulk email: the field value must be specified either as a string or as a macro.",
		SenderMacroInfoMessage: "Your sender is specified as a macro. Creatio will send emails only from verified sender domains. Any emails, whose sender domain is not verified will not be sent. The response for such emails will be \u201CCanceled (Sender\u0027s domain not verified)\u201D",
		IENotSupportedMessage: "It appears that your current browser does not support all Content Designer features. Please try working with the Content Designer in a different browser while continue expanding browser compatibility."
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseBulkEmailPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseBulkEmailPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseBulkEmailPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseBulkEmailPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "7b8874b63082d57a3c1afd1367fe9233",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "BaseBulkEmailPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "BaseBulkEmailPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "BaseBulkEmailPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		BpmonlineMacrosIcon: {
			source: 3,
			params: {
				schemaName: "BaseBulkEmailPageV2",
				resourceItemName: "BpmonlineMacrosIcon",
				hash: "d294aa661f282450a25f9085195b3eae",
				resourceItemExtension: ".png"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "BaseBulkEmailPageV2",
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