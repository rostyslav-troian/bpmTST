define("FindContactsInSocialNetworksModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CloseButtonCaption: "Cancel",
		ViewButtonCaption: "View",
		CreateNewContactButtonCaption: "Create contact",
		FindButtonCaption: "Search",
		AllSocialNetworksCaption: "All results",
		SocialAccountColCaption: "Username",
		SocialMediaColCaption: "Social network",
		SearchEditLabelCaption: "Search in social networks",
		FilterSocialNetworksLabelCaption: "Filter search results by social networks",
		ResultsLabelCaption: "Search results",
		OKButtonCaption: "Select",
		SocialNetworkAuthError: "Unable to retrieve social network data. Log in to ",
		SocialNetworkError: "Unable to retrieve social network data ",
		InfoCaption: "Information",
		WindowCaption: "Find contacts in social networks",
		SocialNetworksError: "Unable to retrieve social network data. Log in to "
	};
	var localizableImages = {
		facebookimg: {
			source: 3,
			params: {
				schemaName: "FindContactsInSocialNetworksModule",
				resourceItemName: "facebookimg",
				hash: "986941b1c64996f2937ed971b927da51",
				resourceItemExtension: ".png"
			}
		},
		twitterimg: {
			source: 3,
			params: {
				schemaName: "FindContactsInSocialNetworksModule",
				resourceItemName: "twitterimg",
				hash: "8a35f2fdd09288dad79f97f2eadc74e6",
				resourceItemExtension: ".png"
			}
		},
		linkedinimg: {
			source: 3,
			params: {
				schemaName: "FindContactsInSocialNetworksModule",
				resourceItemName: "linkedinimg",
				hash: "a912b4ec84c1c51b934816b0418dda52",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});