﻿define("SupplyPaymentDetailV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "\u0413\u0440\u0430\u0444\u0438\u043A \u043F\u043E\u0441\u0442\u0430\u0432\u043E\u043A \u0438 \u043E\u043F\u043B\u0430\u0442",
		DeleteMenuDisableState: "\u041D\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D",
		NoItems: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0433",
		TypeNotMatch: "\u0421\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C {0} \u043C\u043E\u0436\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E \u0448\u0430\u0433\u0430\u043C \u0441 \u0442\u0438\u043F\u043E\u043C \u00AB{1}\u00BB",
		InvoicesCreated: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0445 \u0441\u0447\u0435\u0442\u043E\u0432: {1}{0}",
		ExistInvoice: "\u0421\u0447\u0435\u0442 \u0434\u043B\u044F \u0434\u0430\u043D\u043D\u043E\u0433\u043E \u0448\u0430\u0433\u0430 \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442",
		InvoiceProductName: "\u041E\u043F\u043B\u0430\u0442\u0430 \u043F\u043E \u0437\u0430\u043A\u0430\u0437\u0443 \u2116 {0} \u043E\u0442 {1}",
		SetTemplateButtonCaption: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043F\u043E \u0448\u0430\u0431\u043B\u043E\u043D\u0443",
		SetTemplateActionWarning: "\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0433\u0440\u0430\u0444\u0438\u043A \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D. \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C?",
		CreateInvoice: "\u0421\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0447\u0435\u0442?",
		ThereIsDefTemplateWarning: "\u0412 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D \u0448\u0430\u0431\u043B\u043E\u043D \u043F\u0430\u0441\u043F\u043E\u0440\u0442\u0430 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E. \u0418\u0433\u043D\u043E\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C?",
		CreateContract: "\u0421\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0434\u043E\u0433\u043E\u0432\u043E\u0440?",
		GenerateContractMenuCaption: "\u0421\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0434\u043E\u0433\u043E\u0432\u043E\u0440",
		Payment: "\u041E\u043F\u043B\u0430\u0442\u0430",
		Delivery: "\u041F\u043E\u0441\u0442\u0430\u0432\u043A\u0430",
		Invoice: "\u0421\u0447\u0435\u0442",
		Contract: "\u0414\u043E\u0433\u043E\u0432\u043E\u0440",
		RebindContract: "\u041F\u0435\u0440\u0435\u043F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u0434\u043E\u0433\u043E\u0432\u043E\u0440?",
		DivideProduct: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0440\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u044C \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u044B \u043F\u043E \u0440\u0430\u0437\u043D\u044B\u043C \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0430\u043C. \u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D?",
		FieldsGroupCollapseButtonHint: "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C\/\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C",
		NewStageButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0448\u0430\u0433",
		InvoiceInsertError: "\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u043D\u043E\u0432\u043E\u0433\u043E \u0441\u0447\u0435\u0442\u0430. {0}. \u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0435\u0435 \u043C\u043E\u0436\u043D\u043E \u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u044C\u0441\u044F \u043F\u043E \u003Ca href=\u0022{1}\u0022 target=\u0022_blank\u0022 style=\u0022position:relative\u0022 onclick=\u0022event.stopPropagation();\u0022\u003E\u0441\u0441\u044B\u043B\u043A\u0435\u003C\/a\u003E.",
		InvoiceErrorArticleUrl: "https:\/\/academy.terrasoft.ru\/documents\/sales-enterprise\/7-8\/kak-nastroit-polya-stranicy#XREF_49522"
	};
	var localizableImages = {
		LoadMoreIcon: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentDetailV2",
				resourceItemName: "LoadMoreIcon",
				hash: "010a38d79ad1acb4726eb1dae1d7f14c",
				resourceItemExtension: ".png"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentDetailV2",
				resourceItemName: "AddButtonImage",
				hash: "db1b0d1a50235c598db887d5529030ae",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentDetailV2",
				resourceItemName: "ToolsButtonImage",
				hash: "48d545549ca4ddb13d7a7bb58f60ed5e",
				resourceItemExtension: ".svg"
			}
		},
		RelationshipButtonImage: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentDetailV2",
				resourceItemName: "RelationshipButtonImage",
				hash: "057ce8936048a846d19c7a9644c93a2b",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentDetailV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		ExportToExcelBtnImage: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentDetailV2",
				resourceItemName: "ExportToExcelBtnImage",
				hash: "1883b16fe86f1acadfc158894338fc09",
				resourceItemExtension: ".svg"
			}
		},
		ImageFilter: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentDetailV2",
				resourceItemName: "ImageFilter",
				hash: "ef37ab38ddacefd3ba86c6bbcf4e7501",
				resourceItemExtension: ".svg"
			}
		},
		SortIcon: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentDetailV2",
				resourceItemName: "SortIcon",
				hash: "f5e0b50ec74a47fb66f7d7d403b760c3",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentDetailV2",
				resourceItemName: "GridSettingsIcon",
				hash: "3f4eb707ce7f259fce295490879a8f9b",
				resourceItemExtension: ".svg"
			}
		},
		FilterIcon20: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentDetailV2",
				resourceItemName: "FilterIcon20",
				hash: "124f910abe91ebe4045613a9c5b379d1",
				resourceItemExtension: ".svg"
			}
		},
		ObjectChangeLogSettingsBtnImage: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentDetailV2",
				resourceItemName: "ObjectChangeLogSettingsBtnImage",
				hash: "f0169f1a725a65ec76c564d5e9705277",
				resourceItemExtension: ".svg"
			}
		},
		OpenRecordChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "SupplyPaymentDetailV2",
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