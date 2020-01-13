define("ForecastSectionResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "\u041F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
		TabsDataViewHint: "\u041F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
		DashboardsDataViewHint: "\u0418\u0442\u043E\u0433\u0438",
		BlankSlateDescription: "\u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F\n\n\u041C\u044B \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0440\u0430\u0437\u0434\u0435\u043B \u041F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0445 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430\u0445:\nChrome       Firefox       Safari",
		AddButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
		CopyButtonCaption: "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
		EditButtonCaption: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",
		DeleteButtonCaption: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
		RightsButtonCaption: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043F\u0440\u0430\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430",
		DeleteConfirmationMessage: "\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0435\u0435 \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435?",
		NotEnoughRightsMessage: "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043F\u0440\u0430\u0432 \u0434\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u044D\u0442\u043E\u0439 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438",
		NoDashboardsAvailable: "\u0412 \u0441\u0438\u0441\u0442\u0435\u043C\u0435 \u043D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0432\u0430\u043C \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0439",
		CopySuffix: "\u041A\u043E\u043F\u0438\u044F",
		ExistForecastItemsCanNotDeleteMessage: "\u0414\u0430\u043D\u043D\u043E\u0435 \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B, \u0434\u043B\u044F \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0443 \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043F\u0440\u0430\u0432. \u041E\u043F\u0435\u0440\u0430\u0446\u0438\u044F \u043E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u0430",
		MessageTitle: "\u0412 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u043D\u0435\u0442 \u043D\u0438 \u043E\u0434\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438.",
		MessageAction: "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043D\u043E\u0432\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C, \u0438 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u043D\u0435 \u0431\u0443\u0434\u0435\u0442 \u0442\u0430\u043A \u043E\u0434\u0438\u043D\u043E\u043A\u043E.",
		MessageReference: "\u003Cdiv {inputId} id = {id}\u003E\u0410 \u0442\u0430\u043A\u0436\u0435 \u0443\u0437\u043D\u0430\u0439\u0442\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043E \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u0432  \u003Ca href=\u0027{caption}\u0027 target=\u0027_blank\u0027\u003E\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u0438.\u003C\/a\u003E\u003C\/div\u003E",
		ConfigurationButtonHint: "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435"
	};
	var localizableImages = {
		TabsDataViewIcon: {
			source: 3,
			params: {
				schemaName: "ForecastSection",
				resourceItemName: "TabsDataViewIcon",
				hash: "12f77829d9767e323f3647457abf613a",
				resourceItemExtension: ".svg"
			}
		},
		AnalyticsDataViewIcon: {
			source: 3,
			params: {
				schemaName: "ForecastSection",
				resourceItemName: "AnalyticsDataViewIcon",
				hash: "58d3027ef6c189ae1dd2c620dd8fd5aa",
				resourceItemExtension: ".svg"
			}
		},
		Settings: {
			source: 3,
			params: {
				schemaName: "ForecastSection",
				resourceItemName: "Settings",
				hash: "77249d9f935f58f4b097ef1732b93a2d",
				resourceItemExtension: ".svg"
			}
		},
		EmptyInfoImage: {
			source: 3,
			params: {
				schemaName: "ForecastSection",
				resourceItemName: "EmptyInfoImage",
				hash: "84410c143d7a4e3bfdbeda3db0408fca",
				resourceItemExtension: ".png"
			}
		},
		AddTabIcon: {
			source: 3,
			params: {
				schemaName: "ForecastSection",
				resourceItemName: "AddTabIcon",
				hash: "1aea6fefe0b08a031ab295b1a3967883",
				resourceItemExtension: ".svg"
			}
		},
		EditTabIcon: {
			source: 3,
			params: {
				schemaName: "ForecastSection",
				resourceItemName: "EditTabIcon",
				hash: "283998924ca5aa5b730efa663e53a142",
				resourceItemExtension: ".svg"
			}
		},
		DeleteTabIcon: {
			source: 3,
			params: {
				schemaName: "ForecastSection",
				resourceItemName: "DeleteTabIcon",
				hash: "b9ab039c48b90a0e614704165da3272a",
				resourceItemExtension: ".svg"
			}
		},
		BlankSlateIcon: {
			source: 3,
			params: {
				schemaName: "ForecastSection",
				resourceItemName: "BlankSlateIcon",
				hash: "addbd12b1b53bcb56b1580c71598f4e6",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});