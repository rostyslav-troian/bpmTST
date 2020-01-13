define("FolderFilterViewResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		FolderFilterEmptyFolderEditPlaceHolder: "\u0413\u0440\u0443\u043F\u043F\u0430",
		AddConditionMenuItemCaption: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443"
	};
	var localizableImages = {
		FolderImage: {
			source: 3,
			params: {
				schemaName: "FolderFilterView",
				resourceItemName: "FolderImage",
				hash: "dbaf7655966b4489f66feb5ed5add9a4",
				resourceItemExtension: ".png"
			}
		},
		ApplyButtonImage: {
			source: 3,
			params: {
				schemaName: "FolderFilterView",
				resourceItemName: "ApplyButtonImage",
				hash: "87fea5a995ec309ade9719e3aaab7c33",
				resourceItemExtension: ".png"
			}
		},
		CancelButtonImage: {
			source: 3,
			params: {
				schemaName: "FolderFilterView",
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