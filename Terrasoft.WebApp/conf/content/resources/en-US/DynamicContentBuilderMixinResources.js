define("DynamicContentBuilderMixinResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AttributeUsedInBlockException: "This rule is used in dynamic content blocks. Please change dynamic block settings before deleting the rule",
		AttributeDeleteWarning: "This dynamic content rule and its filter conditions will be deleted",
		DCAttributeNamePreffix: "Dynamic content rule ",
		BlocksLimitWarning: "Action not allowed. Maximum {0} dynamic block segments for template",
		ReplicasCountLimitWarning: "The maximum number of dynamic content variations in a single template is 30. The 31st variation cannot be added"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});