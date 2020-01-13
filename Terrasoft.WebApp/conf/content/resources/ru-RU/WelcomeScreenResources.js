define("WelcomeScreenResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AcademyButtonCaption: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u0410\u043A\u0430\u0434\u0435\u043C\u0438\u044E",
		WelcomeTextStartLabel: "\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 ",
		AcademyHintLabel: "\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043E \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044F\u0445 \u0441\u0438\u0441\u0442\u0435\u043C\u044B \u0432 Creatio Academy"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "WelcomeScreen",
				resourceItemName: "CloseButtonImage",
				hash: "8bce9706d58258477be7010e627ce862",
				resourceItemExtension: ".png"
			}
		},
		PlayButtonImage: {
			source: 3,
			params: {
				schemaName: "WelcomeScreen",
				resourceItemName: "PlayButtonImage",
				hash: "feb8893002e2f87c6f859bf60fb54409",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});