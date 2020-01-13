define("DashboardManagerItemResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CopyCaptionFormat: "{0} - \u041A\u043E\u043F\u0438\u044F",
		InvalidJSONMessage: "\u041F\u0440\u0438 \u0438\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u0438\u0442\u043E\u0433\u0430 \u0022{0}\u0022 \u0432\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u0022{1}\u0022",
		CantShowDashboard: "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u043E\u0442\u043E\u0431\u0440\u0430\u0437\u0438\u0442\u044C \u0438\u0442\u043E\u0433",
		CantShowDashboardHint: "\u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u043A \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u043C\u0443 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0443"
	};
	var localizableImages = {
		InfoImage: {
			source: 3,
			params: {
				schemaName: "DashboardManagerItem",
				resourceItemName: "InfoImage",
				hash: "84410c143d7a4e3bfdbeda3db0408fca",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});