define("CampaignDiagramPropertyQuitPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		InfoCaption: "Participants who get to this step are those who have exited the campaign without reaching the target. You can also map this step to a folder. Any participants in the folder (i.e. unsubscribers or non-target users) will be treated as those who have exited the campaign."
	};
	var localizableImages = {
		InfoImage: {
			source: 3,
			params: {
				schemaName: "CampaignDiagramPropertyQuitPage",
				resourceItemName: "InfoImage",
				hash: "6ff5d6ce982448c1ed328c95a246a593",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});