define("EmailPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		LinksGroupCaption: "Connected to",
		EmailMessageTabCaption: "Message",
		EmailGeneralInfoTabCaption: "General information",
		EmailLineTabCaption: "Feed",
		EmailAttachingTabCaption: "Attachments",
		SenderCaption: "From",
		TitleCaption: "Subject",
		AddEmailForUserQuestion: "Mailbox synchronization parameters must be configured in order to be able to send emails. Configure parameters?",
		AddEmailForUserCaption: "No configured email address detected",
		RecepientCaption: "To",
		CopyRecepientCaption: "Cc",
		BlindCopyRecepientCaption: "Bcc",
		SendEmailAction: "Send",
		SendEmailForUserQuestion: "Fill in the \u0022From:\u0022 field to send the message",
		ActivityParticipantDetailCaption: "Participants",
		SendEmailError: "Error occurred when sending email. Please, try later.",
		RecepientEmailForUserQuestion: "Fill in at least one of the \u0022To:\u0022, \u0022Cc:\u0022 or \u0022Bcc:\u0022 fields in order to send the email",
		SaveAndSend: "Activity must be saved before sending messages. Save and send?",
		EmailFormatString: "{0} \u003C{1}\u003E;",
		SaveForInsertImage: "To insert an image, the activity record must be saved. Save and insert?",
		MailboxDoesntExist: "Mailbox synchronization parameters must be set up in order to send email messages.",
		SendDateCaption: "Sent on",
		ReplyShablonCaption: "Re:",
		ForwardShablonCaption: "FW:",
		ReplyActionCaption: "Reply",
		ReplyAllActionCaption: "Reply all",
		ForwardActionCaption: "Forward",
		ActionPageDesignerButtonCaption: "Page designer",
		ActionRightsPageButtonCaption: "Access rights",
		EmailPageCaption: "Email",
		RemindToCaption: "Remind",
		StartDateGreaterDueDate: "The value in the \u0022Due\u0022 field should be greater than the value in the \u0022Start\u0022 field",
		CC: "CC",
		BCC: "BCC",
		EmailSendStatusCaption: "Email status",
		ProjectResourceElementMissing: "Contact {0} is not specified in the project\u0027s list of resources. Do you want to add a new record to the list of resources?",
		SchedulerDataViewCaption: "Open calendar",
		CopyAttachmentMsg: "Copy attachments from original letter?",
		FullProjectNameChangedWithoutProjectSelectionWarning: "The value in the \u0022Project\u0022 field is not correct",
		ConnectionWithProjectDetailCaption: "Connected to project",
		NoSubjectCaption: "No subject",
		ReplyBodyHtmlTemplate: "\u003Cbr\u003E\u003Cbr\u003E\u003Cbr\u003E\u003Cdiv\u003E\u003Chr\u003E\u003Cspan style=\u0027font-weight: bold;\u0027\u003E{6}: \u003C\/span\u003E\u003Cspan\u003E{0}\u003C\/span\u003E\u003Cbr\u003E\u003Cspan style=\u0027font-weight: bold;\u0027\u003E{7}: \u003C\/span\u003E\u003Cspan\u003E{1}\u003C\/span\u003E\u003Cbr\u003E\u003Cspan style=\u0027font-weight: bold;\u0027\u003E{8}: \u003C\/span\u003E\u003Cspan\u003E{2}\u003C\/span\u003E\u003Cbr\u003E\u003Cspan style=\u0027font-weight: bold;\u0027\u003E{9}: \u003C\/span\u003E\u003Cspan\u003E{3}\u003C\/span\u003E\u003Cbr\u003E\u003Cspan style=\u0027font-weight: bold;\u0027\u003E{10}: \u003C\/span\u003E\u003Cspan\u003E{4}\u003C\/span\u003E\u003Cbr\u003E\u003Cdiv\u003E{5}",
		ReplyBodyPlainTextTemplate: "\n\n\n{6}: {0}\n{7}: {1}\n{8}: {2}\n{9}: {3}\n{10}: {4}\n{5}",
		ValidateUnhandledMacrosMessage: "There are no available values for certain macros used in this email. We recommend replacing the highlighted macros. Send email now?",
		ShowRelatedEmails: "Show related"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "EmailPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "EmailPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "EmailPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "EmailPageV2",
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