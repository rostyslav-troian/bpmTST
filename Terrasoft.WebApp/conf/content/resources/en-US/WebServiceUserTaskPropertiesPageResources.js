define("WebServiceUserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ServiceSchemaEnumCaption: "Which service to call?",
		WebServiceRequestParametersCaption: "Request parameters",
		ServiceMethodEnumCaption: "Which method to call?",
		ServiceMethodsEmptyListPlaceholder: "There are no configured methods",
		ServiceSchemasEmptyListPlaceholder: "There are no configured web services",
		AddSchemaButtonHintCaption: "Add new web service",
		OpenSchemaButtonHintCaption: "Open web service settings page",
		ChangeButtonCaption: "Change",
		ChangeServiceMethodWarningMessage: "Are you sure you want to change method? All parameters will be lost.",
		WebServiceMethodEmptyParametersMessage: "Request parameters are not set in method",
		ChangeServiceWarningMessage: "Are you sure you want to change service? All parameters will be lost.",
		RequestTimeout: "Maximum execution time, in seconds",
		RequestTimeoutPlaceholder: "Default ({0} sec)",
		ProcessInformationText: "Use element to call web services. Before using the element, web service parameters must be configured in Web services section. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022WebServiceUserTaskPropertiesPage \u0022\u003ERead more...\u003C\/a\u003E",
		RequestTimeoutInformation: "If this element is executed longer, it will be stopped. If the request was repeated, the element output is the last web service response."
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