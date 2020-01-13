define("CustomFilterViewResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddConditionMenuItemCaption: "Add filter",
		ShowFoldersMenuItemCaption: "Show folders",
		ExtendedModeMenuItemCaption: "Switch to advanced mode",
		ClearFilterMenuItemCaption: "Clear",
		SaveAsDynamicFolderMenuItemCaption: "Save as dynamic folder",
		SimpleFilterEmptyColumnEditPlaceHolder: "Column",
		SimpleFilterEmptyValueEditPlaceHolder: "Value"
	};
	var localizableImages = {
		ImageFilter: {
			source: 3,
			params: {
				schemaName: "CustomFilterView",
				resourceItemName: "ImageFilter",
				hash: "071eacce0b46050a9375ab993deb222a",
				resourceItemExtension: ".png"
			}
		},
		ApplyButtonImage: {
			source: 3,
			params: {
				schemaName: "CustomFilterView",
				resourceItemName: "ApplyButtonImage",
				hash: "87fea5a995ec309ade9719e3aaab7c33",
				resourceItemExtension: ".png"
			}
		},
		CancelButtonImage: {
			source: 3,
			params: {
				schemaName: "CustomFilterView",
				resourceItemName: "CancelButtonImage",
				hash: "bc577de06132c42e584683b41f45878c",
				resourceItemExtension: ".png"
			}
		},
		RemoveButtonImage: {
			source: 3,
			params: {
				schemaName: "CustomFilterView",
				resourceItemName: "RemoveButtonImage",
				hash: "b8a7008452ec672bd9c284d5e83091c1",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});