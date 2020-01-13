define("DcmSchemaDesignerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "Save",
		SaveButtonHint: "Save Case (Ctrl\u002BS)",
		ActionsButtonCaption: "Actions",
		CasePropertiesButtonHint: "Case properties",
		CloseButtonCaption: "Cancel"
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