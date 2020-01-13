define("DcmSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		TypeCaption: "\u041A\u0435\u0439\u0441",
		DefaultParameterMacrosCaption: "\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C"
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