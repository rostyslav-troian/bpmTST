define("FileImportMixinResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ImportFromFileButtonCaption: "Data import",
		DataImportInsufficientRightsMessage: "Insufficient rights to perform this action. Contact your system administrator.",
		DataImportPopupBlockedMessage: "Pop-up windows are blocked in browser. Enable pop-up windows in your browser for correct operation of application."
	};
	var localizableImages = {
		ImportFromFileButtonImage: {
			source: 3,
			params: {
				schemaName: "FileImportMixin",
				resourceItemName: "ImportFromFileButtonImage",
				hash: "ff7de274f685d9a05f5a437e271f34cd",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});