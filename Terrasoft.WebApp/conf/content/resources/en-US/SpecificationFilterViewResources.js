define("SpecificationFilterViewResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ApplyButtonCaption: "Apply",
		SaveButtonCaption: "Save",
		DeselectButtonCaption: "Clear",
		SelectAllButtonCaption: "Select all"
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