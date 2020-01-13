define("EditDetailViewGeneratorResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		AddButtonCaption: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
		LoadButtonCaption: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0451",
		RemoveButtonCaption: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C"
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