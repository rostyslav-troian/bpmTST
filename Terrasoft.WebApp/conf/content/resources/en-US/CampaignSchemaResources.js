define("CampaignSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		TypeCaption: "Campaign",
		PropertiesPageCaption: "Campaign",
		LoopWithoutDelayedTransitionsMessage: "You are about to save a campaign with an unconditional closed-cycle diagram. Use a \u201CCondition flow\u201D to connect campaign elements in the cycle and enable a delay before executing the next element. If you save and run this campaign without changes, flow logic could be broken."
	};
	var localizableImages = {
		TitleImage: {
			source: 3,
			params: {
				schemaName: "CampaignSchema",
				resourceItemName: "TitleImage",
				hash: "250b65bf36d8c9183b58add1d270a7fb",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});