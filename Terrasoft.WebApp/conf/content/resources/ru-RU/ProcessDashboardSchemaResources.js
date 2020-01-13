define("ProcessDashboardSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmptyResultTitle: "\u041F\u043E\u0445\u043E\u0436\u0435, \u0443 \u0432\u0430\u0441 \u0435\u0449\u0435 \u043D\u0435\u0442 \u0437\u0430\u0434\u0430\u0447 \u043F\u043E \u0431\u0438\u0437\u043D\u0435\u0441-\u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430\u043C \u0434\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F",
		EmptyResultMessage: "\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043E \u0431\u0438\u0437\u043D\u0435\u0441-\u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0430\u0445 \u0432 {0}\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438{1}.",
		ContextHelpCode: "",
		ContextHelpId: "1839",
		FutureTaskFilter: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C \u0431\u0443\u0434\u0443\u0449\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438"
	};
	var localizableImages = {
		EmptyResultImage: {
			source: 3,
			params: {
				schemaName: "ProcessDashboardSchema",
				resourceItemName: "EmptyResultImage",
				hash: "a202b80583e5d608faa21f55dadc7845",
				resourceItemExtension: ".svg"
			}
		},
		Default: {
			source: 3,
			params: {
				schemaName: "ProcessDashboardSchema",
				resourceItemName: "Default",
				hash: "e43e33a3ae1d4c1a57e7e161d1b39dad",
				resourceItemExtension: ".svg"
			}
		},
		Filter: {
			source: 3,
			params: {
				schemaName: "ProcessDashboardSchema",
				resourceItemName: "Filter",
				hash: "31bd325b9d223868893ac5b0a8617a62",
				resourceItemExtension: ".svg"
			}
		},
		DefaultRemindingIcon: {
			source: 3,
			params: {
				schemaName: "ProcessDashboardSchema",
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