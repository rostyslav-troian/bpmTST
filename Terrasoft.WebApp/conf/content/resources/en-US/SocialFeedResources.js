define("SocialFeedResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SortCreatedOn: "Sort by message date",
		SortLastActionOn: "Sort by date of last activity",
		Publish: "Publish",
		SelectChannelHint: "Select channel",
		WritePostHint: "What are you working on?",
		ShowMoreThanOneNewSocialMessages: "Show {0} new messages",
		ShowNewSocialMessage: "Show 1 new message",
		WritePostMessage: "Write message text",
		SelectChannelMessage: "Select channel for posting",
		CurrentChannelHint: "Current channel",
		ConfigurationButtonHint: "Configuration button"
	};
	var localizableImages = {
		Sort: {
			source: 3,
			params: {
				schemaName: "SocialFeed",
				resourceItemName: "Sort",
				hash: "a5df3ed1d5e5511e3e23dc1875cc8769",
				resourceItemExtension: ".png"
			}
		},
		More: {
			source: 3,
			params: {
				schemaName: "SocialFeed",
				resourceItemName: "More",
				hash: "ae1115e7aff85993009915dcbf9e87ee",
				resourceItemExtension: ".png"
			}
		},
		DefaultCreatedBy: {
			source: 3,
			params: {
				schemaName: "SocialFeed",
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