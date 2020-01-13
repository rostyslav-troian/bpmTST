define("BulkEmailTemplateValidatorResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ValidationHelpButtonCaption: "Learn more",
		ApplyUnsubscribeLinkWithDynamicBlockMessage: "One or several of the dynamic content variations of email template have no unsubscribe link. Email service providers will block emails without an unsubscribe link.\nDo you wish to insert an unsubscribe link automatically?",
		ApplyUnsubscribeLinkMessage: "There is no unsubscribe link in the current email template. Email service providers will block emails without an unsubscribe link.\nDo you wish to insert an unsubscribe link automatically?",
		EmailStateValidationMessage: "Current bulk email is in active status. Save function disabled",
		MsgReadOnlyStateCaption: "Error while saving the template",
		MsgReadOnlyStateDescription: "The current bulk email is in the active status. The save function is disabled",
		MsgMaxContractSizeCaption: "Resulting template size exeeds the limit",
		MsgMaxContractSizeDescription: "The resulting dynamic template can not be added to the bulk email, it\u2019s ({0} MB) more than maximum allowed size ({1} MB). Edit the template or select the other one.",
		MsgMaxReplicaSizeCaption: "The replica\u0027s template size exceeds the limit",
		MsgMaxReplicaSizeDescription: "The template can not be added to the bulk email, it\u2019s ({0} MB) more than maximum allowed size ({1} MB). Edit the template or select the other one.",
		MsgInvalidContentCaption: "Deprecated HTML tags detected",
		MsgNoDefaultContentCaption: "No default content available",
		MsgNoDefaultContentDescription: "The email template does not contain any default rule for the dynamic content block. The recipients that do not match the dynamic content rule conditions will receive a \u0022Canceled (template not found)\u0022 response",
		MsgDCAttributesWithoutFiltersCaption: "Filter conditions of the dynamic content rules are not specified",
		MsgDCAttributesWithoutFiltersDescription: "The {0} dynamic content rule does not have any filters specified. The configured content will be sent to all recipients",
		MsgInactiveSenderDomainsCaption: "Sender\u0027s domain validation",
		MsgInactiveSenderDomainsDescription: "The sender domain {0} is not confirmed, which might significantly affect email deliverability. Add the domain and get the settings to confirm it",
		MsgMissingUnsubUrlCaption: "Unsubscribe link missing",
		MsgMissingUnsubUrlDescription: "There is no unsubscribe link in the current email template. Email service providers will block emails without an unsubscribe link.",
		MsgInvalidHeadersCaption: "Errors in validation of header fields have been detected",
		MsgInvalidHeadersDescription: "Check the field values in the email headers.",
		MsgInvalidContentBuilderStateCaption: "The new Content Builder function is disabled",
		MsgInvalidContentBuilderStateDescription: "The email template that was created in the new Content Builder cannot be saved in the old Content Builder. Contact your system administrator to enable the \u0022MjmlContentBuilder\u0022 functionality to save the template."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});