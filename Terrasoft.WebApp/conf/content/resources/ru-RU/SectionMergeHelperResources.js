define("SectionMergeHelperResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectMoreThanOneRowErrorMessage: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043E\u0434\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438",
		SuccessMerge: "\u0421\u043B\u0438\u044F\u043D\u0438\u0435 \u043F\u0440\u043E\u0448\u043B\u043E \u0443\u0441\u043F\u0435\u0448\u043D\u043E",
		MergeRecordsCaption: "\u041E\u0431\u044A\u0435\u0434\u0438\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u0438",
		MergeContactNotificationBodyTemplate: "{0} \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432 \u0431\u0443\u0434\u0435\u0442 \u043E\u0431\u044A\u0435\u0434\u0438\u043D\u0435\u043D\u043E.",
		MergeAccountNotificationBodyTemplate: "{0} \u043A\u043E\u043D\u0442\u0440\u0430\u0433\u0435\u043D\u0442\u043E\u0432 \u0431\u0443\u0434\u0435\u0442 \u043E\u0431\u044A\u0435\u0434\u0438\u043D\u0435\u043D\u043E.",
		MergeNotificationTitleTemplate: "\u041E\u0431\u044A\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0434\u0443\u0431\u043B\u0435\u0439",
		DefaultMergeNotificationBodyTemplate: "{0} \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u0431\u0443\u0434\u0435\u0442 \u043E\u0431\u044A\u0435\u0434\u0438\u043D\u0435\u043D\u043E. \u0412\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435, \u043A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u043E\u0431\u044A\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0441\u044F"
	};
	var localizableImages = {
		MergeBtnImage: {
			source: 3,
			params: {
				schemaName: "SectionMergeHelper",
				resourceItemName: "MergeBtnImage",
				hash: "c4b6e45cf719f11e69f5e6e998f15797",
				resourceItemExtension: ".svg"
			}
		},
		DefMergeIcon: {
			source: 3,
			params: {
				schemaName: "SectionMergeHelper",
				resourceItemName: "DefMergeIcon",
				hash: "0c6d0cdfc289aefaaba79f7530695f76",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});