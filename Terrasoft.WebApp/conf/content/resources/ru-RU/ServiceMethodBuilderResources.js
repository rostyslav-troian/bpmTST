define("ServiceMethodBuilderResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		NextButtonCaption: "\u0414\u0430\u043B\u0435\u0435",
		DoneButtonCaption: "\u0413\u043E\u0442\u043E\u0432\u043E",
		BackButtonCaption: "\u041D\u0430\u0437\u0430\u0434",
		CloseButtonCaption: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
		ParseFailedInfo: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B.",
		SaveSuccessInfo: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u044B ({0} \u0448\u0442.).\n\u0421\u0435\u0439\u0447\u0430\u0441 \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0443\u0442\u043E\u0447\u043D\u0438\u0442\u044C \u0438\u0445 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F, \u0442\u0438\u043F\u044B \u0434\u0430\u043D\u043D\u044B\u0445, \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438.",
		Title: "",
		ParseFailedInfoPart2: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0432\u0432\u0435\u0434\u0435\u043D\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437."
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "ServiceMethodBuilder",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		SetupResultImageSuccess: {
			source: 3,
			params: {
				schemaName: "ServiceMethodBuilder",
				resourceItemName: "SetupResultImageSuccess",
				hash: "1b17b350024ba47e8baa44fbe38860b6",
				resourceItemExtension: ".svg"
			}
		},
		SetupResultImageFail: {
			source: 3,
			params: {
				schemaName: "ServiceMethodBuilder",
				resourceItemName: "SetupResultImageFail",
				hash: "addbd12b1b53bcb56b1580c71598f4e6",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});