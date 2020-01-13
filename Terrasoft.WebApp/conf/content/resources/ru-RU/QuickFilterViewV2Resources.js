define("QuickFilterViewV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		SelectAnotherFolder: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0434\u0440\u0443\u0433\u0443\u044E \u0433\u0440\u0443\u043F\u043F\u0443",
		EditFilterGroup: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443",
		RemoveButtonHint: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"
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