define("ChangeAdminRightsUserTaskAddRightsViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AllowMenuItemCaption: "\u0414\u0430\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F",
		AllowAndGrantMenuItemCaption: "\u0414\u0430\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u0441 \u043F\u0440\u0430\u0432\u043E\u043C \u0434\u0435\u043B\u0435\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F",
		DenyMenuItemCaption: "\u0417\u0430\u0431\u0440\u0430\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F"
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