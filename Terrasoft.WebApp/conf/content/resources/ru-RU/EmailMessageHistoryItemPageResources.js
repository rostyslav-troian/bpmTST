define("EmailMessageHistoryItemPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		FromString: "\u041E\u0442 \u043A\u043E\u0433\u043E:",
		ToString: "\u043A\u043E\u043C\u0443:",
		DraftString: "\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A",
		ReplyToAllUsingTemplate: "\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C \u0432\u0441\u0435\u043C \u043F\u043E \u0448\u0430\u0431\u043B\u043E\u043D\u0443",
		ReplyBodyHtmlTemplate: "\u003Cbr\u003E\u003Cdiv\u003E\u003Chr\u003E\u003Cspan style=\u0027font-weight: bold;\u0027\u003E{6}: \u003C\/span\u003E\u003Cspan\u003E{0}\u003C\/span\u003E\u003Cbr\u003E\u003Cspan style=\u0027font-weight: bold;\u0027\u003E{7}: \u003C\/span\u003E\u003Cspan\u003E{1}\u003C\/span\u003E\u003Cbr\u003E\u003Cspan style=\u0027font-weight: bold;\u0027\u003E{8}: \u003C\/span\u003E\u003Cspan\u003E{2}\u003C\/span\u003E\u003Cbr\u003E\u003Cspan style=\u0027font-weight: bold;\u0027\u003E{9}: \u003C\/span\u003E\u003Cspan\u003E{3}\u003C\/span\u003E\u003Cbr\u003E\u003Cspan style=\u0027font-weight: bold;\u0027\u003E{10}: \u003C\/span\u003E\u003Cspan\u003E{4}\u003C\/span\u003E\u003Cbr\u003E\u003Cdiv\u003E{5}",
		ReplyBodyPlainTextTemplate: "{6}: {0}{7}: {1}{8}: {2}{9}: {3}{10}: {4}{5}",
		SenderCaption: "\u041E\u0442 \u043A\u043E\u0433\u043E",
		SendDateCaption: "\u0414\u0430\u0442\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438",
		RecepientCaption: "\u041A\u043E\u043C\u0443",
		CopyRecepientCaption: "\u041A\u043E\u043F\u0438\u044F",
		TitleCaption: "\u0422\u0435\u043C\u0430",
		HideEmailOnPortalString: "\u0421\u043A\u0440\u044B\u0432\u0430\u0442\u044C email \u043D\u0430 \u043F\u043E\u0440\u0442\u0430\u043B\u0435",
		ShowEmailOnPortalString: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C email \u043D\u0430 \u043F\u043E\u0440\u0442\u0430\u043B\u0435",
		ShowEmailConfirmationMessage: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043E\u0442\u043E\u0431\u0440\u0430\u0437\u0438\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435?",
		HideEmailConfirmationMessage: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0441\u043A\u0440\u044B\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435?",
		ShowMessageError: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043A\u0430\u0437\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F",
		HideMessageError: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043A\u0440\u044B\u0442\u0438\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F"
	};
	var localizableImages = {
		DefaultCreatedBy: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "DefaultCreatedBy",
				hash: "5908a740e26cbd298188a29593c46436",
				resourceItemExtension: ".png"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		EmailLinkImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "EmailLinkImage",
				hash: "b692e80112d3572380c54fb61b0cd423",
				resourceItemExtension: ".png"
			}
		},
		FileAttachmentsImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "FileAttachmentsImage",
				hash: "6aa381d933d58cf336fc547486fbad37",
				resourceItemExtension: ".png"
			}
		},
		ContactEnrichmentIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "ContactEnrichmentIcon",
				hash: "588f9021245791159b6a98d86790d502",
				resourceItemExtension: ".svg"
			}
		},
		ActionsButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "ActionsButtonImage",
				hash: "48d545549ca4ddb13d7a7bb58f60ed5e",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		ForwardEmailActionIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "ForwardEmailActionIcon",
				hash: "a37810a8fe4c9e9a368516c0d1163446",
				resourceItemExtension: ".svg"
			}
		},
		ReplyEmailActionIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "ReplyEmailActionIcon",
				hash: "a1b925cfe3cf72a1bbdb1733e489a615",
				resourceItemExtension: ".svg"
			}
		},
		ReplyToAllEmailActionIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "ReplyToAllEmailActionIcon",
				hash: "67752748c465ca76f307a8f8a8404b93",
				resourceItemExtension: ".svg"
			}
		},
		ReplyUsingTemplateEmailActionIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "ReplyUsingTemplateEmailActionIcon",
				hash: "7d0e731a659d8358796d0456ed40b8a2",
				resourceItemExtension: ".svg"
			}
		},
		FilesIcon: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
				resourceItemName: "FilesIcon",
				hash: "85a9a9b07ca7a402319a20a3bc0cf910",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "EmailMessageHistoryItemPage",
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