define("ContentBlockStructurePageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddStructureItemBtnCaption: "Add section",
		StructureItemConstructorLabelCaption: "Section constructor",
		AddHeroButtonCaption: "Add banner",
		BackgroundLabelCaption: "Background"
	};
	var localizableImages = {
		AddButtonIcon: {
			source: 3,
			params: {
				schemaName: "ContentBlockStructurePage",
				resourceItemName: "AddButtonIcon",
				hash: "d01b7b39e03c8953fd94ff9a74c5f8ba",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});