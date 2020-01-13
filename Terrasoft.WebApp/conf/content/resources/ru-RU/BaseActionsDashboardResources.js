define("BaseActionsDashboardResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DashboardTabCaptionPattern: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0435 \u0448\u0430\u0433\u0438 ({0})",
		HideItemsCaption: "\u0441\u043A\u0440\u044B\u0442\u044C",
		ShowAllItemsCaption: "\u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435",
		BlankSlateDescription: "\u0423 \u0432\u0430\u0441 \u0435\u0449\u0435 \u043D\u0435\u0442 \u0437\u0430\u0434\u0430\u0447\u003Cp\u003E\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u003Cimg src=\u0022{0}\u0022 \u003E \u0432\u044B\u0448\u0435, \u0447\u0442\u043E\u0431\u044B \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443"
	};
	var localizableImages = {
		LoadMoreIcon: {
			source: 3,
			params: {
				schemaName: "BaseActionsDashboard",
				resourceItemName: "LoadMoreIcon",
				hash: "010a38d79ad1acb4726eb1dae1d7f14c",
				resourceItemExtension: ".png"
			}
		},
		LoadLessIcon: {
			source: 3,
			params: {
				schemaName: "BaseActionsDashboard",
				resourceItemName: "LoadLessIcon",
				hash: "0cc781465d0612a537eb2861edf18706",
				resourceItemExtension: ".png"
			}
		},
		BlankSlateImage: {
			source: 3,
			params: {
				schemaName: "BaseActionsDashboard",
				resourceItemName: "BlankSlateImage",
				hash: "71ca1e06fc6c5119c41da0b69a1d3196",
				resourceItemExtension: ".svg"
			}
		},
		FlagGreyImage: {
			source: 3,
			params: {
				schemaName: "BaseActionsDashboard",
				resourceItemName: "FlagGreyImage",
				hash: "de5ec586cf912d75ae03e3a3071b3252",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});