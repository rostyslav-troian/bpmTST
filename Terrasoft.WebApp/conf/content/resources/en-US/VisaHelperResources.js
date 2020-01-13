define("VisaHelperResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WarningBeforeRejecting: "Are you sure you want to reject the approval?",
		Approve: "Approve",
		Comments: "Approval comment",
		Reject: "Reject",
		WarningBeforeApprove: "Grant the approval?",
		ChangeVisaOwner: "Change approver",
		NotRigth: "You do not have permission to edit approval",
		IsAllowedToDelegate: "Delegating this approval is prohibited",
		SendToVisaCaption: "Send for approval",
		SendToVisaSysSettingNotExistsError: "Process system setting not found",
		VisaLookupCaption: "Select: Group\/user",
		ApproveButtonCaption: "Approve",
		RejectButtonAction: "Reject",
		NotAllowedDelegateCurrentUserError: "Delegating the approval is prohibited as you are not the initial approver"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});