define("AccountFacebookSearchSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SearchTooltip: "Specify a link to the account\u2019s Facebook page."
	};
	var localizableImages = {
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "AccountFacebookSearchSchema",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		},
		SearchFacebookButtonImage: {
			source: 3,
			params: {
				schemaName: "AccountFacebookSearchSchema",
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