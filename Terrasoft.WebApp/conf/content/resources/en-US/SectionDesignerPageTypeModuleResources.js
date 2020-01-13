define("SectionDesignerPageTypeModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		RecordTypePlaceholder: "Record type",
		AddButtonCaption: "New",
		RecordsTypeCaption: "Record types",
		TypeColumnCaption: "Field contains information about the record type",
		DuplicatedTypeNames: "Duplicated record type",
		OnChangeTypeColumnMessage: "All changes will be lost. Continue?",
		CanNotDeleteMessage: "Existing item cannot be deleted",
		EmptyPagesError: "Page types must be specified",
		UpCaption: "Up",
		DownCaption: "Down",
		SaveCaption: "Save",
		CancelCaption: "Cancel",
		AddNewMenuItemCaption: "New record",
		CanNotAddNewMessage: "New records can be added to the \u0022{0}\u0022 object only from lookup",
		ExistingRecordsSeparatorCaption: "Existing records"
	};
	var localizableImages = {
		ItemEditApplyButtonImage: {
			source: 3,
			params: {
				schemaName: "SectionDesignerPageTypeModule",
				resourceItemName: "ItemEditApplyButtonImage",
				hash: "990c2489baa1946eb4c3f44b827803df",
				resourceItemExtension: ".png"
			}
		},
		ItemEditCancelButtonImage: {
			source: 3,
			params: {
				schemaName: "SectionDesignerPageTypeModule",
				resourceItemName: "ItemEditCancelButtonImage",
				hash: "8ccffbc53ab650f34ac90614ea8ee82d",
				resourceItemExtension: ".png"
			}
		},
		ItemDeleteButtonImage: {
			source: 3,
			params: {
				schemaName: "SectionDesignerPageTypeModule",
				resourceItemName: "ItemDeleteButtonImage",
				hash: "1a061064dfd59f9c99821e6168630ee8",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});