define("ConfigurationFileApiResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		FileNullOrEmptyMessage: "File not identified",
		OversizedFilesErrorMessage: "These files wasn\u0027t uploaded in case of maximum file size ({0} Mb) restrictions: {1}"
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});