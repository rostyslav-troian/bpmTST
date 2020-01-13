define("EmptyPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmptyPageCaption: "\u041D\u0438 \u043E\u0434\u0438\u043D \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D.\n\n\u0412\u044B\u0434\u0435\u043B\u0438\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u044E\u0449\u0438\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442, \u0447\u0442\u043E\u0431\u044B \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u0435\u0433\u043E \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u0430.",
		AcademyMessage: "\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043E\u0431 \u0430\u0434\u0430\u043F\u0442\u0438\u0432\u043D\u043E\u043C \u043A\u0435\u0439\u0441-\u043C\u0435\u043D\u0435\u0434\u0436\u043C\u0435\u043D\u0442\u0435 \u0432 {0}\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438{1}."
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "EmptyPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		},
		EmptyImage: {
			source: 3,
			params: {
				schemaName: "EmptyPropertiesPage",
				resourceItemName: "EmptyImage",
				hash: "ca18e353b42622e84a793ee8ffd2b7b8",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});