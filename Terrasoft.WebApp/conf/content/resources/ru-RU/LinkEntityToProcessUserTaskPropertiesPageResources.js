define("LinkEntityToProcessUserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ReferenceSchemaCaption: "\u041E\u0431\u044A\u0435\u043A\u0442 \u043F\u0440\u0438\u0432\u044F\u0437\u043A\u0438",
		ReferenceElementCaption: "\u042D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440 \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u043F\u0440\u0438\u0432\u044F\u0437\u043A\u0438",
		DisplayValueTemplate: "[#\u0421\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A.{0}.{1}#]",
		WhichRecordToConnectThisProcessCaption: "\u041A \u043A\u0430\u043A\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441?",
		EntitySchemaCaption: "\u041E\u0431\u044A\u0435\u043A\u0442 \u043F\u0440\u0438\u0432\u044F\u0437\u043A\u0438",
		EntityCaption: "\u0417\u0430\u043F\u0438\u0441\u044C \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u043F\u0440\u0438\u0432\u044F\u0437\u043A\u0438",
		ProcessInformationText: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0434\u043B\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0441\u0432\u044F\u0437\u0438 \u043C\u0435\u0436\u0434\u0443 \u044D\u043A\u0437\u0435\u043C\u043F\u043B\u044F\u0440\u043E\u043C \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u0438 \u0437\u0430\u043F\u0438\u0441\u044C\u044E \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u0441\u0438\u0441\u0442\u0435\u043C\u044B. \u042D\u0442\u043E \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C \u0441\u043F\u0438\u0441\u043E\u043A \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043D\u044B\u0445 \u0431\u0438\u0437\u043D\u0435\u0441-\u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432 \u0434\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0435, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0445 \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 [\u0416\u0443\u0440\u043D\u0430\u043B \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432]. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022LinkEntityToProcessUserTaskPropertiesPage\u0022\u003E\u041F\u0435\u0440\u0435\u0439\u0442\u0438...\u003C\/a\u003E"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "LinkEntityToProcessUserTaskPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "LinkEntityToProcessUserTaskPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "LinkEntityToProcessUserTaskPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "LinkEntityToProcessUserTaskPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "LinkEntityToProcessUserTaskPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "LinkEntityToProcessUserTaskPropertiesPage",
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