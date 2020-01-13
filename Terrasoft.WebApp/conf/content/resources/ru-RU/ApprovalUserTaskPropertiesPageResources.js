define("ApprovalUserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProcessInformationText: "\u0421\u043E\u0437\u0434\u0430\u0435\u0442 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 \u0432\u0438\u0437\u0443 \u0434\u043B\u044F \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u0434\u043B\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0432\u0438\u0437\u0438\u0440\u0443\u044E\u0449\u0435\u0433\u043E (\u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A, \u0433\u0440\u0443\u043F\u043F\u0430 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432 \u0438\u043B\u0438 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C). \u041F\u0440\u0438 \u043F\u0440\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430 \u0432\u0438\u0437\u0438\u0440\u0443\u044E\u0449\u0438\u043C, \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0442\u0430\u043A\u0436\u0435 \u0431\u0443\u0434\u0435\u0442 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D \u0441 \u0442\u0435\u043C \u0436\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u043C. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022ApprovalUserTaskPropertiesPage\u0022\u003E\u041F\u0435\u0440\u0435\u0439\u0442\u0438...\u003C\/a\u003E",
		PurposeCaption: "\u0426\u0435\u043B\u044C \u0432\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F",
		ApprovalObjectCaption: "\u0420\u0430\u0437\u0434\u0435\u043B \u0432\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F",
		RecordIdCaption: "\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u043F\u0438\u0441\u0438",
		ApproverCaption: "\u041A\u043E\u043C\u0443 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043D\u0430 \u0432\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435?",
		EmployeeCaption: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E",
		EmployeeManagerCaption: "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044E \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430",
		RoleCaption: "\u0420\u043E\u043B\u0438",
		EmployeeIdCaption: "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A",
		RoleIdCaption: "\u0420\u043E\u043B\u044C",
		IsAllowedToDelegateCaption: "\u041C\u043E\u0436\u043D\u043E \u0434\u0435\u043B\u0435\u0433\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
		SectionSelectInfoButtonCaption: "\u041D\u0435\u0442 \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u0430, \u0434\u043B\u044F \u043A\u043E\u0442\u043E\u0440\u043E\u0433\u043E \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043E \u0432\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022ApprovalSectionSelectInfoButton\u0022\u003E\u041F\u0435\u0440\u0435\u0439\u0442\u0438...\u003C\/a\u003E",
		IsSendEmailToApproversCaption: "\u041E \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0432\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
		EmailTemplateCaption: "\u0428\u0430\u0431\u043B\u043E\u043D \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F",
		IsSendEmailToAuthorCaption: "\u041E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0432\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F",
		SendEmailCaption: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C e-mail \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435",
		IgnoreEmailErrorsCaption: "\u0418\u0433\u043D\u043E\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u0448\u0438\u0431\u043A\u0438 \u043F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435",
		RecipientCaption: "\u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044C \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F",
		OpenTemplateHint: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0434\u0438\u0437\u0430\u0439\u043D\u0435\u0440 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430",
		AddTemplateHint: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D email \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F",
		VisaMailboxSettings: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u043F\u043E\u0447\u0442\u043E\u0432\u044B\u0439 \u044F\u0449\u0438\u043A \u0434\u043B\u044F \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439 \u043F\u043E email. \u003Ca href=\u0022#\u0022\u003E \u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C ... \u003C\/a\u003E",
		DefaultPurpose: "\u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0443\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ApprovalUserTaskPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ApprovalUserTaskPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "ApprovalUserTaskPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "ApprovalUserTaskPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "ApprovalUserTaskPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ApprovalUserTaskPropertiesPage",
				resourceItemName: "ParameterEditToolsButtonImage",
				hash: "df03c3177a972b7f3b6987430f988ca3",
				resourceItemExtension: ".svg"
			}
		},
		OpenButtonImage: {
			source: 3,
			params: {
				schemaName: "ApprovalUserTaskPropertiesPage",
				resourceItemName: "OpenButtonImage",
				hash: "aea471c866f7ef37845aa83431c9f2d8",
				resourceItemExtension: ".png"
			}
		},
		AddButtonImage32: {
			source: 3,
			params: {
				schemaName: "ApprovalUserTaskPropertiesPage",
				resourceItemName: "AddButtonImage32",
				hash: "d30933184bec2d3279aaeda342cc0943",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});