define("FileImportColumnsMappingPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		DuplicateFieldMessageTemplate: "Selected column \u0022{0}\u0022 is already mapped to \u0022{1}\u0022 file column. Change the mapping and try again.",
		DuplicateAttributeMessageTemplate: "The column was already selected",
		ValidationMessageTemplate: "Column \u0022{0}\u0022 is required. Map this column and try again.",
		CommunicationOptionCaption: "Communication option",
		AddressCaption: "Address",
		Header: "Specify column mapping between Excel file and the system"
	};
	var localizableImages = {
		ExcelLogo: {
			source: 3,
			params: {
				schemaName: "FileImportColumnsMappingPage",
				resourceItemName: "ExcelLogo",
				hash: "7b821ec298877a3279be48cf24f373cb",
				resourceItemExtension: ".png"
			}
		},
		BpmonlineLogo: {
			source: 3,
			params: {
				schemaName: "FileImportColumnsMappingPage",
				resourceItemName: "BpmonlineLogo",
				hash: "f613b82eb3f383d47dcadd7766336db0",
				resourceItemExtension: ".png"
			}
		},
		DeleteImage: {
			source: 3,
			params: {
				schemaName: "FileImportColumnsMappingPage",
				resourceItemName: "DeleteImage",
				hash: "42b5b815fe5ef39879666f4595bd892b",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});