define("ContentItemPanelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ContentElementInfoText: "\u0411\u043B\u043E\u043A \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0434\u043B\u044F \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0441\u0435\u043A\u0446\u0438\u0439 (\u0441\u0442\u0440\u043E\u043A), \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u0441\u0442\u0438\u043B\u0435\u0439 \u0434\u043B\u044F \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u0430 \u0441\u0435\u043A\u0446\u0438\u0439, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0434\u043B\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0434\u0438\u043D\u0430\u043C\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022ContentDesigner\u0022 target=\u0022_blank\u0022\u003E\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u0435\u0435\u003C\/a\u003E",
		ContentElementCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0431\u043B\u043E\u043A\u0430 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430",
		StyleTabCaption: "\u0421\u0442\u0438\u043B\u044C",
		DynamicBlockTabCaption: "\u0414\u0438\u043D\u0430\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442",
		DynamicSegmentsTabCapion: "\u041F\u0440\u0430\u0432\u0438\u043B\u0430",
		StructureTabCaption: "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430",
		ContentMjBlockElementCaption: "\u0411\u043B\u043E\u043A"
	};
	var localizableImages = {
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "ContentItemPanel",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		ContentItemButtonImage: {
			source: 3,
			params: {
				schemaName: "ContentItemPanel",
				resourceItemName: "ContentItemButtonImage",
				hash: "385dc766273e167f8c9a86f466c57ec8",
				resourceItemExtension: ".svg"
			}
		},
		ContentMjBlockPanelIcon: {
			source: 3,
			params: {
				schemaName: "ContentItemPanel",
				resourceItemName: "ContentMjBlockPanelIcon",
				hash: "f8932e2ac51e49f641db5e18062033a2",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});