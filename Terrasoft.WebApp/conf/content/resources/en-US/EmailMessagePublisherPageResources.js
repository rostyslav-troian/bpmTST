define("EmailMessagePublisherPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SendEmailForUserQuestion: "Fill in the \u0022From:\u0022 field to send the message",
		RecepientEmailForUserQuestion: "Fill in at least one of the \u0022To:\u0022, \u0022Cc:\u0022 or \u0022Bcc:\u0022 fields in order to send the email",
		EmailFormatString: "{0} \u003C{1}\u003E;",
		AddEmailForUserQuestion: "Mailbox synchronization parameters must be configured in order to be able to send emails. Configure parameters?",
		MailboxDoesntExist: "Mailbox synchronization parameters must be set up in order to send email messages.",
		CC: "CC",
		BCC: "BCC",
		SenderCaption: "From",
		SendButtonCaption: "Send",
		WriteEmailPostHint: "Your message will be sent via email",
		DraftBodyMessage: "DRAFT",
		EmailMaskCaption: "Email is sent",
		EmailTitleCaption: "Subject",
		TemplateButtonCaption: "Templates",
		MacroTemplate: "[#{0}#]",
		SubjectIsEmptyMessageToUser: "Field \u0022Subject\u0022: Enter a value",
		RecipientCaption: "To",
		CopyRecepientCaption: "Cc",
		BlindCopyRecepientCaption: "Bcc"
	};
	var localizableImages = {
		ToolbarVisibilityButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailMessagePublisherPage",
				resourceItemName: "ToolbarVisibilityButtonImage",
				hash: "e00cdf2dfbf00fac7b8837a2e9227aef",
				resourceItemExtension: ".png"
			}
		},
		TemplateButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailMessagePublisherPage",
				resourceItemName: "TemplateButtonImage",
				hash: "2b29f6cfff6ba8867648243b5d87ce57",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});