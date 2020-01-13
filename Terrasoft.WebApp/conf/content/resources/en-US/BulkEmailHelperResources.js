define("BulkEmailHelperResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MandrillInteractionTargetNotFound: "Could not start bulk email, the target audience is empty or email can not be sent to any of the recipients.\n\nCheck the audience.",
		MandrillMassMailingSuccessMessage: "The sending will start in a few moments. A message about its completion will appear in the notification area.",
		MandrillMassMailingFailsMessage: "Perhaps, like this bulk mail does not exist.\n\nTry to add and start a new bulk email once again.",
		MandrillMassMailingScheduledMessage: "The bulk email will run automatically {0}. A message about its completion will appear in the notification area.",
		DateIsExpiredMessage: "The planned date of the bulk email has already passed.\n\nStart sending now?",
		IsScheduledMessage: "Bulk mail is planned for {0}.\n\nStart sending now?",
		WrongKeyMessage: "Could not start bulk email as the key to the bulk email service has not been validated.\n\nContact your system administrator to check integration settings.",
		ConfirmationRunMessage: "Start bulk email?",
		MandrillMassMailingBreakingMessage: "When the message sending is finished, the corresponding notification will appear in the notifications area.",
		MandrillMassMailingBreakFailsMessage: "Unable to stop bulk email.",
		ConfirmationBreakMessage: "Sending of bulk email emails will be stopped. Emails that are still in the queue for sending will not be sent to the recipients.\n\nAre you sure you want to stop sending?",
		MandrillMassMailingAlreadyComplitedMessage: "Unfortunately, this bulk email cannot be stopped, because all emails have been sent to the recipients.\nYou can use the \u0022Postpone bulk email start\u0022 to increase the time period when you can stop the bulk email.",
		MandrillMassMailingAlreadyStoppedMessage: "Perhaps, this bulk email has already been stopped by another user or due to sending error.",
		UsageInSplitTestMessage: "Unable to start the bulk email: the bulk email is already used in split test",
		ConfirmationScheduleMessage: "Are you sure you want to schedule the bulk email sending?",
		UnsubscribeLinkMacros: "[#Unsubscribe.URL#]"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});