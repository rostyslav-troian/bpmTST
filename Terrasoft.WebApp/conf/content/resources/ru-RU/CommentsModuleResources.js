define("CommentsModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ViewMoreCaption: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0435\u0449\u0435 {0}",
		DeleteMessage: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439?",
		EditButtonCaption: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		DeleteButtonCaption: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
		AddCommentWatermark: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439",
		InfoDataSeparator: " \u0432 "
	};
	var localizableImages = {
		SelectedArrow: {
			source: 3,
			params: {
				schemaName: "CommentsModule",
				resourceItemName: "SelectedArrow",
				hash: "77f1229091425bdf354a5d23151dea0d",
				resourceItemExtension: ".png"
			}
		},
		DeleteIcon: {
			source: 3,
			params: {
				schemaName: "CommentsModule",
				resourceItemName: "DeleteIcon",
				hash: "f46b77d2fbd9e590ac327cead2fb4c2d",
				resourceItemExtension: ".png"
			}
		},
		EditIcon: {
			source: 3,
			params: {
				schemaName: "CommentsModule",
				resourceItemName: "EditIcon",
				hash: "8dee7bcf504a97902c455bb1022d2f70",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});