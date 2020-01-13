define("DuplicatesModuleViewResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AccountCaption: "Account duplicates",
		ContactCaption: "Contact duplicates",
		GridTitleAccount: "Name",
		GridTitleContact: "Name",
		GridTitleAccountPhone: "Primary phone",
		GridTitleAccountAdditionalPhone: "Alternate phone",
		GridTitleAccountWeb: "Web",
		GridTitleContactMobilePhone: "Mobile phone",
		GridTitleContactHomePhone: "Home phone",
		GridTitleContactEmail: "Email",
		StartCaption: "Start searching",
		StopCaption: "Stop searching",
		ScheduleCaption: "Set up duplicates search parameters",
		MergeButtonCaption: "Merge duplicates",
		NotDuplicatesButtonCaption: "Not duplicates",
		SettingsButtonCaption: "View",
		CancelButtonCaption: "Cancel"
	};
	var localizableImages = {
		ImageOpenButton: {
			source: 3,
			params: {
				schemaName: "DuplicatesModuleView",
				resourceItemName: "ImageOpenButton",
				hash: "44a879bb391b7fbfb8031c43bccade79",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});