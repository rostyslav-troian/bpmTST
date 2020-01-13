define("ChangeAdminRightsUserTaskAddRightsViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AllowMenuItemCaption: "Permit",
		AllowAndGrantMenuItemCaption: "Permit with right to delegate",
		DenyMenuItemCaption: "Restrict"
	};
	var localizableImages = {
		DenyRightLevelButtonImage: {
			source: 3,
			params: {
				schemaName: "ChangeAdminRightsUserTaskAddRightsViewModel",
				resourceItemName: "DenyRightLevelButtonImage",
				hash: "254f2e56e2498cd57277ba41898da06b",
				resourceItemExtension: ".svg"
			}
		},
		AllowRightLevelButtonImage: {
			source: 3,
			params: {
				schemaName: "ChangeAdminRightsUserTaskAddRightsViewModel",
				resourceItemName: "AllowRightLevelButtonImage",
				hash: "416b7b83ad4230fd3e54063568fbe43a",
				resourceItemExtension: ".svg"
			}
		},
		AllowAndGrantRightLevelButtonImage: {
			source: 3,
			params: {
				schemaName: "ChangeAdminRightsUserTaskAddRightsViewModel",
				resourceItemName: "AllowAndGrantRightLevelButtonImage",
				hash: "d0185facab27b7df82ba44230e4b9c35",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});