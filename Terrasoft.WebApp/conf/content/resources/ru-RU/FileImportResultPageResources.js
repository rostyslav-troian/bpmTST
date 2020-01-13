define("FileImportResultPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Header: "\u041F\u043E\u0437\u0434\u0440\u0430\u0432\u043B\u044F\u0435\u043C!",
		NextButtonCaption: "\u0414\u0430\u043B\u0435\u0435",
		CloseButtonCaption: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
		DataImportFinishedLabelCaption: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430.",
		ImportStatusLabelFormat: "\u0417\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E {1} \u0438\u0437 {0} \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u0432 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C \u0444\u0430\u0439\u043B\u0435.",
		NotImportedStatusLabelFormat: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C {0} \u0437\u0430\u043F\u0438\u0441\u0435\u0439.",
		ImportDetailsLabelFormat: "\u0414\u0435\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u043E\u0442\u0447\u0435\u0442 \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432",
		ImportDetailsEndLabelFormat: ".",
		ImportLogLink: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0436\u0443\u0440\u043D\u0430\u043B \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0434\u0430\u043D\u043D\u044B\u0445",
		FailureImportHeader: "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E.",
		OpenImportedDataLink: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043D\u044B\u043C \u0434\u0430\u043D\u043D\u044B\u043C"
	};
	var localizableImages = {
		CongratulationImage: {
			source: 3,
			params: {
				schemaName: "FileImportResultPage",
				resourceItemName: "CongratulationImage",
				hash: "e0c21c84d6b8f17805e94e4242f654b9",
				resourceItemExtension: ".png"
			}
		},
		CloseImage: {
			source: 3,
			params: {
				schemaName: "FileImportResultPage",
				resourceItemName: "CloseImage",
				hash: "a7e7cb3f68a25a1684556297122f46c2",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});