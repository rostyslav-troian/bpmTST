define("ProcessSchemaPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		VersionCaption: "\u0412\u0435\u0440\u0441\u0438\u044F",
		ParametersCaption: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B",
		ParameterNameCaption: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
		ParameterTypeCaption: "\u0422\u0438\u043F \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F",
		EditButtonCaption: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",
		DeleteButtonCaption: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
		CancelModuleButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",
		SaveModuleButtonCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		IsRequiredCaption: "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440",
		ParameterLookupCaption: "\u0421\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A",
		TitleCaption: "\u041F\u0440\u043E\u0446\u0435\u0441\u0441",
		UseForceCompileCaption: "\u041A\u043E\u043C\u043F\u0438\u043B\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		OtherMenuItemCaption: "\u0414\u0440\u0443\u0433\u043E\u0435",
		TagCaption: "\u0422\u0435\u0433",
		UsingsGroupCaption: "Usings",
		MethodsTabCaption: "\u041C\u0435\u0442\u043E\u0434\u044B",
		ProcessMethodsCaption: "\u041C\u0435\u0442\u043E\u0434\u044B",
		CompiledProcessMethodsCaption: "\u041C\u0435\u0442\u043E\u0434\u044B \u0434\u043B\u044F \u043A\u043E\u043C\u043F\u0438\u043B\u0438\u0440\u0443\u0435\u043C\u043E\u0433\u043E \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 (\u0443\u0441\u0442\u0430\u0440\u0435\u0432\u0448\u0438\u0439)",
		ProcessInformationText: "\u041D\u0430 \u0432\u043A\u043B\u0430\u0434\u043A\u0435 \u00AB\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438\u00BB \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u0430 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430, \u0442\u0430\u043A\u0438\u0435 \u043A\u0430\u043A \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A, \u043A\u043E\u0434, \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u044C \u0436\u0443\u0440\u043D\u0430\u043B\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u0438 \u0442.\u043F.\n\u041D\u0430 \u0432\u043A\u043B\u0430\u0434\u043A\u0435 \u00AB\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B\u00BB \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430 \u0434\u043B\u044F \u043E\u0431\u043C\u0435\u043D\u0430 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0435\u0439 \u043C\u0435\u0436\u0434\u0443 \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u043C\u0438 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430\u043C\u0438 \u0438\u043B\u0438 \u043C\u0435\u0436\u0434\u0443 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u043C\u0438 \u0432 \u0440\u0430\u043C\u043A\u0430\u0445 \u043E\u0434\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430. \n\u041D\u0430 \u0432\u043A\u043B\u0430\u0434\u043A\u0435 \u00AB\u041C\u0435\u0442\u043E\u0434\u044B\u00BB \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043C\u043E\u0436\u0435\u0442 \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u043D\u044B\u0435 \u043C\u0435\u0442\u043E\u0434\u044B \u0434\u043B\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022ProcessSchemaPropertiesPage\u0022\u003E\u041F\u0435\u0440\u0435\u0439\u0442\u0438...\u003C\/a\u003E",
		DescriptionCaption: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430",
		NotificationCaption: ""
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessSchemaPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessSchemaPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessSchemaPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessSchemaPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "ProcessSchemaPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessSchemaPropertiesPage",
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