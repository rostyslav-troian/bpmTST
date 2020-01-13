define("SummarySettingsViewGeneratorResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		AddButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
		AddColumnButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0443",
		DisplayRecordCountCaption: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u0430\u043F\u0438\u0441\u0435\u0439",
		ColumnHeaderCaption: "\u041A\u043E\u043B\u043E\u043D\u043A\u0430",
		ColumnFuncCaption: "\u0424\u0443\u043D\u043A\u0446\u0438\u044F",
		ColumnTitleCaption: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A"
	};
	var localizableImages = {
		ImageDeleteButton: {
			source: 3,
			params: {
				schemaName: "SummarySettingsViewGenerator",
				resourceItemName: "ImageDeleteButton",
				hash: "b8a7008452ec672bd9c284d5e83091c1",
				resourceItemExtension: ".png"
			}
		},
		ImageConfirmButton: {
			source: 3,
			params: {
				schemaName: "SummarySettingsViewGenerator",
				resourceItemName: "ImageConfirmButton",
				hash: "87fea5a995ec309ade9719e3aaab7c33",
				resourceItemExtension: ".png"
			}
		},
		ImageDiscardButton: {
			source: 3,
			params: {
				schemaName: "SummarySettingsViewGenerator",
				resourceItemName: "ImageDiscardButton",
				hash: "bc577de06132c42e584683b41f45878c",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});