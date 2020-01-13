define("FileImportConstantsResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		FileFormatExceptionMessage: "File is damaged. Please select another file and try again.",
		ArgumentOutOfRangeExceptionMessage: "File is damaged. Please select another file and try again.",
		UriFormatExceptionMessage: "The file is not ready for import! To successfully import the file, please ensure that the contents and structure meet ",
		OutOfMemoryExceptionMessage: "File size exceeds size limit. Please select another file and try again.",
		EmptyHeaderExceptionMessage: "File doesn\u0027t contain column headers. Fill in the first row of the file with column headers and try again.",
		UriFormatExceptionLinkCaption: "our recommendations."
	};
	var localizableImages = {

	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});