define("MobileDetailDesignerModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddDetailButtonCaption: "New detail",
		AddDetailLabelCaption: "Add detail",
		ConfigureControlGroupButtonCaption: "Set",
		RemoveControlGroupButtonCaption: "Delete",
		AddGridLayoutItemButtonCaption: "New column",
		RemoveGridLayoutItemButtonCaption: "Delete column"
	};
	var localizableImages = {
		MoveUpButtonImage: {
			source: 3,
			params: {
				schemaName: "MobileDetailDesignerModule",
				resourceItemName: "MoveUpButtonImage",
				hash: "eb1f9fd18ef6ffa338ffba77770fd4dc",
				resourceItemExtension: ".png"
			}
		},
		MoveDownButtonImage: {
			source: 3,
			params: {
				schemaName: "MobileDetailDesignerModule",
				resourceItemName: "MoveDownButtonImage",
				hash: "f153bce1fae18e7c3ca7297e51e192e4",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});