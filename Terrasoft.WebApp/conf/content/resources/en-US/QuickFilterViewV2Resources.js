define("QuickFilterViewV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectAnotherFolder: "Select another folder",
		EditFilterGroup: "Set up folder",
		RemoveButtonHint: "Remove"
	};
	var localizableImages = {
		RemoveButtonImage: {
			source: 3,
			params: {
				schemaName: "QuickFilterViewV2",
				resourceItemName: "RemoveButtonImage",
				hash: "563de164682be35ef981066b7287177c",
				resourceItemExtension: ".svg"
			}
		},
		GeneralFolderImage: {
			source: 3,
			params: {
				schemaName: "QuickFilterViewV2",
				resourceItemName: "GeneralFolderImage",
				hash: "d9f49d92202e067c793beb5bf9ca3083",
				resourceItemExtension: ".svg"
			}
		},
		SearchFolderImage: {
			source: 3,
			params: {
				schemaName: "QuickFilterViewV2",
				resourceItemName: "SearchFolderImage",
				hash: "5af2275506420a0e3f762a1f2394181b",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});