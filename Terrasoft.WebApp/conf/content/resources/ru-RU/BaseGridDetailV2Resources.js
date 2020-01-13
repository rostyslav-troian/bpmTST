define("BaseGridDetailV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
		ActionsButtonCaption: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
		ViewButtonCaption: "\u0412\u0438\u0434",
		EditMenuCaption: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",
		DeleteMenuCaption: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
		SortMenuCaption: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430",
		SetupTotalMenuCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u0438\u0442\u043E\u0433\u043E\u0432",
		SetupGridMenuCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043A\u043E\u043B\u043E\u043D\u043E\u043A",
		LoadMoreButtonCaption: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435",
		MultiModeMenuCaption: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0437\u0430\u043F\u0438\u0441\u0435\u0439",
		SingleModeMenuCaption: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u043C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0432\u044B\u0431\u043E\u0440",
		DeleteConfirmationMessage: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C?",
		CopyMenuCaption: "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		DetailWizardMenuCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0434\u0435\u0442\u0430\u043B\u044C",
		QuickFilterCaption: "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440",
		RemoveQuickFilterCaption: "\u0421\u043A\u0440\u044B\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440",
		RelationshipButtonHint: "\u041F\u043E \u0434\u043E\u0447\u0435\u0440\u043D\u0438\u043C \u0441\u0432\u044F\u0437\u044F\u043C",
		ToolsButtonHint: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
		MultiDeleteConfirmationMessage: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u044B\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0438\u0441\u0438?",
		RecordRightsSetupMenuItemCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043F\u0440\u0430\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430",
		ProcessButtonHint: "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441c \u043F\u043E \u0437\u0430\u043F\u0438\u0441\u0438",
		MasterRecordIdErrorMessage: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 MasterRecordId \u043D\u0435 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D \u0432 \u0434\u0435\u0442\u0430\u043B\u0438 {0}, hash \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B {1}",
		ExportListToExcelFileButtonCaption: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0432 Excel",
		OperationAccessDenied: "\u0423 \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0435 \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043F\u0440\u0430\u0432 \u0434\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438 \u0022{0}\u0022",
		OpenRecordChangeLogCaption: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0436\u0443\u0440\u043D\u0430\u043B \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439",
		SchemaLocalizableString1: "",
		OpenObjectChangeLogSettingsCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0436\u0443\u0440\u043D\u0430\u043B \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439"
	};
	var localizableImages = {
		LoadMoreIcon: {
			source: 3,
			params: {
				schemaName: "BaseGridDetailV2",
				resourceItemName: "LoadMoreIcon",
				hash: "010a38d79ad1acb4726eb1dae1d7f14c",
				resourceItemExtension: ".png"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseGridDetailV2",
				resourceItemName: "AddButtonImage",
				hash: "db1b0d1a50235c598db887d5529030ae",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseGridDetailV2",
				resourceItemName: "ToolsButtonImage",
				hash: "48d545549ca4ddb13d7a7bb58f60ed5e",
				resourceItemExtension: ".svg"
			}
		},
		RelationshipButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseGridDetailV2",
				resourceItemName: "RelationshipButtonImage",
				hash: "057ce8936048a846d19c7a9644c93a2b",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseGridDetailV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		ExportToExcelBtnImage: {
			source: 3,
			params: {
				schemaName: "BaseGridDetailV2",
				resourceItemName: "ExportToExcelBtnImage",
				hash: "1883b16fe86f1acadfc158894338fc09",
				resourceItemExtension: ".svg"
			}
		},
		ImageFilter: {
			source: 3,
			params: {
				schemaName: "BaseGridDetailV2",
				resourceItemName: "ImageFilter",
				hash: "ef37ab38ddacefd3ba86c6bbcf4e7501",
				resourceItemExtension: ".svg"
			}
		},
		SortIcon: {
			source: 3,
			params: {
				schemaName: "BaseGridDetailV2",
				resourceItemName: "SortIcon",
				hash: "f5e0b50ec74a47fb66f7d7d403b760c3",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "BaseGridDetailV2",
				resourceItemName: "GridSettingsIcon",
				hash: "3f4eb707ce7f259fce295490879a8f9b",
				resourceItemExtension: ".svg"
			}
		},
		FilterIcon20: {
			source: 3,
			params: {
				schemaName: "BaseGridDetailV2",
				resourceItemName: "FilterIcon20",
				hash: "124f910abe91ebe4045613a9c5b379d1",
				resourceItemExtension: ".svg"
			}
		},
		ObjectChangeLogSettingsBtnImage: {
			source: 3,
			params: {
				schemaName: "BaseGridDetailV2",
				resourceItemName: "ObjectChangeLogSettingsBtnImage",
				hash: "f0169f1a725a65ec76c564d5e9705277",
				resourceItemExtension: ".svg"
			}
		},
		OpenRecordChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "BaseGridDetailV2",
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