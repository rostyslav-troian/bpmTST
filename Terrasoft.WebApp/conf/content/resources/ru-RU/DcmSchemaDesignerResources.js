define("DcmSchemaDesignerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		SaveButtonHint: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043A\u0435\u0439\u0441 (Ctrl\u002BS)",
		ActionsButtonCaption: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
		CasePropertiesButtonHint: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043A\u0435\u0439\u0441\u0430",
		CloseButtonCaption: "\u041E\u0442\u043C\u0435\u043D\u0430"
	};
	var localizableImages = {
		DcmSchemaPropertiesPageIcon: {
			source: 3,
			params: {
				schemaName: "DcmSchemaDesigner",
				resourceItemName: "DcmSchemaPropertiesPageIcon",
				hash: "1c692bebe077a8bc492f67b33ec126c5",
				resourceItemExtension: ".svg"
			}
		},
		DcmHelpIcon: {
			source: 3,
			params: {
				schemaName: "DcmSchemaDesigner",
				resourceItemName: "DcmHelpIcon",
				hash: "af6d4a1b2a603fa5cb0ff29931698bf8",
				resourceItemExtension: ".svg"
			}
		},
		DcmFeedIcon: {
			source: 3,
			params: {
				schemaName: "DcmSchemaDesigner",
				resourceItemName: "DcmFeedIcon",
				hash: "496d70ca6247c6a7a6deddf69df2d203",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});