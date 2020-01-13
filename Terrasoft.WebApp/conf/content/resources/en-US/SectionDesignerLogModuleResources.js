define("SectionDesignerLogModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		HeaderCaption: "Compilation errors",
		CloseCaption: "Close",
		FileNameCaption: "File name",
		LineCaption: "String",
		ErrorTextCaption: "Error details"
	};
	var localizableImages = {
		CloseIcon: {
			source: 3,
			params: {
				schemaName: "SectionDesignerLogModule",
				resourceItemName: "CloseIcon",
				hash: "63f0a846ac338fa8ced85b5685fa15f6",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});