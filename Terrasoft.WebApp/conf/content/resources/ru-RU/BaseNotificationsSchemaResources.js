define("BaseNotificationsSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EmptyResultTitle: "",
		EmptyResultMessage: "",
		ContextHelpCode: "",
		ContextHelpId: "",
		ObsoleteDecorateItemMethodMessage: "",
		ObsoleteRemoveColumnsMethodMessage: "\u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u0435 \u043C\u0435\u0442\u043E\u0434\u043E\u0432: addColumns, addFilters"
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