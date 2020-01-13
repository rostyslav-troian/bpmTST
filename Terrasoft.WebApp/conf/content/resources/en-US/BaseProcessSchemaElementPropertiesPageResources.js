define("BaseProcessSchemaElementPropertiesPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SaveButtonCaption: "Save",
		CloseButtonCaption: "Close",
		NameCaption: "Code",
		CaptionCaption: "Title",
		ElementPropertyNotFoundExceptionMessage: "Property \u0027{0}\u0027 not found in item \u0027{1}\u0027",
		ProcessInformationText: "Hint",
		DescriptionCaption: "Description",
		SettingsTabCaption: "Settings",
		PrimaryModeCaption: "Primary mode",
		ExtendedModeCaption: "Advanced mode",
		EditMenuItemCaption: "Edit",
		DeleteMenuItemCaption: "Delete",
		DuplicateNameMessage: "Element with this code already exists.",
		WrongNameMessage: "Invalid value. Use symbols: a-z, A-Z, 0-9. \u003C\/br\u003E Symbol: 0-9 cannot be first.",
		InavalidMappingColumn: "Invalid formula",
		DuplicateParameterNameMessage: "Parameter with this code already exists."
	};
	var localizableImages = {
		CloseButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseProcessSchemaElementPropertiesPage",
				resourceItemName: "CloseButtonImage",
				hash: "c5d6edb4bb180f8b30301d3dca7a12d8",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseProcessSchemaElementPropertiesPage",
				resourceItemName: "ToolsButtonImage",
				hash: "67b9187f776eb0c57c20bd86b63d4efc",
				resourceItemExtension: ".svg"
			}
		},
		InfoButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseProcessSchemaElementPropertiesPage",
				resourceItemName: "InfoButtonImage",
				hash: "f67a1328d14dbc7091cc94589d7d2148",
				resourceItemExtension: ".svg"
			}
		},
		AddButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseProcessSchemaElementPropertiesPage",
				resourceItemName: "AddButtonImage",
				hash: "7bc1980b519205382d39ea022bd498f8",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});