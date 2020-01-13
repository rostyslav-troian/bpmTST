define("CtiPanelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ConnectionConfigEmptyError: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u0432 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u043A \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0438\u0438. \u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0432 \u043C\u0435\u043D\u044E \u0022\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u0432 Call Centre\u0022 \u0432 \u043F\u0440\u043E\u0444\u0438\u043B\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F",
		AccountNameLabelCaption: "\u041A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442",
		JobLabelCaption: "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C",
		AccountTypeLabelCaption: "\u0422\u0438\u043F",
		CityLabelCaption: "\u0413\u043E\u0440\u043E\u0434",
		CallDurationLabelCaption: "\u0414\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C:",
		DepartmentLabelCaption: "\u0414\u0435\u043F\u0430\u0440\u0442\u0430\u043C\u0435\u043D\u0442",
		NumberLabelCaption: "\u041D\u043E\u043C\u0435\u0440",
		AnswerButtonHint: "\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C \u043D\u0430 \u0437\u0432\u043E\u043D\u043E\u043A",
		DropButtonHint: "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0437\u0432\u043E\u043D\u043E\u043A",
		HoldButtonHint: "\u041F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043D\u0430 \u0443\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435",
		UnholdButtonHint: "\u0421\u043D\u044F\u0442\u044C \u0441 \u0443\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u044F",
		PrepareTransferButtonHint: "\u041F\u0435\u0440\u0435\u0432\u0435\u0441\u0442\u0438 \u0437\u0432\u043E\u043D\u043E\u043A",
		CompleteTransferButtonHint: "\u0421\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C \u0430\u0431\u043E\u043D\u0435\u043D\u0442\u043E\u0432",
		CancelTransferButtonHint: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0435\u0440\u0435\u0432\u043E\u0434",
		CompleteTransferTip: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0434\u043B\u044F \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u044F \u0430\u0431\u043E\u043D\u0435\u043D\u0442\u043E\u0432",
		DtmfButtonHint: "\u041F\u0430\u043D\u0435\u043B\u044C \u043D\u0430\u0431\u043E\u0440\u0430 \u043D\u043E\u043C\u0435\u0440\u0430",
		MuteButtonHint: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0437\u0432\u0443\u043A",
		UnmuteButtonHint: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0437\u0432\u0443\u043A",
		VideoOnButtonHint: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u0438\u0434\u0435\u043E",
		VideoOffButtonHint: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u0438\u0434\u0435\u043E",
		IdentificationItemsControlGroupCaption: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u0438\u0441\u043A\u0430",
		SubscriberPanelNotFoundExceptionMessage: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043D\u0430\u0439\u0442\u0438 \u043F\u0430\u043D\u0435\u043B\u044C \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u0430\u0431\u043E\u043D\u0435\u043D\u0442\u0430 \u043F\u043E \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0443 \u0027{0}\u0027",
		ProcessActionsGroupCaption: "\u041F\u0440\u043E\u0446\u0435\u0441\u0441\u044B",
		SelectAnotherSubscriberCaption: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0434\u0440\u0443\u0433\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C",
		IdentificationSavingMessage: "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u0437\u0432\u043E\u043D\u043A\u0430 \u0441 id \u0027{0}\u0027",
		IdentificationFieldSavingMessage: "\u041F\u043E\u043B\u0435 \u0027{0}\u0027, \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0027{1}\u0027",
		IdentificationSavedSuccessfullyMessage: "\u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u0443\u0441\u043F\u0435\u0448\u043D\u043E",
		IdentificationSavedFailedMessage: "\u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u0441 \u043E\u0448\u0438\u0431\u043A\u043E\u0439",
		PhoneNumberCantBeEmptyMessage: "\u041F\u043E\u043B\u0435 \u041D\u043E\u043C\u0435\u0440 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C",
		EmptySearchResultMessage: "\u041D\u0435\u0442 \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u0443\u0434\u043E\u0432\u043B\u0435\u0442\u0432\u043E\u0440\u044F\u044E\u0449\u0438\u0445 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C \u043F\u043E\u0438\u0441\u043A\u0430.",
		VideoNotSupportedMessage: "\u0412\u0430\u0448 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0432\u0438\u0434\u0435\u043E",
		EmptyHistoryMessage: "\u0417\u0432\u043E\u043D\u0438\u0442\u0435 \u0434\u0440\u0443\u0433\u0438\u043C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\u043C \u0438\u043B\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u043A\u043E\u043D\u043D\u0435\u043A\u0442\u043E\u0440 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0439 \u003Ca href=\u0022https:\/\/www.terrasoft.ru\/bpmonline-marketplace\u0022 target=\u0022_blank\u0022\u003E\u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0438\u0438\u003C\/a\u003E.\u003C\/br\u003E\u003C\/br\u003E\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043E \u0440\u0430\u0431\u043E\u0442\u0435 \u0441\u043E \u0437\u0432\u043E\u043D\u043A\u0430\u043C\u0438 \u0432 {0}\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438{1}.",
		EmptyHistoryTitleLabel: "\u041F\u043E\u0445\u043E\u0436\u0435, \u0432\u044B \u0435\u0449\u0435 \u043D\u0435 \u0441\u043E\u0432\u0435\u0440\u0448\u0430\u043B\u0438 \u0437\u0432\u043E\u043D\u043A\u043E\u0432",
		NotConnectedMessage: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D\u0438\u044F \u043D\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0430",
		NoConnectionToTelephonyErrorMessage: "\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0438\u0438. \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u044B \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u0441\u0435\u0440\u0432\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0438\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D.",
		DemoNoConnectionMessageCaption: "\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u0441\u043E\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F \u0437\u0432\u043E\u043D\u043A\u043E\u0432 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0430 \u0432 \u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438.",
		DemoNoConnectionLinkCaption: "\u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438 \u043D\u0430 30 \u0434\u043D\u0435\u0439",
		DemoNoConnectionLinkUrlBeginning: "https:\/\/www.terrasoft.ru\/trial?product=",
		PhoneNumberPlaceholderCaption: "\u041A\u043E\u043C\u0443 \u0432\u044B \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C?"
	};
	var localizableImages = {
		SwitchAbonentDropBoxIcon: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "SwitchAbonentDropBoxIcon",
				hash: "ebb4db7b30e8fa87742da3441402bf30",
				resourceItemExtension: ".png"
			}
		},
		TransferringArrows: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "TransferringArrows",
				hash: "cbde4449aec542d6ea718fafa70fcadc",
				resourceItemExtension: ".png"
			}
		},
		MakeCallButtonIcon: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "MakeCallButtonIcon",
				hash: "dbdfa61770f25fbbb2ad9a71e89a7995",
				resourceItemExtension: ".png"
			}
		},
		ContactEmptyPhoto: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "ContactEmptyPhoto",
				hash: "4b177430ad9dfd06fb56c61bfd4f9b60",
				resourceItemExtension: ".jpg"
			}
		},
		AnswerButtonLongIcon: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "AnswerButtonLongIcon",
				hash: "b6bbdd8ab127d0c51af59e1e4c94e772",
				resourceItemExtension: ".png"
			}
		},
		DropButtonLongIcon: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "DropButtonLongIcon",
				hash: "e972236c0d8c26a54dcb8aee3eea199b",
				resourceItemExtension: ".png"
			}
		},
		DropButtonShortIcon: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "DropButtonShortIcon",
				hash: "9a45131112c826c0917a335e0b738328",
				resourceItemExtension: ".png"
			}
		},
		HoldButtonIcon: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "HoldButtonIcon",
				hash: "cbb32d54841e9eac5fc64086c1bd08cd",
				resourceItemExtension: ".png"
			}
		},
		HoldButtonIconDisabled: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "HoldButtonIconDisabled",
				hash: "09f54a5c9ffb19a2940806436fe40252",
				resourceItemExtension: ".png"
			}
		},
		UnholdButtonIcon: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "UnholdButtonIcon",
				hash: "67ec6ea31c949e3ec43c62093c23a54b",
				resourceItemExtension: ".png"
			}
		},
		PrepareTransferButtonIcon: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "PrepareTransferButtonIcon",
				hash: "296b691ae264a491ee33dc1b4a0d85fe",
				resourceItemExtension: ".png"
			}
		},
		PrepareTransferButtonIconDisabled: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "PrepareTransferButtonIconDisabled",
				hash: "cc7c6af7b83b123932fe96807fac1ef7",
				resourceItemExtension: ".png"
			}
		},
		CompleteTransferButtonIcon: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "CompleteTransferButtonIcon",
				hash: "2a61234d0ed599736743c4444cac4be1",
				resourceItemExtension: ".png"
			}
		},
		CancelTransferButtonIcon: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "CancelTransferButtonIcon",
				hash: "e3aedab0b8f5d98131d75af7d41723ff",
				resourceItemExtension: ".png"
			}
		},
		DtmfButtonIcon: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "DtmfButtonIcon",
				hash: "5487fe66aa9062f37abecd0d16220dc6",
				resourceItemExtension: ".png"
			}
		},
		DtmfButtonIconPressed: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "DtmfButtonIconPressed",
				hash: "9d19c7d067687533dd32602b43c744b8",
				resourceItemExtension: ".png"
			}
		},
		MuteButtonIcon: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "MuteButtonIcon",
				hash: "b3e5bffb6d2bc16e4a45b492bf5595f0",
				resourceItemExtension: ".png"
			}
		},
		MuteButtonIconDisabled: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "MuteButtonIconDisabled",
				hash: "791b5e308abd25db4fcb93e611a7ae5f",
				resourceItemExtension: ".png"
			}
		},
		VideoOffButtonIcon: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "VideoOffButtonIcon",
				hash: "63f7f06a0986665ff0dadd0f6723e29b",
				resourceItemExtension: ".png"
			}
		},
		VideoOffButtonIconDisabled: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "VideoOffButtonIconDisabled",
				hash: "ee96e839b2d583f4e955df77c509cca6",
				resourceItemExtension: ".png"
			}
		},
		UnidentifiedSubscriberPhoto: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "UnidentifiedSubscriberPhoto",
				hash: "b3617123f7934b598884f359d4e60ab8",
				resourceItemExtension: ".png"
			}
		},
		AccountIdentifiedPhoto: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "AccountIdentifiedPhoto",
				hash: "44b8025f839a70a5b69cba425188aa29",
				resourceItemExtension: ".png"
			}
		},
		ContactEmptyPhotoWhite: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "ContactEmptyPhotoWhite",
				hash: "15bd7930bfcfa8a603a3898530aac3b9",
				resourceItemExtension: ".png"
			}
		},
		ProcessActionImage: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "ProcessActionImage",
				hash: "f1c5aeaf5b59302ec9dd3264568b45ef",
				resourceItemExtension: ".png"
			}
		},
		EmptySearchResultImage: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "EmptySearchResultImage",
				hash: "af697b6a7b286114a32911475aad551c",
				resourceItemExtension: ".png"
			}
		},
		VideoOnButtonIcon: {
			source: 3,
			params: {
				schemaName: "CtiPanel",
				resourceItemName: "VideoOnButtonIcon",
				hash: "bcadee48661ad0ee65b8452f1be29fcb",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});