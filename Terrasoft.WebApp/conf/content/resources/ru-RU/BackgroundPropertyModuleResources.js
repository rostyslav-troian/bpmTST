define("BackgroundPropertyModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		BackgroundImageUrlPlaceholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 URL",
		ImageEmbedded: "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E",
		BackgroundVerticalAlign: "\u0412\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435",
		BackgroundHorizontalAlign: "\u0413\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u043E\u0435"
	};
	var localizableImages = {
		UploadBackgroundImage: {
			source: 3,
			params: {
				schemaName: "BackgroundPropertyModule",
				resourceItemName: "UploadBackgroundImage",
				hash: "da75d6ef5ad6358e274fc9acc115bded",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});