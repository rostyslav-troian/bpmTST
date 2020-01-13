define("PortalUserInvitationMixinResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PortalAccountNotExistErrorMessage: "Organization wasn\u0027t created for this Account.\nTo create Organization please go to Organizational roles in System designer",
		UsersCreatedSuccessMessage: "New portal users have been created. Do you wish to send them portal invitation emails?",
		UsersFailedMessage: "Creatio was unable to create any new portal users. Please contact system administrator",
		SomeUsersFailedMessage: "Creatio was unable to create following portal users: {0}. Please contact system administrator.\n\nThe rest of the portal users have been created. Do you wish to send them portal invitation emails?",
		OrganizationNotExistErrorMessage: "An organization for this account has not yet been registered on the portal",
		CreateOrganizationButtonCaption: "Create organization",
		CantAdministratePortalUsers: "You do not have permission to perform this operation.\n\nPlease contact your system administrator and request permission to perform the following system operation with code: \u00ABCanAdministratePortalUsers\u00BB.",
		SomeUsersWithoutEmailErrorMessage: "Unable to send email invitations to the portal users. Before you attempt to send invitations again, please check data of the following portal users: {0}",
		UserSuccessInviteMessage: "Invitations have been sent to the portal users",
		InviteUsersButtonCaption: "Send invitation"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});