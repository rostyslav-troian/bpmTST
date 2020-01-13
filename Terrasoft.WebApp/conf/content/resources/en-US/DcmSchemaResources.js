define("DcmSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		TypeCaption: "Case",
		DefaultParameterMacrosCaption: "Main record"
	};
	var localizableImages = {
		TitleImage: {
			source: 3,
			params: {
				schemaName: "DcmSchema",
				resourceItemName: "TitleImage",
				hash: "fb78d4a3c07d310c4a9a91b04623da0d",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});