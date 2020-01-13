﻿define("BaseDataModificationUserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ChangeReferenceSchemaWarningMessage: "Are you sure you want to change this object? All field values and filter settings will be lost.",
		ChangeReferenceSchemaButtonCaption: "Change",
		EntitySchemaSelectCaption: "Which object to modify data of?",
		FilterUnitCaption: "Modify all records that match condition",
		FilterDataIsNullOrEmptyMessage: "Filtering parameters are required",
		FilterInformationText: "Filtering parameters are required",
		InvalidEntitySchemaChange: "Process element cannot be changed"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseDataModificationUserTaskPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseDataModificationUserTaskPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseDataModificationUserTaskPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseDataModificationUserTaskPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "BaseDataModificationUserTaskPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseDataModificationUserTaskPropertiesPage",
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