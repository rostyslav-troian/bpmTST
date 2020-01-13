define("CompletenessParameterDetailV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "\u0410\u0442\u0440\u0438\u0431\u0443\u0442\u044B",
		TotalCaption: "\u0418\u0442\u043E\u0433\u043E:",
		PercentageCaption: "{0}%",
		DetailName: "\u0414\u0435\u0442\u0430\u043B\u044C \u0022{0}\u0022",
		AttributeColumnCaption: "\u0410\u0442\u0440\u0438\u0431\u0443\u0442",
		PercentageMoreThenHundredMessage: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 100",
		PercentageMoreLessZeroMessage: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435 0",
		PercentageMoreLessValidMessage: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043E\u0442 1 \u0434\u043E {0}",
		TotalPercentageMoreThenHundredMessage: "\u041D\u0435\u043B\u044C\u0437\u044F \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C, \u0442\u0430\u043A \u043A\u0430\u043A \u043E\u0431\u0449\u0438\u0439 \u043F\u0440\u043E\u0446\u0435\u043D\u0442 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0432 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A\u0435 \u0440\u0430\u0432\u0435\u043D 100%.",
		TypedDetailName: "\u0414\u0435\u0442\u0430\u043B\u044C \u0022{0}\u0022 - {1}"
	};
	var localizableImages = {
		LoadMoreIcon: {
			source: 3,
			params: {
				schemaName: "CompletenessParameterDetailV2",
				resourceItemName: "LoadMoreIcon",
				hash: "010a38d79ad1acb4726eb1dae1d7f14c",
				resourceItemExtension: ".png"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "CompletenessParameterDetailV2",
				resourceItemName: "AddButtonImage",
				hash: "db1b0d1a50235c598db887d5529030ae",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "CompletenessParameterDetailV2",
				resourceItemName: "ToolsButtonImage",
				hash: "48d545549ca4ddb13d7a7bb58f60ed5e",
				resourceItemExtension: ".svg"
			}
		},
		RelationshipButtonImage: {
			source: 3,
			params: {
				schemaName: "CompletenessParameterDetailV2",
				resourceItemName: "RelationshipButtonImage",
				hash: "057ce8936048a846d19c7a9644c93a2b",
				resourceItemExtension: ".png"
			}
		},
		RemoveIcon: {
			source: 3,
			params: {
				schemaName: "CompletenessParameterDetailV2",
				resourceItemName: "RemoveIcon",
				hash: "fbcca7299505b5103a958e84a4327fd3",
				resourceItemExtension: ".png"
			}
		},
		SaveIcon: {
			source: 3,
			params: {
				schemaName: "CompletenessParameterDetailV2",
				resourceItemName: "SaveIcon",
				hash: "88afe3dc6e8d0b98ef23a73c1b70fec7",
				resourceItemExtension: ".png"
			}
		},
		CancelIcon: {
			source: 3,
			params: {
				schemaName: "CompletenessParameterDetailV2",
				resourceItemName: "CancelIcon",
				hash: "e3ed227abec1c1423204bafcc9e44175",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "CompletenessParameterDetailV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		ExportToExcelBtnImage: {
			source: 3,
			params: {
				schemaName: "CompletenessParameterDetailV2",
				resourceItemName: "ExportToExcelBtnImage",
				hash: "1883b16fe86f1acadfc158894338fc09",
				resourceItemExtension: ".svg"
			}
		},
		ImageFilter: {
			source: 3,
			params: {
				schemaName: "CompletenessParameterDetailV2",
				resourceItemName: "ImageFilter",
				hash: "ef37ab38ddacefd3ba86c6bbcf4e7501",
				resourceItemExtension: ".svg"
			}
		},
		SortIcon: {
			source: 3,
			params: {
				schemaName: "CompletenessParameterDetailV2",
				resourceItemName: "SortIcon",
				hash: "f5e0b50ec74a47fb66f7d7d403b760c3",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "CompletenessParameterDetailV2",
				resourceItemName: "GridSettingsIcon",
				hash: "3f4eb707ce7f259fce295490879a8f9b",
				resourceItemExtension: ".svg"
			}
		},
		FilterIcon20: {
			source: 3,
			params: {
				schemaName: "CompletenessParameterDetailV2",
				resourceItemName: "FilterIcon20",
				hash: "124f910abe91ebe4045613a9c5b379d1",
				resourceItemExtension: ".svg"
			}
		},
		ObjectChangeLogSettingsBtnImage: {
			source: 3,
			params: {
				schemaName: "CompletenessParameterDetailV2",
				resourceItemName: "ObjectChangeLogSettingsBtnImage",
				hash: "f0169f1a725a65ec76c564d5e9705277",
				resourceItemExtension: ".svg"
			}
		},
		OpenRecordChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "CompletenessParameterDetailV2",
				resourceItemName: "OpenRecordChangeLogBtnImage",
				hash: "cbebcb32589828e1055caf62150ff717",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});