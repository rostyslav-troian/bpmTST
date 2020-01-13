define("GaugeDesignerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WidgetDesignerCaption: "\u0414\u0438\u0437\u0430\u0439\u043D\u0435\u0440 \u0448\u043A\u0430\u043B\u044B",
		NewWidget: "\u041D\u043E\u0432\u0430\u044F \u0448\u043A\u0430\u043B\u0430",
		MinCaption: "\u041C\u0438\u043D\u0438\u043C\u0443\u043C",
		MiddleFromCaption: "\u0421\u0440\u0435\u0434\u043D\u0435\u0435 \u043E\u0442",
		MiddleToCaption: "\u0421\u0440\u0435\u0434\u043D\u0435\u0435 \u0434\u043E",
		MaxCaption: "\u041C\u0430\u043A\u0441\u0438\u043C\u0443\u043C",
		OrderDirectionCaption: "\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F",
		StyleCaption: "\u0421\u0442\u0438\u043B\u044C",
		AscendingOrder: "\u0427\u0435\u043C \u0431\u043E\u043B\u044C\u0448\u0435, \u0442\u0435\u043C \u043B\u0443\u0447\u0448\u0435",
		DescendingOrder: "\u0427\u0435\u043C \u043C\u0435\u043D\u044C\u0448\u0435, \u0442\u0435\u043C \u043B\u0443\u0447\u0448\u0435",
		ScaleCaption: "\u0428\u043A\u0430\u043B\u0430"
	};
	var localizableImages = {
		ScaleUpIcon: {
			source: 3,
			params: {
				schemaName: "GaugeDesigner",
				resourceItemName: "ScaleUpIcon",
				hash: "0554a8df2cd803c93a19be71bcbf842e",
				resourceItemExtension: ".png"
			}
		},
		ScaleDownIcon: {
			source: 3,
			params: {
				schemaName: "GaugeDesigner",
				resourceItemName: "ScaleDownIcon",
				hash: "33114220e0908c122acdf81d3509d163",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});