define("ViewModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ScrollTopCaption: "",
		RemindingMenuItemCaption: "",
		ProcessPageCaption: "",
		DownloadCaption: "",
		BuyNowUrl: "",
		OnlineHelpUrl: ""
	};
	var localizableImages = {
		scrollTopImage: {
			source: 3,
			params: {
				schemaName: "ViewModule",
				resourceItemName: "scrollTopImage"
			}
		},
		OnlineHelpRU: {
			source: 3,
			params: {
				schemaName: "ViewModule",
				resourceItemName: "OnlineHelpRU"
			}
		},
		OnlineHelpGB: {
			source: 3,
			params: {
				schemaName: "ViewModule",
				resourceItemName: "OnlineHelpGB"
			}
		},
		BuyNowRU: {
			source: 3,
			params: {
				schemaName: "ViewModule",
				resourceItemName: "BuyNowRU"
			}
		},
		BuyNowGB: {
			source: 3,
			params: {
				schemaName: "ViewModule",
				resourceItemName: "BuyNowGB"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});