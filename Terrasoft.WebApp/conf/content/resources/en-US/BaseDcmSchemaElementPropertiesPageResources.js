define("BaseDcmSchemaElementPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WhenExecuteElementCaption: "When is the step performed?",
		ExecuteAfterElementCaption: "Perform after step",
		RequiredTypeCaption: "Step type",
		ConditionCaption: "Change stage after element is completed",
		AddCondition: "Add condition",
		IfResultCaption: "If result",
		SetStageToCaption: "Set stage to",
		AddConditionButtonCaption: "Add condition"
	};
	var localizableImages = {
		AddConditionImage: {
			source: 3,
			params: {
				schemaName: "BaseDcmSchemaElementPropertiesPage",
				resourceItemName: "AddConditionImage",
				hash: "c54f23693e5ddb0a10a6757e6d6ecfc2",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});