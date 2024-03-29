﻿define("ProcessFlowElementPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProcessSchemaParameterEditPageCaption: "Insert parameter",
		EmptyParametersMessage: "Element has no parameters",
		ParametersTabCaption: "Parameters",
		AddParameterButtonCaption: "Add parameter",
		IsLoggingCaption: "Enable logging",
		SerializeToDBCaption: "Serialize in DB",
		MappingPlaceholderCaption: "Select value",
		RecepientTip: "Specify the email address of the recipient. You can select a specific email address or define it based on information from other process items.",
		UseBackgroundModeCaption: "Run following elements in the background"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessFlowElementPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessFlowElementPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessFlowElementPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessFlowElementPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "ProcessFlowElementPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ProcessFlowElementPropertiesPage",
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