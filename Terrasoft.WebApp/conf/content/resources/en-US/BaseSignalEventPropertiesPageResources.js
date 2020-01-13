define("BaseSignalEventPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		RecommendationCaption: "Which type of signal is received?",
		SignalCaption: "Signal",
		EntityCaption: "Object",
		EntityChangeTypeCaption: "Which event should trigger the signal?",
		ExpectChangesCaption: "Changes expected",
		UpdatedObjectSignalFilterCaption: "The modified record must meet filter conditions",
		InsertedObjectSignalFilterCaption: "The added record must meet filter conditions",
		DeletedObjectSignalFilterCaption: "The record must meet the filter conditions",
		SimpleSignalCaption: "Custom signal",
		ObjectSignalCaption: "Object signal",
		InsertedEntityChangeTypeCaption: "Record added",
		UpdatedEntityChangeTypeCaption: "Record modified",
		DeletedEntityChangeTypeCaption: "Record deleted",
		AnyFieldCaption: "In any field",
		AnySelectedFieldCaption: "In any of the selected fields",
		FilterInformationText: "The filter for the signal by object is not set. The signal will be triggered for all records of this object, including technical ones.",
		AddRecordColumnValuesButtonCaption: "Add column",
		EntityColumnsLookupPageCaption: "Select columns",
		CustomValidatorInvalidMessage: "Missing required field"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseSignalEventPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseSignalEventPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseSignalEventPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseSignalEventPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "BaseSignalEventPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseSignalEventPropertiesPage",
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