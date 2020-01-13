define("VwMandrillRecipientPageV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		IncorrectEmailMessage: "\u0423\u043A\u0430\u0437\u0430\u043D \u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 email",
		WarningChangeList: "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C, \u0442\u0430\u043A \u043A\u0430\u043A \u0434\u0430\u043D\u043D\u0430\u044F \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0435 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438 \u0022\u0412 \u043F\u043B\u0430\u043D\u0430\u0445\u0022 \u0438\u043B\u0438 \u0022\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430\u0022",
		WarningExistsContact: "\u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0443, \u0442\u0430\u043A \u043A\u0430\u043A \u0432 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0441 \u0442\u0430\u043A\u0438\u043C email.",
		EmailNonActual: "\u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0443, \u0442\u0430\u043A \u043A\u0430\u043A \u0443 \u043D\u0435\u0433\u043E \u043D\u0435\u0442 \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0445 email.\u0410\u043A\u0442\u0443\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0439\u0442\u0435 \u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0430 \u0441\u0432\u044F\u0437\u0438 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430.",
		ContactUnsubscribeMessage: "\u041F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0443, \u0442\u0430\u043A \u043A\u0430\u043A \u043E\u043D \u043E\u0442\u043F\u0438\u0441\u0430\u043D \u043E\u0442 \u0440\u0430\u0441\u0441\u044B\u043B\u043E\u043A \u0441 \u0442\u0438\u043F\u043E\u043C \u0022{0}\u0022."
	};
	var localizableImages = {
		BackButtonImage: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientPageV2",
				resourceItemName: "BackButtonImage",
				hash: "638af7d7df9879b2c8f3b1bb7eb0f788",
				resourceItemExtension: ".png"
			}
		},
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientPageV2",
				resourceItemName: "CloseButtonImage",
				hash: "511593df65946d88744783400c622cdb",
				resourceItemExtension: ".png"
			}
		},
		ProcessButtonImage: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientPageV2",
				resourceItemName: "ProcessButtonImage",
				hash: "b2718527a6bf360a3e641e9cb3a00904",
				resourceItemExtension: ".svg"
			}
		},
		QuickAddButtonImage: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientPageV2",
				resourceItemName: "QuickAddButtonImage",
				hash: "bbcac9c59db676c3f206809cbdbd3244",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataIcon: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientPageV2",
				resourceItemName: "AnalyticsDataIcon",
				hash: "797f9955cfd47e5ca74c16a682de6853",
				resourceItemExtension: ".svg"
			}
		},
		GridSettingsIcon: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientPageV2",
				resourceItemName: "GridSettingsIcon",
				hash: "c4949763b4bc893604fbb2d5d458a028",
				resourceItemExtension: ".svg"
			}
		},
		OpenChangeLogBtnImage: {
			source: 3,
			params: {
				schemaName: "VwMandrillRecipientPageV2",
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