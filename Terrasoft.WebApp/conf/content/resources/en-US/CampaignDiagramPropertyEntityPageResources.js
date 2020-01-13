define("CampaignDiagramPropertyEntityPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PageAudienceDescription: "Contacts added to the audience of the campaign. The participants start their path to the campaign goal at this stage.",
		PageTargetDescription: "Campaign goal. The participants who reached campaign goal will enter this stage.",
		PageExitingDescription: "Campaign exit.\nThe participants who have exited campaign without reaching the goal will enter this stage.",
		PageAudienceIconId: "F4FABDD0-FEF9-4A38-BA6E-0F0CC3A08C62",
		PageTargetIconId: "027D97DA-F250-46F4-ABA2-AD0272F9EF2B",
		PageExitingIconId: "72F60A8A-2696-4E5D-9BA8-DA85ADCD3388",
		PageConnectorIconId: "A8E11C00-7E80-46C8-9F2F-1DAE8F47DD41",
		PageBulkEmailIconId: "31A8F6FE-95DE-4918-B552-929D5A45AE0F",
		PageEventIconId: "2C59B521-535C-49B8-8C70-6E7489B519E7",
		PageAudienceCaption: "Participants"
	};
	var localizableImages = {
		InfoImage: {
			source: 3,
			params: {
				schemaName: "CampaignDiagramPropertyEntityPage",
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