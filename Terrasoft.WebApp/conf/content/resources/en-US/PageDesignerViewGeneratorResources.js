define("PageDesignerViewGeneratorResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DeleteDetail: "Delete",
		InheritedVisibilityDetailMessage: "Detail visibility is controlled by page logic. For more information, please contact your system administrator."
	};
	var localizableImages = {
		Edit: {
			source: 3,
			params: {
				schemaName: "PageDesignerViewGenerator",
				resourceItemName: "Edit",
				hash: "8f441a2b861d5114cbf2f5a753eff766",
				resourceItemExtension: ".png"
			}
		},
		Delete: {
			source: 3,
			params: {
				schemaName: "PageDesignerViewGenerator",
				resourceItemName: "Delete",
				hash: "42b5b815fe5ef39879666f4595bd892b",
				resourceItemExtension: ".png"
			}
		},
		Add: {
			source: 3,
			params: {
				schemaName: "PageDesignerViewGenerator",
				resourceItemName: "Add",
				hash: "6e4b403aef18ffd56bb550e455626d7e",
				resourceItemExtension: ".png"
			}
		},
		RelatedModuleImage: {
			source: 3,
			params: {
				schemaName: "PageDesignerViewGenerator",
				resourceItemName: "RelatedModuleImage",
				hash: "aec782e1efa10099507b3bad6aed132d",
				resourceItemExtension: ".svg"
			}
		},
		ActionDashboardImage: {
			source: 3,
			params: {
				schemaName: "PageDesignerViewGenerator",
				resourceItemName: "ActionDashboardImage",
				hash: "5cb74bffc9be77d1335f21457b0c4dde",
				resourceItemExtension: ".svg"
			}
		},
		Remove: {
			source: 3,
			params: {
				schemaName: "PageDesignerViewGenerator",
				resourceItemName: "Remove",
				hash: "7ee86697632396f12e22dc2a170d7c0f",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});