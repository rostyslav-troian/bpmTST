define("EditDetailViewGeneratorResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddButtonCaption: "New",
		LoadButtonCaption: "Download more",
		RemoveButtonCaption: "Delete"
	};
	var localizableImages = {
		DeleteIcon: {
			source: 3,
			params: {
				schemaName: "EditDetailViewGenerator",
				resourceItemName: "DeleteIcon",
				hash: "d83fcc9d4e31559d6f903a11f6d528bd",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});