define("ElementDataSourceViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Caption: "Page elements",
		WidgetInNewSectionWarning: "Before add a widget, save the current changes of section designer",
		NewFieldsDisabledMessage: "This elements is not available",
		WidgetsCaption: "Widgets",
		ElementsCaption: "Elements",
		NewColumnCaption: "New column",
		ExistingColumnsCaption: "Existing columns"
	};
	var localizableImages = {
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "ElementDataSourceViewModel",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		},
		DataModelMenuImage: {
			source: 3,
			params: {
				schemaName: "ElementDataSourceViewModel",
				resourceItemName: "DataModelMenuImage",
				hash: "df03c3177a972b7f3b6987430f988ca3",
				resourceItemExtension: ".svg"
			}
		},
		DataModelImage: {
			source: 3,
			params: {
				schemaName: "ElementDataSourceViewModel",
				resourceItemName: "DataModelImage",
				hash: "1b803497f291af03c0f61ca7fc67c995",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});