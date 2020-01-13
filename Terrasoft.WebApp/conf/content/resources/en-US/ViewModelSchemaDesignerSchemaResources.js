define("ViewModelSchemaDesignerSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DesignerAddItemCaption: "New",
		DesignerSaveButtonCaption: "Save",
		DesignerCancelButtonCaption: "Cancel",
		DesignerAddGroupItemCaption: "New fields group",
		DesignerAddDetailItemCaption: "New detail",
		DesignerSortItemCaption: "Change position",
		ExistingFieldsControlGroupCaption: "Add existing column",
		NewFieldsControlGroupCaption: "Add new column",
		DesignerUnregisteredDetailCaption: "Unregistered detail: {0}",
		DesignerDetailCaption: "Detail: {0}",
		DesignerEditControlGroupCaption: "Fields group setting",
		DesignerEditTitleCaption: "Title",
		DesignerEditTabCaption: "Tab setup",
		NotUsedRequiredFieldsMessage: "The following required fields were not added to the page:\n{0}",
		DesignerSettingsButtonCaption: "Admin area",
		DesignerRemoveButtonCaption: "Delete",
		DesignerErrorInfoTitleMessage: "Unable to set up the page.",
		DesignerErrorInfoDescriptionMessage: "Unable to set up this page with wizard. Contact your system administrator",
		NewFieldsDisabledToolTipMessage: "Adding new fields for DB view schemas is not available. Contact your system administrator.",
		NewFieldsDisabledMessage: "This elements is not available",
		NewTabNameModalBox: "New Tab",
		NewWidgetsControlGroupCaption: "Add widget",
		NewWidgetChartCaption: "Chart",
		NewWidgetMetricCaption: "Metric",
		NewWidgetGaugeCaption: "Gauge",
		NewWidgetListCaption: "List",
		NewWidgetPipeLineCaption: "Sales pipeline",
		NewWidgetWebPageCaption: "Web page",
		NewWidgetCustomWidgetCaption: "Custom widget",
		WidgetInNewSectionWarning: "Please save your new section before adding a widget",
		FieldUsedInRulesMessage: "The field is used in business rules:",
		RemoveBusinessRulesButtonCaption: "Remove business rules",
		ColumnIsInheritedMessage: "The field is created in the parent schema and can not be deleted",
		RemoveColumnDesignItemMenuItemCaption: "Delete",
		AddDataModelButton: "Add data source",
		WidgetsCaption: "Widgets",
		NewParameterCaption: "New parameter",
		NewColumnCaption: "New column",
		ExistingColumnsCaption: "Existing columns",
		ExistingParametersCaption: "Existing parameters",
		ElementsCaption: "Elements",
		PageElements: "Page elements",
		DataModelEditMenuItem: "Edit",
		DataModelRemoveMenuItem: "Delete",
		DataModelRemoveConfirmation: "Are you sure you want to remove data source: {0}?",
		DataModelBindsToColumnMessage: "Unable to remove. Some data source binds to this column",
		DataSourceUsedInRules: "Data source is used in business rules:"
	};
	var localizableImages = {
		DesignerSettingsImage: {
			source: 3,
			params: {
				schemaName: "ViewModelSchemaDesignerSchema",
				resourceItemName: "DesignerSettingsImage",
				hash: "8f441a2b861d5114cbf2f5a753eff766",
				resourceItemExtension: ".png"
			}
		},
		DesignerRemoveImage: {
			source: 3,
			params: {
				schemaName: "ViewModelSchemaDesignerSchema",
				resourceItemName: "DesignerRemoveImage",
				hash: "1e5cff372195ec0d67d8514afe612fed",
				resourceItemExtension: ".png"
			}
		},
		EmptyInfoImage: {
			source: 3,
			params: {
				schemaName: "ViewModelSchemaDesignerSchema",
				resourceItemName: "EmptyInfoImage",
				hash: "84410c143d7a4e3bfdbeda3db0408fca",
				resourceItemExtension: ".png"
			}
		},
		InfoSpriteImage: {
			source: 3,
			params: {
				schemaName: "ViewModelSchemaDesignerSchema",
				resourceItemName: "InfoSpriteImage",
				hash: "15d4e5358792ef12351d7d6caa59dfb2",
				resourceItemExtension: ".png"
			}
		},
		AddDataModelButtonImage: {
			source: 3,
			params: {
				schemaName: "ViewModelSchemaDesignerSchema",
				resourceItemName: "AddDataModelButtonImage",
				hash: "6c51b373f7347e0d88add1b1f8d83c01",
				resourceItemExtension: ".svg"
			}
		},
		PageElementsImage: {
			source: 3,
			params: {
				schemaName: "ViewModelSchemaDesignerSchema",
				resourceItemName: "PageElementsImage",
				hash: "1b803497f291af03c0f61ca7fc67c995",
				resourceItemExtension: ".svg"
			}
		},
		PageParametersImage: {
			source: 3,
			params: {
				schemaName: "ViewModelSchemaDesignerSchema",
				resourceItemName: "PageParametersImage",
				hash: "a465b42219ca05e901f1a7700ddb346e",
				resourceItemExtension: ".svg"
			}
		},
		DataSource: {
			source: 3,
			params: {
				schemaName: "ViewModelSchemaDesignerSchema",
				resourceItemName: "DataSource",
				hash: "27fa920b92126f0bbd55da29b475511a",
				resourceItemExtension: ".svg"
			}
		},
		DataModelMenuImage: {
			source: 3,
			params: {
				schemaName: "ViewModelSchemaDesignerSchema",
				resourceItemName: "DataModelMenuImage",
				hash: "df03c3177a972b7f3b6987430f988ca3",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});