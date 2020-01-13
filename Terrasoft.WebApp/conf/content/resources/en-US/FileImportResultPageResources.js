define("FileImportResultPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		Header: "Congratulations!",
		NextButtonCaption: "Next",
		CloseButtonCaption: "Close",
		DataImportFinishedLabelCaption: "Import complete.",
		ImportStatusLabelFormat: "{1} of {0} records imported from the source file.",
		NotImportedStatusLabelFormat: "{0} record(s) not imported.",
		ImportDetailsLabelFormat: "You can view import details in the",
		ImportDetailsEndLabelFormat: ".",
		ImportLogLink: "Open data import log",
		FailureImportHeader: "Finished.",
		OpenImportedDataLink: "Open imported records"
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