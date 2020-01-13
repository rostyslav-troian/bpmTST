define("EmailMessageHistoryItemPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DraftStringColon: "Draft: ",
		DeleteEmailMessage: "Are you sure that you want to delete the selected message?",
		DeleteEmailErrorMessage: "An error occurred while deleting the email.",
		RecipientsHintTemplate: "\u003Cb\u003E{0}:\u003C\/b\u003E {1}\u003Cbr\/\u003E\u003Cb\u003E{2}:\u003C\/b\u003E {3}"
	};
	var localizableImages = {
		EmailChannelIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "EmailChannelIcon",
				hash: "92e05098810fc6a8208c076d85654932",
				resourceItemExtension: ".svg"
			}
		},
		GoToEmailPage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "GoToEmailPage",
				hash: "51238dc34b025c846b908254a8d3591d",
				resourceItemExtension: ".svg"
			}
		},
		EmailLinkImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "EmailLinkImage",
				hash: "b692e80112d3572380c54fb61b0cd423",
				resourceItemExtension: ".png"
			}
		},
		DefaultCreatedBy: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "DefaultCreatedBy",
				hash: "5908a740e26cbd298188a29593c46436",
				resourceItemExtension: ".png"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		FileAttachmentsImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "FileAttachmentsImage",
				hash: "6aa381d933d58cf336fc547486fbad37",
				resourceItemExtension: ".png"
			}
		},
		ActionsButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "ActionsButtonImage",
				hash: "48d545549ca4ddb13d7a7bb58f60ed5e",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		ContactEnrichmentIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "ContactEnrichmentIcon",
				hash: "588f9021245791159b6a98d86790d502",
				resourceItemExtension: ".svg"
			}
		},
		ForwardEmailActionIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "ForwardEmailActionIcon",
				hash: "a37810a8fe4c9e9a368516c0d1163446",
				resourceItemExtension: ".svg"
			}
		},
		ReplyEmailActionIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "ReplyEmailActionIcon",
				hash: "a1b925cfe3cf72a1bbdb1733e489a615",
				resourceItemExtension: ".svg"
			}
		},
		ReplyToAllEmailActionIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "ReplyToAllEmailActionIcon",
				hash: "67752748c465ca76f307a8f8a8404b93",
				resourceItemExtension: ".svg"
			}
		},
		ReplyUsingTemplateEmailActionIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "ReplyUsingTemplateEmailActionIcon",
				hash: "7d0e731a659d8358796d0456ed40b8a2",
				resourceItemExtension: ".svg"
			}
		},
		ShowOnPortal: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "ShowOnPortal",
				hash: "6fcacc872bcde94591dd474991bd2bd1",
				resourceItemExtension: ".svg"
			}
		},
		HideOnPortal: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "HideOnPortal",
				hash: "e2ca62e43893f7a84c82f8b3e1b43301",
				resourceItemExtension: ".svg"
			}
		},
		FilesIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "FilesIcon",
				hash: "85a9a9b07ca7a402319a20a3bc0cf910",
				resourceItemExtension: ".svg"
			}
		},
		DeleteEmailButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "DeleteEmailButtonImage",
				hash: "bd51207a205ffed8e811024e29d15ccd",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPageV2",
				resourceItemName: "OpenChangeLogBtnImage",
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