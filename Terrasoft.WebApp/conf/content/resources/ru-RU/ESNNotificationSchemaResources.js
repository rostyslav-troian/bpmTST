define("ESNNotificationSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CreatedOnDateFormat: "{0}, \u0432 {1}",
		EmptyResultTitle: "\u041D\u0430 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043C\u043E\u043C\u0435\u043D\u0442 \u0443 \u0432\u0430\u0441 \u043D\u0435\u0442 \u0441\u043E\u0431\u044B\u0442\u0438\u0439 \u0432 \u043B\u0435\u043D\u0442\u0435. \u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0441\u0432\u043E\u0439 \u043F\u043E\u0441\u0442, \u0430 \u0437\u0430\u0442\u0435\u043C \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u043B\u0430\u0439\u043A\u0438, \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0443\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F \u043F\u043E \u043D\u0435\u043C\u0443",
		EmptyResultMessage: "\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043E\u0431 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F\u0445 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u043E\u0439 \u0441\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0439 \u0441\u0435\u0442\u0438 \u0432 {0}\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438{1}.",
		ContextHelpCode: "",
		ContextHelpId: "1578",
		HasNoRightForRead: "\u041A \u0441\u043E\u0436\u0430\u043B\u0435\u043D\u0438\u044E, \u0443 \u0432\u0430\u0441 \u043D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u044D\u0442\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438. \u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u043A \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0443"
	};
	var localizableImages = {
		DefaultPhoto: {
			source: 3,
			params: {
				schemaName: "ESNNotificationSchema",
				resourceItemName: "DefaultPhoto",
				hash: "e64a09b094aca1c4d2266bee33b5acf7",
				resourceItemExtension: ".png"
			}
		},
		EmptyResultImage: {
			source: 3,
			params: {
				schemaName: "ESNNotificationSchema",
				resourceItemName: "EmptyResultImage",
				hash: "234cba72299aef2cb9ed7e0859506ec5",
				resourceItemExtension: ".svg"
			}
		},
		DefaultRemindingIcon: {
			source: 3,
			params: {
				schemaName: "ESNNotificationSchema",
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