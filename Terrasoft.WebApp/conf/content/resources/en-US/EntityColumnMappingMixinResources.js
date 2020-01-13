define("EntityColumnMappingMixinResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EntityColumnMapping_ColumnValuesLabelCaption: "Which column values to set for modified records?",
		EntityColumnMapping_AddRecordColumnValuesButtonCaption: "Add field",
		EntityColumnMapping_ProcessLookupPageCaption: "Select columns",
		EntityColumnMapping_DeleteMenuItemCaption: "Delete"
	};
	var localizableImages = {
		EntityColumnMapping_AddButtonImage: {
			source: 3,
			params: {
				schemaName: "EntityColumnMappingMixin",
				resourceItemName: "EntityColumnMapping_AddButtonImage",
				hash: "6e4b403aef18ffd56bb550e455626d7e",
				resourceItemExtension: ".png"
			}
		},
		EntityColumnMapping_ToolButtonImage: {
			source: 3,
			params: {
				schemaName: "EntityColumnMappingMixin",
				resourceItemName: "EntityColumnMapping_ToolButtonImage",
				hash: "3d5e85d6687d7d59e9688ca27b702a53",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});