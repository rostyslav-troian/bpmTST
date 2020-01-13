define("WebServiceUserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ServiceSchemaEnumCaption: "\u041A\u0430\u043A\u043E\u0439 \u0441\u0435\u0440\u0432\u0438\u0441 \u0432\u044B\u0437\u044B\u0432\u0430\u0442\u044C?",
		WebServiceRequestParametersCaption: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0432\u044B\u0437\u043E\u0432\u0430",
		ServiceMethodEnumCaption: "\u041A\u0430\u043A\u043E\u0439 \u043C\u0435\u0442\u043E\u0434 \u0432\u044B\u0437\u044B\u0432\u0430\u0442\u044C?",
		ServiceMethodsEmptyListPlaceholder: "\u041D\u0435\u0442 \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u043E\u0433\u043E \u043C\u0435\u0442\u043E\u0434\u0430",
		ServiceSchemasEmptyListPlaceholder: "\u041D\u0435\u0442 \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u043E\u0433\u043E \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441\u0430",
		AddSchemaButtonHintCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441",
		OpenSchemaButtonHintCaption: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441\u0430",
		ChangeButtonCaption: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",
		ChangeServiceMethodWarningMessage: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043C\u0435\u0442\u043E\u0434 \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441\u0430? \u0412\u0441\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B  \u0431\u0443\u0434\u0443\u0442 \u043F\u043E\u0442\u0435\u0440\u044F\u043D\u044B.",
		WebServiceMethodEmptyParametersMessage: "\u0414\u043B\u044F \u043C\u0435\u0442\u043E\u0434\u0430 \u043D\u0435 \u0437\u0430\u0434\u0430\u043D\u044B \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0437\u0430\u043F\u0440\u043E\u0441\u0430",
		ChangeServiceWarningMessage: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441? \u0412\u0441\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B  \u0431\u0443\u0434\u0443\u0442 \u043F\u043E\u0442\u0435\u0440\u044F\u043D\u044B.",
		RequestTimeout: "\u041C\u0430\u043A\u0441. \u0432\u0440\u0435\u043C\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F, \u0432 \u0441\u0435\u043A\u0443\u043D\u0434\u0430\u0445",
		RequestTimeoutPlaceholder: "\u041F\u043E-\u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E ({0} \u0441\u0435\u043A)",
		ProcessInformationText: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0434\u043B\u044F \u0432\u044B\u0437\u043E\u0432\u0430 \u0432\u043D\u0435\u0448\u043D\u0438\u0445 \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441\u043E\u0432. \u0427\u0442\u043E\u0431\u044B \u0432\u044B\u0437\u0432\u0430\u0442\u044C \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441, \u0435\u0433\u043E \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u0431\u044B\u0442\u044C \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u044B \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u0412\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441\u044B. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022WebServiceUserTaskPropertiesPage\u0022\u003E\u0427\u0438\u0442\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435...\u003C\/a\u003E",
		RequestTimeoutInformation: "\u0415\u0441\u043B\u0438 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F \u0434\u043E\u043B\u044C\u0448\u0435 \u044D\u0442\u043E\u0433\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0438, \u0435\u0433\u043E \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0431\u0443\u0434\u0435\u0442 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E. \u0415\u0441\u043B\u0438 \u0431\u044B\u043B\u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u044B \u0437\u0430\u043F\u0440\u043E\u0441\u0430, \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u043C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u043E\u0442\u0432\u0435\u0442 \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441\u0430."
	};
	var localizableImages = {
		AddButtonImage32: {
			source: 3,
			params: {
				schemaName: "WebServiceUserTaskPropertiesPage",
				resourceItemName: "AddButtonImage32",
				hash: "d30933184bec2d3279aaeda342cc0943",
				resourceItemExtension: ".svg"
			}
		},
		OpenButtonImage: {
			source: 3,
			params: {
				schemaName: "WebServiceUserTaskPropertiesPage",
				resourceItemName: "OpenButtonImage",
				hash: "aea471c866f7ef37845aa83431c9f2d8",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "WebServiceUserTaskPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "WebServiceUserTaskPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "WebServiceUserTaskPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "WebServiceUserTaskPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "WebServiceUserTaskPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "WebServiceUserTaskPropertiesPage",
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