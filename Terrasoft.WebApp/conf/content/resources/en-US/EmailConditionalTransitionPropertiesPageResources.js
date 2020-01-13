define("EmailConditionalTransitionPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ReactionModeCaption: "What is the result of the {0} step?",
		ReactionModeDefault: "Transfer participants regardless of their response",
		ReactionModeWithCondition: "Set up responses for transferring participants",
		IsEmailDelivered: "Email delivered",
		IsEmailOpened: "Email opened",
		IsUrlClicked: "Email clicked",
		IsEmailPuttedToSpam: "Spam complaint",
		IsRecipientUnsubscribed: "Recipient unsubscribed",
		IsEmailUndelivered: "Email not delivered",
		TransitionUrlCaption: "URL",
		NoHyperlinkHintMessage: "Selected trigger email does not contain links or links are incorrect"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailConditionalTransitionPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailConditionalTransitionPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailConditionalTransitionPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailConditionalTransitionPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "EmailConditionalTransitionPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "EmailConditionalTransitionPropertiesPage",
				resourceItemName: "ParameterEditToolsButtonImage",
				hash: "df03c3177a972b7f3b6987430f988ca3",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});