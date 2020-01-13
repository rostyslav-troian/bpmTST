define("ActivityPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		StatusGroupCaption: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435",
		RemindingGroupCaption: "\u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F",
		BoundGroupCaption: "\u0421\u0432\u044F\u0437\u0438",
		StartDateGreaterDueDate: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u0022\u041D\u0430\u0447\u0430\u043B\u043E\u0022 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u044F \u0022\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u0435\u0022",
		RemindToOwnerCaption: "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u043C\u0443",
		RemindToAuthorCaption: "\u0410\u0432\u0442\u043E\u0440\u0443",
		ActivityParticipantDetailCaption: "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438",
		ResultGroupCaption: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442",
		OkResultButtonCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		CancelResultButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		DetailedResultCaption: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u043F\u043E\u0434\u0440\u043E\u0431\u043D\u043E"
	};
	var localizableImages = {
		greenResultIcon: {
			source: 3,
			params: {
				schemaName: "ActivityPage",
				resourceItemName: "greenResultIcon",
				hash: "b76c66a0efb7d88d836ebc0bc9812bd6",
				resourceItemExtension: ".png"
			}
		},
		greyResultIcon: {
			source: 3,
			params: {
				schemaName: "ActivityPage",
				resourceItemName: "greyResultIcon",
				hash: "d50b4187a3f3b2a6126cb51b42fd0fea",
				resourceItemExtension: ".png"
			}
		},
		redResultIcon: {
			source: 3,
			params: {
				schemaName: "ActivityPage",
				resourceItemName: "redResultIcon",
				hash: "bd6a921bb73a52dc777393df827f0853",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});