define("DynamicContentValidatorResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		RulesWithEmptyFilterMessage: "The following dynamic content rules do not have any filters configured: {0}. The content configured for these rules will be sent to all recipients",
		NoDefaultContentMessage: "Email template does not contain default rule for any dynamic content block. \u0022Canceled (template not found)\u0022 response will be set for not segmented recipients"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});