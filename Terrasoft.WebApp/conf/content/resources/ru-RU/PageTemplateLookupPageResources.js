define("PageTemplateLookupPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectButtonCaption: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C",
		CancelButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C",
		Title: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0431\u043B\u043E\u043D \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
		SetupTemplatesButtonCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u044B",
		SetupTemplatesButtonHint: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0432 \u043D\u043E\u0432\u043E\u0439 \u0432\u043A\u043B\u0430\u0434\u043A\u0435 \u0441\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432 \u0441\u0442\u0440\u0430\u043D\u0438\u0446"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "PageTemplateLookupPage",
				resourceItemName: "CloseIcon",
				hash: "563de164682be35ef981066b7287177c",
				resourceItemExtension: ".svg"
			}
		},
		SetupTemplates: {
			source: 3,
			params: {
				schemaName: "PageTemplateLookupPage",
				resourceItemName: "SetupTemplates",
				hash: "80324446348427228e1d24acab5af918",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});