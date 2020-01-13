define("ESNFeedModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SortCreatedOn: "Sort by message date",
		SortLastActionOn: "Sort by date of last activity",
		SelectChannelHint: "Select channel",
		Publish: "Publish",
		Comments: "Comments",
		HideComments: "Hide comments",
		ShowComments: "Show next {0} comments",
		Send: "Comment",
		Cancel: "Cancel",
		WriteComment: "Write comment",
		SelectChannelMessage: "Select channel for posting",
		WritePostMessage: "Write message text",
		WritePostHint: "What are you working on?",
		FeedCaption: "Feed",
		LikedUsersContainerCaption: "People who liked this",
		CloseLikedUsersContainerButton: "Close",
		EditPostComment: "Edit",
		ShowNewSocialMessage: "Show 1 new message",
		ShowMoreThanOneNewSocialMessages: "Show {0} new messages",
		HideCommentsShort: "Hide",
		ShowCommentsShort: "More ({0})",
		SocialChannelCaption: "Channels",
		PublishInCaption: "Publish in: {0}",
		DeleteConfirmationMessage: "Are you sure that you want to delete the selected item?",
		LikeButtonCaption: "Like",
		UnLikeButtonCaption: "Unlike",
		DeletePostComment: "Delete",
		CreatedByToEntity: "posted in",
		CreatedBy: "posted",
		MaxMessagesNumberPerSearchIterationReached: "The message was not found among {0} recently posted messages. Load earlier messages?",
		ViewModuleUrl: "ViewModule.aspx#",
		InsertMessageError: "Error while saving feed post",
		RightsErrorMessage: "Insufficient rights to perform this action. Contact your system administrator."
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