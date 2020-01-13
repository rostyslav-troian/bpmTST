define("RightsResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		RightsCaption: "Access rights: ",
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		ReadLabel: "Read",
		EditLabel: "Edit",
		DeleteLabel: "Delete",
		AccessLevelButtonCaption: "Access level",
		AllowRightCaption: "Granted",
		AllowAndGrantRightCaption: "Granted\/delegation permitted",
		DenyRightCaption: "Denied",
		DeleteButtonCaption: "Delete",
		UpButtonCaption: "Up",
		DownButtonCaption: "Down",
		GridEmptyCaption: "Rights are not specified",
		AddButtonCaption: "New",
		AddReadRightCaption: "Read access right",
		AddEditRightCaption: "Edit access right",
		AddDeleteRightCaption: "Delete access right",
		NoRightsMessage: "Insufficient rights to execute this operation",
		SaveError: "Unable to save permission settings. Please try again or contact the system administrator to resolve the problem."
	};
	var localizableImages = {
		AddIcon: {
			source: 3,
			params: {
				schemaName: "Rights",
				resourceItemName: "AddIcon",
				hash: "ffe7f0745b9038a1f305afe59c578934",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});