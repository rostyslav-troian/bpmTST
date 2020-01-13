define("BaseSignalEventPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		RecommendationCaption: "\u0421\u0438\u0433\u043D\u0430\u043B \u043A\u0430\u043A\u043E\u0433\u043E \u0442\u0438\u043F\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D?",
		SignalCaption: "\u0421\u0438\u0433\u043D\u0430\u043B",
		EntityCaption: "\u041E\u0431\u044A\u0435\u043A\u0442",
		EntityChangeTypeCaption: "\u041A\u0430\u043A\u043E\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u043F\u0440\u043E\u0438\u0437\u043E\u0439\u0442\u0438?",
		ExpectChangesCaption: "\u041E\u0436\u0438\u0434\u0430\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",
		UpdatedObjectSignalFilterCaption: "\u041F\u043E\u0441\u043B\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0437\u0430\u043F\u0438\u0441\u044C \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C",
		InsertedObjectSignalFilterCaption: "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C",
		DeletedObjectSignalFilterCaption: "\u0417\u0430\u043F\u0438\u0441\u044C \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C",
		SimpleSignalCaption: "\u041F\u043E\u043B\u0443\u0447\u0435\u043D \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u043B\u044C\u043D\u044B\u0439 \u0441\u0438\u0433\u043D\u0430\u043B",
		ObjectSignalCaption: "\u041F\u043E\u043B\u0443\u0447\u0435\u043D \u0441\u0438\u0433\u043D\u0430\u043B \u043E\u0442 \u043E\u0431\u044A\u0435\u043A\u0442\u0430",
		InsertedEntityChangeTypeCaption: "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0438\u0441\u0438",
		UpdatedEntityChangeTypeCaption: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0438\u0441\u0438",
		DeletedEntityChangeTypeCaption: "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0438\u0441\u0438",
		AnyFieldCaption: "\u041B\u044E\u0431\u043E\u0433\u043E \u043F\u043E\u043B\u044F",
		AnySelectedFieldCaption: "\u041B\u044E\u0431\u043E\u0433\u043E \u043F\u043E\u043B\u044F \u0438\u0437 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0445",
		FilterInformationText: "\u0414\u043B\u044F \u0441\u0438\u0433\u043D\u0430\u043B\u0430 \u043F\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u0443 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D \u0444\u0438\u043B\u044C\u0442\u0440. \u0421\u0438\u0433\u043D\u0430\u043B \u0431\u0443\u0434\u0435\u0442 \u0441\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0442\u044C \u043D\u0430 \u0432\u0441\u0435 \u0437\u0430\u043F\u0438\u0441\u0438 \u044D\u0442\u043E\u0433\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u0430, \u0432 \u0442\u043E\u043C \u0447\u0438\u0441\u043B\u0435 \u0438 \u043D\u0430 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0438\u0435.",
		AddRecordColumnValuesButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043B\u043E\u043D\u043A\u0443",
		EntityColumnsLookupPageCaption: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043E\u043B\u043E\u043D\u043A\u0438",
		CustomValidatorInvalidMessage: "\u041D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043F\u043E\u043B\u0435"
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