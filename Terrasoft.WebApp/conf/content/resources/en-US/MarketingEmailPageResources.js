define("MarketingEmailPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SenderNameCaption: "Sender\u0027s name",
		SenderEmailCaption: "Sender\u0027s email",
		SubjectCaption: "Subject",
		MarketingEmailText: "Which trigger email to send?",
		ClearOutgoingsQuestion: "On email template selection, click-links transfer condition will be turned off in elements:\n{0}.",
		ClearOutgoingsQuestionTitle: "Proceed with template selection?",
		HasParticipantsMessage: "There are {0} participants on current step, template change will break response condition in outgoing flows for these participants.",
		ProcessInformationText: "Use the bulk email sending element as part of a campaign. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022CampaignMarketingEmailElement\u0022 target=\u0022_blank\u0022\u003ELearn more\u003C\/a\u003E"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "MarketingEmailPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailPage",
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