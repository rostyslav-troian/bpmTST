define("BaseSectionPageSettingsResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SectionPageSettingsGroupCaption: "Section pages",
		AllTypedPageValidateMessageMask: "You have not finished setting up multiple pages. Specify the value of the \u0022{0}\u0022 column for each page layout.",
		BlankSlateDescription: "There are no pages in this section yet.\u003Cp\u003ELearn more in the {0}Academy{1}.",
		SetupPageButtonCaption: "Set up page",
		AddPageButtonCaption: "Add page",
		SingleEditPageCaptionTemplate: "Edit page: \u0022{0}\u0022",
		MultiEditPageCaptionTemplate: "Edit page: \u0022{0}\u0022 ({1})",
		GridTypeColumnCaption: "Pages",
		PageColumnCaption: "Page",
		TypeColumnCaption: "Values of the \u0022{0}\u0022 lookup",
		EmptyTypeColumnCaption: "Lookup not selected",
		PageTypeSettingsHint: "Select a lookup field. The value in the field will determine which edit page to use",
		SinglePageButtonCaption: "Edit page",
		CantAddNewTypeMessage: "A lookup record with this value already exists and is used in other pages",
		SingleSysModuleEditCaptionTemplate: "New",
		TypeReferenceEntitySchemaCaptionMask: "Section object type \u0022{0}\u0022",
		DefaultTypeColumnCaption: "Type",
		PageTypeLookupPlaceholder: "Not used",
		EditPageActionItemCaption: "Edit",
		CopyPageActionItemCaption: "Copy",
		RemovePageActionItemCaption: "Remove",
		PageCopySuffix: "copy",
		SchemaCaption: "Page name",
		RenamePageActionItemCaption: "Rename",
		DeleteConfirmationMessage: "Are you sure that you want to delete the selected record?"
	};
	var localizableImages = {
		BlankSlateImage: {
			source: 3,
			params: {
				schemaName: "BaseSectionPageSettings",
				resourceItemName: "BlankSlateImage",
				hash: "d467a6ad2857c4288b0812ddd315574d",
				resourceItemExtension: ".svg"
			}
		},
		AddPageButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseSectionPageSettings",
				resourceItemName: "AddPageButtonImage",
				hash: "fefd081758c227551ea4758abb495145",
				resourceItemExtension: ".svg"
			}
		},
		PageIcon: {
			source: 3,
			params: {
				schemaName: "BaseSectionPageSettings",
				resourceItemName: "PageIcon",
				hash: "20b9aaf17ab6fad57063b1be79dae88c",
				resourceItemExtension: ".svg"
			}
		},
		PageTypeSettings: {
			source: 3,
			params: {
				schemaName: "BaseSectionPageSettings",
				resourceItemName: "PageTypeSettings",
				hash: "6d7be9ded3109249bd28fb3f3626f0ba",
				resourceItemExtension: ".svg"
			}
		},
		ToolsButtonImage: {
			source: 3,
			params: {
				schemaName: "BaseSectionPageSettings",
				resourceItemName: "ToolsButtonImage",
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