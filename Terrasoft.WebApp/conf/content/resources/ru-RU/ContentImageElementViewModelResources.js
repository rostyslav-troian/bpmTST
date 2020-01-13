define("ContentImageElementViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Placeholder: "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",
		SetLinkInputBoxCaption: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0430\u0434\u0440\u0435\u0441",
		Caption: "\u041A\u0430\u0440\u0442\u0438\u043D\u043A\u0430"
	};
	var localizableImages = {
		UploadIcon: {
			source: 3,
			params: {
				schemaName: "ContentImageElementViewModel",
				resourceItemName: "UploadIcon",
				hash: "83de2204df57051bd7022fa0b2e93ccc",
				resourceItemExtension: ".png"
			}
		},
		LinkIcon: {
			source: 3,
			params: {
				schemaName: "ContentImageElementViewModel",
				resourceItemName: "LinkIcon",
				hash: "f1e13d6236c063aba2bd3b40a2b9713f",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});