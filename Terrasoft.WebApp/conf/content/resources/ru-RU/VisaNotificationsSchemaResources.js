define("VisaNotificationsSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmptyResultTitle: "\u041F\u043E\u0445\u043E\u0436\u0435, \u0443 \u0432\u0430\u0441 \u0435\u0449\u0435 \u043D\u0435\u0442 \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u0434\u043B\u044F \u0432\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F",
		EmptyResultMessage: "\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043E \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0435 \u0432\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0432 {0}\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438{1}.",
		ContextHelpId: "1579",
		ApproveMenuItemCaption: "\u0423\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C",
		RejectMenuItemCaption: "\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C",
		ChangeVizierCaption: "\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u0438\u0437\u0438\u0440\u0443\u044E\u0449\u0435\u0433\u043E",
		VisaActionButton: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F"
	};
	var localizableImages = {
		EmptyResultImage: {
			source: 3,
			params: {
				schemaName: "VisaNotificationsSchema",
				resourceItemName: "EmptyResultImage",
				hash: "006b0c8c10baf3e1e8d69818201cb393",
				resourceItemExtension: ".svg"
			}
		},
		Approve: {
			source: 3,
			params: {
				schemaName: "VisaNotificationsSchema",
				resourceItemName: "Approve",
				hash: "68a244ea82056138e87f666fdc56c485",
				resourceItemExtension: ".svg"
			}
		},
		Reject: {
			source: 3,
			params: {
				schemaName: "VisaNotificationsSchema",
				resourceItemName: "Reject",
				hash: "4f5a23412b1a4485e20808acc81a265e",
				resourceItemExtension: ".svg"
			}
		},
		ChangeVizier: {
			source: 3,
			params: {
				schemaName: "VisaNotificationsSchema",
				resourceItemName: "ChangeVizier",
				hash: "df4c37b342bdc9330876e28c1ce214b4",
				resourceItemExtension: ".svg"
			}
		},
		DefaultImage: {
			source: 3,
			params: {
				schemaName: "VisaNotificationsSchema",
				resourceItemName: "DefaultImage",
				hash: "659eb84312153ec027f0ea1643b9b846",
				resourceItemExtension: ".svg"
			}
		},
		DefaultRemindingIcon: {
			source: 3,
			params: {
				schemaName: "VisaNotificationsSchema",
				resourceItemName: "DefaultRemindingIcon",
				hash: "fc25e15a25188b310d43e0d790d71956",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});