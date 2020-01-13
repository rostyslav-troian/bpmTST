define("ContentItemPanelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ContentElementInfoText: "Block is used for inner section (rows) organization, styling of sections wrapping and dynamic content configuration. \u003Ca href=\u0022{0}\u0022 data-context-help-code=\u0022ContentDesigner\u0022 target=\u0022_blank\u0022\u003ERead more\u003C\/a\u003E",
		ContentElementCaption: "Content block settings",
		StyleTabCaption: "Style",
		DynamicBlockTabCaption: "Dynamic content",
		DynamicSegmentsTabCapion: "Rules",
		StructureTabCaption: "Structure",
		ContentMjBlockElementCaption: "Block"
	};
	var localizableImages = {
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "ContentItemPanel",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		ContentItemButtonImage: {
			source: 3,
			params: {
				schemaName: "ContentItemPanel",
				resourceItemName: "ContentItemButtonImage",
				hash: "ac3f6029b06a1bcbaf468e268eed3b6e",
				resourceItemExtension: ".svg"
			}
		},
		ContentMjBlockPanelIcon: {
			source: 3,
			params: {
				schemaName: "ContentItemPanel",
				resourceItemName: "ContentMjBlockPanelIcon",
				hash: "f8932e2ac51e49f641db5e18062033a2",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});