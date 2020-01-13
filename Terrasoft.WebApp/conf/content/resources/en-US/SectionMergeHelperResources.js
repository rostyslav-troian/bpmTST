define("SectionMergeHelperResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectMoreThanOneRowErrorMessage: "Select more than one row",
		SuccessMerge: "Merge was successful",
		MergeRecordsCaption: "Merge records",
		MergeContactNotificationBodyTemplate: "{0} contacts will be merged.",
		MergeAccountNotificationBodyTemplate: "{0} accounts will be merged.",
		MergeNotificationTitleTemplate: "Duplicates merge",
		DefaultMergeNotificationBodyTemplate: "{0} records will be merged. You will receive a separate notification as soon as the merging is complete"
	};
	var localizableImages = {
		MergeBtnImage: {
			source: 3,
			params: {
				schemaName: "SectionMergeHelper",
				resourceItemName: "MergeBtnImage",
				hash: "c4b6e45cf719f11e69f5e6e998f15797",
				resourceItemExtension: ".svg"
			}
		},
		DefMergeIcon: {
			source: 3,
			params: {
				schemaName: "SectionMergeHelper",
				resourceItemName: "DefMergeIcon",
				hash: "0c6d0cdfc289aefaaba79f7530695f76",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});