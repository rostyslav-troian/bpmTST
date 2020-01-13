define("BaseServiceParameterGridResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		CaptionColumn: "Name",
		DataValueTypeNameColumn: "Type",
		DefaultValueColumn: "Default value",
		SingleModeMenuCaption: "Cancel multiple selection",
		MultiModeMenuCaption: "Select multiple records",
		SelectAllButtonCaption: "Select all",
		UnselectAllButtonCaption: "Deselect all"
	};
	var localizableImages = {
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseServiceParameterGrid",
				resourceItemName: "ToolsButtonImage",
				hash: "48d545549ca4ddb13d7a7bb58f60ed5e",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});