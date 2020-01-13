define("SystemOperationsPermissionsMixinResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		RightsErrorMessage: "You do not have permission to perform this operation.\n\n",
		CanChangeAdminOperationMessage: "Permission to system operation with code \u00AB{0}\u00BB is managed in the \u201COperations permissions\u201D section of the System designer",
		CanNotChangeAdminOperationMessage: "Please contact your system administrator and request permission to perform the following system operation with code: \u00AB{0}\u00BB. Permissions to system operations are managed in the \u201COperation permissions\u201D section of the System designer",
		ChangeButtonCaption: "Change permissions"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});