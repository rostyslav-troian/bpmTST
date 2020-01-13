define("SectionModuleResources", ["terrasoft"], function(Terrasoft) {
	var localizableStrings = {
		GridDataViewCaption: "\u0414\u0430\u043D\u043D\u044B\u0435",
		AnalyticsDataViewCaption: "\u0414\u0430\u043D\u043D\u044B\u0435"
	};
	var localizableImages = {
		GridDataViewIcon: {
			source: 3,
			params: {
				schemaName: "SectionModule",
				resourceItemName: "GridDataViewIcon",
				hash: "dc354977da85587494b8e9b5a27e4743",
				resourceItemExtension: ".png"
			}
		},
		AnalyticsDataViewIcon: {
			source: 3,
			params: {
				schemaName: "SectionModule",
				resourceItemName: "AnalyticsDataViewIcon",
				hash: "e1d385b3ccd0f16e0a27a740c7903137",
				resourceItemExtension: ".png"
			}
		}
	};
	return {
		localizableStrings: localizableStrings,
		localizableImages: localizableImages
	};
});