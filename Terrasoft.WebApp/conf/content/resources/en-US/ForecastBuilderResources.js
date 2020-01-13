define("ForecastBuilderResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "Forecasts",
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
		Settings: {
			source: 3,
			params: {
				schemaName: "ForecastBuilder",
				resourceItemName: "Settings",
				hash: "a5df3ed1d5e5511e3e23dc1875cc8769",
				resourceItemExtension: ".png"
			}
		},
		EmptyInfoImage: {
			source: 3,
			params: {
				schemaName: "ForecastBuilder",
				resourceItemName: "EmptyInfoImage",
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