define("ImageCustomGeneratorV2Resources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		ImageUploadButtonHint: "Add picture",
		ImageClearButtonHint: "Delete picture"
	};
	var localizableImages = {
		DefaultImage: {
			source: 3,
			params: {
				schemaName: "ImageCustomGeneratorV2",
				resourceItemName: "DefaultImage",
				hash: "4b177430ad9dfd06fb56c61bfd4f9b60",
				resourceItemExtension: ".jpg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});