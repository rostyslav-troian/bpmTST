define("MobileFeedListResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MobileFeedListMessageTodayFormat: " {0} h",
		MobileFeedListMessageYesterdayFormat: "Yesterday at {0}",
		MobileFeedListMessageDateFormat: " {0} at {1}",
		MobileFeedListMessageMinutesFormat: " {0} min",
		MobileFeedListMessageBeforeYesterdayFormat: "The day before yesterday at {0}",
		MobileFeedListItemLikeCountLabel: "Likes",
		MobileFeedListItemCommentCountLabel: "Comments",
		MobileFeedListItemCommentButtonCaption: "Comment",
		MobileFeedListItemLikeButtonCaption: "Like",
		MobileFeedListDotSeparator: "\u2022",
		MobileFeedListReadMoreLabel: "Continue reading"
	};
	var localizableImages = {
		IconArrowDownGray: {
			source: 3,
			params: {
				schemaName: "MobileFeedList",
				resourceItemName: "IconArrowDownGray",
				hash: "ebb55cd796e9911aa509972d2ae19a9e",
				resourceItemExtension: ".png"
			}
		},
		LikeIcon: {
			source: 3,
			params: {
				schemaName: "MobileFeedList",
				resourceItemName: "LikeIcon",
				hash: "016b7b8a36096f8b1fac675b92b9b050",
				resourceItemExtension: ".png"
			}
		},
		LikeIconPressed: {
			source: 3,
			params: {
				schemaName: "MobileFeedList",
				resourceItemName: "LikeIconPressed",
				hash: "fa54eece3689269671626ebf5a238179",
				resourceItemExtension: ".png"
			}
		},
		CommentIcon: {
			source: 3,
			params: {
				schemaName: "MobileFeedList",
				resourceItemName: "CommentIcon",
				hash: "ed362d51a03af473715af685f4e1360e",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});