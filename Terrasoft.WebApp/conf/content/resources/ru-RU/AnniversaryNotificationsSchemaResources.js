define("AnniversaryNotificationsSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		BodyTemplate: "{0} {1} ({2} {3})",
		CreateActivity: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C",
		EmptyResultTitle: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430 \u0443\u0432\u0435\u0434\u043E\u043C\u0438\u0442 \u0432\u0430\u0441 \u043E \u0437\u043D\u0430\u043C\u0435\u043D\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0441\u043E\u0431\u044B\u0442\u0438\u044F\u0445 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432 \u0438 \u043A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u043E\u0432",
		EmptyResultMessage: "\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043E \u0440\u0430\u0431\u043E\u0442\u0435 \u0441\u043E \u0437\u043D\u0430\u043C\u0435\u043D\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u0441\u043E\u0431\u044B\u0442\u0438\u044F\u043C\u0438 \u0432 {0}\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438{1}.",
		ContextHelpCode: "",
		ContextHelpId: "1580",
		ActivityTitle: "\u041F\u043E\u0437\u0434\u0440\u0430\u0432\u0438\u0442\u044C \u0441 \u0414\u043D\u0435\u043C \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F",
		ContactCaption: "\u0414\u0435\u043D\u044C \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F {0} {1}",
		AccountCaption: "\u0414\u0435\u043D\u044C \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F {0} {1}",
		SubjectDelimiter: "",
		YearsTemplate: "({0})"
	};
	var localizableImages = {
		EmptyResultImage: {
			source: 3,
			params: {
				schemaName: "AnniversaryNotificationsSchema",
				resourceItemName: "EmptyResultImage",
				hash: "d4e662d4b712ee76e80ca7f12ec81e13",
				resourceItemExtension: ".svg"
			}
		},
		DefaultRemindingIcon: {
			source: 3,
			params: {
				schemaName: "AnniversaryNotificationsSchema",
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