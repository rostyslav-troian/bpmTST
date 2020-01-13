define("BaseNotificationsSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmptyResultTitle: "",
		EmptyResultMessage: "",
		ContextHelpCode: "",
		ContextHelpId: "",
		ObsoleteDecorateItemMethodMessage: "",
		ObsoleteRemoveColumnsMethodMessage: "extension methods addColumns or addFilters"
	};
	var localizableImages = {
		EmptyResultImage: {
			source: 3,
			params: {
				schemaName: "BaseNotificationsSchema",
				resourceItemName: "EmptyResultImage"
			}
		},
		DefaultRemindingIcon: {
			source: 3,
			params: {
				schemaName: "BaseNotificationsSchema",
				resourceItemName: "DefaultRemindingIcon",
				hash: "fc25e15a25188b310d43e0d790d71956",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});