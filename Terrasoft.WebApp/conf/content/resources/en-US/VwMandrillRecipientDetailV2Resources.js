define("VwMandrillRecipientDetailV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "Audience",
		AddButtonCaption: "New",
		ActionsButtonCaption: "Actions",
		ViewButtonCaption: "View",
		EditMenuCaption: "Edit",
		DeleteMenuCaption: "Delete",
		SortMenuCaption: "Sort by",
		SetupTotalMenuCaption: "Summaries setup",
		SetupGridMenuCaption: "Columns setup",
		LoadMoreButtonCaption: "Show more",
		MultiModeMenuCaption: "Select multiple records",
		SingleModeMenuCaption: "Cancel multiple selection",
		DeleteConfirmationMessage: "Are you sure that you want to delete the selected record?",
		CopyMenuCaption: "Copy",
		AddContactCaption: "Add contact",
		AddContactFolderCaption: "Add contact folder",
		WarningChangeRecipientList: "Changes to the recipients list can be made only for planned or paused bulk emails",
		RecipientsAddedMessage: "{0} contacts out of {1} added",
		WarningDeleteRecipient: "Deleted {0} out of {1} records. Only records with \u0022Planned\u0022, \u0022Send error\u0022 or \u0022Canceled\u0022",
		ContactsWillBeAdded: "The contacts from {0} folders will be added to the audience. A message about its completion will appear in the notification area.",
		ContactsOfOneWillBeAdded: "The contacts from {0} folder will be added to the audience. A message about its completion will appear in the notification area.",
		DetailWizardMenuCaption: "Detail setup",
		UsageInSplitTestMessage: "Bulk email audience editing is locked. The bulk email is being used in split test.",
		InfoButtonDetailTriggerEmailMessage: "Personal responses will be displayed after receiving them from email provider",
		InfoButtonDetailBulkEmailMessage: "The audience displays the list of contacts added as the email recipients.Each contact\u0027s response will be shown here."
	};
	var localizableImages = {
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientDetailV2",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientDetailV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		ExportToExcelBtnImage: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientDetailV2",
				resourceItemName: "ExportToExcelBtnImage",
				hash: "1883b16fe86f1acadfc158894338fc09",
				resourceItemExtension: ".svg"
			}
		},
		ImageFilter: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientDetailV2",
				resourceItemName: "ImageFilter",
				hash: "ef37ab38ddacefd3ba86c6bbcf4e7501",
				resourceItemExtension: ".svg"
			}
		},
		SortIcon: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientDetailV2",
				resourceItemName: "SortIcon",
				hash: "f5e0b50ec74a47fb66f7d7d403b760c3",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientDetailV2",
				resourceItemName: "GridSettingsIcon",
				hash: "3f4eb707ce7f259fce295490879a8f9b",
				resourceItemExtension: ".svg"
			}
		},
		FilterIcon20: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientDetailV2",
				resourceItemName: "FilterIcon20",
				hash: "124f910abe91ebe4045613a9c5b379d1",
				resourceItemExtension: ".svg"
			}
		},
		ObjectChangeLogSettingsBtnImage: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientDetailV2",
				resourceItemName: "ObjectChangeLogSettingsBtnImage",
				hash: "f0169f1a725a65ec76c564d5e9705277",
				resourceItemExtension: ".svg"
			}
		},
		OpenRecordChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientDetailV2",
				resourceItemName: "OpenRecordChangeLogBtnImage",
				hash: "cbebcb32589828e1055caf62150ff717",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});