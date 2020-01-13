define("SummarySettingsViewGeneratorResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		AddButtonCaption: "New",
		AddColumnButtonCaption: "Add row",
		DisplayRecordCountCaption: "Display number of records",
		ColumnHeaderCaption: "Column",
		ColumnFuncCaption: "Function",
		ColumnTitleCaption: "Title"
	};
	var localizableImages = {
		ImageDeleteButton: {
			source: 3,
			params: {
				schemaName: "SummarySettingsViewGenerator",
				resourceItemName: "ImageDeleteButton",
				hash: "b8a7008452ec672bd9c284d5e83091c1",
				resourceItemExtension: ".png"
			}
		},
		ImageConfirmButton: {
			source: 3,
			params: {
				schemaName: "SummarySettingsViewGenerator",
				resourceItemName: "ImageConfirmButton",
				hash: "87fea5a995ec309ade9719e3aaab7c33",
				resourceItemExtension: ".png"
			}
		},
		ImageDiscardButton: {
			source: 3,
			params: {
				schemaName: "SummarySettingsViewGenerator",
				resourceItemName: "ImageDiscardButton",
				hash: "bc577de06132c42e584683b41f45878c",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});