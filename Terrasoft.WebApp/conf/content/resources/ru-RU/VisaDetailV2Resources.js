define("VisaDetailV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "\u0412\u0438\u0437\u044B",
		Approve: "\u0423\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C",
		Reject: "\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C",
		ChangeVisaOwner: "\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u0438\u0437\u0438\u0440\u0443\u044E\u0449\u0435\u0433\u043E",
		IsCanceled: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E, \u0442\u0430\u043A \u043A\u0430\u043A \u0432\u0438\u0437\u0430 \u043D\u0435\u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u0430",
		ApproveYet: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E, \u0442\u0430\u043A \u043A\u0430\u043A \u0432\u0438\u0437\u0430 \u0443\u0436\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430",
		RejectingYet: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E, \u0442\u0430\u043A \u043A\u0430\u043A \u0432\u0438\u0437\u0430 \u0443\u0436\u0435 \u043E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u0430",
		EditMenuCaption: "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440",
		ShowAllCaption: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435 \u0432\u0438\u0437\u044B",
		ShowActualCaption: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0432\u0438\u0437\u044B",
		NoRightsToApproveOrReject: "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043F\u0440\u0430\u0432 \u0434\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438.",
		ShowOnlyMyApprovalCaption: "\u041E\u0436\u0438\u0434\u0430\u044E\u0442 \u043C\u043E\u0435\u0439 \u0432\u0438\u0437\u044B"
	};
	var localizableImages = {
		ApproveImage: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
				resourceItemName: "ApproveImage",
				hash: "68a244ea82056138e87f666fdc56c485",
				resourceItemExtension: ".svg"
			}
		},
		RejectImage: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
				resourceItemName: "RejectImage",
				hash: "4f5a23412b1a4485e20808acc81a265e",
				resourceItemExtension: ".svg"
			}
		},
		ChangeVizierImage: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
				resourceItemName: "ChangeVizierImage",
				hash: "df4c37b342bdc9330876e28c1ce214b4",
				resourceItemExtension: ".svg"
			}
		},
		SortIcon: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
				resourceItemName: "SortIcon",
				hash: "f5e0b50ec74a47fb66f7d7d403b760c3",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
				resourceItemName: "GridSettingsIcon",
				hash: "3f4eb707ce7f259fce295490879a8f9b",
				resourceItemExtension: ".svg"
			}
		},
		FilterIcon20: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
				resourceItemName: "FilterIcon20",
				hash: "124f910abe91ebe4045613a9c5b379d1",
				resourceItemExtension: ".svg"
			}
		},
		ObjectChangeLogSettingsBtnImage: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
				resourceItemName: "ObjectChangeLogSettingsBtnImage",
				hash: "f0169f1a725a65ec76c564d5e9705277",
				resourceItemExtension: ".svg"
			}
		},
		OpenRecordChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "VisaDetailV2",
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