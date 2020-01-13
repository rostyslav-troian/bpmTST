define("ChangeAdminRightsUserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		RecommendationCaption: "\u0414\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u043A\u0430\u043A\u043E\u0433\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0440\u0430\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430?",
		FilterLabelCaption: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u043D\u0430 \u0432\u0441\u0435 \u0437\u0430\u043F\u0438\u0441\u0438, \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044E",
		AddRightsLabelCaption: "\u041A\u0430\u043A\u0438\u0435 \u043F\u0440\u0430\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C?",
		DeleteRightsLabelCaption: "\u041A\u0430\u043A\u0438\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0431\u0440\u0430\u0442\u044C?",
		RightsHeaderLabelCaption: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \/ \u0420\u043E\u043B\u044C",
		MoveUpMenuItemCaption: "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u0432\u0435\u0440\u0445",
		MoveDownMenuItemCaption: "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u043D\u0438\u0437",
		AllUsersItemMenuCaption: "\u0414\u043B\u044F \u0432\u0441\u0435\u0445 \u0440\u043E\u043B\u0435\u0439 \u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439",
		RoleItemMenuCaption: "\u0414\u043B\u044F \u0440\u043E\u043B\u0438",
		EmployeeItemMenuCaption: "\u0414\u043B\u044F \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430",
		DataSourceFilterItemMenuCaption: "\u0414\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u043A\u0438 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432",
		ChangeEntitySchemaSelectButtonCaption: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",
		ChangeEntitySchemaSelectWarningMessage: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u043C\u0435\u043D\u044F\u0442\u044C \u043E\u0431\u044A\u0435\u043A\u0442? \u0412\u0441\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u0435\u0439 \u0438 \u0444\u0438\u043B\u044C\u0442\u0440\u044B \u0431\u0443\u0434\u0443\u0442 \u043F\u043E\u0442\u0435\u0440\u044F\u043D\u044B.",
		ReadImageTitle: "\u0427\u0442\u0435\u043D\u0438\u0435",
		EditImageTitle: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
		DeleteImageTitle: "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435",
		EmptyRightsMessage: "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445",
		FilterInformationText: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u0438 \u043D\u0435 \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C\u0438",
		FilterInvalidMessage: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0444\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u0438 \u043D\u0435 \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C\u0438",
		ProcessInformationText: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u0430\u0432 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0437\u0430\u043F\u0438\u0441\u044F\u043C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0432 \u0445\u043E\u0434\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022ChangeAdminRightsUserTaskPropertiesPage\u0022\u003E\u041F\u0435\u0440\u0435\u0439\u0442\u0438...\u003C\/a\u003E"
	};
	var localizableImages = {
		ReadImage: {
			source: 3,
			params: {
				schemaName: "ChangeAdminRightsUserTaskPropertiesPage",
				resourceItemName: "ReadImage",
				hash: "9dc688c941c704118a142509ce11b828",
				resourceItemExtension: ".svg"
			}
		},
		EditImage: {
			source: 3,
			params: {
				schemaName: "ChangeAdminRightsUserTaskPropertiesPage",
				resourceItemName: "EditImage",
				hash: "75a71305408bcad3e962e4140ded181e",
				resourceItemExtension: ".svg"
			}
		},
		DeleteImage: {
			source: 3,
			params: {
				schemaName: "ChangeAdminRightsUserTaskPropertiesPage",
				resourceItemName: "DeleteImage",
				hash: "44eb99cfc918ebe3431ac73b384f81d6",
				resourceItemExtension: ".svg"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ChangeAdminRightsUserTaskPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ChangeAdminRightsUserTaskPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "ChangeAdminRightsUserTaskPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "ChangeAdminRightsUserTaskPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "ChangeAdminRightsUserTaskPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ChangeAdminRightsUserTaskPropertiesPage",
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