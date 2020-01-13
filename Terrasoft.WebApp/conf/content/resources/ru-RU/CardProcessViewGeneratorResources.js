define("CardProcessViewGeneratorResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WhatCanIDoForYou: "\u0427\u0442\u043E \u044F \u043C\u043E\u0433\u0443 \u0434\u043B\u044F \u0432\u0430\u0441 \u0441\u0434\u0435\u043B\u0430\u0442\u044C?",
		SaveButtonCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		ChangeButtonCaption: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",
		DoLaterButtonCaption: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043F\u043E\u0437\u0436\u0435",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		ActionButtonCaption: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
		GotoButtonCaption: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A",
		ViewButtonCaption: "\u0412\u0438\u0434",
		RightsButtonCaption: "\u041F\u0440\u0430\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430",
		ShowAllButtonCaption: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435 \u043F\u043E\u043B\u044F",
		EditPageCaption: "\u0414\u0438\u0437\u0430\u0439\u043D\u0435\u0440 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B"
	};
	var localizableImages = {
		ContactPhoto: {
			source: 3,
			params: {
				schemaName: "CardProcessViewGenerator",
				resourceItemName: "ContactPhoto",
				hash: "d1293a4f081a67c25d4ec28ac2b211f7",
				resourceItemExtension: ".png"
			}
		},
		InfoImage: {
			source: 3,
			params: {
				schemaName: "CardProcessViewGenerator",
				resourceItemName: "InfoImage",
				hash: "37c45b194cacffdf205af13a78768056",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});