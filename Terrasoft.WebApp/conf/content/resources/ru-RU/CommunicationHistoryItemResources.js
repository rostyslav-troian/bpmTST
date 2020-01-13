define("CommunicationHistoryItemResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CreateNewContactMenuItemCaption: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442",
		CreateNewAccountMenuItemCaption: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u0430",
		AddToExistingContactMenuItemCaption: "\u0421\u0432\u044F\u0437\u0430\u0442\u044C \u0441 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u043C \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u043C",
		SelectContactLookupCaption: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0434\u043B\u044F {0}",
		ShowAllConnectionsMenuItemCaption: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435 \u0441\u0432\u044F\u0437\u0438",
		HideConnectionsMenuItemCaption: "\u0421\u043A\u0440\u044B\u0442\u044C \u0441\u0432\u044F\u0437\u0438",
		OpenCallPageCaption: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0437\u0432\u043E\u043D\u043A\u0430"
	};
	var localizableImages = {
		ContactEmptyPhotoWhite: {
			source: 3,
			params: {
				schemaName: "CommunicationHistoryItem",
				resourceItemName: "ContactEmptyPhotoWhite",
				hash: "15bd7930bfcfa8a603a3898530aac3b9",
				resourceItemExtension: ".png"
			}
		},
		AccountIdentifiedPhoto: {
			source: 3,
			params: {
				schemaName: "CommunicationHistoryItem",
				resourceItemName: "AccountIdentifiedPhoto",
				hash: "00f10b3b13faaa01558267bb1aba0ea0",
				resourceItemExtension: ".png"
			}
		},
		IncomingCallIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationHistoryItem",
				resourceItemName: "IncomingCallIcon",
				hash: "6fa81ad2384cceb98713bad0f36f1e18",
				resourceItemExtension: ".png"
			}
		},
		MissedIconCall: {
			source: 3,
			params: {
				schemaName: "CommunicationHistoryItem",
				resourceItemName: "MissedIconCall",
				hash: "8eadbcca894857eb4da08630ac38171c",
				resourceItemExtension: ".png"
			}
		},
		OutgoingCallIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationHistoryItem",
				resourceItemName: "OutgoingCallIcon",
				hash: "de44763221de6d0821843ea2fafe01e6",
				resourceItemExtension: ".png"
			}
		},
		MakeCallButtonIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationHistoryItem",
				resourceItemName: "MakeCallButtonIcon",
				hash: "dbdfa61770f25fbbb2ad9a71e89a7995",
				resourceItemExtension: ".png"
			}
		},
		CreateLinkButtonIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationHistoryItem",
				resourceItemName: "CreateLinkButtonIcon",
				hash: "6ab99bc70e41a1c9bcbe98b80bf8d925",
				resourceItemExtension: ".png"
			}
		},
		ContactFieldIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationHistoryItem",
				resourceItemName: "ContactFieldIcon",
				hash: "c593697eed60e7b18ad0ea82ba70a2a9",
				resourceItemExtension: ".png"
			}
		},
		AccountFieldIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationHistoryItem",
				resourceItemName: "AccountFieldIcon",
				hash: "c6fc2d9002b679f76d373c6eaca58c44",
				resourceItemExtension: ".png"
			}
		},
		ActivityFieldIcon: {
			source: 3,
			params: {
				schemaName: "CommunicationHistoryItem",
				resourceItemName: "ActivityFieldIcon",
				hash: "f0a0d61f8a9a0f6db479fce84cd33643",
				resourceItemExtension: ".png"
			}
		},
		ContactAnonymousPhoto: {
			source: 3,
			params: {
				schemaName: "CommunicationHistoryItem",
				resourceItemName: "ContactAnonymousPhoto",
				hash: "105dddb6ec1558d80507602dd3597953",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});