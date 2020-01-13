define("ColumnMappingViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectColumnButtonCaption: "Select column",
		AddReferenceSchemaColumnButtonCaption: "Additional contact details",
		InvalidObjectRights: "Insufficient permissions to add record in object \u0022{0}\u0022"
	};
	var localizableImages = {
		EmptyDestinationImage: {
			source: 3,
			params: {
				schemaName: "ColumnMappingViewModel",
				resourceItemName: "EmptyDestinationImage",
				hash: "27a1ecd3f503409fa374ff1fc9dd6d8f",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});