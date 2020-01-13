define("ProcessRemindModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		OKCaption: "\u041E\u041A",
		CancelCaption: "\u041E\u0442\u043C\u0435\u043D\u0430",
		StepsCaption: "\u041F\u043E \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0443 \u0441\u043E\u0437\u0434\u0430\u043D\u044B \u043D\u043E\u0432\u044B\u0435 \u0448\u0430\u0433\u0438"
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