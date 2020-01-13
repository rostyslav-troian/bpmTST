define("BaseContentItemStructurePageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddStructureItemBtnCaption: "Add Structure Item",
		StructureItemConstructorLabelCaption: "Structure Item Constructor",
		ReverseDirection: "Reverse the order of columns on mobile"
	};
	var localizableImages = {
		AddButtonIcon: {
			source: 3,
			params: {
				schemaName: "BaseContentItemStructurePage",
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