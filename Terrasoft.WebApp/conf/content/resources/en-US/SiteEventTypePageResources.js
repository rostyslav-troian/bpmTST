define("SiteEventTypePageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GeneralInfoTabCaption: "Event tracking setup",
		WebsiteEventTypeCaption: "Website event type",
		IsActiveCaption: "Active",
		SelectorTypeCaption: "How to identify elements",
		IdentifierCaption: "Element identifier",
		PageUrlCaption: "Page URL",
		IdentifierIdHint: "Input a unique ID from your HTML for the element you would like to track.",
		PageUrlHint: "Input here a webpage URL. Every page visit will be tracked.",
		IdentifierClassHint: "Input a class from your HTML for the element you would like to track.",
		IdentifierSelectorHint: "Input a jQuery selector from your HTML for the element you would like to track."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});