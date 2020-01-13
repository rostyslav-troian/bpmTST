define("FolderLookupPageViewResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectButtonCaption: "Select",
		CancelButtonCaption: "Cancel",
		ActionButtonCaption: "Actions",
		SelectFoldersMenuItemCaption: "Select multiple folders",
		SelectFolderMenuItemCaption: "Select folder",
		FolderMenuSeparatorCaption: "FOLDER",
		CreateStaticMenuItemCaption: "New static folder",
		CreateDynamicMenuItemCaption: "New dynamic folder",
		CopyMenuItemCaption: "Copy",
		RenameMenuItemCaption: "Rename",
		DeleteMenuItemCaption: "Delete",
		SaveButtonCaption: "Save filter",
		GroupMenuItemCaption: "Group",
		UnGroupMenuItemCaption: "Ungroup",
		MoveUpMenuItemCaption: "Up",
		MoveDownMenuItemCaption: "Down",
		MoveMenuItemCaption: "Move",
		EditRightsMenuItemCaption: "Set up access rights",
		FilterGroupCaption: "Filter",
		ClearButtonCaption: "Clear"
	};
	var localizableImages = {
		ApplyButtonImage: {
			source: 3,
			params: {
				schemaName: "FolderLookupPageView",
				resourceItemName: "ApplyButtonImage",
				hash: "87fea5a995ec309ade9719e3aaab7c33",
				resourceItemExtension: ".png"
			}
		},
		CancelButtonImage: {
			source: 3,
			params: {
				schemaName: "FolderLookupPageView",
				resourceItemName: "CancelButtonImage",
				hash: "bc577de06132c42e584683b41f45878c",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});