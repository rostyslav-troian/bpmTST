define("SendEmailUserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SenderCaption: "Who is the sender?",
		RecepientCaption: "To",
		CopyRecepientCaption: "CC",
		BlindCopyRecepientCaption: "Bcc",
		LowMailImportanceCaption: "Low",
		NormalMailImportanceCaption: "Medium",
		HighMailImportanceCaption: "High",
		ImportanceCaption: "Importance",
		SubjectCaption: "Subject",
		IsIgnoreErrorsCaption: "Ignore email errors",
		RecipientCaption: "Who is the recipient?",
		WhatMessageSendRegionCaption: "What is the message?",
		SenderInformationText: "Hint",
		ProcessInformationText: "Automatically sends email with the specified subject, text, sender and recipient addresses.To open the email page for the user before sending email, use the [Write email] element. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022SendEmailUserTaskPropertiesPage\u0022\u003ERead more...\u003C\/a\u003E"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "SendEmailUserTaskPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "SendEmailUserTaskPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "SendEmailUserTaskPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "SendEmailUserTaskPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "SendEmailUserTaskPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "SendEmailUserTaskPropertiesPage",
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