define("SocialMessagePublisherPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WritePostHint: "Your post will only be visible to internal users",
		SocialMaskCaption: "Post is published to feed",
		WritePostHintOnPortal: "Write your question and press PUBLISH",
		TemplateButtonCaption: "Templates",
		SetupTemplates: "Setup Templates"
	};
	var localizableImages = {
		DefaultCreatedBy: {
			source: 3,
			params: {
				schemaName: "SocialMessagePublisherPage",
				resourceItemName: "DefaultCreatedBy",
				hash: "5908a740e26cbd298188a29593c46436",
				resourceItemExtension: ".png"
			}
		},
		TemplateButtonImage: {
			source: 3,
			params: {
				schemaName: "SocialMessagePublisherPage",
				resourceItemName: "TemplateButtonImage",
				hash: "2b29f6cfff6ba8867648243b5d87ce57",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});