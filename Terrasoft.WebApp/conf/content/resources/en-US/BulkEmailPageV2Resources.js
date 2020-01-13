define("BulkEmailPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		IncorrectStartDateMessage: "Bulk email start date must be greater than current",
		BulkEmailCantBeExecutedWhenSegmentsAreUpdating: "Unfortunately, bulk email can not be started, as adding recipients to the audience is still running.\n\nTry again after completion. A message will appear in the notification area.",
		UnsubscribeLinkMacros: "[#Unsubscribe.Link#]",
		UnsubscribeUrlMacros: "[#Unsubscribe.URL#]",
		RunScheduledMailingActionCaption: "Schedule sending",
		CannotStartMailingForLaunchedCampaign: "You cannot start the bulk email connected to an already started campaign.",
		DefaultTemplate: "{\u0022ItemType\u0022:\u0022sheet\u0022,\u0022Caption\u0022:\u0022Design your template\u0022,\u0022Items\u0022:[{\u0022ItemType\u0022:\u0022block\u0022,\u0022Items\u0022:[{\u0022ItemType\u0022:\u0022image\u0022,\u0022Column\u0022:0,\u0022Row\u0022:0,\u0022ColSpan\u0022:24,\u0022RowSpan\u0022:1,\u0022ImageConfig\u0022:{\u0022source\u0022:4,\u0022url\u0022:\u0022data:image\/jpeg;base64,\/9j\/4AAQSkZJRgABAgEAAAAAAAD\/7gAOQWRvYmUAZAAAAAAB\/9sAQwARDAwMDQwRDQ0RGRAOEBkdFhERFh0iFxcXFxciIRodHBwdGiEhJigrKCYhNDQ4ODQ0QUFBQUFBQUFBQUFBQUFB\/9sAQwESEBATFRMXFBQXFhIVEhYcFhgYFhwpHBweHBwpNSYhISEhJjUvMisrKzIvOTk1NTk5QUFBQUFBQUFBQUFBQUFB\/8AAEQgAiQLuAwEiAAIRAQMRAf\/EABoAAQADAQEBAAAAAAAAAAAAAAADBAUBAgb\/xAAmEAEBAAEDBAICAwEBAAAAAAAAAQIRUQMhMXEEMhRBgRIiM2Jh\/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP\/EABQRAQAAAAAAAAAAAAAAAAAAAAD\/2gAMAwEAAhEDEQA\/APvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB5yyxwn8suyP7OG1BMIfs4bU\u002BzhtQTCH7OG1Ps4bUEwh\u002BzhtT7OG1BMIfs4bU\u002BzhtQTCH7OG1Ps4bUEwh\u002BzhtT7OG1BMIfs4bU\u002BzhtQTCLH2OPK6dZrulAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABB7XwnlWWfa\u002BE8q07zyBpdjS7NABn6XY0uzQAZ\u002Bl2NLs0AGfpdjS7NABn6XY0uzQAZ\u002Bl2NLs0AGfpdjS7NBD7P\u002Bf7BVX52UF\u002BdgdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABB7XwnlWneeVn2vhPKtO88g0EXLyzjmk65VKp89t5ctQcvNyW\/JJx\u002BxddM\u002Bsv5QANAeOK28eOuz2AAAAAAAh9n\/AD\/aZD7P\u002Bf7BVX52UF\u002BdgdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABB7XwnlWneeVn2vhPKtO88g0EHPxW\/3x638xOAz3vj48s7\/AOfmrlxxveR0HJJJJO0dAAHnLKYzW9oBlljhNcrpFfL2crf69Ij5OS8l1vb8R5BPh7N10znTeLEss1nWKCTi5bx3fH8wFxD7P\u002Bf7S45TKazrEXs\/5\/sFVfnZQX52B0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEHtfCeVad55Wfa\u002BE8q07zyDQAAAAABy2YzW9op8vLeS\/wDM7R79i8mvX4fhCAAAACTi5bx3fG94l9izLilna1Wd1un8fxsDi\/OygvzsDoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIPa\u002BE8q07zys\u002B18J5Vp3nkGgDznnjhNcqD0h5OfHHpj1qHk58s\u002Bk6YowT4\u002BzlPlNU2PLhn2vXZSAX7JlNL1iny8d48v\u002Bb2r1hz549L\/AGib\u002BWHNhcZ32BUAAAAAAX52UF\u002BdgdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABB7XwnlWneLPtfCeVYFnk9iTph1u\/4V7lcrrbrXAAAAAAAAAAAAABfnZQX52B0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEXsY3LDp10uuippdq0AGfpdqaXatABn6Xaml2rQAZ\u002Bl2ppdq0AGfpdqaXatABn6Xaml2rQAZ\u002Bl2ppdq0AGfpdqaXatABQxwyyuki\u002BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP\/\/Z\u0022}}]},{\u0022ItemType\u0022:\u0022block\u0022,\u0022Items\u0022:[{\u0022ItemType\u0022:\u0022text\u0022,\u0022Column\u0022:0,\u0022Row\u0022:0,\u0022ColSpan\u0022:24,\u0022RowSpan\u0022:0,\u0022Content\u0022:\u0022\u003Cp style=\u0027text-align:center\u0027\u003E\u003Cspan style=\u0027color:#D3D3D3\u0027\u003E\u003Cspan style=\u0027font-family:verdana,geneva,sans-serif; font-size:36px\u0027\u003EDesign your template\u003C\/span\u003E\u003C\/span\u003E\u003C\/p\u003E\u0022}]},{\u0022ItemType\u0022:\u0022block\u0022,\u0022Items\u0022:[{\u0022ItemType\u0022:\u0022text\u0022,\u0022Column\u0022:0,\u0022Row\u0022:0,\u0022ColSpan\u0022:24,\u0022RowSpan\u0022:0,\u0022Content\u0022:\u0022\u003Cp\u003E \u003C\/p\u003E\u003Cp\u003E\u003Cspan style=\u0027color:#696969\u0027\u003E\u003Cspan style=\u0027font-family:verdana,geneva,sans-serif\u0027\u003EYou can create your own beautiful email from scratch really easy! Click \u0027Edit template\u0027, and drag elements from the library to design your template structure..\u003C\/span\u003E\u003C\/span\u003E\u003C\/p\u003E\u003Cp\u003E \u003C\/p\u003E\u003Cp\u003E\u003Cspan style=\u0027color:#696969\u0027\u003E\u003Cspan style=\u0027font-family:verdana,geneva,sans-serif\u0027\u003ENeed some ideas? Choose a template from lookup to start with.\u003C\/span\u003E\u003C\/span\u003E\u003C\/p\u003E\u003Cp\u003E \u003C\/p\u003E\u0022}]},{\u0022ItemType\u0022:\u0022block\u0022,\u0022Items\u0022:[{\u0022ItemType\u0022:\u0022text\u0022,\u0022Column\u0022:0,\u0022Row\u0022:0,\u0022ColSpan\u0022:12,\u0022RowSpan\u0022:0,\u0022Content\u0022:\u0022\u003Cp\u003E\u003Cspan style=\u0027color:rgb(102, 102, 102); font-family:verdana,geneva,sans-serif; font-size:11px\u0027\u003EYou\u2019re receiving this email because you signed up for email Company Name. If you don\u0027t want to receive it anymore,  \u003C\/span\u003E\u003Ca href=\u0027[#Unsubscribe.URL#]\u0027 style=\u0027font-family: verdana, geneva, sans-serif; font-size: 11px; line-height: 16.7999992370605px;\u0027\u003E\u003Cu\u003E\u003Cspan style=\u0027color:rgb(46, 108, 184)\u0027\u003Eunsubscribe\u003C\/span\u003E\u003C\/u\u003E\u003C\/a\u003E\u003Cspan style=\u0027color:rgb(102, 102, 102); font-family:verdana,geneva,sans-serif; font-size:11px\u0027\u003E.\u003C\/span\u003E\u003C\/p\u003E\u0022},{\u0022ItemType\u0022:\u0022text\u0022,\u0022Column\u0022:12,\u0022Row\u0022:0,\u0022ColSpan\u0022:12,\u0022RowSpan\u0022:0,\u0022Content\u0022:\u0022\u003Cp\u003E\u003Cspan style=\u0027font-size:11px\u0027\u003E\u003Cspan style=\u0027font-family:verdana,geneva,sans-serif\u0027\u003E\u003Cspan style=\u0027color:rgb(102, 102, 102)\u0027\u003E\u003Cstrong\u003ECompany\u003C\/strong\u003E \u003Cstrong\u003EName\u003C\/strong\u003E\u003C\/span\u003E\u003C\/span\u003E\u003C\/span\u003E\u003C\/p\u003E\u003Cp\u003E\u003Cspan style=\u0027font-size:11px\u0027\u003E\u003Cspan style=\u0027font-family:verdana,geneva,sans-serif\u0027\u003E\u003Cspan style=\u0027color:rgb(102, 102, 102)\u0027\u003EStreet, house, city, country\u003C\/span\u003E\u003C\/span\u003E\u003C\/span\u003E\u003C\/p\u003E\u003Cp\u003E\u003Cspan style=\u0027font-size:11px\u0027\u003E\u003Cspan style=\u0027font-family:verdana,geneva,sans-serif\u0027\u003E\u003Cspan style=\u0027color:rgb(102, 102, 102)\u0027\u003E(222) 222-22-22\u003C\/span\u003E\u003C\/span\u003E\u003C\/span\u003E\u003C\/p\u003E\u003Cp style=\u0027text-align:justify\u0027\u003E\u003Cspan style=\u0027font-size:11px\u0027\u003E\u003Cspan style=\u0027font-family:verdana,geneva,sans-serif\u0027\u003E\u003Ca href=\u0027mailto:info@companyname.info\u0027\u003E\u003Cspan style=\u0027color:rgb(89, 89, 255)\u0027\u003Einfo@companyname\u003C\/span\u003E\u003Cspan style=\u0027color:rgb(89, 89, 255)\u0027\u003E.\u003C\/span\u003E\u003Cspan style=\u0027color:rgb(89, 89, 255)\u0027\u003Einfo\u003C\/span\u003E\u003C\/a\u003E\u003C\/span\u003E\u003C\/span\u003E\u003C\/p\u003E\u0022}]}],\u0022Width\u0022:750,\u0022BackgroundColor\u0022:\u0022#ffffff\u0022} ",
		IndicatorHintForOpens: "Number and percentage of unique recipients who opened an email",
		IndicatorHintForClicks: "Number and percentage of unique recipients who followed one or several links within an email. The indicator excludes unsubscribes",
		IndicatorHintForSpam: "Number and percentage of emails marked as spam",
		IndicatorHintForUnsubscribe: "Number and percentage of recipients who unsubscribed from your email",
		DeliveredDiagramLabel: "Delivered",
		DisclaimerSystemEmail: "System email ignores \u0027Do not use email\u0027 flag in contact communication preferences. \nUsing system email for marketing communications is prohibited and can lead to significant issues with email deliverability and domain reputation. Set this email as system email?",
		SendingDiagramLabel: "Sending",
		BounceDiagramLabel: "Bounce",
		DeliveryErrorDiagramLabel: "Delivery error",
		CanceledDiagramLabel: "Canceled",
		IndicatorCaptionForBlankEmail: "Blank email",
		IndicatorCaptionForIncorrectEmail: "Incorrect email",
		IndicatorCaptionForUnreachableEmail: "Unreachable email",
		IndicatorCaptionForDoNotUseEmail: "Do not use email",
		IndicatorCaptionForDuplicateEmail: "Duplicate email",
		IndicatorCaptionForDeliveryError: "Delivery error",
		IndicatorCaptionForCommunicationLimit: "Communication limit",
		IndicatorCaptionForTemplateNotFound: "Template not found",
		IndicatorCaptionForSendersDomainNotVerified: "Sender\u0027s domain is not verified",
		IndicatorCaptionForSendersNameNotValid: "Sender\u0027s name is not valid"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "7b8874b63082d57a3c1afd1367fe9233",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		BpmonlineMacrosIcon: {
			source: 3,
			params: {
				schemaName: "BulkEmailPageV2",
				resourceItemName: "BpmonlineMacrosIcon",
				hash: "d294aa661f282450a25f9085195b3eae",
				resourceItemExtension: ".png"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "BulkEmailPageV2",
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