define("DynamicContentAttributeSettingsPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		FilterConditionSettingsLabel: "Filter condition settings",
		AttributeNameLabel: "Name",
		AttributeFilterLabel: "Set up filter conditions",
		BlankSlateLabelText: "Here you can set up rules for dynamic content",
		FilterLookupButtonCaption: "Select from lookup"
	};
	var localizableImages = {
		BlankSlate: {
			source: 3,
			params: {
				schemaName: "DynamicContentAttributeSettingsPage",
				resourceItemName: "BlankSlate",
				hash: "01f2a5e9b18bdeaa62f321101fa3eabc",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});