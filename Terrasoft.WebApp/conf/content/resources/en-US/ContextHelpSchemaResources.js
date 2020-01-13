define("ContextHelpSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ShowTips: "Show tips",
		GoToHelp: "Online help",
		AskSupport: "Need help",
		HelpToImprove: "Help improve this page",
		SupportSubject: "Question about",
		SupportEmailBodyTemplate: "body=%0D%0A%0D%0ASite:  {0}%0D%0ACustomer ID: {1}%0D%0AProduct: {2}%0D%0AVersion:  {3}%0D%0ALocalization: {4}%0D%0APage: {5}",
		FeedbackSubject: "Help us improve",
		FeedbackEmailBodyTemplate: "body=We strive for excellence and we would love to receive your feedback about this page! Do you have any ideas on how we can improve it? Please email us! Your comments and feedback are highly desired!%0D%0A%0D%0A%0D%0ASite: {0}%0D%0ACustomer ID: {1}%0D%0AProduct: {2}%0D%0AVersion: {3}%0D%0ALocalization: {4}%0D%0APage: {5}",
		AddExternalAccess: "Grant access to support",
		ExternalAccessGrantedMessage: "Access granted"
	};
	var localizableImages = {
		HelpIcon: {
			source: 3,
			params: {
				schemaName: "ContextHelpSchema",
				resourceItemName: "HelpIcon",
				hash: "bc130028e74a17b9035d74db521153b0",
				resourceItemExtension: ".svg"
			}
		},
		Support: {
			source: 3,
			params: {
				schemaName: "ContextHelpSchema",
				resourceItemName: "Support",
				hash: "5a0951c9d62985b29eacd0583fc4b498",
				resourceItemExtension: ".png"
			}
		},
		Tips: {
			source: 3,
			params: {
				schemaName: "ContextHelpSchema",
				resourceItemName: "Tips",
				hash: "3b27ebad682038b57ae79a06c16a1aa1",
				resourceItemExtension: ".png"
			}
		},
		Help: {
			source: 3,
			params: {
				schemaName: "ContextHelpSchema",
				resourceItemName: "Help",
				hash: "4b92a17c72990ca57dc99d1a0ef1f9a3",
				resourceItemExtension: ".png"
			}
		},
		Corner: {
			source: 3,
			params: {
				schemaName: "ContextHelpSchema",
				resourceItemName: "Corner",
				hash: "e41b8e7a186af022b87b3ad740f2182e",
				resourceItemExtension: ".png"
			}
		},
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "ContextHelpSchema",
				resourceItemName: "CloseIcon",
				hash: "b7f3c6c9c6bd3c7625e8ab14f9c76a13",
				resourceItemExtension: ".png"
			}
		},
		Feedback: {
			source: 3,
			params: {
				schemaName: "ContextHelpSchema",
				resourceItemName: "Feedback",
				hash: "d6204d0b1248ce867cc42bff240b4bf6",
				resourceItemExtension: ".png"
			}
		},
		ExternalAccess: {
			source: 3,
			params: {
				schemaName: "ContextHelpSchema",
				resourceItemName: "ExternalAccess",
				hash: "bf22ce850f1aabb90f65e001f000a96b",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});