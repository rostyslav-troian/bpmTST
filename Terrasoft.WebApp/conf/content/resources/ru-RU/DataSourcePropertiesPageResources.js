define("DataSourcePropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		PageTitle: "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0434\u0430\u043D\u043D\u044B\u0445",
		DataSourceSchema: "\u041E\u0431\u044A\u0435\u043A\u0442, \u0438\u0437 \u043A\u043E\u0442\u043E\u0440\u043E\u0433\u043E \u0447\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435",
		DataSourceCaption: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445",
		PrimaryColumnBindTo: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B, \u0432 \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u0435\u0440\u0435\u0434\u0430\u0435\u0442\u0441\u044F \u0442\u0435\u043A\u0443\u0449\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C",
		NewParameterSuffix: " (\u041D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440)"
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "DataSourcePropertiesPage",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "DataSourcePropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "bcf2d4125a9751584d37cd8d0be121ca",
				resourceItemExtension: ".svg"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "DataSourcePropertiesPage",
				resourceItemName: "ProcessButtonImage",
				hash: "9903e902413ee697cc93f90b0ba60b42",
				resourceItemExtension: ".png"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "DataSourcePropertiesPage",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});