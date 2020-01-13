define("MultiDeleteResultPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PageCaption: "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0438\u0441\u0435\u0439",
		ByRightsCaption: "{0} \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u0431\u0435\u0437 \u043F\u0440\u0430\u0432 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F",
		ByConstraintsCaption: "{0} \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442\u0441\u044F \u0432 \u0434\u0440\u0443\u0433\u0438\u0445 \u0440\u0430\u0437\u0434\u0435\u043B\u0430\u0445",
		PlusCaption: "\u002B",
		MinusCaption: "-",
		DeleteRecord: "\u0421 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435\u043C \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0445 \u0437\u0430\u043F\u0438\u0441\u0435\u0439",
		UnlinkRecord: "\u0411\u0435\u0437 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0445 \u0437\u0430\u043F\u0438\u0441\u0435\u0439",
		DeletedSuccessfully: "\u0417\u0430\u043F\u0438\u0441\u0438 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u044B",
		DeleteAllHint: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0435",
		IgnoreHint: "\u0423\u0431\u0440\u0430\u0442\u044C \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430",
		DeleteRecordsButton: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u0438",
		DeleteRecordButton: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "MultiDeleteResultPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "MultiDeleteResultPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "MultiDeleteResultPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "MultiDeleteResultPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		DeleteItemIcon: {
			source: 3,
			params: {
				schemaName: "MultiDeleteResultPageV2",
				resourceItemName: "DeleteItemIcon",
				hash: "e4c999d7eb9f4c67ae9c8c0f7138b79c",
				resourceItemExtension: ".png"
			}
		},
		CollapsedImage: {
			source: 3,
			params: {
				schemaName: "MultiDeleteResultPageV2",
				resourceItemName: "CollapsedImage",
				hash: "4a11cdcb0aa256265fde2d3eb7e4fc99",
				resourceItemExtension: ".png"
			}
		},
		ErrorTypes: {
			source: 3,
			params: {
				schemaName: "MultiDeleteResultPageV2",
				resourceItemName: "ErrorTypes",
				hash: "d45773e1a373448bcab064dd7bd3c130",
				resourceItemExtension: ".png"
			}
		},
		IgnoreItemIcon: {
			source: 3,
			params: {
				schemaName: "MultiDeleteResultPageV2",
				resourceItemName: "IgnoreItemIcon",
				hash: "82a84b7ef421d0720de7d9c58e29c519",
				resourceItemExtension: ".jpg"
			}
		},
		CollapsedImageBtn: {
			source: 3,
			params: {
				schemaName: "MultiDeleteResultPageV2",
				resourceItemName: "CollapsedImageBtn",
				hash: "ea17d5862d1a02067dab4ba910d5fcf0",
				resourceItemExtension: ".png"
			}
		},
		ExpandImageBtn: {
			source: 3,
			params: {
				schemaName: "MultiDeleteResultPageV2",
				resourceItemName: "ExpandImageBtn",
				hash: "47f92338fd3cc3ac598315778aaf064c",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "MultiDeleteResultPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "MultiDeleteResultPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "MultiDeleteResultPageV2",
				resourceItemName: "OpenChangeLogBtnImage",
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