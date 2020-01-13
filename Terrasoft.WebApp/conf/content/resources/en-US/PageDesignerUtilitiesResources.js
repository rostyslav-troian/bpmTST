define("PageDesignerUtilitiesResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "Save",
		CancelButtonCaption: "Cancel",
		LookupNewCaption: "New lookup",
		UseListViewCaption: "Display as drop-down list",
		NewColumnWindowHeaderCaption: "New column",
		StyleCaption: "Style",
		HideLookupCaptionLabel: "Hide caption",
		TextSizeLabel: "Text size",
		TitleCaption: "Title",
		NameCaption: "Name",
		StringLengthCaption: "String length",
		IsMultilineCaption: "Multiline",
		IsRequiredCaption: "Is required",
		FloatTypeCaption: "Decimals",
		DateTypeCaption: "Format",
		PrefixMask: "The following prefix will automatically be added to the name",
		GroupHeaderCaption: "Fields group setting",
		DetailObjectColumnCaption: "Object column",
		DetailHeaderCaption: "Detail setting",
		DetailObjectCaption: "Detail object",
		DetailColumnsCaption: "Detail column",
		DetailNameCaption: "Detail",
		ValidatorInfo: "Specify the value",
		SelectColumn: "Select column",
		Column: "Column",
		TabsHeaderCaption: "Tabs setup",
		WrongPrefixMessage: "Name must contain prefix \u0022{0}\u0022",
		WrongSchemaNameMessage: "Name is not available",
		WrongMessageExistSchem: "Schema with this name already exists",
		DownButtonCaption: "Down",
		UpButtonCaption: "Up",
		CodeCaption: "Code",
		AddButtonCaption: "New",
		InvalidRequireMessage: "Specify the value",
		DuplicatedItemNameMessage: "An item with the same name already exists",
		DuplicatedColumnNameMessage: "Column with this name already exists",
		ShowCodeButtonCaption: "Show code",
		HideCodeButtonCaption: "Hide code",
		LookupExistedCaption: "Existing lookup",
		StandardTextSizeCaption: "Text",
		LargeTextSizeCaption: "Title",
		DefaultCaption: "Default",
		IsReadOnlyCaption: "Read-only",
		SaveColumnWarning: "Specific logic is provided for some column properties. When saving, this logic will be replaced. Save?",
		BusinessLogicMessage: "Value is defined according to business logic"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "PageDesignerUtilities",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});