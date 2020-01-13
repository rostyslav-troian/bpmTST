define("ProcessRemindModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OKCaption: "OK",
		CancelCaption: "Cancel",
		StepsCaption: "New steps created for the process"
	};
	var localizableImages = {
		HideIcon: {
			source: 3,
			params: {
				schemaName: "ProcessRemindModule",
				resourceItemName: "HideIcon",
				hash: "d83fcc9d4e31559d6f903a11f6d528bd",
				resourceItemExtension: ".png"
			}
		},
		ArrowBlue: {
			source: 3,
			params: {
				schemaName: "ProcessRemindModule",
				resourceItemName: "ArrowBlue",
				hash: "d77ad555cca7e5441382bbb2a3ab8943",
				resourceItemExtension: ".png"
			}
		},
		ArrowGray: {
			source: 3,
			params: {
				schemaName: "ProcessRemindModule",
				resourceItemName: "ArrowGray",
				hash: "44b3c0b771daf9f885da8b41f0d0f65b",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});