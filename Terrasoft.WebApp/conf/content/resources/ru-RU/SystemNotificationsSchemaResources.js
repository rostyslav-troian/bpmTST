define("SystemNotificationsSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmptyResultTitle: "\u041F\u043E\u0445\u043E\u0436\u0435, \u0443 \u0432\u0430\u0441 \u0435\u0449\u0435 \u043D\u0435\u0442 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439, \u0442\u0440\u0435\u0431\u0443\u044E\u0449\u0438\u0445 \u0440\u0435\u0430\u043A\u0446\u0438\u0438",
		EmptyResultMessage: "\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043E \u0440\u0430\u0431\u043E\u0442\u0435 \u0441 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F\u043C\u0438 \u0432 {0}\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438{1}.",
		ContextHelpCode: "",
		ContextHelpId: "1581",
		ImportNotificationLinkCaption: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043D\u044B\u043C \u0434\u0430\u043D\u043D\u044B\u043C",
		ImportNotificationLogLinkCaption: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0436\u0443\u0440\u043D\u0430\u043B \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0434\u0430\u043D\u043D\u044B\u0445",
		ReportNotificationSubject: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043E\u0442\u0447\u0435\u0442",
		ReportNotificationHeaderTpl: "\u041E\u0442\u0447\u0435\u0442 \u00AB{0}\u00BB \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D"
	};
	var localizableImages = {
		EmptyResultImage: {
			source: 3,
			params: {
				schemaName: "SystemNotificationsSchema",
				resourceItemName: "EmptyResultImage",
				hash: "46e5dc9be3ae1086304bef981f46208c",
				resourceItemExtension: ".svg"
			}
		},
		DefaultRemindingIcon: {
			source: 3,
			params: {
				schemaName: "SystemNotificationsSchema",
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