define("CollapsibleContainerResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ShowMoreCaption: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435",
		ShowLessCaption: "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"
	};
	var localizableImages = {
		ShowMoreLessImage: {
			source: 3,
			params: {
				schemaName: "CollapsibleContainer",
				resourceItemName: "ShowMoreLessImage",
				hash: "02c364663d49378639a251195f58d1ad",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});