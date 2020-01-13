define("CommunicationPanelEmailSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddEmailButtonCaption: "New email",
		SynchronizeEmail: "Synchronize email",
		EmailBoxSettings: "Go to mailbox settings",
		MailboxSettingsEmpty: "Set up the mailbox synchronization to receive emails",
		IncomingEmail: "Incoming",
		OutgoingEmail: "Outgoing",
		DraftEmail: "Drafts",
		LoadingMessagesComplete: "Synchronization is started. We will notify you when it is completed.",
		EmailBoxNotProcessedCaption: "Not processed",
		EmailBoxIsProcessedCaption: "Processed",
		EditExistingAccount: "Edit email accounts",
		NewEmailAccountCaption: "New email account",
		EmailboxSyncSettingsInsertedTooltipCaption: "User account {0} was added successfully. You can \u003Ca data-context-mailserverid=\u0027{1}\u0027 href=\u0027#\u0027\u003Emodify\u003C\/a\u003E its settings that are set by default.",
		OneNewMessage: "Show 1 new message",
		MoreThanOneNewMessage: "Show {0} new messages",
		AllMailboxesCaption: "All mailboxes"
	};
	var localizableImages = {
		ActionsButtonImage: {
			source: 3,
			params: {
				schemaName: "CommunicationPanelEmailSchema",
				resourceItemName: "ActionsButtonImage",
				hash: "8624d21271ed2ce65aeda243033f3670",
				resourceItemExtension: ".png"
			}
		},
		Processed: {
			source: 3,
			params: {
				schemaName: "CommunicationPanelEmailSchema",
				resourceItemName: "Processed",
				hash: "eb6af21888ad87565fda86e725d1d5bd",
				resourceItemExtension: ".png"
			}
		},
		NoProcessed: {
			source: 3,
			params: {
				schemaName: "CommunicationPanelEmailSchema",
				resourceItemName: "NoProcessed",
				hash: "fec42a65fad75072f41fb152949603cf",
				resourceItemExtension: ".png"
			}
		},
		RelationsImage: {
			source: 3,
			params: {
				schemaName: "CommunicationPanelEmailSchema",
				resourceItemName: "RelationsImage",
				hash: "3cd2e39c03c3eed8573af20616a74e49",
				resourceItemExtension: ".png"
			}
		},
		AddEmailImage: {
			source: 3,
			params: {
				schemaName: "CommunicationPanelEmailSchema",
				resourceItemName: "AddEmailImage",
				hash: "5fb18bcb50da33994f16caae1a48ba58",
				resourceItemExtension: ".png"
			}
		},
		More: {
			source: 3,
			params: {
				schemaName: "CommunicationPanelEmailSchema",
				resourceItemName: "More",
				hash: "ae1115e7aff85993009915dcbf9e87ee",
				resourceItemExtension: ".png"
			}
		},
		ActiveMenuIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationPanelEmailSchema",
				resourceItemName: "ActiveMenuIcon",
				hash: "043707680993738938752364032b940a",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});