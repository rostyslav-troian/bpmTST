define("CallSectionGridRowViewModelResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		StopCaption: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",
		PlayCaption: "\u041F\u0440\u043E\u0441\u043B\u0443\u0448\u0430\u0442\u044C",
		PauseCaption: "\u041F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",
		PlayErrorMessage: "\u041F\u0440\u0438 \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0438 \u0437\u0430\u043F\u0438\u0441\u0438 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440\u0430 \u0432\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u0441 \u043A\u043E\u0434\u043E\u043C \u0027{0}\u0027"
	};
	var localizableImages = {
		PauseImage: {
			source: 3,
			params: {
				schemaName: "CallSectionGridRowViewModel",
				resourceItemName: "PauseImage",
				hash: "8542d6c74bb13fef901c333419816f82",
				resourceItemExtension: ".png"
			}
		},
		PlayImage: {
			source: 3,
			params: {
				schemaName: "CallSectionGridRowViewModel",
				resourceItemName: "PlayImage",
				hash: "a56a23515b7a789c47488108d2c4be6e",
				resourceItemExtension: ".png"
			}
		},
		StopImage: {
			source: 3,
			params: {
				schemaName: "CallSectionGridRowViewModel",
				resourceItemName: "StopImage",
				hash: "41c86351c37b806a1ae7d4590505f7f0",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});