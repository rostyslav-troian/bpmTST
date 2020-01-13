define("ChartModuleExResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DrillDownCaption: "Drill down the item",
		ShowDataCaption: "Display data",
		ChartChangeTypeCaption: "Change chart type",
		SetupGridMenuCaption: "Select fields to display",
		SortMenuCaption: "Sort by",
		LoadMoreButtonCaption: "Show more",
		ExportListToFileButtonCaption: "Export list to file",
		BooleanFieldTrueCaption: "Yes",
		BooleanFieldFalseCaption: "No"
	};
	var localizableImages = {
		DrillHome: {
			source: 3,
			params: {
				schemaName: "ChartModuleEx",
				resourceItemName: "DrillHome",
				hash: "ac7f3e129228702b06183b30b857975f",
				resourceItemExtension: ".png"
			}
		},
		DrillUp: {
			source: 3,
			params: {
				schemaName: "ChartModuleEx",
				resourceItemName: "DrillUp",
				hash: "fe58094e1e8cc2f4b8fb215a0113b92b",
				resourceItemExtension: ".png"
			}
		},
		Settings: {
			source: 3,
			params: {
				schemaName: "ChartModuleEx",
				resourceItemName: "Settings",
				hash: "e50e2fd7c15f66aec70a7c7eabffd4b9",
				resourceItemExtension: ".png"
			}
		},
		LoadMoreIcon: {
			source: 3,
			params: {
				schemaName: "ChartModuleEx",
				resourceItemName: "LoadMoreIcon",
				hash: "010a38d79ad1acb4726eb1dae1d7f14c",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});