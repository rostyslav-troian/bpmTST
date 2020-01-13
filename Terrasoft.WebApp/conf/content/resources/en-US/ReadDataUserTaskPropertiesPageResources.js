define("ReadDataUserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProcessInformationText: "Fetches data from the database for use in the process. You can fetch a specific record, a function calculation result or count the number of records in the specified object.  Obtained data can be used by other elements in the process. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022ReadDataUserTaskPropertiesPage\u0022\u003ERead more...\u003C\/a\u003E",
		OrderDirectionCaption: "How to sort records?",
		FirstRecordFromTheSampleCaption: "Read the first record in the selection",
		ConsiderTheFunctionCaption: "Calculate function",
		CalculateTheNumberOfRecordsCaption: "Calculate the number of records",
		ReadOnlySelectedColumnsCaption: "Read data from selected columns only",
		ReadAllColumnsCaption: "Read data from all columns",
		SortingOrder1Caption: "Ascending",
		SortingOrder2Caption: "Descending",
		AddSortingOrderButtonCaption: "Add",
		ColumnSelectModeCaption: "What record data should the process read?",
		DataReadModeCaption: "Which data read mode to use?",
		EntitySchemaSelectCaption: "Which object to read data from?",
		FilterUnitCaption: "How to filter records?",
		AddEntitySchemaColumnButtonCaption: "Add column",
		EntityColumnsLookupPageCaption: "Select columns",
		SelectAggregateFunctionCaption: "Function",
		SelectAggregateColumnCaption: "By column",
		AggregateFunction1Caption: "Sum",
		AggregateFunction2Caption: "Average",
		AggregateFunction3Caption: "Minimum",
		AggregateFunction4Caption: "Maximum",
		CountAggregateFunctionCaption: "Count",
		SortingOrder0Caption: "Disabled",
		ReadCollectionCaption: "Read collection of records",
		ReadOnlyCaption: "Read first",
		RecordsCaption: "records"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ReadDataUserTaskPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ReadDataUserTaskPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "ReadDataUserTaskPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButton: {
			source: 3,
			params: {
				schemaName: "ReadDataUserTaskPropertiesPage",
				resourceItemName: "AddButton",
				hash: "6e4b403aef18ffd56bb550e455626d7e",
				resourceItemExtension: ".png"
			}
		},
		CloseButton: {
			source: 3,
			params: {
				schemaName: "ReadDataUserTaskPropertiesPage",
				resourceItemName: "CloseButton",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "ReadDataUserTaskPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		},
		AddParameterButton: {
			source: 3,
			params: {
				schemaName: "ReadDataUserTaskPropertiesPage",
				resourceItemName: "AddParameterButton",
				hash: "a74df1a7d753e6067ab248949eb47d97",
				resourceItemExtension: ".png"
			}
		},
		ParameterEditToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ReadDataUserTaskPropertiesPage",
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