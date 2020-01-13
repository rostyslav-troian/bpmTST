define("GlobalSearchResultPageResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		HeaderCaption: "Search results",
		EmptyResultCaption: "Nothing found by the search query, or you have no access rights to the found records",
		RecommendationTemplate: "Change the search query or learn more about changing access rights in the \u003Ca target=\u0022_blank\u0022 href=\u0022{0}\u0022\u003EAcademy\u003C\/a\u003E.",
		ErrorEmptyResultCaption: "Unable to connect to the search server. Connection parameters have not been set up or the search server may be unreachable. ",
		ErrorRecommendationTemplate: "Find out more about setting up the search feature in the \u003Ca target=\u0022_blank\u0022 href=\u0022{0}\u0022\u003EAcademy\u003C\/a\u003E."
	};
	var localizableImages = {
		EmptyResultImage: {
			source: 3,
			params: {
				schemaName: "GlobalSearchResultPage",
				resourceItemName: "EmptyResultImage",
				hash: "0903e566fa62c9d5281e9faf29e6fba8",
				resourceItemExtension: ".svg"
			}
		},
		ErrorEmptyResultImage: {
			source: 3,
			params: {
				schemaName: "GlobalSearchResultPage",
				resourceItemName: "ErrorEmptyResultImage",
				hash: "0ad7c41f01805a983ad01ae48a36b351",
				resourceItemExtension: ".svg"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});