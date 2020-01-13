define("ForecastSectionResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "Forecasts",
		TabsDataViewHint: "Forecasts",
		DashboardsDataViewHint: "Dashboards",
		BlankSlateDescription: "Browser is not supported\n\nWe recommend using Forecasts section with one of the following browsers:\nChrome       Firefox       Safari",
		AddButtonCaption: "New",
		CopyButtonCaption: "Copy",
		EditButtonCaption: "Edit",
		DeleteButtonCaption: "Delete",
		RightsButtonCaption: "Set up access rights",
		DeleteConfirmationMessage: "Delete current forecast?",
		NotEnoughRightsMessage: "Insufficient rights to execute this operation",
		NoDashboardsAvailable: "No forecasts available",
		CopySuffix: "Cc",
		ExistForecastItemsCanNotDeleteMessage: "Insufficient rights to delete some of the items contained in the forecast. Operation rejected",
		MessageTitle: "This section has no records.",
		MessageAction: "Add a new record to make it look prettier.",
		MessageReference: "\u003Cdiv {inputId} id = {id}\u003ELearn more about this section in our  \u003Ca href=\u0027{caption}\u0027 target=\u0027_blank\u0027\u003EAcademy.\u003C\/a\u003E\u003C\/div\u003E",
		ConfigurationButtonHint: "Configuration button"
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