define("ESNFeedModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SortCreatedOn: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u0434\u0430\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F",
		SortLastActionOn: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u0434\u0430\u0442\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
		SelectChannelHint: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u043D\u0430\u043B",
		Publish: "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C",
		Comments: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438",
		HideComments: "\u0421\u043A\u0440\u044B\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438",
		ShowComments: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0435 {0} \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432",
		Send: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		Cancel: "\u041E\u0442\u043C\u0435\u043D\u0430",
		WriteComment: "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439",
		SelectChannelMessage: "\u0414\u043B\u044F \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u043D\u0430\u043B",
		WritePostMessage: "\u0414\u043B\u044F \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0447\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C",
		WritePostHint: "\u041D\u0430\u0434 \u0447\u0435\u043C \u0432\u044B \u0441\u0435\u0439\u0447\u0430\u0441 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442\u0435?",
		FeedCaption: "\u041B\u0435\u043D\u0442\u0430",
		LikedUsersContainerCaption: "\u041B\u044E\u0434\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u044D\u0442\u043E \u043D\u0440\u0430\u0432\u0438\u0442\u0441\u044F",
		CloseLikedUsersContainerButton: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
		EditPostComment: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",
		ShowNewSocialMessage: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C 1 \u043D\u043E\u0432\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435",
		ShowMoreThanOneNewSocialMessages: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C {0} \u043D\u043E\u0432\u044B\u0445 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439",
		HideCommentsShort: "\u0421\u043A\u0440\u044B\u0442\u044C",
		ShowCommentsShort: "\u0415\u0449\u0435 ({0})",
		SocialChannelCaption: "\u041A\u0430\u043D\u0430\u043B\u044B",
		PublishInCaption: "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C \u0432: {0}",
		DeleteConfirmationMessage: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442?",
		LikeButtonCaption: "\u041D\u0440\u0430\u0432\u0438\u0442\u0441\u044F",
		UnLikeButtonCaption: "\u041D\u0435 \u043D\u0440\u0430\u0432\u0438\u0442\u0441\u044F",
		DeletePostComment: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
		CreatedByToEntity: "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043B(\u0430) \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0432",
		CreatedBy: "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043B(\u0430) \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435",
		MaxMessagesNumberPerSearchIterationReached: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0441\u0440\u0435\u0434\u0438 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0445 {0} \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0445. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A \u043F\u043E \u0431\u043E\u043B\u0435\u0435 \u0440\u0430\u043D\u043D\u0438\u043C \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044F\u043C?",
		ViewModuleUrl: "ViewModule.aspx#",
		InsertMessageError: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u043B\u0435\u043D\u0442\u044B",
		RightsErrorMessage: "\u0423 \u0432\u0430\u0441 \u043D\u0435\u0442 \u043F\u0440\u0430\u0432 \u043D\u0430 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F. \u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u043A \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u043C\u0443 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0443."
	};
	var localizableImages = {
		Comment: {
			source: 3,
			params: {
				schemaName: "ESNFeedModule",
				resourceItemName: "Comment",
				hash: "864a81e961a89c70d635b0e837e4c648",
				resourceItemExtension: ".png"
			}
		},
		Like: {
			source: 3,
			params: {
				schemaName: "ESNFeedModule",
				resourceItemName: "Like",
				hash: "996bb45730f1a7fffbfc1b56cf26b48f",
				resourceItemExtension: ".png"
			}
		},
		Empty: {
			source: 3,
			params: {
				schemaName: "ESNFeedModule",
				resourceItemName: "Empty",
				hash: "4d56cebebf22614808a51428798f37be",
				resourceItemExtension: ".png"
			}
		},
		Sort: {
			source: 3,
			params: {
				schemaName: "ESNFeedModule",
				resourceItemName: "Sort",
				hash: "a5df3ed1d5e5511e3e23dc1875cc8769",
				resourceItemExtension: ".png"
			}
		},
		Liked: {
			source: 3,
			params: {
				schemaName: "ESNFeedModule",
				resourceItemName: "Liked",
				hash: "818fd862560a51354036ff887121fc4b",
				resourceItemExtension: ".png"
			}
		},
		NoChannel: {
			source: 3,
			params: {
				schemaName: "ESNFeedModule",
				resourceItemName: "NoChannel",
				hash: "3a2f64d3488d6a622fce21b5679c1dd4",
				resourceItemExtension: ".png"
			}
		},
		Arrow: {
			source: 3,
			params: {
				schemaName: "ESNFeedModule",
				resourceItemName: "Arrow",
				hash: "18703dc25ec8f33a94e3a98a202e69c8",
				resourceItemExtension: ".png"
			}
		},
		Delete: {
			source: 3,
			params: {
				schemaName: "ESNFeedModule",
				resourceItemName: "Delete",
				hash: "ae263b925f914f98cfb4df6522c5ce62",
				resourceItemExtension: ".png"
			}
		},
		Edit: {
			source: 3,
			params: {
				schemaName: "ESNFeedModule",
				resourceItemName: "Edit",
				hash: "1a8cac2a009d23631e012ce030735173",
				resourceItemExtension: ".png"
			}
		},
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "ESNFeedModule",
				resourceItemName: "CloseIcon",
				hash: "d83fcc9d4e31559d6f903a11f6d528bd",
				resourceItemExtension: ".png"
			}
		},
		PublishButton: {
			source: 3,
			params: {
				schemaName: "ESNFeedModule",
				resourceItemName: "PublishButton",
				hash: "990c2489baa1946eb4c3f44b827803df",
				resourceItemExtension: ".png"
			}
		},
		More: {
			source: 3,
			params: {
				schemaName: "ESNFeedModule",
				resourceItemName: "More",
				hash: "ae1115e7aff85993009915dcbf9e87ee",
				resourceItemExtension: ".png"
			}
		},
		ESNFeedDataViewIcon: {
			source: 3,
			params: {
				schemaName: "ESNFeedModule",
				resourceItemName: "ESNFeedDataViewIcon",
				hash: "a7c84fe2f715bd579f6e51a0e0e840f3",
				resourceItemExtension: ".png"
			}
		},
		SocialChannelDataViewIcon: {
			source: 3,
			params: {
				schemaName: "ESNFeedModule",
				resourceItemName: "SocialChannelDataViewIcon",
				hash: "a7c84fe2f715bd579f6e51a0e0e840f3",
				resourceItemExtension: ".png"
			}
		},
		DefaultCreatedBy: {
			source: 3,
			params: {
				schemaName: "ESNFeedModule",
				resourceItemName: "DefaultCreatedBy",
				hash: "b2f272c14dcf6738d8f57e99db37dcda",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});