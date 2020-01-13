define("MarketingEmailSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "Email-\u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0430",
		AsyncWithoutIncomingsMessage: "\u0412 \u0441\u0445\u0435\u043C\u0435 \u043A\u0430\u043C\u043F\u0430\u043D\u0438\u0438 \u0435\u0441\u0442\u044C \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B \u0431\u0435\u0437 \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u0441\u0442\u0440\u0435\u043B\u043E\u043A"
	};
	var localizableImages = {
		TitleImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailSchema",
				resourceItemName: "TitleImage",
				hash: "e372024f970be5e37d08516770b5a6c1",
				resourceItemExtension: ".svg"
			}
		},
		LargeImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailSchema",
				resourceItemName: "LargeImage",
				hash: "8a71d02c627f73f15dd295c6c1ce158b",
				resourceItemExtension: ".svg"
			}
		},
		SmallImage: {
			source: 3,
			params: {
				schemaName: "MarketingEmailSchema",
				resourceItemName: "SmallImage",
				hash: "931fade2b900efd0bfb12dd3327be623",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});