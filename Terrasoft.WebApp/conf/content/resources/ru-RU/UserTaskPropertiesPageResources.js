define("UserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SchemaCaption: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435",
		OpenSchemaButtonHintCaption: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0434\u0438\u0437\u0430\u0439\u043D\u0435\u0440 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0433\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
		ProcessInformationText: "\u0412\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u043B\u044C\u043D\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430. \u041B\u043E\u0433\u0438\u043A\u0430 \u0440\u0430\u0431\u043E\u0442\u044B \u044D\u0442\u043E\u0433\u043E \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E \u0432 \u0435\u0433\u043E \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u0430\u0445.\n\n\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u043E\u043C \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u0434\u0438\u0437\u0430\u0439\u043D\u0435\u0440\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022UserTaskPropertiesPage\u0022\u003E\u041F\u0435\u0440\u0435\u0439\u0442\u0438...\u003C\/a\u003E",
		ProcessSchemaSelectLabelCaption: "\u041A\u0430\u043A\u043E\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C?",
		ProcessParametersCaption: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430"
	};
	var localizableImages = {
		OpenButtonImage: {
			source: 3,
			params: {
				schemaName: "UserTaskPropertiesPage",
				resourceItemName: "OpenButtonImage",
				hash: "aea471c866f7ef37845aa83431c9f2d8",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "UserTaskPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "UserTaskPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "UserTaskPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "UserTaskPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "UserTaskPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "UserTaskPropertiesPage",
				resourceItemName: "ParameterEditToolsButtonImage",
				hash: "df03c3177a972b7f3b6987430f988ca3",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage32: {
			source: 3,
			params: {
				schemaName: "UserTaskPropertiesPage",
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