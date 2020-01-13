define("CtiPanelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ConnectionConfigEmptyError: "Unable to receive telephony connection parameters. Set up parameters in the \u0022Call center parameters setup\u0022 menu of the user profile",
		AccountNameLabelCaption: "Account",
		JobLabelCaption: "Job title",
		AccountTypeLabelCaption: "Type",
		CityLabelCaption: "City",
		CallDurationLabelCaption: "Duration:",
		DepartmentLabelCaption: "Department",
		NumberLabelCaption: "Number",
		AnswerButtonHint: "Answer call",
		DropButtonHint: "End call",
		HoldButtonHint: "Put on hold",
		UnholdButtonHint: "Unhold",
		PrepareTransferButtonHint: "Transfer",
		CompleteTransferButtonHint: "Transfer",
		CancelTransferButtonHint: "Cancel transfer",
		CompleteTransferTip: "Click to transfer",
		DtmfButtonHint: "Dial panel",
		MuteButtonHint: "Sound off",
		UnmuteButtonHint: "Sound on",
		VideoOnButtonHint: "Video on",
		VideoOffButtonHint: "Video off",
		IdentificationItemsControlGroupCaption: "Search results",
		SubscriberPanelNotFoundExceptionMessage: "Unable to find identified subscriber panel by the \u0027{0}\u0027 Id",
		ProcessActionsGroupCaption: "Processes",
		SelectAnotherSubscriberCaption: "Select another record",
		IdentificationSavingMessage: "Saving call id: \u0027{0}\u0027",
		IdentificationFieldSavingMessage: "Field \u0027{0}\u0027, value \u0027{1}\u0027",
		IdentificationSavedSuccessfullyMessage: "action completed successfully",
		IdentificationSavedFailedMessage: "error while performing action",
		PhoneNumberCantBeEmptyMessage: "The \u0022Number\u0022 field can not be empty",
		EmptySearchResultMessage: "There are no records matching your search criteria.",
		VideoNotSupportedMessage: "Your browser does not support video playback",
		EmptyHistoryMessage: "Make free voice calls to other users or setup connector to your existing telephone system.\n\u003C\/br\u003E\u003C\/br\u003E\nLearn more about using calls from the {0}Academy{1}.",
		EmptyHistoryTitleLabel: "Seems that you have not made any calls yet",
		NotConnectedMessage: "Telephony is not available",
		NoConnectionToTelephonyErrorMessage: "Phone server connection is unavailable. Please ensure that connection parameters are set up and that the server is online.",
		DemoNoConnectionMessageCaption: "The ability to make calls is unavailable in the demo version.",
		DemoNoConnectionLinkCaption: "30 day free trial",
		DemoNoConnectionLinkUrlBeginning: "https:\/\/www.bpmonline.com\/trial?product=en-",
		PhoneNumberPlaceholderCaption: "Whom you want to call?"
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