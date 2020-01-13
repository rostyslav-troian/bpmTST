define("ProcessSchemaPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		VersionCaption: "Version",
		ParametersCaption: "Parameters",
		ParameterNameCaption: "Name",
		ParameterTypeCaption: "Value type",
		EditButtonCaption: "Edit",
		DeleteButtonCaption: "Delete",
		CancelModuleButtonCaption: "Cancel",
		SaveModuleButtonCaption: "Save",
		IsRequiredCaption: "Required parameter",
		ParameterLookupCaption: "Lookup",
		TitleCaption: "Process",
		UseForceCompileCaption: "Force compile",
		OtherMenuItemCaption: "Other",
		TagCaption: "Tag",
		UsingsGroupCaption: "Usings",
		MethodsTabCaption: "Methods",
		ProcessMethodsCaption: "Methods",
		CompiledProcessMethodsCaption: "Compiled process methods (obsolete)",
		ProcessInformationText: "The \u0022Settings\u0022 tab contains general process properties, such as title, code and logging options.The \u0022Parameters\u0022 tab contains a list of process parameters used for exchanging information between different processes or between elements of one process.On the \u0022Methods\u0022 tab, software developers can add program methods to be used in a process. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022ProcessSchemaPropertiesPage\u0022 \u003ERead more...\u003C\/a\u003E",
		DescriptionCaption: "Process description",
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