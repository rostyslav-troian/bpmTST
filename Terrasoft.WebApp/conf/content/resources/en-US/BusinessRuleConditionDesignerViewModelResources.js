define("BusinessRuleConditionDesignerViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		InvalidFieldMessage: "Field \u201C{0}\u201D not found. Please check the field code. Also, please ensure that the page with the specified field has been saved in the Section wizard.",
		LeftExpressionIsEmptyMessage: "Left part of the business rule condition is not completely defined",
		RightExpressionIsEmptyMessage: "Right part of the business rule condition is not completely defined",
		ComparisonTypeIsEmptyMessage: "Choose comparison type in business rule condition",
		FillPageSchemaWarning: "Field \u0022Execute on page\u0022: Enter a value"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});