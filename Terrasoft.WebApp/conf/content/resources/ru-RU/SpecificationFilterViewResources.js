define("SpecificationFilterViewResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ApplyButtonCaption: "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",
		SaveButtonCaption: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
		DeselectButtonCaption: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C",
		SelectAllButtonCaption: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u0441\u0435"
	};
	var localizableImages = {
		ClosePanelImage: {
			source: 3,
			params: {
				schemaName: "SpecificationFilterView",
				resourceItemName: "ClosePanelImage",
				hash: "42b5b815fe5ef39879666f4595bd892b",
				resourceItemExtension: ".png"
			}
		},
		BackImage: {
			source: 3,
			params: {
				schemaName: "SpecificationFilterView",
				resourceItemName: "BackImage",
				hash: "96d05bdc934e78ab86fd88b37ba48fe9",
				resourceItemExtension: ".png"
			}
		},
		FolderIcon: {
			source: 3,
			params: {
				schemaName: "SpecificationFilterView",
				resourceItemName: "FolderIcon",
				hash: "c40f75f0d5bb39c0559b287276d5a265",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});