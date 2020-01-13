define("CaseRatingFeedbackPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddCommentHint: "We are always looking at improving the quality of our services, so if you could provide us with some details and leave a comment that would be greatly appreciated!",
		AddCommentCaption: "Comment",
		PostButtonCaption: "Post comment",
		PostCommentSuccess: "Comment was successfully added",
		PostCommentFailed: "An error occurred. Comment wasn\u0027t added.",
		ThanksMessage: "Your feedback has been received. Thank you!",
		CommentIsEmpty: "Comment text is empty!"
	};
	var localizableImages = {
		Background: {
			source: 3,
			params: {
				schemaName: "CaseRatingFeedbackPage",
				resourceItemName: "Background",
				hash: "4d975241dd7e63a68a09ad59ca3f38ef",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});