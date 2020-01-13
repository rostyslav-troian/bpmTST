define("ViewModelSchemaValidationMixinResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ViewSchemaSingleRootValidatorMessage: "Schema cannot have more than one root object",
		ViewSchemaRootNameValidatorMessage: "Root object must have name: \u0022{0}\u0022",
		ViewSchemaUniqueNamesValidatorMessage: "Schema must not contain items with the same name.\nDuplicated names found: \\\u0022{0}\\\u0022",
		ViewSchemaModelItemsValidatorMessage: "Schema must not contain model items outside the grid.\nModel item outside the grid: \u0022{0}\u0022",
		ViewSchemaIsJsonFunctionValidatorMessage: "Schema cannot contain function",
		ViewSchemaAbsentParentValidatorMessage: "Element with name \u0022{0}\u0022 has no parent element",
		DuplicatedDiffElementsMessage: "Page contains items with the same name in the schema source code in different containers. Changes of these items may be applied incorrectly. It can be fixed in the source code. ",
		DuplicatedDiffNameMessage: "The name \u0022{0}\u0022 is used by:",
		DuplicatedDiffCaptionPathMessage: "- The item with caption \u0022{0}\u0022 and path {1}",
		DuplicatedDiffPathMessage: "- The item with path {0}"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});