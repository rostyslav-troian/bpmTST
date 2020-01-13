define("BaseSearchRowSchemaResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		EntitySchemaLabelCaption: "\u041E\u0431\u044A\u0435\u043A\u0442",
		NotFilled: "(\u043D\u0435 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043E)"
	};
	var localizableImages = {
		DefaultSearchImage: {
			source: 3,
			params: {
				schemaName: "BaseSearchRowSchema",
				resourceItemName: "DefaultSearchImage",
				hash: "70fea2e411ff6cb982b29ce36dc76835",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});