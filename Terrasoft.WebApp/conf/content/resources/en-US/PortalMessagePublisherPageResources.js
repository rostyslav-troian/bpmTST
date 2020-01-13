define("PortalMessagePublisherPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WritePortalPostHint: "Your message will be published on the portal",
		WritePortalPostHintOnPortal: "Leave a message for the Support Team",
		DraftBodyMessage: "DRAFT",
		PortalMaskCaption: "Message is published",
		OversizedFilesErrorMessage: "These files wasn\u0027t uploaded in case of maximum file size ({0} Mb) restrictions: {1}",
		EmptyMessageError: "Message is empty"
	};
	var localizableImages = {
		ToolbarVisibilityButtonImage: {
			source: 3,
			params: {
				schemaName: "PortalMessagePublisherPage",
				resourceItemName: "ToolbarVisibilityButtonImage",
				hash: "e00cdf2dfbf00fac7b8837a2e9227aef",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});