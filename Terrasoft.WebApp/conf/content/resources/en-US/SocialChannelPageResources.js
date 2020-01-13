define("SocialChannelPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SubscribeButtonCaption: "Follow",
		UnsubscribeButtonCaption: "Unfollow",
		AllUsersPublisherRights: "All users can post",
		EditorsPublisherRights: "Only users with edit permission for this channel can post",
		PublisherRightKind: "Permission to post entries"
	};
	var localizableImages = {
		SocialChannelImage: {
			source: 3,
			params: {
				schemaName: "SocialChannelPage",
				resourceItemName: "SocialChannelImage",
				hash: "3a2f64d3488d6a622fce21b5679c1dd4",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});