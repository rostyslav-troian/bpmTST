define("FacebookSearchSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		HeaderCaption: "Search on Facebook",
		ResultGridNameCaption: "Name",
		ResultGridCategoryCaption: "Category",
		ResultGridWebCaption: "Web",
		ResultGridPhoneCaption: "Phone",
		ResultGridCountryCaption: "Country",
		ResultGridCityCaption: "City",
		SearchTooltip: "Specify a link to the contact\u2019s Facebook page.",
		SearchFacebookButtonCaption: "Search on Facebook",
		SearchHelpText: "Due to changes in Facebook privacy policy, searching for a user profile by unique page name is unavailable for third-party applications. If the link to the Facebook profile of the account does not have a numeric user ID, the profile will not be displayed among the search results."
	};
	var localizableImages = {
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "FacebookSearchSchema",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		},
		SearchFacebookButtonImage: {
			source: 3,
			params: {
				schemaName: "FacebookSearchSchema",
				resourceItemName: "SearchFacebookButtonImage",
				hash: "ec03a6057074201cb090322259388188",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});