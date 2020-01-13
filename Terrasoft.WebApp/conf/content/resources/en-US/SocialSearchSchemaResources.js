define("SocialSearchSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		HeaderCaption: "",
		SelectButtonCaption: "Select",
		CloseButtonCaption: "Cancel",
		SearchButtonCaption: "Search",
		SearchResultContainerCaption: "Select page",
		SearchResultCounterCaption: "Found:",
		SearchTooltip: "If you know the contact\u0027s (account\u0027s) web page, specify its link here and we will find it. This will speed up your search."
	};
	var localizableImages = {
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "SocialSearchSchema",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});