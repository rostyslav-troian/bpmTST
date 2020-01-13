define("DashboardListedGridViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		MultiLineCaption: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C \u043C\u043D\u043E\u0433\u043E\u0441\u0442\u0440\u043E\u0447\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442",
		OneLineCaption: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C \u0442\u0435\u043A\u0441\u0442 \u0432 \u043E\u0434\u043D\u0443 \u0441\u0442\u0440\u043E\u043A\u0443",
		LoadMoreButtonCaption: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435",
		ExportToExcelCaption: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0432 Excel"
	};
	var localizableImages = {
		FullScreenImg: {
			source: 3,
			params: {
				schemaName: "DashboardListedGridViewModel",
				resourceItemName: "FullScreenImg",
				hash: "77c5f8c0e5f06fafa63383a812d8ed93",
				resourceItemExtension: ".svg"
			}
		},
		Settings: {
			source: 3,
			params: {
				schemaName: "DashboardListedGridViewModel",
				resourceItemName: "Settings",
				hash: "fe36cfab3b2a4678c406b8e54197a9b3",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});