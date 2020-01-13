define("ChangePasswordModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		saveButtonCaption: "Change password",
		cancelButtonCaption: "Cancel",
		headerCaption: "Changing password",
		passwordMissMatchMessageCaption: "Passwords do not match",
		currentPasswordCaption: "Current password",
		newPasswordCaption: "New password",
		newPassworConfirmationCaption: "Confirm new password",
		successPasswordChangeMessage: "Password successfully changed.",
		errorPasswordChangeMessage: "The attempt to change the password failed. To resolve this issue, contact your system administrator."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});