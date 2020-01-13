define("PortalUserInvitationModuleSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PortalUserInvitationCaption: "Create portal users",
		PortalUserInvitationModalBoxMessage: "Create new portal users by adding their email addresses below. After adding the new users you will be able to send portal invitations to their email addresses. The new portal users will be able to log in using these email addresses as user names",
		InviteButtonCaption: "Create portal users",
		CancelButtonCaption: "Cancel",
		PortalUserInvitationEmailToolTipText: "Separate each email address using gaps or commas. Note, you can not invite users by sending an invitation to a mailing list (like info@company.com).",
		PortalUserInvitationLabelText: "Email addresses",
		InviteUserInformationMessage: "Invitations were sent to each email address",
		EmptyEmailsErrorMessage: "Enter email addresses",
		InvalidEmailEntered: "Invalid email entered",
		PortalUserOptionalFuncRolesMessage: "Select additional permissions that will be granted to the new portal users:"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});