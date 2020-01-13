define("MobileFeedListResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MobileFeedListMessageTodayFormat: " {0} \u0447",
		MobileFeedListMessageYesterdayFormat: "\u0412\u0447\u0435\u0440\u0430 \u0432 {0}",
		MobileFeedListMessageDateFormat: " {0} \u0432 {1}",
		MobileFeedListMessageMinutesFormat: " {0} \u043C\u0438\u043D",
		MobileFeedListMessageBeforeYesterdayFormat: "\u041F\u043E\u0437\u0430\u0432\u0447\u0435\u0440\u0430 \u0432 {0}",
		MobileFeedListItemLikeCountLabel: "\u041D\u0440\u0430\u0432\u0438\u0442\u0441\u044F",
		MobileFeedListItemCommentCountLabel: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0435\u0432",
		MobileFeedListItemCommentButtonCaption: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439",
		MobileFeedListItemLikeButtonCaption: "\u041D\u0440\u0430\u0432\u0438\u0442\u0441\u044F",
		MobileFeedListDotSeparator: "\u2022",
		MobileFeedListReadMoreLabel: "\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435"
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