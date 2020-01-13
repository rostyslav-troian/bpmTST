define("FileDetailV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "\u0424\u0430\u0439\u043B\u044B \u0438 \u0441\u0441\u044B\u043B\u043A\u0438",
		AddFileCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0444\u0430\u0439\u043B",
		AddLinkCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",
		AddNewFileVersionCaption: "\u041D\u043E\u0432\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E \u0444\u0430\u0439\u043B\u0430",
		ActionChangeSettingsCation: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u0430",
		ActionUnlockCaption: "\u0420\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		ActionLockCaption: "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		ActionShowLogCaption: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",
		UploadFileError: "\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0444\u0430\u0439\u043B\u0430",
		DragAndDropCaption: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0441\u044E\u0434\u0430 \u0444\u0430\u0439\u043B",
		UploadError: "\u041F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u0432\u043E\u0437\u043D\u0438\u043A\u043B\u0438 \u043E\u0448\u0438\u0431\u043A\u0438",
		RemoveQuickFilterCaption: "\u0421\u043A\u0440\u044B\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440",
		RelationshipButtonHint: "\u041F\u043E \u0434\u043E\u0447\u0435\u0440\u043D\u0438\u043C \u0441\u0432\u044F\u0437\u044F\u043C",
		ToolsButtonHint: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
		ListViewButtonHint: "\u041E\u0442\u043E\u0431\u0440\u0430\u0437\u0438\u0442\u044C \u0432 \u0432\u0438\u0434\u0435 \u0441\u043F\u0438\u0441\u043A\u0430",
		TileViewButtonHint: "\u041E\u0442\u043E\u0431\u0440\u0430\u0437\u0438\u0442\u044C \u0432 \u0432\u0438\u0434\u0435 \u043F\u043B\u0438\u0442\u043E\u043A",
		FieldsGroupCollapseButtonHint: "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C\/\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C",
		MaxFileSizeExceededExceptionMessage: "\u041F\u0440\u0435\u0432\u044B\u0448\u0435\u043D \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430 {0} \u041C\u0431",
		ChangeSizeCaption: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440",
		ChangeFileSizeInfoMessage: "\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u044D\u0442\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043C\u043E\u0436\u043D\u043E \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u0439 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0435 \u00AB\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430\u00BB"
	};
	var localizableImages = {
		TiledViewIcon: {
			source: 3,
			params: {
				schemaName: "FileDetailV2",
				resourceItemName: "TiledViewIcon",
				hash: "b8dcc84bf9366c078ff34c4cee1302b3",
				resourceItemExtension: ".png"
			}
		},
		LoadMoreIcon: {
			source: 3,
			params: {
				schemaName: "FileDetailV2",
				resourceItemName: "LoadMoreIcon",
				hash: "c839ec86857b582156710e074feb983a",
				resourceItemExtension: ".png"
			}
		},
		ListedViewIcon: {
			source: 3,
			params: {
				schemaName: "FileDetailV2",
				resourceItemName: "ListedViewIcon",
				hash: "7034734a2108302aac7def00150fd3be",
				resourceItemExtension: ".png"
			}
		},
		DefaultIcon: {
			source: 3,
			params: {
				schemaName: "FileDetailV2",
				resourceItemName: "DefaultIcon",
				hash: "bdd9da3d422662b7a975f45f9fb35370",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "FileDetailV2",
				resourceItemName: "AddButtonImage",
				hash: "da6c950830c1ecd181a771e3e1482ba3",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "FileDetailV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		ExportToExcelBtnImage: {
			source: 3,
			params: {
				schemaName: "FileDetailV2",
				resourceItemName: "ExportToExcelBtnImage",
				hash: "1883b16fe86f1acadfc158894338fc09",
				resourceItemExtension: ".svg"
			}
		},
		ImageFilter: {
			source: 3,
			params: {
				schemaName: "FileDetailV2",
				resourceItemName: "ImageFilter",
				hash: "ef37ab38ddacefd3ba86c6bbcf4e7501",
				resourceItemExtension: ".svg"
			}
		},
		SortIcon: {
			source: 3,
			params: {
				schemaName: "FileDetailV2",
				resourceItemName: "SortIcon",
				hash: "f5e0b50ec74a47fb66f7d7d403b760c3",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "FileDetailV2",
				resourceItemName: "GridSettingsIcon",
				hash: "3f4eb707ce7f259fce295490879a8f9b",
				resourceItemExtension: ".svg"
			}
		},
		FilterIcon20: {
			source: 3,
			params: {
				schemaName: "FileDetailV2",
				resourceItemName: "FilterIcon20",
				hash: "124f910abe91ebe4045613a9c5b379d1",
				resourceItemExtension: ".svg"
			}
		},
		ObjectChangeLogSettingsBtnImage: {
			source: 3,
			params: {
				schemaName: "FileDetailV2",
				resourceItemName: "ObjectChangeLogSettingsBtnImage",
				hash: "f0169f1a725a65ec76c564d5e9705277",
				resourceItemExtension: ".svg"
			}
		},
		OpenRecordChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "FileDetailV2",
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