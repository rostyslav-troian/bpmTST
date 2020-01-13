define("LinkEntityToProcessUserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ReferenceSchemaCaption: "Reference object",
		ReferenceElementCaption: "Reference object element",
		DisplayValueTemplate: "[#Lookup.{0}.{1}#]",
		WhichRecordToConnectThisProcessCaption: "Which record to connect this process to?",
		EntitySchemaCaption: "Connected object",
		EntityCaption: "Record of connected object",
		ProcessInformationText: "This item connects a business process instance to a record in the system. As a result, the list of completed process instances can be viewed for each record, as well as the list of connected system records, for each process instance in the [Process log] section. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022LinkEntityToProcessUserTaskPropertiesPage\u0022\u003ERead more...\u003C\/a\u003E"
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