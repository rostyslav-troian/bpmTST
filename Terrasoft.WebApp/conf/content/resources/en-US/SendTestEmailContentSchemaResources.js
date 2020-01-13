define("SendTestEmailContentSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SendTestEmailContentModalBoxHeader: "Send test email",
		SendTestEmailButtonCaption: "Send",
		SchemaLocalizableString1: "",
		EmailsFieldCaption: "Test email(s) will be sent to email addresses",
		SelectedContactFieldCaption: "Recipient\u0027s contact for testing macros",
		IncorrectEmailMessage: "Invalid email",
		ContactHint: "By default, Creatio will use the contact from the \u0022Recipient contact for testing bulk emails\u0022 system setting",
		EmailAddressHint: "Use the \u201C,\u201D or \u201C;\u201D as separators for several emails. For example, \u0022email1@domain.com, email2@domain.com\u0022",
		FullInvalidEmailAddressMessage: "Unable to send test email. The recipient\u2019s email is incorrect: {0}",
		EmailAddressCaption: "Email",
		SendCurrentTemplateCaption: "Send selected template",
		SendAllTemplatesCaption: "Send all templates ({0} variants)",
		TemplateSettingsBlockCaption: "Test email template settings",
		SendDCTestMessageSuccessMessage: "{0} of {1} \u00A0sendings performed. Error while validating message. See details in the \u0022Email log\u0022 section",
		SendTestBulkMessageSuccessMessage: "Test sending performed successfully.",
		SendTestBulkMessageFailMessage: "Could not perform test sending.Try once again or contact your system administrator to check integration settings.",
		SendTestEmailModeBlockCaption: "Test email template settings"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "SendTestEmailContentSchema",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "SendTestEmailContentSchema",
				resourceItemName: "CloseButtonImage",
				hash: "bcf2d4125a9751584d37cd8d0be121ca",
				resourceItemExtension: ".svg"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "SendTestEmailContentSchema",
				resourceItemName: "ProcessButtonImage",
				hash: "9903e902413ee697cc93f90b0ba60b42",
				resourceItemExtension: ".png"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "SendTestEmailContentSchema",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});