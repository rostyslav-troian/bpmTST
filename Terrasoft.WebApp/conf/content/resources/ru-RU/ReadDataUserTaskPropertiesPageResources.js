define("ReadDataUserTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProcessInformationText: "\u041F\u043E\u043B\u0443\u0447\u0430\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u0437\u0430\u043F\u0438\u0441\u044F\u043C \u0438\u0437 \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u0433\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u0434\u043B\u044F \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0433\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435. \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438, \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0444\u0443\u043D\u043A\u0446\u0438\u0438 \u0438\u043B\u0438 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0430\u043F\u0438\u0441\u0435\u0439.\n\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043D\u044B\u0435 \u0442\u0430\u043A\u0438\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u043C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043C\u043E\u0436\u043D\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0435 \u0434\u0440\u0443\u0433\u0438\u0445 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022ReadDataUserTaskPropertiesPage\u0022\u003E\u041F\u0435\u0440\u0435\u0439\u0442\u0438...\u003C\/a\u003E",
		OrderDirectionCaption: "\u041A\u0430\u043A \u043E\u0442\u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u0438?",
		FirstRecordFromTheSampleCaption: "\u0427\u0438\u0442\u0430\u0442\u044C \u043F\u0435\u0440\u0432\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C \u0438\u0437 \u0432\u044B\u0431\u043E\u0440\u043A\u0438",
		ConsiderTheFunctionCaption: "\u0421\u0447\u0438\u0442\u0430\u0442\u044C \u0444\u0443\u043D\u043A\u0446\u0438\u044E",
		CalculateTheNumberOfRecordsCaption: "\u0421\u0447\u0438\u0442\u0430\u0442\u044C \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0430\u043F\u0438\u0441\u0435\u0439",
		ReadOnlySelectedColumnsCaption: "\u0422\u043E\u043B\u044C\u043A\u043E \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u043A\u043E\u043B\u043E\u043D\u043E\u043A",
		ReadAllColumnsCaption: "\u0412\u0441\u0435\u0445 \u043A\u043E\u043B\u043E\u043D\u043E\u043A",
		SortingOrder1Caption: "\u041F\u043E \u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0430\u043D\u0438\u044E",
		SortingOrder2Caption: "\u041F\u043E \u0443\u0431\u044B\u0432\u0430\u043D\u0438\u044E",
		AddSortingOrderButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
		ColumnSelectModeCaption: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043A\u0430\u043A\u0438\u0445 \u043A\u043E\u043B\u043E\u043D\u043E\u043A \u0432\u044B\u0447\u0438\u0442\u0430\u0442\u044C?",
		DataReadModeCaption: "\u041A\u0430\u043A\u043E\u0439 \u0440\u0435\u0436\u0438\u043C \u0447\u0442\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C?",
		EntitySchemaSelectCaption: "\u0418\u0437 \u043A\u0430\u043A\u043E\u0433\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u0430 \u0447\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435?",
		FilterUnitCaption: "\u041A\u0430\u043A \u043E\u0442\u0444\u0438\u043B\u044C\u0442\u0440\u043E\u0432\u0430\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u0438?",
		AddEntitySchemaColumnButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043B\u043E\u043D\u043A\u0443",
		EntityColumnsLookupPageCaption: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043E\u043B\u043E\u043D\u043A\u0438",
		SelectAggregateFunctionCaption: "\u0424\u0443\u043D\u043A\u0446\u0438\u044F",
		SelectAggregateColumnCaption: "\u041F\u043E \u043A\u043E\u043B\u043E\u043D\u043A\u0435",
		AggregateFunction1Caption: "\u0421\u0443\u043C\u043C\u0430",
		AggregateFunction2Caption: "\u0421\u0440\u0435\u0434\u043D\u0435\u0435",
		AggregateFunction3Caption: "\u041C\u0438\u043D\u0438\u043C\u0443\u043C",
		AggregateFunction4Caption: "\u041C\u0430\u043A\u0441\u0438\u043C\u0443\u043C",
		CountAggregateFunctionCaption: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E",
		SortingOrder0Caption: "\u041E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0430",
		ReadCollectionCaption: "\u0427\u0438\u0442\u0430\u0442\u044C \u043A\u043E\u043B\u043B\u0435\u043A\u0446\u0438\u044E \u0437\u0430\u043F\u0438\u0441\u0435\u0439",
		ReadOnlyCaption: "\u0427\u0438\u0442\u0430\u0442\u044C \u043F\u0435\u0440\u0432\u044B\u0435",
		RecordsCaption: "\u0437\u0430\u043F\u0438\u0441\u0435\u0439"
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