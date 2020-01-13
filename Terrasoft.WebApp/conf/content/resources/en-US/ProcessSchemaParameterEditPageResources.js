define("ProcessSchemaParameterEditPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		WrongParameterNameMessage: "Invalid value. Use symbols: a-z, A-Z, 0-9. \u003C\/br\u003E Symbol: 0-9 cannot be first.",
		DuplicateParameterNameMessage: "Parameter with this code already exists.",
		CodeCaption: "Code",
		TitleCaption: "Title",
		LookupCaption: "Lookup",
		DataValueTypeCaption: "Data type",
		ValueCaption: "Value",
		ValuePlaceHolderCaption: "Select value",
		CancelButtonCaption: "Cancel",
		SaveButtonCaption: "Save",
		DuplicateParameterCaptionMessage: "Parameter with this title already exists.",
		DuplicateElementNameMessage: "Element with this code already exists."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});