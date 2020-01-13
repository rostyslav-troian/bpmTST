define("SourceCodeEditPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ShowFindWindowButtonHint: "Search",
		ShowWhitespacesButtonHint: "Show white space",
		ExpandButtonHint: "Expand (F2)",
		CollapseButtonHint: "Collapse (F2)",
		UseFlowEngineBodyHint: "The logic of working with process parameters was changed for interpretable processes. To work with parameters, use \u0022Set\u0022 and \u0022Get\u0022 methods. \u003Cbr\/\u003E\u003Ca href=\u0022#\u0022 data-context-help-code=\u0022ScriptTaskPropertiesPage\u0022\u003ERead more...\u003C\/a\u003E"
	};
	var localizableImages = {
		SearchImage: {
			source: 3,
			params: {
				schemaName: "SourceCodeEditPage",
				resourceItemName: "SearchImage",
				hash: "da3e9f4b62b8b5c641fe96f4f379c007",
				resourceItemExtension: ".png"
			}
		},
		ShowWhitespacesImage: {
			source: 3,
			params: {
				schemaName: "SourceCodeEditPage",
				resourceItemName: "ShowWhitespacesImage",
				hash: "0308425530ae1241a451640f338679ed",
				resourceItemExtension: ".png"
			}
		},
		ExpandImage: {
			source: 3,
			params: {
				schemaName: "SourceCodeEditPage",
				resourceItemName: "ExpandImage",
				hash: "52a94ac716e7fe0427adfbc7f55e1fdf",
				resourceItemExtension: ".png"
			}
		},
		CollapseImage: {
			source: 3,
			params: {
				schemaName: "SourceCodeEditPage",
				resourceItemName: "CollapseImage",
				hash: "a59cb1bdc2a11f785d8f7f61a7674f50",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});