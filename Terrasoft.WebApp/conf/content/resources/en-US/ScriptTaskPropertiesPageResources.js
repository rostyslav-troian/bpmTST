define("ScriptTaskPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ProcessInformationText: "Executes C# script. The script is specified in the process element properties.\n\nUse this element to implement custom logic. \u003Ca href=\u0022#\u0022 data-context-help-code=\u0022ScriptTaskPropertiesPage\u0022\u003ERead more...\u003C\/a\u003E",
		ShowFindWindowButtonHint: "Search",
		ShowWhitespacesButtonHint: "Show white space",
		ExpandButtonHint: "Expand (F2)",
		CollapseButtonHint: "Collapse (F2)",
		UseFlowEngineScriptVersionCaption: "For interpreted process",
		UseFlowEngineScriptVersionHint: "The logic of working with process parameters was changed for interpretable processes. To work with parameters, use \u0022Set\u0022 and \u0022Get\u0022 methods"
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "ScriptTaskPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "ScriptTaskPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "ScriptTaskPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		SearchImage: {
			source: 3,
			params: {
				schemaName: "ScriptTaskPropertiesPage",
				resourceItemName: "SearchImage",
				hash: "da3e9f4b62b8b5c641fe96f4f379c007",
				resourceItemExtension: ".png"
			}
		},
		ShowWhitespacesImage: {
			source: 3,
			params: {
				schemaName: "ScriptTaskPropertiesPage",
				resourceItemName: "ShowWhitespacesImage",
				hash: "0308425530ae1241a451640f338679ed",
				resourceItemExtension: ".png"
			}
		},
		ExpandImage: {
			source: 3,
			params: {
				schemaName: "ScriptTaskPropertiesPage",
				resourceItemName: "ExpandImage",
				hash: "52a94ac716e7fe0427adfbc7f55e1fdf",
				resourceItemExtension: ".png"
			}
		},
		CollapseImage: {
			source: 3,
			params: {
				schemaName: "ScriptTaskPropertiesPage",
				resourceItemName: "CollapseImage",
				hash: "a59cb1bdc2a11f785d8f7f61a7674f50",
				resourceItemExtension: ".png"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "ScriptTaskPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});