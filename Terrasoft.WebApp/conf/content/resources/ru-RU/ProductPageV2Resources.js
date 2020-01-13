define("ProductPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F",
		FilesTabCaption: "\u0424\u0430\u0439\u043B\u044B \u0438 \u043F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u044F",
		PriceGroupCaption: "\u0426\u0435\u043D\u0430",
		PricesTabCaption: "\u0426\u0435\u043D\u044B \u0438 \u043E\u0441\u0442\u0430\u0442\u043A\u0438",
		CategoryGroupCaption: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F",
		BasePriceGroupCaption: "\u0411\u0430\u0437\u043E\u0432\u0430\u044F \u0446\u0435\u043D\u0430",
		SpecificationTabCaption: "\u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438",
		CodeTip: "\u041A\u043E\u0434 \u0434\u043B\u044F \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430. \u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0435\u0441\u043B\u0438 \u0434\u0432\u0430 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430 \u0438\u043C\u0435\u044E\u0442 \u043E\u0434\u0438\u043D\u0430\u043A\u043E\u0432\u044B\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F ",
		UrlTip: "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0440\u0435\u0441\u0443\u0440\u0441, \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0439 \u0441 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u043C, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u043D\u0430 \u0435\u0433\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0432 \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0435 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0430 \u0438\u043B\u0438 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044F",
		OwnerTip: "\u0424\u0418\u041E \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430. \u0412\u044B\u0431\u043E\u0440 \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432, \u043F\u043E \u043A\u043E\u0442\u043E\u0440\u044B\u043C \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u044B",
		IsArchiveTip: "\u041F\u0440\u0438\u0437\u043D\u0430\u043A \u0434\u043B\u044F \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u0430, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043D\u0435 \u0434\u043E\u043B\u0436\u0435\u043D \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0442\u044C\u0441\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C. \u0410\u0440\u0445\u0438\u0432\u043D\u044B\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u044B \u043D\u0435 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u044E\u0442\u0441\u044F \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u043F\u043E\u0434\u0431\u043E\u0440\u0430 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432"
	};
	var localizableImages = {
		TagButtonIcon: {
			source: 3,
			params: {
				schemaName: "ProductPageV2",
				resourceItemName: "TagButtonIcon",
				hash: "749c444773b4d39e64c4f6938fdf6d76",
				resourceItemExtension: ".svg"
			}
		},
		DefaultPhoto: {
			source: 3,
			params: {
				schemaName: "ProductPageV2",
				resourceItemName: "DefaultPhoto",
				hash: "1ee9c021f5b1fb640064c7292634d10f",
				resourceItemExtension: ".png"
			}
		},
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "ProductPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ProductPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "ProductPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "ProductPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "ProductPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "ProductPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "ProductPageV2",
				resourceItemName: "OpenChangeLogBtnImage",
				hash: "cbebcb32589828e1055caf62150ff717",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});